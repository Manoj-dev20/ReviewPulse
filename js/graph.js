/**
 * ResearchPulse — Knowledge Graph (D3 v7 force-directed)
 */

const EDGE_COLORS = {
  contradicts:    '#EF4444',
  supports:       '#10B981',
  extends:        '#F59E0B',
  cites_concept:  '#78909C',
  shares_dataset: '#3B82F6',
};

const NODE_COLORS = {
  paper:   { fill: '#DBEAFE', stroke: '#1D4ED8', text: '#1E3A8A' },
  concept: { fill: '#F3F4F6', stroke: '#6B7280', text: '#374151' },
  method:  { fill: '#D1FAE5', stroke: '#059669', text: '#065F46' },
};

// Cluster palette for background halos
const CLUSTER_COLORS = ['#EDE9FE','#DBEAFE','#D1FAE5','#FEF3C7','#FCE7F3'];

let graphSvg, graphSim, graphData = null;
let contradictionMap = {};

function initGraph(nodes, edges, contradictions) {
  graphData = { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)) };

  // Build contradiction lookup
  contradictionMap = {};
  (contradictions || []).forEach(c => { contradictionMap[c.id] = c; });

  const container = document.getElementById('graph-container');
  const W = container.clientWidth;
  const H = container.clientHeight;

  // Clear previous
  d3.select('#graph-svg').selectAll('*').remove();

  graphSvg = d3.select('#graph-svg')
    .attr('width', W)
    .attr('height', H);

  const defs = graphSvg.append('defs');

  // Arrow markers for each edge type
  Object.entries(EDGE_COLORS).forEach(([type, color]) => {
    defs.append('marker')
      .attr('id', `arrow-${type}`)
      .attr('viewBox', '0 0 10 6')
      .attr('refX', 10).attr('refY', 3)
      .attr('markerWidth', 6).attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,0 L0,6 L10,3 z')
      .attr('fill', color)
      .attr('opacity', type === 'contradicts' ? 0.9 : 0.55);
  });

  const g = graphSvg.append('g').attr('class', 'graph-root');

  // Zoom behaviour
  const zoom = d3.zoom()
    .scaleExtent([0.3, 3])
    .on('zoom', e => g.attr('transform', e.transform));
  graphSvg.call(zoom);

  // Store zoom ref for reset
  graphSvg._zoom = zoom;

  // Cluster halos (background circles per cluster)
  const clusterGroups = {};
  nodes.forEach(n => {
    if (!clusterGroups[n.cluster_id]) clusterGroups[n.cluster_id] = [];
    clusterGroups[n.cluster_id].push(n);
  });
  const haloLayer = g.append('g').attr('class', 'halo-layer');

  // Separate layers
  const edgeLayer = g.append('g').attr('class', 'edge-layer');
  const nodeLayer = g.append('g').attr('class', 'node-layer');

  // Build node ID index
  const nodeById = {};
  nodes.forEach(n => { nodeById[n.node_id] = n; });

  // D3 link/node data
  const links = edges.map(e => ({
    ...e,
    source: e.source_id,
    target: e.target_id,
  }));

  // Draw edges
  const edgeSel = edgeLayer.selectAll('line.edge')
    .data(links)
    .enter()
    .append('line')
    .attr('class', d => `edge edge--${d.relationship_type}`)
    .attr('stroke', d => EDGE_COLORS[d.relationship_type] || '#aaa')
    .attr('stroke-width', d => d.relationship_type === 'contradicts' ? 3.5 : 1.2)
    .attr('opacity', d => d.relationship_type === 'contradicts' ? 0.9 : 0.45)
    .attr('marker-end', d => `url(#arrow-${d.relationship_type})`)
    .style('cursor', d => d.relationship_type === 'contradicts' ? 'pointer' : 'default')
    .on('mouseenter', function(event, d) {
      if (d.relationship_type === 'contradicts') {
        d3.select(this).attr('stroke-width', 5).attr('opacity', 1);
        showTooltip(event, '⚡ Click to see contradiction');
      } else {
        showTooltip(event, d.relationship_type.replace('_', ' '));
      }
    })
    .on('mouseleave', function(event, d) {
      d3.select(this)
        .attr('stroke-width', d.relationship_type === 'contradicts' ? 3.5 : 1.2)
        .attr('opacity', d.relationship_type === 'contradicts' ? 0.9 : 0.45);
      hideTooltip();
    })
    .on('click', function(event, d) {
      if (d.relationship_type === 'contradicts' && d.contradiction_id) {
        openContraPopup(d.contradiction_id);
      }
    });

  // Draw nodes
  const nodeG = nodeLayer.selectAll('g.node')
    .data(nodes)
    .enter()
    .append('g')
    .attr('class', 'node')
    .style('cursor', 'grab')
    .call(
      d3.drag()
        .on('start', dragStart)
        .on('drag', dragged)
        .on('end', dragEnd)
    )
    .on('mouseenter', function(event, d) {
      d3.select(this).select('circle').attr('r', nodeRadius(d) + 3);
      showTooltip(event, `${d.label} · ${d.type}`);
    })
    .on('mouseleave', function(event, d) {
      d3.select(this).select('circle').attr('r', nodeRadius(d));
      hideTooltip();
    });

  nodeG.append('circle')
    .attr('r', d => nodeRadius(d))
    .attr('fill', d => (NODE_COLORS[d.type] || NODE_COLORS.paper).fill)
    .attr('stroke', d => (NODE_COLORS[d.type] || NODE_COLORS.paper).stroke)
    .attr('stroke-width', d => d.type === 'paper' ? 1.5 : 1)
    .style('transition', 'r 0.15s');

  nodeG.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .attr('font-size', d => d.type === 'paper' ? '9px' : '8px')
    .attr('font-family', 'DM Mono, monospace')
    .attr('font-weight', '500')
    .attr('fill', d => (NODE_COLORS[d.type] || NODE_COLORS.paper).text)
    .attr('pointer-events', 'none')
    .text(d => truncate(d.label, 12));

  // Force simulation
  graphSim = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links)
      .id(d => d.node_id)
      .distance(d => d.relationship_type === 'contradicts' ? 160 : 90)
      .strength(0.4))
    .force('charge', d3.forceManyBody().strength(-280))
    .force('center', d3.forceCenter(W / 2, H / 2))
    .force('collision', d3.forceCollide().radius(d => nodeRadius(d) + 14))
    .force('cluster', clusterForce(0.08))
    .on('tick', ticked);

  // Animate nodes in from center
  nodes.forEach(n => {
    n.x = W / 2 + (Math.random() - 0.5) * 60;
    n.y = H / 2 + (Math.random() - 0.5) * 60;
  });

  function ticked() {
    edgeSel
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dist = Math.sqrt(dx*dx + dy*dy) || 1;
        return d.target.x - dx / dist * (nodeRadius(d.target) + 8);
      })
      .attr('y2', d => {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dist = Math.sqrt(dx*dx + dy*dy) || 1;
        return d.target.y - dy / dist * (nodeRadius(d.target) + 8);
      });

    nodeG.attr('transform', d => `translate(${d.x},${d.y})`);

    // Update halos per cluster
    Object.entries(clusterGroups).forEach(([cid, members]) => {
      const xs = members.map(m => m.x || 0);
      const ys = members.map(m => m.y || 0);
      const cx = xs.reduce((a,b)=>a+b,0)/xs.length;
      const cy = ys.reduce((a,b)=>a+b,0)/ys.length;
      const r  = Math.max(50, Math.max(...xs.map(x=>Math.abs(x-cx)), ...ys.map(y=>Math.abs(y-cy)))) + 36;
      haloLayer.select(`.halo-${cid}`)
        .attr('cx', cx).attr('cy', cy).attr('r', r);
    });
  }

  // Draw halos
  Object.entries(clusterGroups).forEach(([cid]) => {
    haloLayer.append('circle')
      .attr('class', `halo-${cid}`)
      .attr('fill', CLUSTER_COLORS[cid % CLUSTER_COLORS.length])
      .attr('opacity', 0.18)
      .attr('stroke', CLUSTER_COLORS[cid % CLUSTER_COLORS.length])
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.35);
  });

  // Pulse contradiction edges
  pulseContradictions();
}

