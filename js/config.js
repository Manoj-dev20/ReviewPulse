/**
 * ResearchPulse — Configuration
 *
 * HOW TO SET UP:
 * 1. Replace N8N_BASE_URL with your n8n instance base URL
 *    e.g. https://YOUR-N8N-SUBDOMAIN.app.n8n.cloud
 *    The paths /researchpulse/start and /researchpulse/represent
 *    must match your n8n webhook trigger paths exactly.
 *
 * 2. Replace SUPABASE_URL with your Supabase project URL
 *    e.g. https://xxxxxxxxxxxx.supabase.co
 *
 * 3. Replace SUPABASE_ANON_KEY with your Supabase anon/public API key
 *    Found in: Supabase Dashboard → Project Settings → API
 *
 * 4. Ensure your Supabase tables exist:
 *    - sessions       (id, topic, status, depth, papers_count, current_step, report_json, created_at)
 *    - graph_nodes    (id, session_id, node_id, label, type, cluster_id)
 *    - graph_edges    (id, session_id, source_id, target_id, relationship_type, reason, contradiction_id)
 *    - contradictions (id, session_id, paper_a, paper_b, claim_a, claim_b, severity, implication, year_gap)
 *
 * 5. Set Supabase RLS policies to allow anon reads on all four tables
 *    (or pass a service role key if you want authenticated access only)
 */

const CONFIG = {
  // ── n8n Webhooks ──────────────────────────────────────────────
  // Your n8n instance base. No trailing slash.
  N8N_BASE_URL: 'https://rns-2026.app.n8n.cloud',

  // Webhook paths — must match the paths set in your n8n Webhook trigger nodes
  ENDPOINTS: {
    START:      '/webhook/researchpulse/start',     // POST: { topic, depth_limit }
    REPRESENT:  '/webhook/researchpulse/represent', // POST: { session_id, formats[] }
  },

  // ── Supabase ───────────────────────────────────────────────────
  SUPABASE_URL:      'https://vzjphehhpeizaiuplmzd.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6anBoZWhocGVpemFpdXBsbXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MzYyOTMsImV4cCI6MjA5MTIxMjI5M30.em8LawgJLuyOGcA1KtBtD6c3Za0C5pfN72u5OHwaT3A',

  // ── Polling ────────────────────────────────────────────────────
  POLL_INTERVAL_MS:  3000,   // Poll Supabase every 3 seconds
  POLL_TIMEOUT_MS:   180000, // Give up after 3 minutes

  // ── Feature flags ──────────────────────────────────────────────
  // Set to true to use mock data instead of real backend
  // Useful for demos when n8n/Supabase aren't connected
  USE_MOCK_DATA: true,
};

// Derived full URLs (don't edit these)
CONFIG.START_URL     = CONFIG.N8N_BASE_URL + CONFIG.ENDPOINTS.START;
CONFIG.REPRESENT_URL = CONFIG.N8N_BASE_URL + CONFIG.ENDPOINTS.REPRESENT;
CONFIG.SUPA_HEADERS  = {
  'apikey':        CONFIG.SUPABASE_ANON_KEY,
  'Authorization': 'Bearer ' + CONFIG.SUPABASE_ANON_KEY,
  'Content-Type':  'application/json',
};

// ── Supabase REST helper ─────────────────────────────────────────
function supaFetch(table, params) {
  const url = new URL(`${CONFIG.SUPABASE_URL}/rest/v1/${table}`);
  Object.entries(params || {}).forEach(([k, v]) => url.searchParams.append(k, v));
  return fetch(url.toString(), { headers: CONFIG.SUPA_HEADERS });
}
