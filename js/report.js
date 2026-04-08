/**
 * ResearchPulse — Report Renderer
 */

let methData = [];
let methSortDir = 1;
let methSortCol = 0;

function renderReport(report) {
  if (!report) return;

  // Executive summary
  const execEl = document.getElementById('rs-exec-content');
  execEl.innerHTML = (report.executive_summary || [])
    .map(p => `<p>${p}</p>`).join('');

  // Field snapshot
  const snapEl = document.getElementById('rs-snapshot-content');
  snapEl.innerHTML = (report.field_snapshot || []).map(s =>
    `<div class="snap-card">
       <div class="snap-label">${s.label}</div>
       <div class="snap-val ${s.cls || ''}">${s.value}</div>
     </div>`
  ).join('');

  // Contradictions
  const contraEl = document.getElementById('rs-contra-content');
  contraEl.innerHTML = '';
  (report.contradictions || []).forEach(c => {
    const div = document.createElement('div');
    div.className = 'contra-card-report';
    div.innerHTML = `
      <div class="contra-card-head" onclick="this.parentElement.classList.toggle('open')">
        <div class="contra-card-head-left">${c.paper_a} <span style="color:var(--ink-hint);font-weight:400">vs</span> ${c.paper_b}</div>
        <div class="contra-card-head-right">
          <span class="sev-badge sev-${c.severity}">${c.severity}</span>
          <span class="contra-caret">▾</span>
        </div>
      </div>
      <div class="contra-card-body">
        <div class="contra-body-grid">
          <div class="contra-body-side">
            <div class="contra-body-paper">${c.paper_a}</div>
            <div class="contra-body-claim">${c.claim_a}</div>
          </div>
          <div class="contra-body-side">
            <div class="contra-body-paper">${c.paper_b}</div>
            <div class="contra-body-claim">${c.claim_b}</div>
          </div>
        </div>
        <div class="contra-body-impl">${c.implication}</div>
      </div>`;
    contraEl.appendChild(div);
  });

  // Research gaps
  const gapEl = document.getElementById('rs-gaps-content');
  gapEl.innerHTML = '';
  (report.research_gaps || []).forEach(g => {
    const pct = Math.round(g.opportunity_score * 10);
    const div = document.createElement('div');
    div.className = 'gap-item';
    div.innerHTML = `
      <div class="gap-name">${g.area}</div>
      <div class="gap-desc">${g.desc}</div>
      <div class="gap-bar-wrap">
        <div class="gap-bar-bg">
          <div class="gap-bar-fill" style="width:0%" data-pct="${pct}"></div>
        </div>
        <div class="gap-score-label">${g.opportunity_score}/10</div>
      </div>
      <div class="gap-method">Suggested: ${g.suggested_methodology}</div>`;
    gapEl.appendChild(div);
  });

  // Animate gap bars after a brief delay
  setTimeout(() => {
    document.querySelectorAll('.gap-bar-fill').forEach(el => {
      el.style.width = el.dataset.pct + '%';
    });
  }, 120);

  // Trends
  const trendEl = document.getElementById('rs-trends-content');
  trendEl.innerHTML = '';
  (report.trends || []).forEach(t => {
    const arrow = t.direction === 'rising' ? '↑' : t.direction === 'declining' ? '↓' : '→';
    const cls   = t.direction === 'rising' ? 'up' : t.direction === 'declining' ? 'down' : 'stable';
    const div = document.createElement('div');
    div.className = 'trend-item';
    div.innerHTML = `
      <div class="trend-arrow-badge trend-arrow-badge--${cls}">${arrow}</div>
      <div class="trend-body">
        <div class="trend-name">${t.name}</div>
        <div class="trend-proj">${t.projection}</div>
      </div>`;
    trendEl.appendChild(div);
  });

  // Frontier directions
  const frontEl = document.getElementById('rs-frontier-content');
  frontEl.innerHTML = '';
  (report.frontier_directions || []).forEach(f => {
    const div = document.createElement('div');
    div.className = 'frontier-item';
    div.innerHTML = `
      <div class="frontier-title">
        ${f.title}
        <span class="impact-badge">Impact ${f.impact_score}/10</span>
        <span class="diff-badge diff-${f.difficulty}">${f.difficulty}</span>
      </div>
      <div class="frontier-rationale">${f.rationale}</div>`;
    frontEl.appendChild(div);
  });

  // Methodology table
  methData = [...(report.methodology_table || [])];
  renderMethTable();

  // Citations
  const citeEl = document.getElementById('rs-cite-content');
  citeEl.innerHTML = '';
  (report.citation_index || []).forEach(c => {
    const div = document.createElement('div');
    div.className = 'cite-row';
    div.innerHTML = `
      <span class="cite-num">[${c.num}]</span>
      <div class="cite-info">
        <div class="cite-title">${c.title}</div>
        <div class="cite-meta">${c.authors} · ${c.year}</div>
        <a class="cite-doi" href="https://doi.org/${c.doi}" target="_blank" rel="noopener">${c.doi}</a>
      </div>`;
    citeEl.appendChild(div);
  });
}

function renderMethTable() {
  const keys = ['paper', 'year', 'method', 'dataset', 'metric', 'result'];
  const sorted = [...methData].sort((a, b) => {
    const av = String(a[keys[methSortCol]]);
    const bv = String(b[keys[methSortCol]]);
    return av.localeCompare(bv, undefined, { numeric: true }) * methSortDir;
  });
  const tbody = document.getElementById('meth-tbody');
  tbody.innerHTML = sorted.map(r => `
    <tr>
      <td>${r.paper}</td>
      <td>${r.year}</td>
      <td>${r.method}</td>
      <td>${r.dataset}</td>
      <td>${r.metric}</td>
      <td class="meth-result">${r.result}</td>
    </tr>`).join('');
}

function sortMeth(col) {
  if (methSortCol === col) {
    methSortDir *= -1;
  } else {
    methSortCol = col;
    methSortDir = 1;
  }
  // Update arrows
  document.querySelectorAll('.meth-table th .sort-arrow').forEach((el, i) => {
    el.textContent = i === col ? (methSortDir === 1 ? '↑' : '↓') : '↕';
  });
  renderMethTable();
}

// PDF export using jsPDF + html2canvas
async function downloadPDF() {
  const btn = document.getElementById('pdf-btn');
  const original = btn.textContent;
  btn.textContent = 'Generating…';
  btn.disabled = true;

  try {
    const { jsPDF } = window.jspdf;
    const reportEl = document.getElementById('report-container');

    // Temporarily switch to report tab for capture
    const wasActive = document.getElementById('panel-report').classList.contains('active');
    if (!wasActive) {
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      document.getElementById('panel-report').classList.add('active');
    }

    const canvas = await html2canvas(reportEl, {
      scale: 1.5,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    if (!wasActive) {
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    }

    const imgData = canvas.toDataURL('image/jpeg', 0.92);
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const imgH  = (canvas.height * pageW) / canvas.width;
    let y = 0;

    while (y < imgH) {
      if (y > 0) pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, -y, pageW, imgH);
      y += pageH;
    }

    const topic = (window.appState && window.appState.topic) || 'research';
    pdf.save(`ResearchPulse_${topic.replace(/\s+/g, '_')}.pdf`);
  } catch(err) {
    console.error('PDF error:', err);
    alert('PDF generation failed. Try again.');
  } finally {
    btn.textContent = original;
    btn.disabled = false;
  }
}