function nodeRadius(d) {
  return d.type === 'paper' ? 18 : d.type === 'method' ? 13 : 11;
}

function truncate(str, n) {
  return str.length > n ? str.slice(0, n-1) + '…' : str;
}

function clusterForce(strength) {
  const clusterCenters = {};
  return function(alpha) {
    graphData.nodes.forEach(d => {
      if (!clusterCenters[d.cluster_id]) return;
      const { x, y } = clusterCenters[d.cluster_id];
      d.vx -= (d.x - x) * strength * alpha;
      d.vy -= (d.y - y) * strength * alpha;
    });
  };
}

function pulseContradictions() {
  setInterval(() => {
    if (!graphSvg) return;
    graphSvg.selectAll('line.edge--contradicts')
      .transition().duration(600)
      .attr('stroke-width', 5.5).attr('opacity', 1)
      .transition().duration(600)
      .attr('stroke-width', 3.5).attr('opacity', 0.9);
  }, 2400);
}

function dragStart(event, d) {
  if (!event.active) graphSim.alphaTarget(0.3).restart();
  d.fx = d.x; d.fy = d.y;
}
function dragged(event, d) { d.fx = event.x; d.fy = event.y; }
function dragEnd(event, d) {
  if (!event.active) graphSim.alphaTarget(0);
  d.fx = null; d.fy = null;
}

function showTooltip(event, text) {
  const tip = document.getElementById('graph-tooltip');
  const cont = document.getElementById('graph-container');
  const rect = cont.getBoundingClientRect();
  tip.textContent = text;
  tip.style.display = 'block';
  tip.style.left = (event.clientX - rect.left + 10) + 'px';
  tip.style.top  = (event.clientY - rect.top  - 36) + 'px';
}
function hideTooltip() {
  document.getElementById('graph-tooltip').style.display = 'none';
}

function openContraPopup(cid) {
  // Look up from MOCK or real data stored in appState
  const c = (window.appState && window.appState.contradictions || []).find(x => x.id === cid)
         || Object.values(contradictionMap).find(x => x.id === cid);
  if (!c) return;

  document.getElementById('pop-sev-badge').textContent = c.severity;
  document.getElementById('pop-sev-badge').className   = `sev-badge sev-${c.severity}`;
  document.getElementById('pop-paper-a').textContent   = c.paper_a;
  document.getElementById('pop-claim-a').textContent   = c.claim_a;
  document.getElementById('pop-paper-b').textContent   = c.paper_b;
  document.getElementById('pop-claim-b').textContent   = c.claim_b;
  document.getElementById('pop-implication').textContent = '→ ' + c.implication;
  document.getElementById('contra-popup').style.display = 'block';
}

function closeContraPopup() {
  document.getElementById('contra-popup').style.display = 'none';
}

function resetGraph() {
  if (!graphSvg || !graphSvg._zoom) return;
  graphSvg.transition().duration(400)
    .call(graphSvg._zoom.transform, d3.zoomIdentity);
}
