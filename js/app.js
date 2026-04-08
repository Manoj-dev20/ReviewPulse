/**
 * ResearchPulse — Main App
 * Orchestrates: landing → processing (n8n + Supabase polling) → results
 */

// ═══════════════════════ APP STATE ═══════════════════════
window.appState = {
  topic:         '',
  depthLimit:    2,
  sessionId:     null,
  report:        null,
  nodes:         [],
  edges:         [],
  contradictions:[],
  representCache:{},  // cache so we only fetch each format once
  pollTimer:     null,
  pollStart:     null,
  currentTab:    'graph',
};

// ═══════════════════════ DEPTH CONTROL ═══════════════════════
function adjustDepth(delta) {
  const current = window.appState.depthLimit;
  const next = Math.max(1, Math.min(3, current + delta));
  window.appState.depthLimit = next;
  document.getElementById('depth-display').textContent = next;
}

// ═══════════════════════ SCREEN ROUTING ═══════════════════════
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function resetToLanding() {
  clearInterval(window.appState.pollTimer);
  window.appState = {
    topic:'', depthLimit:2, sessionId:null, report:null,
    nodes:[], edges:[], contradictions:[],
    representCache:{}, pollTimer:null, pollStart:null, currentTab:'graph',
  };
  showScreen('screen-landing');
  document.getElementById('topic-input').focus();
}

// ═══════════════════════ ANALYSIS START ═══════════════════════
async function startAnalysis() {
  const topic = document.getElementById('topic-input').value.trim();
  if (!topic) {
    document.getElementById('topic-input').focus();
    document.getElementById('topic-input').style.borderColor = 'var(--red)';
    setTimeout(() => document.getElementById('topic-input').style.borderColor = '', 1200);
    return;
  }
  window.appState.topic = topic;

  // Show processing screen
  showScreen('screen-processing');
  initProcessingUI(topic);

  try {
    // 1. Start n8n pipeline
    const startRes = await apiStart(topic, window.appState.depthLimit);
    window.appState.sessionId = startRes.session_id;

    // 2. Run polling / mock playback
    if (CONFIG.USE_MOCK_DATA) {
      await runMockPlayback();
    } else {
      await runRealPolling(startRes.session_id);
    }

    // 3. Load results
    await loadResults();

  } catch (err) {
    showError('Error: ' + err.message + '. Check your n8n and Supabase configuration in js/config.js.');
    console.error(err);
  }
}

// ═══════════════════════ PROCESSING UI ═══════════════════════
function initProcessingUI(topic) {
  document.getElementById('proc-topic-label').textContent = `"${topic}"`;
  document.getElementById('proc-step-indicator').textContent = 'Step 1 / 5';
  document.getElementById('proc-progress-fill').style.width = '0%';
  document.getElementById('log-body').innerHTML = '<span class="log-cursor"></span>';

  // Reset stats
  ['stat-papers','stat-depth','stat-nodes','stat-contra'].forEach(id => {
    document.getElementById(id).textContent = '0';
  });

  // Reset steppers
  for (let i = 0; i < 5; i++) {
    const el = document.getElementById(`pstep-${i}`);
    if (el) el.className = 'proc-step';
  }
  document.getElementById('proc-error').style.display = 'none';
}

function appendLog(ts, msg, cls) {
  const body = document.getElementById('log-body');
  // Remove cursor if present
  const cursor = body.querySelector('.log-cursor');
  if (cursor) cursor.remove();

  const line = document.createElement('div');
  line.className = 'log-line';
  line.innerHTML = `<span class="log-ts">${ts}</span><span class="log-msg ${cls || ''}">${msg}</span>`;
  body.appendChild(line);

  // Re-add cursor at end
  const cur = document.createElement('span');
  cur.className = 'log-cursor';
  body.appendChild(cur);
  body.scrollTop = body.scrollHeight;
}

