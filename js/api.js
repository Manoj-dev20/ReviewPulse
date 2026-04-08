/**
 * ResearchPulse — API Layer
 * Handles all communication with n8n webhooks and Supabase.
 * Falls back to rich mock data when CONFIG.USE_MOCK_DATA = true
 */

// ═══════════════════════ MOCK DATA ═══════════════════════
const MOCK = {
  session_id: 'mock_sess_' + Math.random().toString(36).slice(2, 9),

  // Simulated log steps fed to the processing screen
  log_steps: [
    { ts: '00:00', msg: 'Session initialised. Agent starting...', cls: 'dim', step: 0, papers: 0, depth: 1, nodes: 0, contra: 0, progress: 5 },
    { ts: '00:02', msg: 'Depth 1: Fetching papers from Semantic Scholar...', cls: '', step: 0, papers: 8, depth: 1, nodes: 0, contra: 0, progress: 12 },
    { ts: '00:06', msg: 'Depth 1: Fetching papers from arXiv...', cls: '', step: 0, papers: 16, depth: 1, nodes: 0, contra: 0, progress: 18 },
    { ts: '00:09', msg: 'Depth 1: 23 papers indexed. Building coverage map...', cls: '', step: 0, papers: 23, depth: 1, nodes: 0, contra: 0, progress: 24 },
    { ts: '00:12', msg: 'AI evaluating coverage → Cluster "wearable AI" has <3 papers', cls: 'ai-decision', step: 1, papers: 23, depth: 1, nodes: 0, contra: 0, progress: 30 },
    { ts: '00:13', msg: 'AI decision: should_expand=true  expand_terms=["wearable AI diagnosis","federated medical imaging"]', cls: 'ai-expand', step: 1, papers: 23, depth: 1, nodes: 0, contra: 0, progress: 35 },
    { ts: '00:16', msg: 'Depth 2: Fetching 18 more papers on expanded terms...', cls: '', step: 1, papers: 41, depth: 2, nodes: 0, contra: 0, progress: 42 },
    { ts: '00:21', msg: 'AI evaluating coverage → All major sub-areas sufficiently covered', cls: 'ai-decision', step: 1, papers: 41, depth: 2, nodes: 0, contra: 0, progress: 48 },
    { ts: '00:22', msg: 'AI: Coverage sufficient. Stopping search loop.', cls: 'success', step: 1, papers: 41, depth: 2, nodes: 0, contra: 0, progress: 52 },
    { ts: '00:24', msg: 'Building knowledge graph: clustering 41 papers...', cls: '', step: 2, papers: 41, depth: 2, nodes: 18, contra: 0, progress: 58 },
    { ts: '00:28', msg: 'Knowledge graph complete: 41 nodes · 57 edges · 5 clusters', cls: 'success', step: 2, papers: 41, depth: 2, nodes: 41, contra: 0, progress: 65 },
    { ts: '00:30', msg: 'Detecting contradictions across paper pairs...', cls: '', step: 3, papers: 41, depth: 2, nodes: 41, contra: 2, progress: 70 },
    { ts: '00:34', msg: 'Contradiction: Chen 2021 vs Okafor 2023 — transformer vs CNN debate  [HIGH]', cls: 'ai-decision', step: 3, papers: 41, depth: 2, nodes: 41, contra: 4, progress: 75 },
    { ts: '00:38', msg: 'Analysing research gaps and trend directions...', cls: '', step: 3, papers: 41, depth: 2, nodes: 41, contra: 6, progress: 80 },
    { ts: '00:44', msg: 'Synthesising frontier directions from contradictions + gaps...', cls: 'ai-decision', step: 3, papers: 41, depth: 2, nodes: 41, contra: 6, progress: 86 },
    { ts: '00:51', msg: 'Assembling publication-grade literature review report...', cls: '', step: 4, papers: 41, depth: 2, nodes: 41, contra: 6, progress: 93 },
    { ts: '00:58', msg: 'Report complete. Session status: done.', cls: 'success', step: 4, papers: 41, depth: 2, nodes: 41, contra: 6, progress: 100 },
  ],

  // Full report JSON (mirrors sessions.report_json in Supabase)
  report: {
    executive_summary: [
      "AI-assisted medical diagnosis has emerged as one of the most active and contested fields in machine learning research. Over the past five years, publication volume has grown by approximately 340%, driven by the availability of large-scale imaging datasets and advances in deep learning architectures. The field is now sufficiently mature to exhibit systematic contradictions — particularly around the comparative performance of transformer-based and convolutional approaches under real-world distribution shift.",
      "This review synthesises 41 papers across five research clusters: image classification, clinical decision support, wearable sensor integration, federated learning for privacy, and explainability methods. Methodological diversity is high, with 12 distinct model architectures and 9 benchmark datasets identified. However, evaluation practices remain inconsistent — only 34% of papers report results on held-out external validation sets, which limits cross-study comparisons.",
      "The most significant research gap identified is the lack of prospective clinical trials integrating AI diagnostic tools with pediatric populations. Frontier directions converge on three themes: architectures robust to distribution shift, federated learning with differential privacy guarantees, and causal inference frameworks for clinical decision support."
    ],
    field_snapshot: [
      { label: 'Maturity',        value: 'Adolescent',     cls: 'snap-val--amber' },
      { label: 'Velocity',        value: 'Rapid growth',   cls: 'snap-val--green' },
      { label: 'Consensus',       value: 'Contested',      cls: 'snap-val--red'   },
      { label: 'Total papers',    value: '41',             cls: '' },
      { label: 'Top method',      value: 'Vision Transformer', cls: '' },
      { label: 'Top dataset',     value: 'NIH ChestXray14', cls: '' },
      { label: 'Top metric',      value: 'AUC-ROC',        cls: '' },
      { label: 'Pub trend',       value: '+340% (5yr)',    cls: 'snap-val--green' },
    ],
    contradictions: [
      {
        id: 'c1',
        paper_a: 'Chen et al. 2021',
        paper_b: 'Okafor et al. 2023',
        claim_a: 'Vision Transformers outperform CNNs for chest X-ray classification under standard benchmark conditions (AUC 0.94 vs 0.89).',
        claim_b: 'CNNs remain superior under real-world dataset shift across three hospital systems; ViTs degrade significantly (AUC drops to 0.71).',
        severity: 'HIGH',
        year_gap: 2,
        implication: 'The field may be over-optimising for benchmark datasets. External validation is now a critical, unmet gap.'
      },
      {
        id: 'c2',
        paper_a: 'Rajpurkar et al. 2022',
        paper_b: 'Seyyed-Kalantari et al. 2023',
        claim_a: 'CheXNet achieves radiologist-level performance on pneumonia detection across diverse populations.',
        claim_b: 'CheXNet performance degrades significantly on underrepresented demographic groups — AUC drops 12 points for Black female patients.',
        severity: 'HIGH',
        year_gap: 1,
        implication: 'Aggregate performance metrics systematically mask fairness failures. Disaggregated reporting should be mandatory for clinical AI.'
      },
      {
        id: 'c3',
        paper_a: 'Topol 2022',
        paper_b: 'Maier-Hein et al. 2022',
        claim_a: 'AI diagnostic tools are ready for clinical deployment with appropriate human oversight.',
        claim_b: 'No current AI diagnostic system meets the evidentiary bar required for safe standalone deployment; RCT evidence is absent.',
        severity: 'MEDIUM',
        year_gap: 0,
        implication: 'Regulatory frameworks must resolve the deployment-readiness debate before widespread adoption can proceed.'
      },
    ],
    research_gaps: [
      { area: 'Pediatric AI diagnosis',           desc: 'Under-3 years age group absent from all reviewed datasets. Models trained on adult imaging fail systematically on pediatric anatomy.', opportunity_score: 8.5, why_missing: 'Small cohort sizes, IRB complexity, absence of age-stratified ground truth.', suggested_methodology: 'Multi-site clinical trial with age-stratified datasets and pediatric radiologist ground truth.' },
      { area: 'Federated learning + DP guarantees', desc: 'Only 2 of 41 papers combine federated training with formal differential privacy proofs. Most federated approaches have unknown privacy leakage.', opportunity_score: 7.8, why_missing: 'DP-SGD adds compute overhead; no standardised evaluation framework exists.', suggested_methodology: 'DP-SGD implementation across federated hospital networks with formal epsilon-delta accounting.' },
      { area: 'Distribution shift benchmarks',    desc: 'No standardised benchmark exists for measuring model degradation under scanner change, demographic shift, or seasonal variation.', opportunity_score: 7.2, why_missing: 'Requires longitudinal multi-site data collection infrastructure not yet in place.', suggested_methodology: 'Prospective multi-site study with controlled covariate shifts and standardised degradation metrics.' },
      { area: 'Causal inference in clinical AI',  desc: 'All reviewed models are associative. Causal structure of diagnosis pathways is unexplored, limiting interpretability and intervention planning.', opportunity_score: 6.9, why_missing: 'Structural causal models require clinical domain expertise rarely paired with ML expertise.', suggested_methodology: 'Structural causal models combined with clinical domain knowledge graphs.' },
      { area: 'Long-term outcome tracking',       desc: 'No paper tracks AI diagnostic predictions against 5-year patient outcomes. Short-term accuracy does not imply clinical value.', opportunity_score: 6.5, why_missing: 'EHR linkage studies require sustained institutional commitment over years.', suggested_methodology: 'EHR linkage studies with minimum 3-year outcome follow-up and standardised outcome definitions.' },
    ],
    trends: [
      { name: 'Transformer architectures',           direction: 'rising',  projection: 'Projected to account for >70% of new SOTA results by 2027, though real-world robustness concerns may slow clinical adoption.' },
      { name: 'Federated & privacy-preserving',      direction: 'rising',  projection: 'Regulatory pressure from GDPR and HIPAA is forcing multi-site collaboration without data sharing — federated approaches will dominate enterprise deployments.' },
      { name: 'Explainability / XAI methods',        direction: 'stable',  projection: 'Growing demand from clinicians but methodological fragmentation limits adoption. Saliency maps remain dominant despite faithfulness limitations.' },
      { name: 'Pure CNN architectures',              direction: 'declining', projection: 'Being superseded by hybrid CNN-transformer models. Likely to persist only in edge/mobile deployments where compute is constrained.' },
      { name: 'Synthetic data augmentation',         direction: 'rising',  projection: 'Diffusion-model-based data generation is emerging as a key solution to data scarcity in rare disease imaging.' },
    ],
    frontier_directions: [
      { title: 'Distribution-robust transformers for multi-site deployment', rationale: 'Directly resolves the Chen/Okafor HIGH-severity contradiction. Combines domain-adversarial training with test-time adaptation to close the benchmark-to-real-world gap.', impact_score: 9, difficulty: 'HIGH' },
      { title: 'Federated pediatric AI diagnosis with DP guarantees',        rationale: 'Fills the pediatric data gap and the DP gap simultaneously. Multi-institution federation makes rare pediatric disease datasets tractable without data sharing.', impact_score: 8, difficulty: 'HIGH' },
      { title: 'Causal decision support with counterfactual explanations',   rationale: 'Addresses the causal inference gap and the XAI plateau. Counterfactual explanations are clinically actionable — the "what if X had been different" question clinicians already ask.', impact_score: 7, difficulty: 'MEDIUM' },
    ],
    methodology_table: [
      { paper: 'Chen et al.',              year: 2021, method: 'Vision Transformer (ViT-L/16)', dataset: 'NIH ChestXray14',   metric: 'AUC-ROC', result: '0.94' },
      { paper: 'Okafor et al.',            year: 2023, method: 'ResNet-50 (CNN)',               dataset: 'Multi-site OOD',     metric: 'AUC-ROC', result: '0.82' },
      { paper: 'Rajpurkar et al.',         year: 2022, method: 'CheXNet (DenseNet-121)',        dataset: 'Stanford CheXpert',  metric: 'F1 / AUC', result: '0.91 / 0.96' },
      { paper: 'Seyyed-Kalantari et al.', year: 2023, method: 'CheXNet (eval)',                dataset: 'MIMIC-CXR stratified', metric: 'AUC (demog.)', result: '0.79–0.91' },
      { paper: 'Li & Agrawal',            year: 2023, method: 'Hybrid CNN-Transformer',        dataset: 'NIH + MIMIC',       metric: 'AUC-ROC', result: '0.95' },
      { paper: 'Wang et al.',             year: 2022, method: 'Federated DenseNet',             dataset: '3-hospital federated', metric: 'Macro-F1', result: '0.87' },
      { paper: 'Topol',                   year: 2022, method: 'Review / meta-analysis',         dataset: 'Multiple',          metric: 'Narrative', result: '—' },
      { paper: 'Maier-Hein et al.',       year: 2022, method: 'Systematic review',              dataset: 'Multiple',          metric: 'Evidence grade', result: 'Low–moderate' },
    ],
    citation_index: [
      { num: 1, title: 'Transformers for medical image analysis: a benchmark', authors: 'Chen, Y., et al.',               year: 2021, doi: '10.1000/jml.2021.001' },
      { num: 2, title: 'Real-world performance of ViT under distribution shift', authors: 'Okafor, C., et al.',            year: 2023, doi: '10.1000/jml.2023.014' },
      { num: 3, title: 'CheXNet: radiologist-level pneumonia detection',        authors: 'Rajpurkar, P., et al.',          year: 2022, doi: '10.1000/nature.2022.031' },
      { num: 4, title: 'Underdiagnosis bias in AI diagnostic tools',            authors: 'Seyyed-Kalantari, L., et al.',   year: 2023, doi: '10.1000/jama.2023.002' },
      { num: 5, title: 'AI versus clinicians: state of the evidence',           authors: 'Topol, E.',                      year: 2022, doi: '10.1000/lancet.2022.045' },
      { num: 6, title: 'Surgical data science: from principles to practice',    authors: 'Maier-Hein, L., et al.',         year: 2022, doi: '10.1000/natmed.2022.012' },
    ],
  },

  // Graph data (mirrors Supabase graph_nodes + graph_edges)
  graph_nodes: [
    { node_id:'p1',  label:'Chen 2021',          type:'paper',   cluster_id:0 },
    { node_id:'p2',  label:'Okafor 2023',         type:'paper',   cluster_id:0 },
    { node_id:'p3',  label:'Rajpurkar 2022',      type:'paper',   cluster_id:1 },
    { node_id:'p4',  label:'Seyyed-K 2023',       type:'paper',   cluster_id:1 },
    { node_id:'p5',  label:'Li & Agrawal 2023',   type:'paper',   cluster_id:0 },
    { node_id:'p6',  label:'Wang 2022',            type:'paper',   cluster_id:2 },
    { node_id:'p7',  label:'Topol 2022',           type:'paper',   cluster_id:3 },
    { node_id:'p8',  label:'Maier-Hein 2022',      type:'paper',   cluster_id:3 },
    { node_id:'p9',  label:'Lee et al. 2023',      type:'paper',   cluster_id:4 },
    { node_id:'p10', label:'Singh 2022',            type:'paper',   cluster_id:4 },
    { node_id:'p11', label:'Kumar et al. 2023',    type:'paper',   cluster_id:2 },
    { node_id:'m1',  label:'ViT',                  type:'method',  cluster_id:0 },
    { node_id:'m2',  label:'CNN/ResNet',            type:'method',  cluster_id:0 },
    { node_id:'m3',  label:'Federated',             type:'method',  cluster_id:2 },
    { node_id:'m4',  label:'CheXNet',               type:'method',  cluster_id:1 },
    { node_id:'c1',  label:'NIH ChestXray14',       type:'concept', cluster_id:4 },
    { node_id:'c2',  label:'AUC-ROC',               type:'concept', cluster_id:4 },
    { node_id:'c3',  label:'Distribution shift',    type:'concept', cluster_id:0 },
    { node_id:'c4',  label:'Fairness / bias',        type:'concept', cluster_id:1 },
    { node_id:'c5',  label:'XAI / saliency',         type:'concept', cluster_id:3 },
  ],
  graph_edges: [
    { source_id:'p1',  target_id:'p2',  relationship_type:'contradicts',    reason:'ViT vs CNN benchmark debate',              contradiction_id:'c1' },
    { source_id:'p3',  target_id:'p4',  relationship_type:'contradicts',    reason:'Fairness — aggregate vs disaggregated AUC', contradiction_id:'c2' },
    { source_id:'p7',  target_id:'p8',  relationship_type:'contradicts',    reason:'Deployment readiness — clinical vs evidentiary bar', contradiction_id:'c3' },
    { source_id:'p5',  target_id:'p1',  relationship_type:'extends',        reason:'Hybrid model builds on pure ViT baseline' },
    { source_id:'p5',  target_id:'p2',  relationship_type:'supports',       reason:'Hybrid model shows better OOD performance' },
    { source_id:'p6',  target_id:'m3',  relationship_type:'cites_concept',  reason:'Uses federated approach' },
    { source_id:'p11', target_id:'p6',  relationship_type:'extends',        reason:'Adds DP guarantees to federated setup' },
    { source_id:'p3',  target_id:'c1',  relationship_type:'shares_dataset', reason:'Both use NIH ChestXray14' },
    { source_id:'p4',  target_id:'c1',  relationship_type:'shares_dataset', reason:'Both use NIH ChestXray14' },
    { source_id:'p1',  target_id:'m1',  relationship_type:'cites_concept',  reason:'Uses ViT architecture' },
    { source_id:'p2',  target_id:'m2',  relationship_type:'cites_concept',  reason:'Uses CNN architecture' },
    { source_id:'p1',  target_id:'c2',  relationship_type:'cites_concept',  reason:'Reports AUC-ROC' },
    { source_id:'p2',  target_id:'c3',  relationship_type:'cites_concept',  reason:'Studies distribution shift' },
    { source_id:'p4',  target_id:'c4',  relationship_type:'cites_concept',  reason:'Studies fairness/demographic bias' },
    { source_id:'p7',  target_id:'c5',  relationship_type:'cites_concept',  reason:'Reviews XAI methods' },
    { source_id:'p9',  target_id:'p3',  relationship_type:'supports',       reason:'Confirms CheXNet findings on different dataset' },
    { source_id:'p10', target_id:'p9',  relationship_type:'extends',        reason:'Adds wearable sensor modality' },
  ],

  // Representations (returned by /researchpulse/represent)
  representations: {
    slides: [
      { slide_number:1, title:'ResearchPulse: AI in Medical Diagnosis',           bullets:['41 papers · 5 clusters · 90-second analysis','Autonomous agent searched 2 depth levels','6 contradictions + 5 research gaps detected'],          speaker_note:'Opening slide — set the stage with the agentic approach.' },
      { slide_number:2, title:'A rapidly growing, contested field',               bullets:['340% publication growth over 5 years','Vision Transformers now dominant — but contested','Field consensus: benchmark performance ≠ clinical performance'], speaker_note:'Pause on "contested" — this is the core tension.' },
      { slide_number:3, title:'How the AI decided what to search',                bullets:['Depth 1: "AI medical diagnosis" → 23 papers fetched','AI identified wearable AI as under-represented sub-area','Depth 2: expanded autonomously → 18 more papers — then stopped'], speaker_note:'This is the agentic loop moment. The AI decided, not you.' },
      { slide_number:4, title:'Critical contradiction: Transformers vs CNNs',     bullets:['Chen 2021: ViT achieves AUC 0.94 on benchmark datasets','Okafor 2023: CNN outperforms ViT under real-world dataset shift','Implication: the field is over-fitting to controlled benchmarks'], speaker_note:'Click a red edge in the knowledge graph to show this live.' },
      { slide_number:5, title:'Top research gaps by opportunity score',            bullets:['Pediatric AI diagnosis — 8.5/10 (no age-stratified data exists)','Federated learning + formal DP — 7.8/10 (privacy leakage unknown)','Distribution shift benchmarks — 7.2/10 (no standard yet)'],  speaker_note:'Each of these is a publishable research direction.' },
      { slide_number:6, title:'Methodology landscape: what methods dominate',     bullets:['ViT and hybrid CNN-Transformer account for 60% of SOTA results','NIH ChestXray14 is the most over-used benchmark across papers','Only 34% of papers use external validation — a reproducibility crisis'], speaker_note:'The methodology table in the report makes this scannable.' },
      { slide_number:7, title:'Trends: what\'s rising, what\'s fading',           bullets:['Transformers rising — projected >70% share by 2027','Federated learning rising — regulatory drivers accelerating','Pure CNNs declining — persisting only at edge deployments'],    speaker_note:'Direction arrows in the report make this instantly readable.' },
      { slide_number:8, title:'Where to focus: three frontier directions',        bullets:['Distribution-robust transformers for multi-site deployment (9/10)','Federated pediatric diagnosis with DP guarantees (8/10)','Causal decision support with counterfactual explanations (7/10)'],speaker_note:'Close here. Each direction is grounded in an evidence-based gap or contradiction.' },
    ],
    flashcards: [
      { id:1,  front:'What is the primary contradiction in ViT vs CNN research for medical imaging?',        back:'Vision Transformers outperform CNNs on standard benchmarks but degrade significantly under real-world distribution shift, where CNNs remain more robust (AUC: 0.94→0.71 for ViTs).' },
      { id:2,  front:'What does "distribution shift" mean in medical AI?',                                   back:'When a model trained on data from one source (e.g. a specific scanner or hospital) performs worse on data from a different source — the primary obstacle to clinical deployment.' },
      { id:3,  front:'Why is the pediatric AI diagnosis gap rated 8.5/10?',                                  back:'All reviewed datasets focus on adult patients. Models trained on adult imaging fail systematically on pediatric anatomy, and no age-stratified benchmark datasets exist.' },
      { id:4,  front:'What is federated learning and why does it matter for medical AI?',                    back:'Training models across multiple hospitals without sharing patient data. Solves the data scarcity and privacy problem simultaneously, increasingly mandated by GDPR and HIPAA.' },
      { id:5,  front:'What does differential privacy (DP) guarantee?',                                       back:'A mathematical bound on information leakage. An attacker cannot determine whether a specific patient\'s record was in the training set, even with full model access.' },
      { id:6,  front:'What is AUC-ROC and why is it dominant in medical AI evaluation?',                    back:'Area Under the Receiver Operating Characteristic curve — measures discrimination ability across all thresholds. Preferred because medical datasets are class-imbalanced.' },
      { id:7,  front:'Why are saliency maps insufficient for clinical explainability?',                      back:'They show which pixels were highlighted but not causally why. Clinicians need "what would change the diagnosis" answers — counterfactual, not correlational.' },
      { id:8,  front:'What is the CheXNet fairness failure identified in this review?',                     back:'CheXNet performs 12 AUC points worse on Black female patients than aggregate scores suggest — proving high mean performance can mask systematic demographic bias.' },
      { id:9,  front:'What is the "benchmark overfitting" problem in medical AI?',                           back:'Models optimised on widely-used benchmarks (e.g. NIH ChestXray14) appear highly accurate but fail under real-world conditions due to dataset-specific artefacts.' },
      { id:10, front:'What are the three frontier research directions from this review?',                    back:'(1) Distribution-robust transformers for multi-site deployment. (2) Federated pediatric AI with DP guarantees. (3) Causal decision support with counterfactual explanations.' },
      { id:11, front:'What percentage of reviewed papers use external validation sets?',                     back:'Only 34% — meaning 66% of papers report results only on held-out splits of the same dataset they trained on, severely limiting cross-study comparability.' },
      { id:12, front:'What is a "typed edge" in the ResearchPulse knowledge graph?',                        back:'An edge with a semantic relationship label: contradicts (red), supports (green), extends (yellow), cites_concept (gray), or shares_dataset (blue).' },
      { id:13, front:'How does the agentic search loop know when to stop?',                                  back:'Claude evaluates cluster-level paper coverage after each depth. If all major sub-areas have ≥3 papers, it returns should_expand=false and stops. Otherwise it expands.' },
      { id:14, front:'What makes hybrid CNN-Transformer architectures promising?',                           back:'They combine CNN\'s local feature extraction (robust to distribution shift) with Transformer\'s global attention (high benchmark performance), achieving AUC 0.95 with better OOD stability.' },
      { id:15, front:'What is the opportunity score in the research gap scorecard?',                         back:'A 1–10 score estimating the research value of filling a gap, based on: (a) how absent the area is from current literature, and (b) demand signals from clinical and policy contexts.' },
    ],
    mindmap: {
      root: 'AI in medical diagnosis',
      branches: [
        {
          label: 'Image classification',
          children: [
            { label: 'Chen et al. 2021',        finding: 'ViT-L/16 achieves AUC 0.94 on NIH ChestXray14 — benchmark SOTA' },
            { label: 'Okafor et al. 2023',      finding: 'CNN superior under distribution shift — AUC 0.82 vs ViT 0.71' },
            { label: 'Li & Agrawal 2023',       finding: 'Hybrid CNN-Transformer achieves AUC 0.95 with better OOD stability' },
          ]
        },
        {
          label: 'Clinical decision support',
          children: [
            { label: 'Rajpurkar et al. 2022',        finding: 'CheXNet reaches radiologist-level F1 on pneumonia detection' },
            { label: 'Seyyed-Kalantari et al. 2023', finding: 'CheXNet degrades 12 AUC points for underrepresented demographics' },
            { label: 'Topol 2022',                   finding: 'AI ready for deployment with appropriate human oversight' },
            { label: 'Maier-Hein et al. 2022',       finding: 'RCT evidence lacking — deployment evidentiary bar not met' },
          ]
        },
        {
          label: 'Federated & privacy learning',
          children: [
            { label: 'Wang et al. 2022',    finding: 'Federated DenseNet: Macro-F1 0.87 across 3 hospital sites' },
            { label: 'Kumar et al. 2023',   finding: 'Adds DP-SGD to federated setup — first formal privacy guarantees' },
          ]
        },
        {
          label: 'Explainability methods',
          children: [
            { label: 'Topol 2022 (XAI section)', finding: 'Reviews saliency-based methods — faithfulness disputed' },
            { label: 'Lee et al. 2023',          finding: 'Counterfactual explanations better aligned with clinical reasoning' },
          ]
        },
        {
          label: 'Wearable & sensor integration',
          children: [
            { label: 'Singh 2022',     finding: 'ECG + imaging fusion for cardiac diagnosis — AUC 0.91' },
            { label: 'Lee et al. 2023 (wearable)', finding: 'Wearable EEG integration for seizure prediction — emerging' },
          ]
        },
      ]
    }
  }
};

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
