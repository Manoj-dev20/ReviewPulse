/**
 * ResearchPulse — API Layer
 * Handles all communication with n8n webhooks and Supabase.
 * Falls back to rich mock data when CONFIG.USE_MOCK_DATA = true
 *
 * Mock data lives in mockdata.js (6 domains).
 * MOCK is dynamically set via setMockForTopic() before each analysis run.
 */

// ═══════════════════════ DYNAMIC MOCK REFERENCE ═══════════════════════
// This will be populated from mockdata.js based on the user's topic
let MOCK = MOCK_DOMAINS['healthcare']; // default fallback

/**
 * Call this before starting mock playback to select the right domain data.
 */
function setMockForTopic(topic) {
  MOCK = getMockForTopic(topic);
}

// ═══════════════════════ API FUNCTIONS ═══════════════════════

/**
 * POST to n8n webhook to start the research pipeline.
 * Returns { session_id, status, message }
 */
async function apiStart(topic, depthLimit) {
  if (CONFIG.USE_MOCK_DATA) {
    await delay(800);
    return { session_id: MOCK.session_id, status: 'processing', message: 'Agent running...' };
  }
  const res = await fetch(CONFIG.START_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic, depth_limit: depthLimit }),
  });
  if (!res.ok) throw new Error(`n8n start failed: ${res.status} ${res.statusText}`);
  return res.json();
}

/**
 * Poll Supabase sessions table for status updates.
 * Returns the full session row.
 */
async function apiPollSession(sessionId) {
  if (CONFIG.USE_MOCK_DATA) {
    await delay(CONFIG.POLL_INTERVAL_MS);
    return null; // mock polling handled separately
  }
  const res = await supaFetch('sessions', { 'id': `eq.${sessionId}`, 'select': '*' });
  if (!res.ok) throw new Error(`Supabase poll failed: ${res.status}`);
  const rows = await res.json();
  return rows[0] || null;
}

/**
 * Fetch graph nodes from Supabase.
 */
async function apiGetNodes(sessionId) {
  if (CONFIG.USE_MOCK_DATA) return MOCK.graph_nodes;
  const res = await supaFetch('graph_nodes', { 'session_id': `eq.${sessionId}`, 'select': '*' });
  if (!res.ok) throw new Error(`Supabase nodes failed: ${res.status}`);
  return res.json();
}

/**
 * Fetch graph edges from Supabase.
 */
async function apiGetEdges(sessionId) {
  if (CONFIG.USE_MOCK_DATA) return MOCK.graph_edges;
  const res = await supaFetch('graph_edges', { 'session_id': `eq.${sessionId}`, 'select': '*' });
  if (!res.ok) throw new Error(`Supabase edges failed: ${res.status}`);
  return res.json();
}

/**
 * POST to n8n /represent webhook to generate slides, flashcards, mindmap.
 * Returns { slides[], flashcards[], mindmap{} }
 */
async function apiRepresent(sessionId, formats) {
  if (CONFIG.USE_MOCK_DATA) {
    await delay(1400);
    const result = {};
    formats.forEach(f => { result[f] = MOCK.representations[f]; });
    return result;
  }
  const res = await fetch(CONFIG.REPRESENT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: sessionId, formats }),
  });
  if (!res.ok) throw new Error(`n8n represent failed: ${res.status}`);
  return res.json();
}

// Utility
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