function updateStats({ papers, depth, nodes, contra, step, progress }) {
  if (papers !== undefined) animNum('stat-papers', papers);
  if (depth  !== undefined) animNum('stat-depth',  depth);
  if (nodes  !== undefined) animNum('stat-nodes',  nodes);
  if (contra !== undefined) animNum('stat-contra', contra);

  if (step !== undefined) {
    document.getElementById('proc-step-indicator').textContent = `Step ${Math.min(step+1,5)} / 5`;
    for (let i = 0; i < 5; i++) {
      const el = document.getElementById(`pstep-${i}`);
      if (!el) continue;
      if (i < step)      el.className = 'proc-step done';
      else if (i === step) el.className = 'proc-step active';
      else                 el.className = 'proc-step';
    }
  }
  if (progress !== undefined) {
    document.getElementById('proc-progress-fill').style.width = progress + '%';
  }
}

function animNum(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  const current = parseInt(el.textContent) || 0;
  if (current === target) return;
  const diff = target - current;
  const steps = 12;
  let s = 0;
  const interval = setInterval(() => {
    s++;
    el.textContent = Math.round(current + diff * (s / steps));
    if (s >= steps) { el.textContent = target; clearInterval(interval); }
  }, 30);
}

function showError(msg) {
  const el = document.getElementById('proc-error');
  el.textContent = msg;
  el.style.display = 'block';
}

// ═══════════════════════ MOCK PLAYBACK ═══════════════════════
async function runMockPlayback() {
  const steps = MOCK.log_steps;
  for (const s of steps) {
    appendLog(s.ts, s.msg, s.cls || '');
    updateStats({ papers: s.papers, depth: s.depth, nodes: s.nodes, contra: s.contra, step: s.step, progress: s.progress });
    await delay(s.cls === 'ai-decision' || s.cls === 'success' ? 950 : 550);
  }
}

// ═══════════════════════ REAL SUPABASE POLLING ═══════════════════════
async function runRealPolling(sessionId) {
  const start = Date.now();
  let lastStep = '';

  return new Promise((resolve, reject) => {
    window.appState.pollTimer = setInterval(async () => {
      if (Date.now() - start > CONFIG.POLL_TIMEOUT_MS) {
        clearInterval(window.appState.pollTimer);
        reject(new Error('Polling timed out after 3 minutes'));
        return;
      }

      try {
        const session = await apiPollSession(sessionId);
        if (!session) return;

        const { status, depth, papers_count, current_step, nodes_count, contradictions_count } = session;

        // Log new steps
        if (current_step && current_step !== lastStep) {
          lastStep = current_step;
          const isAI = current_step.toLowerCase().includes('ai ') || current_step.toLowerCase().includes('expanding');
          appendLog(new Date().toLocaleTimeString('en',{hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'}),
            current_step, isAI ? 'ai-decision' : '');
        }

        // Update stats
        updateStats({
          papers:  papers_count || 0,
          depth:   depth || 1,
          nodes:   nodes_count || 0,
          contra:  contradictions_count || 0,
        });

        if (status === 'complete' || status === 'done') {
          clearInterval(window.appState.pollTimer);
          appendLog('--:--', 'Report complete. Loading results…', 'success');
          resolve();
        } else if (status === 'error' || status === 'failed') {
          clearInterval(window.appState.pollTimer);
          reject(new Error('Pipeline failed: ' + (session.error_message || 'Unknown error')));
        }
      } catch (err) {
        // Don't reject on transient network errors — just log and retry
        console.warn('Poll error (will retry):', err.message);
      }
    }, CONFIG.POLL_INTERVAL_MS);
  });
}

// ═══════════════════════ LOAD RESULTS ═══════════════════════
async function loadResults() {
  const sessionId = window.appState.sessionId;

  // Fetch graph data
  const [nodes, edges] = await Promise.all([
    apiGetNodes(sessionId),
    apiGetEdges(sessionId),
  ]);
  window.appState.nodes = nodes;
  window.appState.edges = edges;

  // In mock mode, report comes from MOCK; in real mode, from session.report_json
  let report;
  if (CONFIG.USE_MOCK_DATA) {
    report = MOCK.report;
  } else {
    const session = await apiPollSession(sessionId);
    report = session && session.report_json
      ? (typeof session.report_json === 'string' ? JSON.parse(session.report_json) : session.report_json)
      : null;
  }
  window.appState.report = report;
  window.appState.contradictions = (report && report.contradictions) || [];

  // Populate results header
  const papers  = nodes.filter(n => n.type === 'paper').length;
  const contras = (report && report.contradictions && report.contradictions.length) || 0;
  const gaps    = (report && report.research_gaps && report.research_gaps.length) || 0;

  document.getElementById('results-topic-title').textContent = `"${window.appState.topic}" — complete`;
  document.getElementById('results-meta-chips').innerHTML = `
    <span class="meta-chip meta-chip--blue">${papers} papers</span>
    <span class="meta-chip meta-chip--red">${contras} contradictions</span>
    <span class="meta-chip meta-chip--purple">${gaps} gaps found</span>`;

  // Switch to results screen
  showScreen('screen-results');

  // Render graph (default tab)
  initGraph(nodes, edges, window.appState.contradictions);

  // Pre-render report
  renderReport(report);

  // Set active tab
  switchTab('graph');
}

// ═══════════════════════ TAB SWITCHING ═══════════════════════
const representLoaded = { slides: false, flashcards: false, mindmap: false };

async function switchTab(name) {
  window.appState.currentTab = name;

  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === name);
  });
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(`panel-${name}`).classList.add('active');

  // Graph: resize SVG when switching back
  if (name === 'graph' && window.appState.nodes.length) {
    setTimeout(() => {
      const container = document.getElementById('graph-container');
      const svg = document.getElementById('graph-svg');
      svg.setAttribute('width', container.clientWidth);
      svg.setAttribute('height', container.clientHeight);
    }, 50);
  }

  // Representations: load from n8n on first visit
  if (['slides','flashcards','mindmap'].includes(name) && !representLoaded[name]) {
    await loadRepresentation(name);
  }
}

async function loadRepresentation(format) {
  const loadingId = `${format}-loading`;
  const loadingEl = document.getElementById(loadingId);
  if (loadingEl) loadingEl.style.display = 'flex';

  try {
    // Check cache first
    let data = window.appState.representCache[format];
    if (!data) {
      const result = await apiRepresent(window.appState.sessionId, [format]);
      data = result[format];
      window.appState.representCache[format] = data;
    }

    representLoaded[format] = true;

    if (format === 'slides')      renderSlides(data);
    if (format === 'flashcards')  renderFlashcards(data);
    if (format === 'mindmap')     renderMindmap(data);

  } catch (err) {
    console.error(`Failed to load ${format}:`, err);
    const container = document.getElementById(`${format}-container`) ||
                      document.getElementById(`${format}s-container`) ||
                      document.getElementById(`${format}-wrapper`);
    if (container) {
      container.innerHTML = `<p style="color:var(--red);padding:24px">Failed to load ${format}: ${err.message}</p>`;
    }
  } finally {
    if (loadingEl) loadingEl.style.display = 'none';
  }
}

// ═══════════════════════ KEYBOARD SHORTCUTS ═══════════════════════
document.addEventListener('keydown', e => {
  // Enter on landing
  if (document.getElementById('screen-landing').classList.contains('active')) {
    if (e.key === 'Enter') startAnalysis();
  }
});

// ═══════════════════════ RESIZE HANDLER ═══════════════════════
window.addEventListener('resize', () => {
  if (window.appState.currentTab === 'graph' && window.appState.nodes.length) {
    const container = document.getElementById('graph-container');
    const svg = document.getElementById('graph-svg');
    svg.setAttribute('width', container.clientWidth);
    svg.setAttribute('height', container.clientHeight);
  }
});

// ═══════════════════════ INIT ═══════════════════════
showScreen('screen-landing');
document.getElementById('topic-input').focus();
