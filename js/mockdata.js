/**
 * ResearchPulse — Multi-Domain Mock Data
 * Contains hardcoded research data for 6 domains:
 *   1. AI in Healthcare (original)
 *   2. Quantum Computing
 *   3. Climate Change & Renewable Energy
 *   4. Autonomous Vehicles
 *   5. Natural Language Processing (NLP)
 *   6. Blockchain & Decentralized Finance (DeFi)
 *
 * getMockForTopic(topic) fuzzy-matches user input to the correct domain.
 */

// ═══════════════════════ DOMAIN REGISTRY ═══════════════════════

const MOCK_DOMAINS = {};

// ─────────────────────────────────────────────────────────────────
// 1. AI IN HEALTHCARE  (original data, moved here)
// ─────────────────────────────────────────────────────────────────
MOCK_DOMAINS['healthcare'] = {
  keywords: ['healthcare','medical','diagnosis','clinical','hospital','patient','radiology','pathology','chestxray','chexnet','medical imaging','health'],
  session_id: 'mock_health_' + Math.random().toString(36).slice(2,9),

  log_steps: [
    { ts:'00:00', msg:'Session initialised. Agent starting...', cls:'dim', step:0, papers:0, depth:1, nodes:0, contra:0, progress:5 },
    { ts:'00:02', msg:'Depth 1: Fetching papers from Semantic Scholar...', cls:'', step:0, papers:8, depth:1, nodes:0, contra:0, progress:12 },
    { ts:'00:06', msg:'Depth 1: Fetching papers from arXiv...', cls:'', step:0, papers:16, depth:1, nodes:0, contra:0, progress:18 },
    { ts:'00:09', msg:'Depth 1: 23 papers indexed. Building coverage map...', cls:'', step:0, papers:23, depth:1, nodes:0, contra:0, progress:24 },
    { ts:'00:12', msg:'AI evaluating coverage → Cluster "wearable AI" has <3 papers', cls:'ai-decision', step:1, papers:23, depth:1, nodes:0, contra:0, progress:30 },
    { ts:'00:13', msg:'AI decision: should_expand=true  expand_terms=["wearable AI diagnosis","federated medical imaging"]', cls:'ai-expand', step:1, papers:23, depth:1, nodes:0, contra:0, progress:35 },
    { ts:'00:16', msg:'Depth 2: Fetching 18 more papers on expanded terms...', cls:'', step:1, papers:41, depth:2, nodes:0, contra:0, progress:42 },
    { ts:'00:21', msg:'AI evaluating coverage → All major sub-areas sufficiently covered', cls:'ai-decision', step:1, papers:41, depth:2, nodes:0, contra:0, progress:48 },
    { ts:'00:22', msg:'AI: Coverage sufficient. Stopping search loop.', cls:'success', step:1, papers:41, depth:2, nodes:0, contra:0, progress:52 },
    { ts:'00:24', msg:'Building knowledge graph: clustering 41 papers...', cls:'', step:2, papers:41, depth:2, nodes:18, contra:0, progress:58 },
    { ts:'00:28', msg:'Knowledge graph complete: 41 nodes · 57 edges · 5 clusters', cls:'success', step:2, papers:41, depth:2, nodes:41, contra:0, progress:65 },
    { ts:'00:30', msg:'Detecting contradictions across paper pairs...', cls:'', step:3, papers:41, depth:2, nodes:41, contra:2, progress:70 },
    { ts:'00:34', msg:'Contradiction: Chen 2021 vs Okafor 2023 — transformer vs CNN debate  [HIGH]', cls:'ai-decision', step:3, papers:41, depth:2, nodes:41, contra:4, progress:75 },
    { ts:'00:38', msg:'Analysing research gaps and trend directions...', cls:'', step:3, papers:41, depth:2, nodes:41, contra:6, progress:80 },
    { ts:'00:44', msg:'Synthesising frontier directions from contradictions + gaps...', cls:'ai-decision', step:3, papers:41, depth:2, nodes:41, contra:6, progress:86 },
    { ts:'00:51', msg:'Assembling publication-grade literature review report...', cls:'', step:4, papers:41, depth:2, nodes:41, contra:6, progress:93 },
    { ts:'00:58', msg:'Report complete. Session status: done.', cls:'success', step:4, papers:41, depth:2, nodes:41, contra:6, progress:100 },
  ],

  report: {
    executive_summary: [
      "AI-assisted medical diagnosis has emerged as one of the most active and contested fields in machine learning research. Over the past five years, publication volume has grown by approximately 340%, driven by the availability of large-scale imaging datasets and advances in deep learning architectures. The field is now sufficiently mature to exhibit systematic contradictions — particularly around the comparative performance of transformer-based and convolutional approaches under real-world distribution shift.",
      "This review synthesises 41 papers across five research clusters: image classification, clinical decision support, wearable sensor integration, federated learning for privacy, and explainability methods. Methodological diversity is high, with 12 distinct model architectures and 9 benchmark datasets identified. However, evaluation practices remain inconsistent — only 34% of papers report results on held-out external validation sets, which limits cross-study comparisons.",
      "The most significant research gap identified is the lack of prospective clinical trials integrating AI diagnostic tools with pediatric populations. Frontier directions converge on three themes: architectures robust to distribution shift, federated learning with differential privacy guarantees, and causal inference frameworks for clinical decision support."
    ],
    field_snapshot: [
      { label:'Maturity', value:'Adolescent', cls:'snap-val--amber' },
      { label:'Velocity', value:'Rapid growth', cls:'snap-val--green' },
      { label:'Consensus', value:'Contested', cls:'snap-val--red' },
      { label:'Total papers', value:'41', cls:'' },
      { label:'Top method', value:'Vision Transformer', cls:'' },
      { label:'Top dataset', value:'NIH ChestXray14', cls:'' },
      { label:'Top metric', value:'AUC-ROC', cls:'' },
      { label:'Pub trend', value:'+340% (5yr)', cls:'snap-val--green' },
    ],
    contradictions: [
      { id:'c1', paper_a:'Chen et al. 2021', paper_b:'Okafor et al. 2023', claim_a:'Vision Transformers outperform CNNs for chest X-ray classification under standard benchmark conditions (AUC 0.94 vs 0.89).', claim_b:'CNNs remain superior under real-world dataset shift across three hospital systems; ViTs degrade significantly (AUC drops to 0.71).', severity:'HIGH', year_gap:2, implication:'The field may be over-optimising for benchmark datasets. External validation is now a critical, unmet gap.' },
      { id:'c2', paper_a:'Rajpurkar et al. 2022', paper_b:'Seyyed-Kalantari et al. 2023', claim_a:'CheXNet achieves radiologist-level performance on pneumonia detection across diverse populations.', claim_b:'CheXNet performance degrades significantly on underrepresented demographic groups — AUC drops 12 points for Black female patients.', severity:'HIGH', year_gap:1, implication:'Aggregate performance metrics systematically mask fairness failures. Disaggregated reporting should be mandatory for clinical AI.' },
      { id:'c3', paper_a:'Topol 2022', paper_b:'Maier-Hein et al. 2022', claim_a:'AI diagnostic tools are ready for clinical deployment with appropriate human oversight.', claim_b:'No current AI diagnostic system meets the evidentiary bar required for safe standalone deployment; RCT evidence is absent.', severity:'MEDIUM', year_gap:0, implication:'Regulatory frameworks must resolve the deployment-readiness debate before widespread adoption can proceed.' },
    ],
    research_gaps: [
      { area:'Pediatric AI diagnosis', desc:'Under-3 years age group absent from all reviewed datasets. Models trained on adult imaging fail systematically on pediatric anatomy.', opportunity_score:8.5, why_missing:'Small cohort sizes, IRB complexity, absence of age-stratified ground truth.', suggested_methodology:'Multi-site clinical trial with age-stratified datasets and pediatric radiologist ground truth.' },
      { area:'Federated learning + DP guarantees', desc:'Only 2 of 41 papers combine federated training with formal differential privacy proofs. Most federated approaches have unknown privacy leakage.', opportunity_score:7.8, why_missing:'DP-SGD adds compute overhead; no standardised evaluation framework exists.', suggested_methodology:'DP-SGD implementation across federated hospital networks with formal epsilon-delta accounting.' },
      { area:'Distribution shift benchmarks', desc:'No standardised benchmark exists for measuring model degradation under scanner change, demographic shift, or seasonal variation.', opportunity_score:7.2, why_missing:'Requires longitudinal multi-site data collection infrastructure not yet in place.', suggested_methodology:'Prospective multi-site study with controlled covariate shifts and standardised degradation metrics.' },
      { area:'Causal inference in clinical AI', desc:'All reviewed models are associative. Causal structure of diagnosis pathways is unexplored, limiting interpretability and intervention planning.', opportunity_score:6.9, why_missing:'Structural causal models require clinical domain expertise rarely paired with ML expertise.', suggested_methodology:'Structural causal models combined with clinical domain knowledge graphs.' },
      { area:'Long-term outcome tracking', desc:'No paper tracks AI diagnostic predictions against 5-year patient outcomes. Short-term accuracy does not imply clinical value.', opportunity_score:6.5, why_missing:'EHR linkage studies require sustained institutional commitment over years.', suggested_methodology:'EHR linkage studies with minimum 3-year outcome follow-up and standardised outcome definitions.' },
    ],
    trends: [
      { name:'Transformer architectures', direction:'rising', projection:'Projected to account for >70% of new SOTA results by 2027, though real-world robustness concerns may slow clinical adoption.' },
      { name:'Federated & privacy-preserving', direction:'rising', projection:'Regulatory pressure from GDPR and HIPAA is forcing multi-site collaboration without data sharing — federated approaches will dominate enterprise deployments.' },
      { name:'Explainability / XAI methods', direction:'stable', projection:'Growing demand from clinicians but methodological fragmentation limits adoption. Saliency maps remain dominant despite faithfulness limitations.' },
      { name:'Pure CNN architectures', direction:'declining', projection:'Being superseded by hybrid CNN-transformer models. Likely to persist only in edge/mobile deployments where compute is constrained.' },
      { name:'Synthetic data augmentation', direction:'rising', projection:'Diffusion-model-based data generation is emerging as a key solution to data scarcity in rare disease imaging.' },
    ],
    frontier_directions: [
      { title:'Distribution-robust transformers for multi-site deployment', rationale:'Directly resolves the Chen/Okafor HIGH-severity contradiction. Combines domain-adversarial training with test-time adaptation to close the benchmark-to-real-world gap.', impact_score:9, difficulty:'HIGH' },
      { title:'Federated pediatric AI diagnosis with DP guarantees', rationale:'Fills the pediatric data gap and the DP gap simultaneously. Multi-institution federation makes rare pediatric disease datasets tractable without data sharing.', impact_score:8, difficulty:'HIGH' },
      { title:'Causal decision support with counterfactual explanations', rationale:'Addresses the causal inference gap and the XAI plateau. Counterfactual explanations are clinically actionable.', impact_score:7, difficulty:'MEDIUM' },
    ],
    methodology_table: [
      { paper:'Chen et al.', year:2021, method:'Vision Transformer (ViT-L/16)', dataset:'NIH ChestXray14', metric:'AUC-ROC', result:'0.94' },
      { paper:'Okafor et al.', year:2023, method:'ResNet-50 (CNN)', dataset:'Multi-site OOD', metric:'AUC-ROC', result:'0.82' },
      { paper:'Rajpurkar et al.', year:2022, method:'CheXNet (DenseNet-121)', dataset:'Stanford CheXpert', metric:'F1 / AUC', result:'0.91 / 0.96' },
      { paper:'Seyyed-Kalantari et al.', year:2023, method:'CheXNet (eval)', dataset:'MIMIC-CXR stratified', metric:'AUC (demog.)', result:'0.79–0.91' },
      { paper:'Li & Agrawal', year:2023, method:'Hybrid CNN-Transformer', dataset:'NIH + MIMIC', metric:'AUC-ROC', result:'0.95' },
      { paper:'Wang et al.', year:2022, method:'Federated DenseNet', dataset:'3-hospital federated', metric:'Macro-F1', result:'0.87' },
      { paper:'Topol', year:2022, method:'Review / meta-analysis', dataset:'Multiple', metric:'Narrative', result:'—' },
      { paper:'Maier-Hein et al.', year:2022, method:'Systematic review', dataset:'Multiple', metric:'Evidence grade', result:'Low–moderate' },
    ],
    citation_index: [
      { num:1, title:'Transformers for medical image analysis: a benchmark', authors:'Chen, Y., et al.', year:2021, doi:'10.1000/jml.2021.001' },
      { num:2, title:'Real-world performance of ViT under distribution shift', authors:'Okafor, C., et al.', year:2023, doi:'10.1000/jml.2023.014' },
      { num:3, title:'CheXNet: radiologist-level pneumonia detection', authors:'Rajpurkar, P., et al.', year:2022, doi:'10.1000/nature.2022.031' },
      { num:4, title:'Underdiagnosis bias in AI diagnostic tools', authors:'Seyyed-Kalantari, L., et al.', year:2023, doi:'10.1000/jama.2023.002' },
      { num:5, title:'AI versus clinicians: state of the evidence', authors:'Topol, E.', year:2022, doi:'10.1000/lancet.2022.045' },
      { num:6, title:'Surgical data science: from principles to practice', authors:'Maier-Hein, L., et al.', year:2022, doi:'10.1000/natmed.2022.012' },
    ],
  },

  graph_nodes: [
    { node_id:'p1', label:'Chen 2021', type:'paper', cluster_id:0 },
    { node_id:'p2', label:'Okafor 2023', type:'paper', cluster_id:0 },
    { node_id:'p3', label:'Rajpurkar 2022', type:'paper', cluster_id:1 },
    { node_id:'p4', label:'Seyyed-K 2023', type:'paper', cluster_id:1 },
    { node_id:'p5', label:'Li & Agrawal 2023', type:'paper', cluster_id:0 },
    { node_id:'p6', label:'Wang 2022', type:'paper', cluster_id:2 },
    { node_id:'p7', label:'Topol 2022', type:'paper', cluster_id:3 },
    { node_id:'p8', label:'Maier-Hein 2022', type:'paper', cluster_id:3 },
    { node_id:'p9', label:'Lee et al. 2023', type:'paper', cluster_id:4 },
    { node_id:'p10', label:'Singh 2022', type:'paper', cluster_id:4 },
    { node_id:'p11', label:'Kumar et al. 2023', type:'paper', cluster_id:2 },
    { node_id:'m1', label:'ViT', type:'method', cluster_id:0 },
    { node_id:'m2', label:'CNN/ResNet', type:'method', cluster_id:0 },
    { node_id:'m3', label:'Federated', type:'method', cluster_id:2 },
    { node_id:'m4', label:'CheXNet', type:'method', cluster_id:1 },
    { node_id:'c1', label:'NIH ChestXray14', type:'concept', cluster_id:4 },
    { node_id:'c2', label:'AUC-ROC', type:'concept', cluster_id:4 },
    { node_id:'c3', label:'Distribution shift', type:'concept', cluster_id:0 },
    { node_id:'c4', label:'Fairness / bias', type:'concept', cluster_id:1 },
    { node_id:'c5', label:'XAI / saliency', type:'concept', cluster_id:3 },
  ],
  graph_edges: [
    { source_id:'p1', target_id:'p2', relationship_type:'contradicts', reason:'ViT vs CNN benchmark debate', contradiction_id:'c1' },
    { source_id:'p3', target_id:'p4', relationship_type:'contradicts', reason:'Fairness — aggregate vs disaggregated AUC', contradiction_id:'c2' },
    { source_id:'p7', target_id:'p8', relationship_type:'contradicts', reason:'Deployment readiness — clinical vs evidentiary bar', contradiction_id:'c3' },
    { source_id:'p5', target_id:'p1', relationship_type:'extends', reason:'Hybrid model builds on pure ViT baseline' },
    { source_id:'p5', target_id:'p2', relationship_type:'supports', reason:'Hybrid model shows better OOD performance' },
    { source_id:'p6', target_id:'m3', relationship_type:'cites_concept', reason:'Uses federated approach' },
    { source_id:'p11', target_id:'p6', relationship_type:'extends', reason:'Adds DP guarantees to federated setup' },
    { source_id:'p3', target_id:'c1', relationship_type:'shares_dataset', reason:'Both use NIH ChestXray14' },
    { source_id:'p4', target_id:'c1', relationship_type:'shares_dataset', reason:'Both use NIH ChestXray14' },
    { source_id:'p1', target_id:'m1', relationship_type:'cites_concept', reason:'Uses ViT architecture' },
    { source_id:'p2', target_id:'m2', relationship_type:'cites_concept', reason:'Uses CNN architecture' },
    { source_id:'p1', target_id:'c2', relationship_type:'cites_concept', reason:'Reports AUC-ROC' },
    { source_id:'p2', target_id:'c3', relationship_type:'cites_concept', reason:'Studies distribution shift' },
    { source_id:'p4', target_id:'c4', relationship_type:'cites_concept', reason:'Studies fairness/demographic bias' },
    { source_id:'p7', target_id:'c5', relationship_type:'cites_concept', reason:'Reviews XAI methods' },
    { source_id:'p9', target_id:'p3', relationship_type:'supports', reason:'Confirms CheXNet findings on different dataset' },
    { source_id:'p10', target_id:'p9', relationship_type:'extends', reason:'Adds wearable sensor modality' },
  ],

  representations: {
    slides: [
      { slide_number:1, title:'ResearchPulse: AI in Medical Diagnosis', bullets:['41 papers · 5 clusters · 90-second analysis','Autonomous agent searched 2 depth levels','6 contradictions + 5 research gaps detected'], speaker_note:'Opening slide — set the stage with the agentic approach.' },
      { slide_number:2, title:'A rapidly growing, contested field', bullets:['340% publication growth over 5 years','Vision Transformers now dominant — but contested','Field consensus: benchmark performance ≠ clinical performance'], speaker_note:'Pause on "contested" — this is the core tension.' },
      { slide_number:3, title:'How the AI decided what to search', bullets:['Depth 1: "AI medical diagnosis" → 23 papers fetched','AI identified wearable AI as under-represented sub-area','Depth 2: expanded autonomously → 18 more papers — then stopped'], speaker_note:'This is the agentic loop moment.' },
      { slide_number:4, title:'Critical contradiction: Transformers vs CNNs', bullets:['Chen 2021: ViT achieves AUC 0.94 on benchmark datasets','Okafor 2023: CNN outperforms ViT under real-world dataset shift','Implication: the field is over-fitting to controlled benchmarks'], speaker_note:'Click a red edge in the knowledge graph to show this live.' },
      { slide_number:5, title:'Top research gaps by opportunity score', bullets:['Pediatric AI diagnosis — 8.5/10 (no age-stratified data exists)','Federated learning + formal DP — 7.8/10 (privacy leakage unknown)','Distribution shift benchmarks — 7.2/10 (no standard yet)'], speaker_note:'Each of these is a publishable research direction.' },
      { slide_number:6, title:'Methodology landscape: what methods dominate', bullets:['ViT and hybrid CNN-Transformer account for 60% of SOTA results','NIH ChestXray14 is the most over-used benchmark across papers','Only 34% of papers use external validation — a reproducibility crisis'], speaker_note:'The methodology table in the report makes this scannable.' },
      { slide_number:7, title:'Trends: what\'s rising, what\'s fading', bullets:['Transformers rising — projected >70% share by 2027','Federated learning rising — regulatory drivers accelerating','Pure CNNs declining — persisting only at edge deployments'], speaker_note:'Direction arrows in the report make this instantly readable.' },
      { slide_number:8, title:'Where to focus: three frontier directions', bullets:['Distribution-robust transformers for multi-site deployment (9/10)','Federated pediatric diagnosis with DP guarantees (8/10)','Causal decision support with counterfactual explanations (7/10)'], speaker_note:'Close here.' },
    ],
    flashcards: [
      { id:1, front:'What is the primary contradiction in ViT vs CNN research for medical imaging?', back:'Vision Transformers outperform CNNs on standard benchmarks but degrade significantly under real-world distribution shift, where CNNs remain more robust (AUC: 0.94→0.71 for ViTs).' },
      { id:2, front:'What does "distribution shift" mean in medical AI?', back:'When a model trained on data from one source performs worse on data from a different source — the primary obstacle to clinical deployment.' },
      { id:3, front:'Why is the pediatric AI diagnosis gap rated 8.5/10?', back:'All reviewed datasets focus on adult patients. Models trained on adult imaging fail systematically on pediatric anatomy.' },
      { id:4, front:'What is federated learning and why does it matter for medical AI?', back:'Training models across multiple hospitals without sharing patient data. Solves the data scarcity and privacy problem simultaneously.' },
      { id:5, front:'What does differential privacy (DP) guarantee?', back:'A mathematical bound on information leakage. An attacker cannot determine whether a specific patient\'s record was in the training set.' },
      { id:6, front:'What is AUC-ROC?', back:'Area Under the Receiver Operating Characteristic curve — measures discrimination ability across all thresholds.' },
      { id:7, front:'Why are saliency maps insufficient for clinical explainability?', back:'They show which pixels were highlighted but not causally why. Clinicians need counterfactual answers.' },
      { id:8, front:'What is the CheXNet fairness failure?', back:'CheXNet performs 12 AUC points worse on Black female patients than aggregate scores suggest.' },
      { id:9, front:'What is "benchmark overfitting" in medical AI?', back:'Models optimised on widely-used benchmarks appear highly accurate but fail under real-world conditions.' },
      { id:10, front:'What are the three frontier research directions?', back:'(1) Distribution-robust transformers. (2) Federated pediatric AI with DP. (3) Causal decision support with counterfactuals.' },
      { id:11, front:'What percentage of reviewed papers use external validation sets?', back:'Only 34%.' },
      { id:12, front:'What is a "typed edge" in the knowledge graph?', back:'An edge with a semantic label: contradicts (red), supports (green), extends (yellow), cites_concept (gray), shares_dataset (blue).' },
      { id:13, front:'How does the agentic search loop know when to stop?', back:'Claude evaluates cluster-level paper coverage after each depth. If all areas have ≥3 papers, it stops.' },
      { id:14, front:'What makes hybrid CNN-Transformer architectures promising?', back:'They combine CNN\'s local feature extraction with Transformer\'s global attention, achieving AUC 0.95 with better OOD stability.' },
      { id:15, front:'What is the opportunity score in the gap scorecard?', back:'A 1–10 score estimating the research value of filling a gap.' },
    ],
    mindmap: {
      root: 'AI in medical diagnosis',
      branches: [
        { label:'Image classification', children: [
          { label:'Chen et al. 2021', finding:'ViT-L/16 achieves AUC 0.94 on NIH ChestXray14' },
          { label:'Okafor et al. 2023', finding:'CNN superior under distribution shift — AUC 0.82 vs ViT 0.71' },
          { label:'Li & Agrawal 2023', finding:'Hybrid CNN-Transformer achieves AUC 0.95 with better OOD stability' },
        ]},
        { label:'Clinical decision support', children: [
          { label:'Rajpurkar et al. 2022', finding:'CheXNet reaches radiologist-level F1 on pneumonia detection' },
          { label:'Seyyed-Kalantari et al. 2023', finding:'CheXNet degrades 12 AUC points for underrepresented demographics' },
          { label:'Topol 2022', finding:'AI ready for deployment with appropriate human oversight' },
          { label:'Maier-Hein et al. 2022', finding:'RCT evidence lacking — deployment evidentiary bar not met' },
        ]},
        { label:'Federated & privacy learning', children: [
          { label:'Wang et al. 2022', finding:'Federated DenseNet: Macro-F1 0.87 across 3 hospital sites' },
          { label:'Kumar et al. 2023', finding:'Adds DP-SGD to federated setup — first formal privacy guarantees' },
        ]},
        { label:'Explainability methods', children: [
          { label:'Topol 2022 (XAI section)', finding:'Reviews saliency-based methods — faithfulness disputed' },
          { label:'Lee et al. 2023', finding:'Counterfactual explanations better aligned with clinical reasoning' },
        ]},
        { label:'Wearable & sensor integration', children: [
          { label:'Singh 2022', finding:'ECG + imaging fusion for cardiac diagnosis — AUC 0.91' },
          { label:'Lee et al. 2023 (wearable)', finding:'Wearable EEG integration for seizure prediction — emerging' },
        ]},
      ]
    }
  }
};

// ─────────────────────────────────────────────────────────────────
// 2. QUANTUM COMPUTING
// ─────────────────────────────────────────────────────────────────
MOCK_DOMAINS['quantum'] = {
  keywords: ['quantum','qubit','superconducting','entanglement','quantum computing','quantum error','quantum supremacy','quantum algorithm'],
  session_id: 'mock_qc_' + Math.random().toString(36).slice(2,9),

  log_steps: [
    { ts:'00:00', msg:'Session initialised. Agent starting...', cls:'dim', step:0, papers:0, depth:1, nodes:0, contra:0, progress:5 },
    { ts:'00:02', msg:'Depth 1: Fetching papers from Semantic Scholar...', cls:'', step:0, papers:10, depth:1, nodes:0, contra:0, progress:12 },
    { ts:'00:05', msg:'Depth 1: Fetching papers from arXiv (quant-ph)...', cls:'', step:0, papers:22, depth:1, nodes:0, contra:0, progress:20 },
    { ts:'00:08', msg:'Depth 1: 28 papers indexed. Building coverage map...', cls:'', step:0, papers:28, depth:1, nodes:0, contra:0, progress:26 },
    { ts:'00:11', msg:'AI evaluating coverage → Cluster "topological qubits" has <3 papers', cls:'ai-decision', step:1, papers:28, depth:1, nodes:0, contra:0, progress:32 },
    { ts:'00:12', msg:'AI decision: should_expand=true  expand_terms=["topological quantum codes","quantum error mitigation"]', cls:'ai-expand', step:1, papers:28, depth:1, nodes:0, contra:0, progress:37 },
    { ts:'00:15', msg:'Depth 2: Fetching 14 more papers on expanded terms...', cls:'', step:1, papers:38, depth:2, nodes:0, contra:0, progress:44 },
    { ts:'00:19', msg:'AI evaluating coverage → All major sub-areas sufficiently covered', cls:'ai-decision', step:1, papers:38, depth:2, nodes:0, contra:0, progress:50 },
    { ts:'00:20', msg:'AI: Coverage sufficient. Stopping search loop.', cls:'success', step:1, papers:38, depth:2, nodes:0, contra:0, progress:54 },
    { ts:'00:23', msg:'Building knowledge graph: clustering 38 papers...', cls:'', step:2, papers:38, depth:2, nodes:20, contra:0, progress:60 },
    { ts:'00:27', msg:'Knowledge graph complete: 38 nodes · 52 edges · 5 clusters', cls:'success', step:2, papers:38, depth:2, nodes:38, contra:0, progress:67 },
    { ts:'00:30', msg:'Detecting contradictions across paper pairs...', cls:'', step:3, papers:38, depth:2, nodes:38, contra:2, progress:72 },
    { ts:'00:34', msg:'Contradiction: Google 2023 vs IBM 2024 — quantum advantage claims [HIGH]', cls:'ai-decision', step:3, papers:38, depth:2, nodes:38, contra:4, progress:78 },
    { ts:'00:38', msg:'Analysing research gaps and trend directions...', cls:'', step:3, papers:38, depth:2, nodes:38, contra:5, progress:83 },
    { ts:'00:44', msg:'Synthesising frontier directions from contradictions + gaps...', cls:'ai-decision', step:3, papers:38, depth:2, nodes:38, contra:5, progress:88 },
    { ts:'00:50', msg:'Assembling publication-grade literature review report...', cls:'', step:4, papers:38, depth:2, nodes:38, contra:5, progress:94 },
    { ts:'00:57', msg:'Report complete. Session status: done.', cls:'success', step:4, papers:38, depth:2, nodes:38, contra:5, progress:100 },
  ],

  report: {
    executive_summary: [
      "Quantum computing has entered a pivotal transitional phase between noisy intermediate-scale quantum (NISQ) devices and the pursuit of fault-tolerant quantum computation. Over the past four years, the field has seen a 280% increase in publications, driven by aggressive corporate R&D from Google, IBM, and startups like IonQ and PsiQuantum. The most consequential debate centres on whether current NISQ-era devices can deliver practical quantum advantage.",
      "This review synthesises 38 papers across five research clusters: superconducting qubits, trapped-ion systems, quantum error correction, quantum algorithms & applications, and topological/photonic approaches. The hardware landscape is fragmented — at least 6 distinct qubit modalities are under active development with no clear winner. Error rates remain 2–3 orders of magnitude above the fault-tolerance threshold for most platforms.",
      "The most significant research gap is the absence of standardised quantum benchmarking protocols that allow fair cross-platform comparisons. Frontier directions converge on three themes: scalable error correction codes, hybrid quantum-classical variational algorithms for near-term utility, and topological qubits as a long-term path to inherent fault tolerance."
    ],
    field_snapshot: [
      { label:'Maturity', value:'Early adolescent', cls:'snap-val--amber' },
      { label:'Velocity', value:'Accelerating', cls:'snap-val--green' },
      { label:'Consensus', value:'Highly contested', cls:'snap-val--red' },
      { label:'Total papers', value:'38', cls:'' },
      { label:'Top method', value:'Surface code QEC', cls:'' },
      { label:'Top platform', value:'Superconducting', cls:'' },
      { label:'Top metric', value:'Logical error rate', cls:'' },
      { label:'Pub trend', value:'+280% (4yr)', cls:'snap-val--green' },
    ],
    contradictions: [
      { id:'c1', paper_a:'Arute et al. (Google) 2023', paper_b:'Kim et al. (IBM) 2024', claim_a:'Random circuit sampling demonstrates quantum supremacy — a 127-qubit processor solves a problem intractable for classical supercomputers in 200 seconds.', claim_b:'Improved tensor-network classical simulation narrows the gap significantly; the claimed quantum advantage shrinks to ~10× when using optimised classical algorithms.', severity:'HIGH', year_gap:1, implication:'The definition and verification of quantum advantage remains unresolved. Community needs agreed-upon benchmark tasks.' },
      { id:'c2', paper_a:'Ryan-Anderson et al. 2022', paper_b:'Acharya et al. 2024', claim_a:'Trapped-ion systems achieve lower physical error rates (10⁻⁴) than superconducting qubits, making them superior for near-term quantum computation.', claim_b:'Superconducting systems compensate with faster gate speeds and higher qubit counts, making total logical error rates competitive despite higher physical error rates.', severity:'MEDIUM', year_gap:2, implication:'The "best qubit" debate cannot be resolved without standardised end-to-end benchmarks that weight speed, fidelity, and scalability together.' },
      { id:'c3', paper_a:'Peruzzo et al. 2022', paper_b:'Tilly et al. 2023', claim_a:'Variational Quantum Eigensolver (VQE) demonstrates practical quantum advantage for molecular simulation on 50+ qubits.', claim_b:'VQE is plagued by barren plateaus and local minima — no evidence of advantage over classical coupled-cluster methods at scale.', severity:'HIGH', year_gap:1, implication:'Variational quantum algorithms may be a dead end for chemical simulation. The field needs either better optimisation landscapes or fundamentally different algorithmic approaches.' },
    ],
    research_gaps: [
      { area:'Standardised quantum benchmarks', desc:'No cross-platform benchmarking suite exists that fairly compares superconducting, trapped-ion, photonic, and topological systems on equivalent tasks.', opportunity_score:9.0, why_missing:'Each hardware vendor optimises for different metrics; no neutral body has established standards.', suggested_methodology:'Community-driven benchmark suite with task-agnostic metrics: volume, fidelity, time-to-solution.' },
      { area:'Quantum error correction at scale', desc:'Only 3 of 38 papers demonstrate QEC on >100 physical qubits. Real fault-tolerant computation requires 1000+ qubit codes.', opportunity_score:8.5, why_missing:'Hardware limitations: current devices lack sufficient qubit counts and connectivity for large codes.', suggested_methodology:'Surface code implementations on 200+ qubit devices with characterisation of logical error rates.' },
      { area:'Quantum machine learning utility', desc:'Claims of QML advantage lack rigorous classical baselines. No paper demonstrates unambiguous advantage on real-world datasets.', opportunity_score:7.5, why_missing:'Theoretical dequantization results have eroded many QML proposals; practical demonstrations lag.', suggested_methodology:'Head-to-head QML vs classical ML comparisons on standardised real-world datasets with fair hyperparameter tuning.' },
      { area:'Quantum networking protocols', desc:'Distributed quantum computing requires quantum internet infrastructure. Only 2 papers address inter-node entanglement distribution.', opportunity_score:7.0, why_missing:'Quantum repeater technology is immature; loss rates in optical fibre limit range to ~100km.', suggested_methodology:'Quantum repeater chain demonstrations with entanglement distillation over metropolitan distances.' },
      { area:'Software toolchain maturity', desc:'Quantum programming frameworks (Qiskit, Cirq, PennyLane) lack interoperability and production-grade debugging tools.', opportunity_score:6.5, why_missing:'Fragmented ecosystem; each hardware vendor maintains its own SDK without cross-compatibility.', suggested_methodology:'Open-source intermediate representation standard with hardware-agnostic compilation and profiling.' },
    ],
    trends: [
      { name:'Quantum error correction', direction:'rising', projection:'Projected to dominate >50% of experimental publications by 2027 as devices cross the 100-qubit threshold.' },
      { name:'Variational / hybrid algorithms', direction:'stable', projection:'Still heavily researched but enthusiasm waning due to barren plateau concerns. May pivot toward structured ansätze.' },
      { name:'Topological qubits', direction:'rising', projection:'Microsoft\'s Majorana announcement reignited interest; still pre-experimental but could leapfrog other modalities if proven.' },
      { name:'Quantum supremacy claims', direction:'declining', projection:'The term itself is being retired. Focus shifting from demos to practical utility on real-world problems.' },
      { name:'Photonic quantum computing', direction:'rising', projection:'Room-temperature operation and native networking make photonics attractive for "quantum internet" applications.' },
    ],
    frontier_directions: [
      { title:'Scalable surface codes on 200+ superconducting qubits', rationale:'Directly addresses the QEC-at-scale gap. Google and IBM are on a collision course to demonstrate below-threshold logical error rates.', impact_score:9, difficulty:'HIGH' },
      { title:'Hardware-agnostic quantum benchmarking suite', rationale:'Resolves the platforms-comparison contradiction. Would enable investors, researchers, and policy-makers to make informed decisions.', impact_score:8, difficulty:'MEDIUM' },
      { title:'Provably advantageous quantum algorithms for optimisation', rationale:'Moves beyond supremacy demonstrations to real-world utility. Drug discovery, logistics, and financial modelling are target domains.', impact_score:8, difficulty:'HIGH' },
    ],
    methodology_table: [
      { paper:'Arute et al. (Google)', year:2023, method:'Random circuit sampling', dataset:'127-qubit Sycamore', metric:'XEB fidelity', result:'0.002' },
      { paper:'Kim et al. (IBM)', year:2024, method:'Tensor-network simulation', dataset:'127-qubit Eagle', metric:'Classical sim time', result:'~2000s' },
      { paper:'Ryan-Anderson et al.', year:2022, method:'Trapped-ion QEC', dataset:'32-ion chain', metric:'Physical error rate', result:'10⁻⁴' },
      { paper:'Acharya et al.', year:2024, method:'Surface code', dataset:'72-qubit Sycamore', metric:'Logical error rate', result:'2.9×10⁻³' },
      { paper:'Peruzzo et al.', year:2022, method:'VQE', dataset:'H₂/LiH molecules', metric:'Chemical accuracy', result:'±1.6 mHa' },
      { paper:'Tilly et al.', year:2023, method:'VQE analysis', dataset:'Multiple molecules', metric:'Barren plateau rate', result:'Exponential' },
      { paper:'Bartolucci et al.', year:2023, method:'Fusion-based photonic', dataset:'Simulated', metric:'Threshold loss', result:'2.7%' },
      { paper:'Sivak et al.', year:2023, method:'Bosonic code (cat qubit)', dataset:'1 logical qubit', metric:'Logical lifetime', result:'2× physical' },
    ],
    citation_index: [
      { num:1, title:'Quantum supremacy using a programmable superconducting processor', authors:'Arute, F., et al. (Google AI Quantum)', year:2023, doi:'10.1038/s41586-023-06096-3' },
      { num:2, title:'Evidence for practical quantum advantage in spin simulation', authors:'Kim, Y., et al. (IBM Quantum)', year:2024, doi:'10.1038/s41586-024-07998-6' },
      { num:3, title:'Realization of real-time fault-tolerant quantum error correction', authors:'Ryan-Anderson, C., et al. (Quantinuum)', year:2022, doi:'10.1103/PhysRevX.12.041014' },
      { num:4, title:'Suppressing quantum errors by scaling a surface code logical qubit', authors:'Acharya, R., et al. (Google AI Quantum)', year:2024, doi:'10.1038/s41586-024-08449-y' },
      { num:5, title:'A variational eigenvalue solver on a photonic quantum processor', authors:'Peruzzo, A., et al.', year:2022, doi:'10.1038/ncomms5213' },
      { num:6, title:'The variational quantum eigensolver: a review of methods and best practices', authors:'Tilly, J., et al.', year:2023, doi:'10.1016/j.physrep.2022.08.003' },
    ],
  },

  graph_nodes: [
    { node_id:'p1', label:'Google QS 2023', type:'paper', cluster_id:0 },
    { node_id:'p2', label:'IBM Eagle 2024', type:'paper', cluster_id:0 },
    { node_id:'p3', label:'Ryan-Anderson 2022', type:'paper', cluster_id:1 },
    { node_id:'p4', label:'Acharya 2024', type:'paper', cluster_id:1 },
    { node_id:'p5', label:'Peruzzo 2022', type:'paper', cluster_id:2 },
    { node_id:'p6', label:'Tilly 2023', type:'paper', cluster_id:2 },
    { node_id:'p7', label:'Bartolucci 2023', type:'paper', cluster_id:3 },
    { node_id:'p8', label:'Sivak 2023', type:'paper', cluster_id:3 },
    { node_id:'p9', label:'Huang et al. 2023', type:'paper', cluster_id:4 },
    { node_id:'p10', label:'Preskill 2023', type:'paper', cluster_id:4 },
    { node_id:'m1', label:'Surface code', type:'method', cluster_id:1 },
    { node_id:'m2', label:'VQE', type:'method', cluster_id:2 },
    { node_id:'m3', label:'Tensor network', type:'method', cluster_id:0 },
    { node_id:'m4', label:'Photonic fusion', type:'method', cluster_id:3 },
    { node_id:'c1', label:'Quantum advantage', type:'concept', cluster_id:0 },
    { node_id:'c2', label:'Error rates', type:'concept', cluster_id:1 },
    { node_id:'c3', label:'Barren plateaus', type:'concept', cluster_id:2 },
    { node_id:'c4', label:'Fault tolerance', type:'concept', cluster_id:4 },
    { node_id:'c5', label:'Qubit scalability', type:'concept', cluster_id:3 },
  ],
  graph_edges: [
    { source_id:'p1', target_id:'p2', relationship_type:'contradicts', reason:'Quantum advantage claims disputed by classical simulation', contradiction_id:'c1' },
    { source_id:'p3', target_id:'p4', relationship_type:'contradicts', reason:'Trapped-ion vs superconducting error rate debate', contradiction_id:'c2' },
    { source_id:'p5', target_id:'p6', relationship_type:'contradicts', reason:'VQE utility vs barren plateau problem', contradiction_id:'c3' },
    { source_id:'p4', target_id:'m1', relationship_type:'cites_concept', reason:'Uses surface code QEC' },
    { source_id:'p5', target_id:'m2', relationship_type:'cites_concept', reason:'Implements VQE algorithm' },
    { source_id:'p2', target_id:'m3', relationship_type:'cites_concept', reason:'Uses tensor-network simulation' },
    { source_id:'p7', target_id:'m4', relationship_type:'cites_concept', reason:'Fusion-based photonic architecture' },
    { source_id:'p1', target_id:'c1', relationship_type:'cites_concept', reason:'Claims quantum advantage' },
    { source_id:'p4', target_id:'c2', relationship_type:'cites_concept', reason:'Reports logical error rates' },
    { source_id:'p6', target_id:'c3', relationship_type:'cites_concept', reason:'Analyses barren plateaus' },
    { source_id:'p10', target_id:'c4', relationship_type:'cites_concept', reason:'Reviews path to fault tolerance' },
    { source_id:'p8', target_id:'p4', relationship_type:'extends', reason:'Bosonic codes extend surface code approach' },
    { source_id:'p9', target_id:'p5', relationship_type:'supports', reason:'Quantum kernel methods support VQE utility for specific tasks' },
    { source_id:'p10', target_id:'p1', relationship_type:'supports', reason:'Acknowledges supremacy result as milestone' },
    { source_id:'p7', target_id:'c5', relationship_type:'cites_concept', reason:'Addresses qubit scalability via photonics' },
  ],

  representations: {
    slides: [
      { slide_number:1, title:'ResearchPulse: Quantum Computing', bullets:['38 papers · 5 clusters · 90-second analysis','Focus: NISQ to fault-tolerant transition','5 contradictions + 5 research gaps detected'], speaker_note:'Opening — the quantum computing landscape.' },
      { slide_number:2, title:'A fragmented, rapidly accelerating field', bullets:['280% publication growth over 4 years','6 competing qubit modalities under development','No clear winner — each has fundamental trade-offs'], speaker_note:'Emphasise the fragmentation.' },
      { slide_number:3, title:'The quantum advantage debate', bullets:['Google 2023: 127-qubit Sycamore demonstrates supremacy','IBM 2024: Optimised classical simulation narrows gap to ~10×','Definition of "advantage" itself is contested'], speaker_note:'This is THE debate in the field.' },
      { slide_number:4, title:'Trapped-ion vs superconducting', bullets:['Trapped-ion: lower physical error rates (10⁻⁴)','Superconducting: faster gates, more qubits, competitive logical rates','Need standardised end-to-end benchmarks'], speaker_note:'Platform comparison.' },
      { slide_number:5, title:'Top research gaps', bullets:['Standardised quantum benchmarks — 9.0/10','QEC at scale (>100 physical qubits) — 8.5/10','Quantum ML real-world advantage — 7.5/10'], speaker_note:'Research opportunities.' },
      { slide_number:6, title:'VQE: promise or dead end?', bullets:['Peruzzo 2022: VQE shows chemical accuracy on small molecules','Tilly 2023: Barren plateaus make scaling exponentially hard','Field pivoting toward structured/problem-specific ansätze'], speaker_note:'The VQE debate.' },
      { slide_number:7, title:'Trends: what\'s rising vs fading', bullets:['QEC & surface codes — rising sharply','Topological qubits — rising (Microsoft Majorana)','Quantum supremacy demos — declining in favour of utility'], speaker_note:'Trend analysis.' },
      { slide_number:8, title:'Frontier directions', bullets:['Scalable surface codes on 200+ qubits (9/10)','Hardware-agnostic benchmarking suite (8/10)','Provably advantageous quantum optimisation (8/10)'], speaker_note:'Close with actionable directions.' },
    ],
    flashcards: [
      { id:1, front:'What is NISQ?', back:'Noisy Intermediate-Scale Quantum — current era of quantum devices with 50–1000 qubits and high error rates, insufficient for fault-tolerant computation.' },
      { id:2, front:'What is quantum supremacy/advantage?', back:'Demonstration that a quantum computer solves a specific problem faster than any classical computer. Google claimed this in 2019/2023 but the claim remains contested.' },
      { id:3, front:'What are surface codes?', back:'A leading quantum error correction scheme that encodes logical qubits across a 2D grid of physical qubits, with threshold error rates around 1%.' },
      { id:4, front:'What is the barren plateau problem in VQE?', back:'As the number of qubits increases, the optimisation landscape becomes exponentially flat, making gradient-based training intractable.' },
      { id:5, front:'How do trapped-ion and superconducting qubits compare?', back:'Trapped-ion: lower error rates, slower gates, fewer qubits. Superconducting: higher error rates, faster gates, more qubits, more scalable fabrication.' },
      { id:6, front:'What is a topological qubit?', back:'A qubit encoded in non-local topological properties of matter (e.g., Majorana fermions), theoretically immune to local noise. Still largely unproven experimentally.' },
      { id:7, front:'Why is quantum benchmarking hard?', back:'Different platforms optimise for different metrics (gate fidelity, speed, connectivity) making apples-to-apples comparison impossible without agreed-upon standards.' },
      { id:8, front:'What is quantum error correction (QEC)?', back:'Encoding quantum information redundantly across many physical qubits to detect and correct errors, essential for fault-tolerant quantum computing.' },
      { id:9, front:'What is XEB fidelity?', back:'Cross-Entropy Benchmarking — a metric used to verify quantum circuit execution quality by comparing output distributions against ideal simulations.' },
      { id:10, front:'What are the three frontier research directions?', back:'(1) Scalable surface codes on 200+ qubits. (2) Hardware-agnostic benchmarking suites. (3) Provably advantageous quantum algorithms for real-world optimisation.' },
    ],
    mindmap: {
      root: 'Quantum Computing',
      branches: [
        { label:'Superconducting qubits', children: [
          { label:'Google Sycamore 2023', finding:'127-qubit random circuit sampling — quantum advantage claim' },
          { label:'IBM Eagle 2024', finding:'Classical tensor-network simulation narrows advantage gap' },
          { label:'Acharya et al. 2024', finding:'Surface code logical error rate 2.9×10⁻³ on 72 qubits' },
        ]},
        { label:'Trapped-ion systems', children: [
          { label:'Ryan-Anderson 2022', finding:'Physical error rate 10⁻⁴ on 32-ion chain' },
          { label:'IonQ / Quantinuum', finding:'High-fidelity gates but limited qubit counts' },
        ]},
        { label:'Quantum algorithms', children: [
          { label:'Peruzzo et al. 2022', finding:'VQE achieves chemical accuracy on small molecules' },
          { label:'Tilly et al. 2023', finding:'Barren plateaus make VQE scaling exponentially hard' },
        ]},
        { label:'Photonic & topological', children: [
          { label:'Bartolucci et al. 2023', finding:'Fusion-based photonic architecture — room temperature operation' },
          { label:'Sivak et al. 2023', finding:'Cat qubit logical lifetime 2× physical — bosonic code breakthrough' },
        ]},
        { label:'Error correction', children: [
          { label:'Surface codes', finding:'Leading QEC approach — threshold ~1% physical error rate' },
          { label:'Preskill 2023', finding:'Roadmap to fault tolerance: need 10³–10⁶ physical qubits per logical qubit' },
        ]},
      ]
    }
  }
};

// ─────────────────────────────────────────────────────────────────
// 3. CLIMATE CHANGE & RENEWABLE ENERGY
// ─────────────────────────────────────────────────────────────────
MOCK_DOMAINS['climate'] = {
  keywords: ['climate','renewable','solar','wind','carbon','emissions','energy','sustainability','green','decarbonization','photovoltaic','battery','storage'],
  session_id: 'mock_clim_' + Math.random().toString(36).slice(2,9),

  log_steps: [
    { ts:'00:00', msg:'Session initialised. Agent starting...', cls:'dim', step:0, papers:0, depth:1, nodes:0, contra:0, progress:5 },
    { ts:'00:02', msg:'Depth 1: Fetching papers from Semantic Scholar...', cls:'', step:0, papers:12, depth:1, nodes:0, contra:0, progress:12 },
    { ts:'00:05', msg:'Depth 1: Fetching papers from Nature Energy / Joule...', cls:'', step:0, papers:24, depth:1, nodes:0, contra:0, progress:20 },
    { ts:'00:08', msg:'Depth 1: 30 papers indexed. Building coverage map...', cls:'', step:0, papers:30, depth:1, nodes:0, contra:0, progress:26 },
    { ts:'00:11', msg:'AI evaluating coverage → Cluster "green hydrogen" has <3 papers', cls:'ai-decision', step:1, papers:30, depth:1, nodes:0, contra:0, progress:32 },
    { ts:'00:12', msg:'AI decision: should_expand=true  expand_terms=["green hydrogen electrolysis","grid-scale battery storage"]', cls:'ai-expand', step:1, papers:30, depth:1, nodes:0, contra:0, progress:37 },
    { ts:'00:15', msg:'Depth 2: Fetching 15 more papers on expanded terms...', cls:'', step:1, papers:45, depth:2, nodes:0, contra:0, progress:44 },
    { ts:'00:19', msg:'AI evaluating coverage → All clusters now have ≥4 papers', cls:'ai-decision', step:1, papers:45, depth:2, nodes:0, contra:0, progress:50 },
    { ts:'00:20', msg:'AI: Coverage sufficient. Stopping search loop.', cls:'success', step:1, papers:45, depth:2, nodes:0, contra:0, progress:54 },
    { ts:'00:23', msg:'Building knowledge graph: clustering 45 papers...', cls:'', step:2, papers:45, depth:2, nodes:22, contra:0, progress:60 },
    { ts:'00:27', msg:'Knowledge graph complete: 45 nodes · 63 edges · 5 clusters', cls:'success', step:2, papers:45, depth:2, nodes:45, contra:0, progress:67 },
    { ts:'00:30', msg:'Detecting contradictions across paper pairs...', cls:'', step:3, papers:45, depth:2, nodes:45, contra:2, progress:72 },
    { ts:'00:34', msg:'Contradiction: Jacobson 2023 vs Heard 2024 — 100% renewables feasibility [HIGH]', cls:'ai-decision', step:3, papers:45, depth:2, nodes:45, contra:4, progress:78 },
    { ts:'00:38', msg:'Analysing research gaps and trend directions...', cls:'', step:3, papers:45, depth:2, nodes:45, contra:5, progress:83 },
    { ts:'00:44', msg:'Synthesising frontier directions from contradictions + gaps...', cls:'ai-decision', step:3, papers:45, depth:2, nodes:45, contra:5, progress:88 },
    { ts:'00:50', msg:'Assembling publication-grade literature review report...', cls:'', step:4, papers:45, depth:2, nodes:45, contra:5, progress:94 },
    { ts:'00:57', msg:'Report complete. Session status: done.', cls:'success', step:4, papers:45, depth:2, nodes:45, contra:5, progress:100 },
  ],

  report: {
    executive_summary: [
      "The global energy transition toward renewables has accelerated dramatically, with solar and wind now the cheapest sources of new electricity generation in over 90% of the world. However, the path to full decarbonisation remains contested — particularly around the feasibility of 100% renewable grids, the role of nuclear energy, and the scalability of grid-scale energy storage. Publication volume in this space has increased 220% over four years.",
      "This review synthesises 45 papers across five clusters: solar photovoltaics, wind energy, grid-scale storage (batteries & hydrogen), carbon capture & sequestration, and energy system modelling. The field is characterised by rapid cost declines in hardware but persistent integration challenges — intermittency, grid stability, and land-use conflicts remain unresolved at scale.",
      "The most significant gap is the absence of integrated models that combine techno-economic analysis with social acceptance and environmental justice factors. Frontier directions converge on perovskite-silicon tandem solar cells, green hydrogen for industrial decarbonisation, and AI-optimised grid management for high-renewable penetration scenarios."
    ],
    field_snapshot: [
      { label:'Maturity', value:'Mature (generation) / Adolescent (storage)', cls:'snap-val--amber' },
      { label:'Velocity', value:'Rapid deployment', cls:'snap-val--green' },
      { label:'Consensus', value:'Partially aligned', cls:'snap-val--amber' },
      { label:'Total papers', value:'45', cls:'' },
      { label:'Top technology', value:'Perovskite-Si tandem', cls:'' },
      { label:'Top challenge', value:'Grid-scale storage', cls:'' },
      { label:'Top metric', value:'LCOE ($/MWh)', cls:'' },
      { label:'Pub trend', value:'+220% (4yr)', cls:'snap-val--green' },
    ],
    contradictions: [
      { id:'c1', paper_a:'Jacobson et al. 2023', paper_b:'Heard et al. 2024', claim_a:'100% renewable energy grids are technically and economically feasible across all major economies by 2050 using existing technologies.', claim_b:'100% renewables is infeasible without nuclear baseload or massive over-building; grid stability requires firm, dispatchable power sources.', severity:'HIGH', year_gap:1, implication:'Policy decisions worth trillions of dollars hinge on this unresolved technical debate. Integrated modelling with realistic constraints is urgently needed.' },
      { id:'c2', paper_a:'Green et al. 2023', paper_b:'Jean et al. 2024', claim_a:'Perovskite-silicon tandem cells will achieve >33% efficiency commercially by 2027, disrupting the solar industry.', claim_b:'Perovskite stability under real-world conditions remains unproven — degradation rates 10× higher than crystalline silicon after 2-year field tests.', severity:'MEDIUM', year_gap:1, implication:'The perovskite hype cycle may be ahead of the science. Long-term field data is critical before commercial scaling.' },
      { id:'c3', paper_a:'IEA 2023', paper_b:'Howarth 2024', claim_a:'Blue hydrogen (from natural gas with carbon capture) is a viable bridge fuel for industrial decarbonisation.', claim_b:'Lifecycle methane emissions from blue hydrogen make it worse for climate than direct natural gas use — only green hydrogen is truly clean.', severity:'HIGH', year_gap:1, implication:'Billions in hydrogen investment may be misdirected. Full lifecycle emissions accounting must become standard.' },
    ],
    research_gaps: [
      { area:'Long-duration energy storage (>100h)', desc:'Li-ion batteries cover 4-hour storage. No technology has demonstrated cost-effective storage at 100+ hour durations for seasonal balancing.', opportunity_score:9.0, why_missing:'Iron-air, compressed air, and flow batteries are all pre-commercial; no field data at grid scale.', suggested_methodology:'Pilot-scale demonstrations of iron-air and vanadium flow batteries with 10-year cost projections.' },
      { area:'Social acceptance of renewable infrastructure', desc:'Only 3 of 45 papers address community opposition to wind farms, solar installations, or transmission lines — a major deployment bottleneck.', opportunity_score:8.0, why_missing:'Engineering-dominated literature ignores social science. Interdisciplinary research funding is scarce.', suggested_methodology:'Mixed-methods studies combining GIS siting analysis, community surveys, and procedural justice frameworks.' },
      { area:'Perovskite long-term field stability', desc:'Lab efficiency records abound but <5 papers report outdoor degradation data beyond 1 year. Commercial viability requires 25-year warranties.', opportunity_score:7.5, why_missing:'Field testing is slow and unglamorous; publication incentives favour efficiency records.', suggested_methodology:'Standardised outdoor test protocols at multiple climate zones with quarterly characterisation.' },
      { area:'Green hydrogen cost reduction', desc:'Electrolyser costs must fall 60–80% for green hydrogen to compete with grey/blue hydrogen. Current production costs: $4–6/kg vs target $1–2/kg.', opportunity_score:7.0, why_missing:'Electrolyser manufacturing is scaling but not yet benefiting from solar-like learning curves.', suggested_methodology:'Techno-economic analysis of manufacturing scale-up scenarios with learning-curve modelling.' },
      { area:'Grid AI optimisation', desc:'AI-driven grid management for >80% renewable penetration is largely theoretical. Deployment examples are utility-internal and unpublished.', opportunity_score:6.5, why_missing:'Utilities treat grid operations as proprietary; academic researchers lack access to real-time grid data.', suggested_methodology:'Open-source grid simulation environments with realistic renewable variability and reinforcement learning agents.' },
    ],
    trends: [
      { name:'Perovskite tandem solar cells', direction:'rising', projection:'Projected to reach commercial production by 2028, but stability concerns could delay by 2–3 years.' },
      { name:'Green hydrogen', direction:'rising', projection:'$300B+ in announced global investments. Policy mandates (EU, US IRA) accelerating deployment.' },
      { name:'Li-ion grid storage', direction:'rising', projection:'Costs declined 90% in a decade. Now standard for 2–4 hour grid storage.' },
      { name:'Carbon capture & storage (CCS)', direction:'stable', projection:'Persistent viability debates. Only 30 large-scale CCS plants operational globally, far below IPCC scenarios.' },
      { name:'Nuclear energy (new build)', direction:'rising', projection:'SMRs (small modular reactors) gaining policy support. Public perception shifting post-energy-crisis.' },
    ],
    frontier_directions: [
      { title:'Iron-air batteries for seasonal grid storage', rationale:'Addresses the 100+ hour storage gap. Iron is abundant and cheap. Form Energy has demonstrated 100-hour prototypes.', impact_score:9, difficulty:'HIGH' },
      { title:'Perovskite-silicon tandems with 25-year stability', rationale:'Resolves the efficiency-stability contradiction. Would accelerate solar LCOE below $10/MWh.', impact_score:8, difficulty:'HIGH' },
      { title:'AI-optimised grid management for >90% renewables', rationale:'Enables high renewable penetration without nuclear baseload. Combines RL, forecasting, and demand response.', impact_score:8, difficulty:'MEDIUM' },
    ],
    methodology_table: [
      { paper:'Jacobson et al.', year:2023, method:'Integrated energy model (LOADMATCH)', dataset:'139-country grid data', metric:'Feasibility (%)', result:'100% by 2050' },
      { paper:'Heard et al.', year:2024, method:'Systematic review / critique', dataset:'24 modelling studies', metric:'Feasibility assessment', result:'Infeasible' },
      { paper:'Green et al.', year:2023, method:'Perovskite-Si tandem', dataset:'Lab cells', metric:'Efficiency (%)', result:'33.7%' },
      { paper:'Jean et al.', year:2024, method:'Outdoor degradation study', dataset:'6 climate zones', metric:'Degradation (%/yr)', result:'3.2%' },
      { paper:'IEA', year:2023, method:'Lifecycle analysis', dataset:'Global H₂ projects', metric:'CO₂e/kg H₂', result:'2.1 (blue)' },
      { paper:'Howarth', year:2024, method:'Full lifecycle (incl. methane)', dataset:'US natural gas', metric:'GHG vs natural gas', result:'+20% worse' },
      { paper:'Ziegler & Trancik', year:2023, method:'Cost projection model', dataset:'100yr storage', metric:'$/kWh (LCOS)', result:'$20–50' },
      { paper:'Form Energy', year:2024, method:'Iron-air prototype', dataset:'Pilot plant', metric:'Duration (hours)', result:'100' },
    ],
    citation_index: [
      { num:1, title:'100% clean and renewable wind, water, and sunlight all-sector energy roadmaps', authors:'Jacobson, M.Z., et al.', year:2023, doi:'10.1016/j.joule.2023.01.001' },
      { num:2, title:'Burden of proof: A comprehensive review of the feasibility of 100% renewable-electricity systems', authors:'Heard, B.P., et al.', year:2024, doi:'10.1016/j.rser.2024.02.001' },
      { num:3, title:'Perovskite-silicon tandem solar cells: a pathway to >30% efficiency', authors:'Green, M.A., et al.', year:2023, doi:'10.1038/s41560-023-01234-5' },
      { num:4, title:'Outdoor stability of perovskite solar cells: a multi-climate analysis', authors:'Jean, J., et al.', year:2024, doi:'10.1016/j.joule.2024.03.014' },
      { num:5, title:'Global Hydrogen Review 2023', authors:'International Energy Agency', year:2023, doi:'10.1787/iea-ghr-2023' },
      { num:6, title:'How green is blue hydrogen?', authors:'Howarth, R.W.', year:2024, doi:'10.1039/D4EE00234B' },
    ],
  },

  graph_nodes: [
    { node_id:'p1', label:'Jacobson 2023', type:'paper', cluster_id:0 },
    { node_id:'p2', label:'Heard 2024', type:'paper', cluster_id:0 },
    { node_id:'p3', label:'Green 2023', type:'paper', cluster_id:1 },
    { node_id:'p4', label:'Jean 2024', type:'paper', cluster_id:1 },
    { node_id:'p5', label:'IEA H₂ 2023', type:'paper', cluster_id:2 },
    { node_id:'p6', label:'Howarth 2024', type:'paper', cluster_id:2 },
    { node_id:'p7', label:'Ziegler 2023', type:'paper', cluster_id:3 },
    { node_id:'p8', label:'Form Energy 2024', type:'paper', cluster_id:3 },
    { node_id:'p9', label:'IPCC AR6 2023', type:'paper', cluster_id:4 },
    { node_id:'p10', label:'Lazard LCOE 2024', type:'paper', cluster_id:4 },
    { node_id:'m1', label:'Energy modelling', type:'method', cluster_id:0 },
    { node_id:'m2', label:'Perovskite tandem', type:'method', cluster_id:1 },
    { node_id:'m3', label:'Electrolysis', type:'method', cluster_id:2 },
    { node_id:'m4', label:'Iron-air battery', type:'method', cluster_id:3 },
    { node_id:'c1', label:'LCOE', type:'concept', cluster_id:4 },
    { node_id:'c2', label:'Grid stability', type:'concept', cluster_id:0 },
    { node_id:'c3', label:'Degradation rate', type:'concept', cluster_id:1 },
    { node_id:'c4', label:'Lifecycle emissions', type:'concept', cluster_id:2 },
    { node_id:'c5', label:'Storage duration', type:'concept', cluster_id:3 },
  ],
  graph_edges: [
    { source_id:'p1', target_id:'p2', relationship_type:'contradicts', reason:'100% renewables feasibility debate', contradiction_id:'c1' },
    { source_id:'p3', target_id:'p4', relationship_type:'contradicts', reason:'Perovskite efficiency vs stability', contradiction_id:'c2' },
    { source_id:'p5', target_id:'p6', relationship_type:'contradicts', reason:'Blue vs green hydrogen lifecycle emissions', contradiction_id:'c3' },
    { source_id:'p1', target_id:'m1', relationship_type:'cites_concept', reason:'Uses integrated energy model' },
    { source_id:'p3', target_id:'m2', relationship_type:'cites_concept', reason:'Develops perovskite tandem cells' },
    { source_id:'p5', target_id:'m3', relationship_type:'cites_concept', reason:'Analyses electrolysis pathways' },
    { source_id:'p8', target_id:'m4', relationship_type:'cites_concept', reason:'Iron-air battery prototype' },
    { source_id:'p7', target_id:'c5', relationship_type:'cites_concept', reason:'Long-duration storage cost analysis' },
    { source_id:'p10', target_id:'c1', relationship_type:'cites_concept', reason:'Benchmark LCOE data' },
    { source_id:'p1', target_id:'c2', relationship_type:'cites_concept', reason:'Models grid stability at 100% renewables' },
    { source_id:'p4', target_id:'c3', relationship_type:'cites_concept', reason:'Measures outdoor degradation' },
    { source_id:'p6', target_id:'c4', relationship_type:'cites_concept', reason:'Full lifecycle GHG accounting' },
    { source_id:'p9', target_id:'p1', relationship_type:'supports', reason:'IPCC scenarios include 100% renewables pathway' },
    { source_id:'p8', target_id:'p7', relationship_type:'extends', reason:'Demonstrates prototype for long-duration storage projections' },
    { source_id:'p10', target_id:'p3', relationship_type:'supports', reason:'Solar LCOE data supports perovskite cost projections' },
  ],

  representations: {
    slides: [
      { slide_number:1, title:'ResearchPulse: Climate & Renewable Energy', bullets:['45 papers · 5 clusters · 90-second analysis','Focus: solar, wind, storage, hydrogen, policy','5 contradictions + 5 research gaps detected'], speaker_note:'Opening slide.' },
      { slide_number:2, title:'The 100% renewables debate', bullets:['Jacobson: Feasible across 139 countries by 2050','Heard: Infeasible without nuclear or massive overbuilding','Trillions in policy decisions depend on resolution'], speaker_note:'Core contradiction.' },
      { slide_number:3, title:'Perovskite solar: hype vs reality', bullets:['Lab efficiency record: 33.7% (tandem with silicon)','Field degradation: 3.2%/year vs 0.3% for crystalline Si','25-year commercial warranty seems premature'], speaker_note:'Efficiency-stability trade-off.' },
      { slide_number:4, title:'The hydrogen colour debate', bullets:['Blue hydrogen: CCS on natural gas — IEA says viable bridge fuel','Howarth: Methane leakage makes blue H₂ 20% worse than gas','Only green hydrogen (electrolysis + renewables) is truly clean'], speaker_note:'Policy implications are massive.' },
      { slide_number:5, title:'Top research gaps', bullets:['Long-duration storage (>100h) — 9.0/10','Social acceptance of renewables — 8.0/10','Perovskite field stability — 7.5/10'], speaker_note:'Opportunities.' },
      { slide_number:6, title:'Energy storage landscape', bullets:['Li-ion: solved 2–4 hour storage (90% cost decline)','Iron-air: 100-hour prototype demonstrated','Gap: no cost-effective seasonal (~1000h) storage'], speaker_note:'Storage hierarchy.' },
      { slide_number:7, title:'Trends', bullets:['Perovskite tandems — rising rapidly','Green hydrogen — $300B+ committed globally','Carbon capture — stagnant, only 30 large plants'], speaker_note:'Trend summary.' },
      { slide_number:8, title:'Frontier directions', bullets:['Iron-air batteries for seasonal storage (9/10)','25-year stable perovskite-Si tandems (8/10)','AI grid management for >90% renewables (8/10)'], speaker_note:'Close with actionable directions.' },
    ],
    flashcards: [
      { id:1, front:'What is LCOE?', back:'Levelized Cost of Energy — the total lifecycle cost of building and operating a power plant divided by total energy output. Measured in $/MWh.' },
      { id:2, front:'Can the grid run on 100% renewables?', back:'Fiercely debated. Jacobson says yes with existing tech; Heard says no without nuclear or massive overbuilding. Depends on storage and transmission assumptions.' },
      { id:3, front:'What are perovskite-silicon tandem solar cells?', back:'Solar cells stacking a perovskite layer (absorbs blue/green light) on silicon (absorbs red/infrared), achieving >33% efficiency vs ~26% for silicon alone.' },
      { id:4, front:'Why is blue hydrogen controversial?', back:'Blue H₂ uses natural gas with carbon capture. But lifecycle methane leakage may make it worse for climate than burning gas directly (Howarth 2024).' },
      { id:5, front:'What is long-duration energy storage?', back:'Storage lasting >100 hours, needed for seasonal balancing. Li-ion handles 2–4h. Iron-air, compressed air, and flow batteries are candidates for longer durations.' },
      { id:6, front:'What has driven solar cost declines?', back:'Manufacturing scale-up, learning-curve effects, and Chinese industrial policy. LCOE dropped from ~$350/MWh (2010) to ~$30/MWh (2024).' },
      { id:7, front:'What is the perovskite stability problem?', back:'Perovskite cells degrade at ~3.2%/year outdoors vs ~0.3% for silicon. Cannot reach the 25-year warranty needed for commercial deployment.' },
      { id:8, front:'What is green hydrogen?', back:'Hydrogen produced by splitting water using renewable electricity (electrolysis). Currently $4–6/kg, needs to reach $1–2/kg for competitiveness.' },
      { id:9, front:'How many CCS plants exist globally?', back:'Only ~30 large-scale CCS facilities are operational — far below the 2,000+ needed in IPCC net-zero scenarios.' },
      { id:10, front:'What are the three frontier research directions?', back:'(1) Iron-air batteries for seasonal storage. (2) Perovskite-Si tandems with 25-year stability. (3) AI-optimised grid management for >90% renewables.' },
    ],
    mindmap: {
      root: 'Climate & Renewable Energy',
      branches: [
        { label:'Solar photovoltaics', children: [
          { label:'Green et al. 2023', finding:'Perovskite-Si tandem achieves 33.7% lab efficiency' },
          { label:'Jean et al. 2024', finding:'Outdoor perovskite degradation 10× worse than silicon' },
          { label:'Lazard 2024', finding:'Solar LCOE now lowest of all energy sources globally' },
        ]},
        { label:'Energy storage', children: [
          { label:'Ziegler & Trancik 2023', finding:'Long-duration storage needs $20–50/kWh to be viable' },
          { label:'Form Energy 2024', finding:'Iron-air battery prototype demonstrates 100-hour duration' },
        ]},
        { label:'Hydrogen economy', children: [
          { label:'IEA 2023', finding:'Blue hydrogen has CO₂e of 2.1 kg/kg H₂ with CCS' },
          { label:'Howarth 2024', finding:'Full lifecycle: blue hydrogen 20% worse than natural gas' },
        ]},
        { label:'Grid modelling', children: [
          { label:'Jacobson et al. 2023', finding:'100% renewables feasible in 139 countries by 2050' },
          { label:'Heard et al. 2024', finding:'100% renewables infeasible without firm power sources' },
        ]},
        { label:'Policy & deployment', children: [
          { label:'IPCC AR6 2023', finding:'1.5°C pathway requires 60% renewables by 2030' },
          { label:'US IRA', finding:'$369B in clean energy investments accelerating deployment' },
        ]},
      ]
    }
  }
};

// ─────────────────────────────────────────────────────────────────
// 4. AUTONOMOUS VEHICLES
// ─────────────────────────────────────────────────────────────────
MOCK_DOMAINS['autonomous'] = {
  keywords: ['autonomous','self-driving','vehicle','lidar','waymo','tesla','autopilot','driving','car','robotaxi','adas','perception'],
  session_id: 'mock_av_' + Math.random().toString(36).slice(2,9),

  log_steps: [
    { ts:'00:00', msg:'Session initialised. Agent starting...', cls:'dim', step:0, papers:0, depth:1, nodes:0, contra:0, progress:5 },
    { ts:'00:02', msg:'Depth 1: Fetching papers from Semantic Scholar...', cls:'', step:0, papers:9, depth:1, nodes:0, contra:0, progress:12 },
    { ts:'00:05', msg:'Depth 1: Fetching papers from IEEE / arXiv (cs.RO)...', cls:'', step:0, papers:20, depth:1, nodes:0, contra:0, progress:20 },
    { ts:'00:08', msg:'Depth 1: 26 papers indexed. Building coverage map...', cls:'', step:0, papers:26, depth:1, nodes:0, contra:0, progress:26 },
    { ts:'00:11', msg:'AI evaluating coverage → Cluster "V2X communication" has <3 papers', cls:'ai-decision', step:1, papers:26, depth:1, nodes:0, contra:0, progress:32 },
    { ts:'00:12', msg:'AI decision: should_expand=true  expand_terms=["V2X edge computing","end-to-end autonomous driving"]', cls:'ai-expand', step:1, papers:26, depth:1, nodes:0, contra:0, progress:37 },
    { ts:'00:15', msg:'Depth 2: Fetching 16 more papers on expanded terms...', cls:'', step:1, papers:42, depth:2, nodes:0, contra:0, progress:44 },
    { ts:'00:19', msg:'AI evaluating coverage → All clusters sufficiently covered', cls:'ai-decision', step:1, papers:42, depth:2, nodes:0, contra:0, progress:50 },
    { ts:'00:20', msg:'AI: Coverage sufficient. Stopping search loop.', cls:'success', step:1, papers:42, depth:2, nodes:0, contra:0, progress:54 },
    { ts:'00:23', msg:'Building knowledge graph: clustering 42 papers...', cls:'', step:2, papers:42, depth:2, nodes:20, contra:0, progress:60 },
    { ts:'00:27', msg:'Knowledge graph complete: 42 nodes · 58 edges · 5 clusters', cls:'success', step:2, papers:42, depth:2, nodes:42, contra:0, progress:67 },
    { ts:'00:30', msg:'Detecting contradictions across paper pairs...', cls:'', step:3, papers:42, depth:2, nodes:42, contra:2, progress:72 },
    { ts:'00:34', msg:'Contradiction: LiDAR-centric vs vision-only perception debate [HIGH]', cls:'ai-decision', step:3, papers:42, depth:2, nodes:42, contra:4, progress:78 },
    { ts:'00:38', msg:'Analysing research gaps and trend directions...', cls:'', step:3, papers:42, depth:2, nodes:42, contra:5, progress:83 },
    { ts:'00:44', msg:'Synthesising frontier directions from contradictions + gaps...', cls:'ai-decision', step:3, papers:42, depth:2, nodes:42, contra:5, progress:88 },
    { ts:'00:50', msg:'Assembling publication-grade literature review report...', cls:'', step:4, papers:42, depth:2, nodes:42, contra:5, progress:94 },
    { ts:'00:57', msg:'Report complete. Session status: done.', cls:'success', step:4, papers:42, depth:2, nodes:42, contra:5, progress:100 },
  ],

  report: {
    executive_summary: [
      "Autonomous vehicle research sits at a critical inflection point between controlled demonstrations and real-world deployment at scale. The industry has invested over $200B cumulatively, yet fully driverless (SAE Level 4) commercial services remain limited to small geofenced areas. The most contentious debate is the sensor paradigm: LiDAR-centric multi-sensor fusion (Waymo, Cruise) versus vision-only approaches (Tesla). Publication volume grew 190% over four years.",
      "This review synthesises 42 papers across five clusters: perception & sensor fusion, planning & decision-making, end-to-end learning, simulation & testing, and V2X communication. The field shows a striking gap between academic benchmarks and real-world deployment safety — most papers evaluate on curated datasets (nuScenes, Waymo Open) that underrepresent edge cases like construction zones, adverse weather, and adversarial scenarios.",
      "The most significant research gap is the absence of standardised safety evaluation frameworks for comparing autonomous driving systems across different operational design domains. Frontier directions converge on world-model-based planning, adversarial robustness testing at scale, and hybrid LiDAR-vision systems optimised for cost-performance trade-offs."
    ],
    field_snapshot: [
      { label:'Maturity', value:'Late adolescent', cls:'snap-val--amber' },
      { label:'Velocity', value:'Decelerating (hype correction)', cls:'snap-val--amber' },
      { label:'Consensus', value:'Highly contested', cls:'snap-val--red' },
      { label:'Total papers', value:'42', cls:'' },
      { label:'Top method', value:'Transformer-based perception', cls:'' },
      { label:'Top dataset', value:'nuScenes / Waymo Open', cls:'' },
      { label:'Top metric', value:'mAP / collision rate', cls:'' },
      { label:'Pub trend', value:'+190% (4yr)', cls:'snap-val--green' },
    ],
    contradictions: [
      { id:'c1', paper_a:'Sun et al. (Waymo) 2023', paper_b:'Tesla AI Day 2024', claim_a:'LiDAR-centric multi-sensor fusion achieves the highest safety margins — 0.06 contact events per million miles in driverless operation.', claim_b:'Vision-only systems with sufficient training data and compute match or exceed LiDAR systems at 1/10th the sensor cost, enabling mass-market deployment.', severity:'HIGH', year_gap:1, implication:'The sensor paradigm debate has billion-dollar implications. Resolution requires controlled head-to-head testing in identical conditions.' },
      { id:'c2', paper_a:'Hu et al. 2023', paper_b:'Dauner et al. 2024', claim_a:'End-to-end learned driving (perception to control in a single neural network) outperforms modular pipeline architectures on nuScenes planning benchmarks.', claim_b:'Modular architectures with explicit intermediate representations are more interpretable, debuggable, and safer — end-to-end systems fail unpredictably on novel scenarios.', severity:'HIGH', year_gap:1, implication:'The end-to-end vs modular debate parallels the broader AI safety tension. Interpretability may be non-negotiable for safety-critical systems.' },
      { id:'c3', paper_a:'Feng et al. 2023', paper_b:'NHTSA 2024', claim_a:'Simulation testing with billions of virtual miles provides statistically meaningful safety validation equivalent to real-world driving.', claim_b:'Simulated environments systematically underrepresent the long tail of real-world scenarios. No amount of simulation substitutes for real-world validation.', severity:'MEDIUM', year_gap:1, implication:'Regulatory frameworks must determine how to weight simulation vs real-world testing for safety certification.' },
    ],
    research_gaps: [
      { area:'Standardised AV safety benchmarks', desc:'No agreed framework exists for comparing autonomous driving systems across ODD (operational design domain). Each company uses proprietary safety metrics.', opportunity_score:9.0, why_missing:'Competitive dynamics: companies guard safety data. Regulators lack technical capacity to define standards.', suggested_methodology:'Public-private consortium to establish ODD-specific scenario libraries and standardised safety metrics.' },
      { area:'Adverse weather perception', desc:'Fewer than 8% of papers evaluate perception in rain, snow, fog, or nighttime. Most datasets are collected in California sunshine.', opportunity_score:8.0, why_missing:'Labelled adverse-weather datasets are rare and expensive to collect. Hardware performance degrades substantially.', suggested_methodology:'Multi-weather perception datasets from Nordic/monsoon regions with paired LiDAR and camera annotations.' },
      { area:'Pedestrian intention prediction', desc:'Autonomous vehicles must predict whether pedestrians will cross, stop, or change direction. Current models have ~65% accuracy for non-trivial scenarios.', opportunity_score:7.5, why_missing:'Pedestrian behaviour is inherently stochastic. Social context, eye contact, and cultural norms are hard to model.', suggested_methodology:'Graph neural networks with social force models trained on multi-cultural pedestrian behaviour datasets.' },
      { area:'Cost-optimised sensor suites', desc:'The industry has not converged on the minimum sensor configuration for Level 4 safety. LiDAR costs remain a barrier to consumer AV deployment.', opportunity_score:7.0, why_missing:'Sensor selection is entangled with proprietary system architectures. Publishing cost-performance trade-offs reveals competitive information.', suggested_methodology:'Public benchmarking of degraded sensor configurations (camera-only, LiDAR-only, hybrid) on identical scenarios.' },
      { area:'AV ethics and liability frameworks', desc:'Trolley-problem scenarios are over-studied but real ethical challenges (risk distribution, data privacy, employment impact) are under-explored.', opportunity_score:6.5, why_missing:'Technical researchers avoid normative questions; ethicists lack access to AV system internals.', suggested_methodology:'Interdisciplinary workshops producing actionable policy recommendations grounded in real deployment data.' },
    ],
    trends: [
      { name:'End-to-end learned driving', direction:'rising', projection:'Dominant research direction — NVIDIA, Wayve, and Tesla all investing heavily. But safety concerns may limit deployment.' },
      { name:'LiDAR cost reduction', direction:'rising', projection:'Solid-state LiDAR costs dropping from $10K to <$500 per unit. May neutralise the cost argument for vision-only.' },
      { name:'World models for planning', direction:'rising', projection:'Foundation models for driving (GAIA-1, DriveDreamer) using video prediction for planning — nascent but promising.' },
      { name:'Geofenced robotaxis', direction:'stable', projection:'Waymo and Baidu operating commercially in limited areas. Expansion is slow due to edge-case safety challenges.' },
      { name:'V2X communication', direction:'stable', projection:'Standardisation (C-V2X) progressing but infrastructure deployment lags. May become critical for intersection safety.' },
    ],
    frontier_directions: [
      { title:'World-model-based planning for autonomous driving', rationale:'Replaces handcrafted planning rules with learned world models that predict future states. Addresses the long-tail problem by generalising from experience.', impact_score:9, difficulty:'HIGH' },
      { title:'Adversarial robustness testing at scale', rationale:'Systematically generates edge cases that stress-test perception and planning. Essential for safety certification beyond simulation.', impact_score:8, difficulty:'MEDIUM' },
      { title:'Hybrid LiDAR-vision optimised for cost and safety', rationale:'Bridges the sensor debate by finding the Pareto-optimal sensor configuration for each ODD.', impact_score:7, difficulty:'MEDIUM' },
    ],
    methodology_table: [
      { paper:'Sun et al. (Waymo)', year:2023, method:'LiDAR-camera fusion + HD map', dataset:'Waymo internal', metric:'Contact events/M miles', result:'0.06' },
      { paper:'Tesla AI Day', year:2024, method:'Vision-only (8 cameras + FSD)', dataset:'Tesla fleet data', metric:'Interventions/1K miles', result:'0.18' },
      { paper:'Hu et al. (UniAD)', year:2023, method:'End-to-end transformer', dataset:'nuScenes', metric:'L2 error (3s)', result:'1.03m' },
      { paper:'Dauner et al.', year:2024, method:'Modular pipeline', dataset:'nuScenes', metric:'L2 error (3s)', result:'1.15m' },
      { paper:'Feng et al.', year:2023, method:'Sim-to-real validation', dataset:'CARLA + real-world', metric:'Scenario coverage (%)', result:'94%' },
      { paper:'NHTSA', year:2024, method:'Regulatory analysis', dataset:'US crash reports', metric:'Safety equivalence', result:'Insufficient data' },
      { paper:'Li et al.', year:2023, method:'BEVFormer perception', dataset:'nuScenes / Waymo', metric:'mAP (3D detection)', result:'0.72' },
      { paper:'GAIA-1 (Wayve)', year:2024, method:'World model (video generation)', dataset:'UK driving data', metric:'FVD / action accuracy', result:'42.3 / 87%' },
    ],
    citation_index: [
      { num:1, title:'Scalyr: fifth-gen Waymo driver perception and prediction system', authors:'Sun, P., et al. (Waymo)', year:2023, doi:'10.1109/CVPR.2023.14532' },
      { num:2, title:'FSD v12: scaling vision-only autonomous driving', authors:'Tesla AI', year:2024, doi:'N/A (technical report)' },
      { num:3, title:'Planning-oriented autonomous driving (UniAD)', authors:'Hu, Y., et al.', year:2023, doi:'10.1109/CVPR.2023.17853' },
      { num:4, title:'Parting with misconceptions about learning-based vehicle motion planning', authors:'Dauner, D., et al.', year:2024, doi:'10.48550/arXiv.2306.07962' },
      { num:5, title:'Dense reinforcement learning for safety validation of autonomous vehicles', authors:'Feng, S., et al.', year:2023, doi:'10.1038/s41586-023-05732-2' },
      { num:6, title:'Standing General Order on ADS-Equipped Vehicle Incident Reporting', authors:'NHTSA', year:2024, doi:'N/A (regulatory report)' },
    ],
  },

  graph_nodes: [
    { node_id:'p1', label:'Waymo Scalyr 2023', type:'paper', cluster_id:0 },
    { node_id:'p2', label:'Tesla FSD v12', type:'paper', cluster_id:0 },
    { node_id:'p3', label:'Hu (UniAD) 2023', type:'paper', cluster_id:1 },
    { node_id:'p4', label:'Dauner 2024', type:'paper', cluster_id:1 },
    { node_id:'p5', label:'Feng 2023', type:'paper', cluster_id:2 },
    { node_id:'p6', label:'NHTSA 2024', type:'paper', cluster_id:2 },
    { node_id:'p7', label:'Li (BEVFormer) 2023', type:'paper', cluster_id:3 },
    { node_id:'p8', label:'GAIA-1 (Wayve) 2024', type:'paper', cluster_id:3 },
    { node_id:'p9', label:'Caesar (nuScenes) 2022', type:'paper', cluster_id:4 },
    { node_id:'p10', label:'Zhou et al. 2023', type:'paper', cluster_id:4 },
    { node_id:'m1', label:'LiDAR fusion', type:'method', cluster_id:0 },
    { node_id:'m2', label:'End-to-end learning', type:'method', cluster_id:1 },
    { node_id:'m3', label:'Simulation testing', type:'method', cluster_id:2 },
    { node_id:'m4', label:'World models', type:'method', cluster_id:3 },
    { node_id:'c1', label:'Safety metrics', type:'concept', cluster_id:2 },
    { node_id:'c2', label:'Sensor cost', type:'concept', cluster_id:0 },
    { node_id:'c3', label:'Interpretability', type:'concept', cluster_id:1 },
    { node_id:'c4', label:'BEV representation', type:'concept', cluster_id:3 },
    { node_id:'c5', label:'Edge cases', type:'concept', cluster_id:4 },
  ],
  graph_edges: [
    { source_id:'p1', target_id:'p2', relationship_type:'contradicts', reason:'LiDAR fusion vs vision-only perception', contradiction_id:'c1' },
    { source_id:'p3', target_id:'p4', relationship_type:'contradicts', reason:'End-to-end vs modular pipeline', contradiction_id:'c2' },
    { source_id:'p5', target_id:'p6', relationship_type:'contradicts', reason:'Simulation vs real-world testing sufficiency', contradiction_id:'c3' },
    { source_id:'p1', target_id:'m1', relationship_type:'cites_concept', reason:'LiDAR-camera fusion system' },
    { source_id:'p3', target_id:'m2', relationship_type:'cites_concept', reason:'End-to-end architecture' },
    { source_id:'p5', target_id:'m3', relationship_type:'cites_concept', reason:'Simulation-based testing' },
    { source_id:'p8', target_id:'m4', relationship_type:'cites_concept', reason:'World model for planning' },
    { source_id:'p7', target_id:'c4', relationship_type:'cites_concept', reason:'BEV perception representation' },
    { source_id:'p2', target_id:'c2', relationship_type:'cites_concept', reason:'Cost advantage of vision-only' },
    { source_id:'p4', target_id:'c3', relationship_type:'cites_concept', reason:'Argues for interpretable modules' },
    { source_id:'p6', target_id:'c1', relationship_type:'cites_concept', reason:'Regulatory safety metrics' },
    { source_id:'p7', target_id:'p3', relationship_type:'extends', reason:'BEV perception feeds into end-to-end planning' },
    { source_id:'p8', target_id:'p3', relationship_type:'extends', reason:'World model extends end-to-end paradigm' },
    { source_id:'p9', target_id:'c5', relationship_type:'cites_concept', reason:'Benchmark dataset for edge cases' },
    { source_id:'p10', target_id:'p9', relationship_type:'extends', reason:'Expands nuScenes with adverse weather annotations' },
  ],

  representations: {
    slides: [
      { slide_number:1, title:'ResearchPulse: Autonomous Vehicles', bullets:['42 papers · 5 clusters · 90-second analysis','Focus: perception, planning, safety, sensors','5 contradictions + 5 research gaps detected'], speaker_note:'Opening.' },
      { slide_number:2, title:'The $200B question: LiDAR vs vision-only', bullets:['Waymo: LiDAR fusion — 0.06 contacts/M miles','Tesla: Vision-only — deployable at mass-market cost','No controlled head-to-head comparison exists'], speaker_note:'Core industry debate.' },
      { slide_number:3, title:'End-to-end vs modular systems', bullets:['UniAD: Single neural net outperforms on benchmarks','Dauner: Modular is safer, more debuggable','Safety-critical interpretability may be non-negotiable'], speaker_note:'Architecture debate.' },
      { slide_number:4, title:'Simulation vs real-world testing', bullets:['Billions of simulated miles vs real edge cases','NHTSA: Sim cannot substitute real-world validation','Regulatory frameworks must decide how to weight each'], speaker_note:'Testing paradigm.' },
      { slide_number:5, title:'Top research gaps', bullets:['Standardised AV safety benchmarks — 9.0/10','Adverse weather perception — 8.0/10','Pedestrian intention prediction — 7.5/10'], speaker_note:'Gaps and opportunities.' },
      { slide_number:6, title:'World models: the next frontier', bullets:['GAIA-1: Video prediction for driving planning','Learns physics + road rules from data','Could solve the long-tail edge case problem'], speaker_note:'Emerging paradigm.' },
      { slide_number:7, title:'Trends', bullets:['End-to-end learning — rising fast','LiDAR cost declining (from $10K to <$500)','Geofenced robotaxis — stable, slow expansion'], speaker_note:'Trend summary.' },
      { slide_number:8, title:'Frontier directions', bullets:['World-model planning (9/10)','Adversarial robustness testing at scale (8/10)','Hybrid LiDAR-vision cost optimisation (7/10)'], speaker_note:'Actionable frontiers.' },
    ],
    flashcards: [
      { id:1, front:'What are the SAE autonomy levels?', back:'Level 0: No automation. L1: Driver assistance. L2: Partial. L3: Conditional. L4: High (geofenced). L5: Full (anywhere). Most current systems are L2 or L4-geofenced.' },
      { id:2, front:'LiDAR vs vision-only: what\'s the debate?', back:'Waymo uses LiDAR (precise 3D sensing, expensive). Tesla uses cameras only (cheaper, scalable, but relies on massive training data). No controlled comparison exists.' },
      { id:3, front:'What is end-to-end autonomous driving?', back:'A single neural network that takes raw sensor input and directly outputs driving commands, bypassing separate perception/planning/control modules.' },
      { id:4, front:'Why is adverse weather a major gap?', back:'<8% of AV papers test in rain/snow/fog. Most datasets come from California sunshine. Real deployment requires all-weather reliability.' },
      { id:5, front:'What is a world model in AV context?', back:'A neural network that predicts future states of the driving environment (physics, agent behavior). Used for planning by imagining consequences of actions.' },
      { id:6, front:'What is BEV (Bird\'s Eye View) representation?', back:'A top-down 2D representation that fuses camera images into a unified spatial map. Enables joint reasoning about all objects around the vehicle.' },
      { id:7, front:'Why is pedestrian prediction hard?', back:'Pedestrian behavior is inherently stochastic — influenced by eye contact, phone use, cultural norms, and social context that cameras can\'t fully capture.' },
      { id:8, front:'What are the Waymo safety metrics?', back:'Contact events per million miles. Waymo reports 0.06 in fully driverless mode — but only in geofenced areas of Phoenix and San Francisco.' },
      { id:9, front:'What is the simulation vs real-world testing debate?', back:'Simulations can run billions of miles but systematically miss rare real-world events. NHTSA says simulation alone is insufficient for safety certification.' },
      { id:10, front:'What are the three frontier directions?', back:'(1) World-model-based planning. (2) Adversarial robustness testing at scale. (3) Cost-optimised hybrid LiDAR-vision sensor suites.' },
    ],
    mindmap: {
      root: 'Autonomous Vehicles',
      branches: [
        { label:'Perception & sensors', children: [
          { label:'Waymo Scalyr 2023', finding:'LiDAR-camera fusion — 0.06 contacts per million miles' },
          { label:'Tesla FSD v12 2024', finding:'Vision-only — scalable but safety data less transparent' },
          { label:'Li (BEVFormer) 2023', finding:'BEV representation achieves 0.72 mAP on nuScenes' },
        ]},
        { label:'Planning & control', children: [
          { label:'Hu (UniAD) 2023', finding:'End-to-end planning outperforms modular on benchmarks' },
          { label:'Dauner 2024', finding:'Modular pipelines safer and more interpretable' },
          { label:'GAIA-1 2024', finding:'World model for planning via video prediction' },
        ]},
        { label:'Safety & testing', children: [
          { label:'Feng 2023', finding:'Dense RL for adversarial scenario generation' },
          { label:'NHTSA 2024', finding:'Real-world validation cannot be replaced by simulation alone' },
        ]},
        { label:'Datasets & benchmarks', children: [
          { label:'nuScenes 2022', finding:'Standard multi-modal 3D detection benchmark' },
          { label:'Waymo Open Dataset', finding:'Largest public LiDAR driving dataset' },
        ]},
        { label:'V2X & infrastructure', children: [
          { label:'C-V2X standard', finding:'Cellular-based vehicle-to-everything communication' },
          { label:'Zhou et al. 2023', finding:'V2X reduces intersection collision risk by 67%' },
        ]},
      ]
    }
  }
};

// ─────────────────────────────────────────────────────────────────
// 5. NATURAL LANGUAGE PROCESSING (NLP)
// ─────────────────────────────────────────────────────────────────
MOCK_DOMAINS['nlp'] = {
  keywords: ['nlp','natural language','language model','llm','gpt','bert','transformer','text','chatbot','sentiment','translation','large language'],
  session_id: 'mock_nlp_' + Math.random().toString(36).slice(2,9),

  log_steps: [
    { ts:'00:00', msg:'Session initialised. Agent starting...', cls:'dim', step:0, papers:0, depth:1, nodes:0, contra:0, progress:5 },
    { ts:'00:02', msg:'Depth 1: Fetching papers from Semantic Scholar...', cls:'', step:0, papers:14, depth:1, nodes:0, contra:0, progress:12 },
    { ts:'00:05', msg:'Depth 1: Fetching papers from arXiv (cs.CL)...', cls:'', step:0, papers:28, depth:1, nodes:0, contra:0, progress:20 },
    { ts:'00:08', msg:'Depth 1: 35 papers indexed. Building coverage map...', cls:'', step:0, papers:35, depth:1, nodes:0, contra:0, progress:26 },
    { ts:'00:11', msg:'AI evaluating coverage → Cluster "multilingual NLP" has <3 papers', cls:'ai-decision', step:1, papers:35, depth:1, nodes:0, contra:0, progress:32 },
    { ts:'00:12', msg:'AI decision: should_expand=true  expand_terms=["multilingual LLMs","LLM reasoning evaluation"]', cls:'ai-expand', step:1, papers:35, depth:1, nodes:0, contra:0, progress:37 },
    { ts:'00:15', msg:'Depth 2: Fetching 12 more papers on expanded terms...', cls:'', step:1, papers:47, depth:2, nodes:0, contra:0, progress:44 },
    { ts:'00:19', msg:'AI evaluating coverage → All clusters sufficiently covered', cls:'ai-decision', step:1, papers:47, depth:2, nodes:0, contra:0, progress:50 },
    { ts:'00:20', msg:'AI: Coverage sufficient. Stopping search loop.', cls:'success', step:1, papers:47, depth:2, nodes:0, contra:0, progress:54 },
    { ts:'00:23', msg:'Building knowledge graph: clustering 47 papers...', cls:'', step:2, papers:47, depth:2, nodes:24, contra:0, progress:60 },
    { ts:'00:27', msg:'Knowledge graph complete: 47 nodes · 65 edges · 5 clusters', cls:'success', step:2, papers:47, depth:2, nodes:47, contra:0, progress:67 },
    { ts:'00:30', msg:'Detecting contradictions across paper pairs...', cls:'', step:3, papers:47, depth:2, nodes:47, contra:2, progress:72 },
    { ts:'00:34', msg:'Contradiction: scaling laws vs data quality — which matters more? [HIGH]', cls:'ai-decision', step:3, papers:47, depth:2, nodes:47, contra:4, progress:78 },
    { ts:'00:38', msg:'Analysing research gaps and trend directions...', cls:'', step:3, papers:47, depth:2, nodes:47, contra:5, progress:83 },
    { ts:'00:44', msg:'Synthesising frontier directions from contradictions + gaps...', cls:'ai-decision', step:3, papers:47, depth:2, nodes:47, contra:5, progress:88 },
    { ts:'00:50', msg:'Assembling publication-grade literature review report...', cls:'', step:4, papers:47, depth:2, nodes:47, contra:5, progress:94 },
    { ts:'00:57', msg:'Report complete. Session status: done.', cls:'success', step:4, papers:47, depth:2, nodes:47, contra:5, progress:100 },
  ],

  report: {
    executive_summary: [
      "Large Language Models have fundamentally transformed NLP research and the broader AI landscape. The field has undergone a paradigm shift from task-specific fine-tuned models (BERT era, 2018–2021) to general-purpose instruction-following systems (GPT-4, Claude, Gemini). Publication volume has exploded by 420% over three years, making NLP the fastest-growing sub-field of AI. The central debate now concerns whether continued scaling alone yields intelligence, or whether fundamentally new architectures and training paradigms are needed.",
      "This review synthesises 47 papers across five clusters: LLM architecture & scaling, reasoning & emergent abilities, alignment & safety, efficient inference, and multilingual/low-resource NLP. The most striking finding is the reproducibility crisis — only 12% of LLM papers provide sufficient detail to reproduce results, and compute requirements have become a major barrier to independent verification.",
      "The most significant research gap is the lack of rigorous evaluation frameworks for LLM reasoning capabilities that distinguish genuine understanding from sophisticated pattern matching. Frontier directions converge on efficient architectures (mixture-of-experts, state-space models), robust evaluation of reasoning, and multilingual foundation models for the 7,000+ languages currently unsupported."
    ],
    field_snapshot: [
      { label:'Maturity', value:'Rapid transformation', cls:'snap-val--green' },
      { label:'Velocity', value:'Explosive growth', cls:'snap-val--green' },
      { label:'Consensus', value:'Contested on reasoning', cls:'snap-val--red' },
      { label:'Total papers', value:'47', cls:'' },
      { label:'Top architecture', value:'Transformer (decoder-only)', cls:'' },
      { label:'Top benchmark', value:'MMLU / HumanEval', cls:'' },
      { label:'Top metric', value:'Accuracy / pass@k', cls:'' },
      { label:'Pub trend', value:'+420% (3yr)', cls:'snap-val--green' },
    ],
    contradictions: [
      { id:'c1', paper_a:'Kaplan et al. (OpenAI) 2023', paper_b:'Zhou et al. (LIMA) 2023', claim_a:'Scaling laws predict that performance improves log-linearly with compute, data, and parameters — scale is all you need.', claim_b:'A carefully curated 1,000-example instruction dataset (LIMA) produces GPT-4-competitive results, suggesting data quality trumps quantity at sufficient scale.', severity:'HIGH', year_gap:0, implication:'If LIMA-style curation works, the industry\'s $100B+ investment in larger models may be sub-optimal. Training methodology matters as much as raw scale.' },
      { id:'c2', paper_a:'Wei et al. (Google) 2023', paper_b:'Schaeffer et al. 2024', claim_a:'LLMs exhibit emergent abilities — qualitative capability jumps (chain-of-thought, multi-step reasoning) appear unpredictably at certain scale thresholds.', claim_b:'Emergent abilities are a mirage of evaluation metrics. Switching from accuracy to log-probability reveals smooth, predictable improvement — no discontinuous jumps.', severity:'HIGH', year_gap:1, implication:'If emergence is illusory, the "scale to unlock capabilities" narrative collapses, with major implications for research prioritisation and AI safety predictions.' },
      { id:'c3', paper_a:'Bubeck et al. (Microsoft) 2023', paper_b:'Marcus 2024', claim_a:'GPT-4 shows "sparks of AGI" — exhibiting general-purpose reasoning across diverse domains including mathematics, programming, and creative writing.', claim_b:'GPT-4 fails systematically on tasks requiring true compositional reasoning — it is still a sophisticated stochastic parrot, not a reasoner.', severity:'HIGH', year_gap:1, implication:'The "AGI proximity" debate shapes policy, investment, and safety research priorities. Rigorous reasoning benchmarks are urgently needed.' },
    ],
    research_gaps: [
      { area:'LLM reasoning evaluation frameworks', desc:'Current benchmarks (MMLU, GSM8K) are contaminated by training data overlap. No benchmark reliably distinguishes reasoning from memorisation.', opportunity_score:9.5, why_missing:'Creating contamination-free benchmarks requires continuous generation of novel problems. Static benchmarks are gamed within months.', suggested_methodology:'Dynamic evaluation: procedurally generated problems with verified solutions that cannot appear in training corpora.' },
      { area:'Multilingual foundation models', desc:'99% of LLM research focuses on English. Of 7,000+ world languages, fewer than 100 have adequate digital representation for LLM training.', opportunity_score:8.5, why_missing:'Data scarcity for most languages. Tokeniser design is English-centric. Evaluation resources are unavailable.', suggested_methodology:'Cross-lingual transfer from high-resource languages, combined with community-driven data collection for low-resource languages.' },
      { area:'LLM energy and environmental cost', desc:'Training GPT-4 is estimated at 50,000 MWh (≈ annual consumption of 4,600 US homes). Only 5 of 47 papers report energy consumption.', opportunity_score:7.5, why_missing:'Companies do not disclose compute details. Carbon accounting standards for AI do not exist.', suggested_methodology:'Standardised carbon reporting (CO₂e per training run and per inference query) as a mandatory publication requirement.' },
      { area:'Long-context reliability', desc:'Models claim 128K–1M token context windows but accuracy degrades severely in the middle of long contexts ("lost in the middle" effect).', opportunity_score:7.0, why_missing:'Attention mechanisms have O(n²) complexity; sparse/linear attention alternatives sacrifice accuracy.', suggested_methodology:'State-space models (Mamba) or retrieval-augmented architectures that maintain accuracy across arbitrary context lengths.' },
      { area:'Truthfulness and hallucination mitigation', desc:'All current LLMs hallucinate — generating plausible but factually incorrect content. No method reliably prevents or detects hallucinations.', opportunity_score:8.0, why_missing:'LLMs learn statistical correlations, not grounded truth. Retrieval-augmented generation reduces but does not eliminate hallucinations.', suggested_methodology:'Hybrid architectures combining LLMs with verified knowledge bases and citation-backed generation.' },
    ],
    trends: [
      { name:'Mixture-of-experts (MoE)', direction:'rising', projection:'MoE enables larger models with lower inference cost. Mixtral, Grok, and DBRX demonstrate viability. Will become the default architecture.' },
      { name:'State-space models (Mamba)', direction:'rising', projection:'Linear-time alternative to attention. Impressive benchmarks but community still evaluating at scale. May complement rather than replace transformers.' },
      { name:'RLHF / alignment techniques', direction:'stable', projection:'RLHF is standard but DPO (Direct Preference Optimisation) is gaining ground as a simpler alternative. Constitutional AI and debate methods emerging.' },
      { name:'Open-source LLMs', direction:'rising', projection:'Llama, Mistral, Qwen closing gap with proprietary models. Open-source will dominate enterprise and research deployments.' },
      { name:'Smaller, specialised models', direction:'rising', projection:'Phi-3, Gemma show that smaller models (1–7B) can rival 70B models on specific tasks. Efficiency > raw scale.' },
    ],
    frontier_directions: [
      { title:'Dynamic evaluation frameworks for reasoning', rationale:'Resolves the emergent-ability and AGI-proximity debates with rigorous, contamination-proof benchmarks.', impact_score:9, difficulty:'MEDIUM' },
      { title:'Efficient architectures: MoE + SSM hybrids', rationale:'Addresses compute cost and environmental concerns while maintaining or improving capability. Combines MoE sparsity with Mamba-style linear attention.', impact_score:9, difficulty:'HIGH' },
      { title:'Multilingual LLMs for 1000+ languages', rationale:'Fills the enormous gap in language coverage. High humanitarian and economic impact for under-served communities.', impact_score:8, difficulty:'HIGH' },
    ],
    methodology_table: [
      { paper:'Kaplan et al. (OpenAI)', year:2023, method:'Scaling law analysis', dataset:'GPT training data', metric:'Cross-entropy loss', result:'Power law fits' },
      { paper:'Zhou et al. (LIMA)', year:2023, method:'Curated instruction tuning', dataset:'1,000 examples', metric:'Human preference', result:'Matches GPT-4' },
      { paper:'Wei et al. (Google)', year:2023, method:'Prompting analysis', dataset:'BIG-Bench (200+ tasks)', metric:'Emergent accuracy', result:'Phase transitions' },
      { paper:'Schaeffer et al.', year:2024, method:'Metric analysis', dataset:'BIG-Bench reanalysis', metric:'Log-prob smoothness', result:'No emergence' },
      { paper:'Bubeck et al. (Microsoft)', year:2023, method:'Capability probing', dataset:'GPT-4 transcripts', metric:'Qualitative analysis', result:'Sparks of AGI' },
      { paper:'Marcus', year:2024, method:'Adversarial testing', dataset:'Custom reasoning tasks', metric:'Failure rate (%)', result:'37% on compositional' },
      { paper:'Jiang et al. (Mixtral)', year:2024, method:'Mixture-of-experts', dataset:'Standard LLM benchmarks', metric:'MMLU / HumanEval', result:'79.0 / 40.2' },
      { paper:'Gu & Dao (Mamba)', year:2024, method:'State-space model', dataset:'Language benchmarks', metric:'Perplexity / speed', result:'Matches Transformer 2×faster' },
    ],
    citation_index: [
      { num:1, title:'Scaling laws for neural language models', authors:'Kaplan, J., et al. (OpenAI)', year:2023, doi:'10.48550/arXiv.2001.08361' },
      { num:2, title:'LIMA: Less Is More for Alignment', authors:'Zhou, C., et al.', year:2023, doi:'10.48550/arXiv.2305.11206' },
      { num:3, title:'Emergent abilities of large language models', authors:'Wei, J., et al. (Google)', year:2023, doi:'10.48550/arXiv.2206.07682' },
      { num:4, title:'Are emergent abilities of LLMs a mirage?', authors:'Schaeffer, R., et al.', year:2024, doi:'10.48550/arXiv.2304.15004' },
      { num:5, title:'Sparks of artificial general intelligence: experiments with GPT-4', authors:'Bubeck, S., et al. (Microsoft)', year:2023, doi:'10.48550/arXiv.2303.12712' },
      { num:6, title:'LLMs cannot do genuine reasoning', authors:'Marcus, G.', year:2024, doi:'10.48550/arXiv.2402.09345' },
    ],
  },

  graph_nodes: [
    { node_id:'p1', label:'Kaplan (Scaling) 2023', type:'paper', cluster_id:0 },
    { node_id:'p2', label:'Zhou (LIMA) 2023', type:'paper', cluster_id:0 },
    { node_id:'p3', label:'Wei (Emergence) 2023', type:'paper', cluster_id:1 },
    { node_id:'p4', label:'Schaeffer 2024', type:'paper', cluster_id:1 },
    { node_id:'p5', label:'Bubeck (GPT-4) 2023', type:'paper', cluster_id:2 },
    { node_id:'p6', label:'Marcus 2024', type:'paper', cluster_id:2 },
    { node_id:'p7', label:'Jiang (Mixtral) 2024', type:'paper', cluster_id:3 },
    { node_id:'p8', label:'Gu (Mamba) 2024', type:'paper', cluster_id:3 },
    { node_id:'p9', label:'Touvron (Llama 2) 2023', type:'paper', cluster_id:4 },
    { node_id:'p10', label:'Achiam (GPT-4 report)', type:'paper', cluster_id:4 },
    { node_id:'m1', label:'Transformer (decoder)', type:'method', cluster_id:0 },
    { node_id:'m2', label:'MoE architecture', type:'method', cluster_id:3 },
    { node_id:'m3', label:'State-space model', type:'method', cluster_id:3 },
    { node_id:'m4', label:'RLHF / DPO', type:'method', cluster_id:4 },
    { node_id:'c1', label:'Scaling laws', type:'concept', cluster_id:0 },
    { node_id:'c2', label:'Emergent abilities', type:'concept', cluster_id:1 },
    { node_id:'c3', label:'Reasoning evaluation', type:'concept', cluster_id:2 },
    { node_id:'c4', label:'Inference efficiency', type:'concept', cluster_id:3 },
    { node_id:'c5', label:'Alignment / safety', type:'concept', cluster_id:4 },
  ],
  graph_edges: [
    { source_id:'p1', target_id:'p2', relationship_type:'contradicts', reason:'Scale vs data quality for alignment', contradiction_id:'c1' },
    { source_id:'p3', target_id:'p4', relationship_type:'contradicts', reason:'Emergent abilities: real vs metric artifact', contradiction_id:'c2' },
    { source_id:'p5', target_id:'p6', relationship_type:'contradicts', reason:'AGI sparks vs sophisticated pattern matching', contradiction_id:'c3' },
    { source_id:'p1', target_id:'c1', relationship_type:'cites_concept', reason:'Establishes scaling laws' },
    { source_id:'p3', target_id:'c2', relationship_type:'cites_concept', reason:'Identifies emergent abilities' },
    { source_id:'p5', target_id:'c3', relationship_type:'cites_concept', reason:'Probes reasoning capabilities' },
    { source_id:'p7', target_id:'m2', relationship_type:'cites_concept', reason:'MoE architecture' },
    { source_id:'p8', target_id:'m3', relationship_type:'cites_concept', reason:'State-space model' },
    { source_id:'p9', target_id:'m1', relationship_type:'cites_concept', reason:'Decoder-only transformer' },
    { source_id:'p10', target_id:'m4', relationship_type:'cites_concept', reason:'RLHF alignment' },
    { source_id:'p7', target_id:'c4', relationship_type:'cites_concept', reason:'MoE improves inference efficiency' },
    { source_id:'p9', target_id:'c5', relationship_type:'cites_concept', reason:'Open-source alignment research' },
    { source_id:'p8', target_id:'p7', relationship_type:'extends', reason:'SSM extends efficient architecture design' },
    { source_id:'p9', target_id:'p1', relationship_type:'supports', reason:'Llama scaling validates scaling laws' },
    { source_id:'p10', target_id:'p5', relationship_type:'supports', reason:'GPT-4 report supports capability claims' },
  ],

  representations: {
    slides: [
      { slide_number:1, title:'ResearchPulse: Natural Language Processing', bullets:['47 papers · 5 clusters · 90-second analysis','Focus: LLMs, reasoning, alignment, efficiency','5 contradictions + 5 research gaps detected'], speaker_note:'Opening.' },
      { slide_number:2, title:'The scaling debate', bullets:['Kaplan: Performance scales log-linearly with compute','LIMA: 1,000 curated examples match GPT-4','Is quality or quantity the bottleneck?'], speaker_note:'Billions of dollars ride on this answer.' },
      { slide_number:3, title:'Are emergent abilities real?', bullets:['Wei: Phase transitions in capability at scale thresholds','Schaeffer: Smooth improvement — emergence is a metric artifact','Implications for AI safety predictions'], speaker_note:'Critical for forecasting AI capabilities.' },
      { slide_number:4, title:'The AGI proximity debate', bullets:['Bubeck: GPT-4 shows "sparks of AGI"','Marcus: Systematic failures on compositional reasoning','Need rigorous reasoning benchmarks'], speaker_note:'Policy implications.' },
      { slide_number:5, title:'Top research gaps', bullets:['LLM reasoning evaluation frameworks — 9.5/10','Multilingual coverage (7000+ languages) — 8.5/10','Hallucination mitigation — 8.0/10'], speaker_note:'Opportunities.' },
      { slide_number:6, title:'Efficient architectures: MoE + SSMs', bullets:['Mixtral: MoE cuts inference cost with sparse activation','Mamba: Linear-time attention alternative, 2× faster','Future: hybrid architectures combining both'], speaker_note:'Efficiency frontier.' },
      { slide_number:7, title:'Trends', bullets:['Open-source LLMs (Llama, Mistral) — rising fast','Smaller specialised models — rising (Phi-3, Gemma)','RLHF — stable, DPO gaining ground'], speaker_note:'Trend summary.' },
      { slide_number:8, title:'Frontier directions', bullets:['Dynamic evaluation for reasoning (9/10)','MoE + SSM efficient architectures (9/10)','Multilingual LLMs for 1000+ languages (8/10)'], speaker_note:'Actionable frontiers.' },
    ],
    flashcards: [
      { id:1, front:'What are scaling laws in NLP?', back:'Empirical observations that LLM performance improves as a power law with compute, data, and parameters. Proposed by Kaplan et al. (OpenAI).' },
      { id:2, front:'What is the LIMA finding?', back:'A curated dataset of just 1,000 high-quality instruction examples can produce alignment quality competitive with GPT-4, suggesting data quality > quantity.' },
      { id:3, front:'What are emergent abilities?', back:'Capabilities that appear suddenly at certain scale thresholds (e.g., chain-of-thought reasoning). Debated whether they are real or metric artifacts.' },
      { id:4, front:'What is a Mixture-of-Experts (MoE)?', back:'An architecture where only a subset of model parameters are active for each input, enabling larger models with lower inference cost (e.g., Mixtral).' },
      { id:5, front:'What is Mamba?', back:'A state-space model that provides linear-time sequence processing, an alternative to quadratic-cost attention. Matches transformer quality at 2× speed.' },
      { id:6, front:'What is the "lost in the middle" problem?', back:'LLMs with long context windows perform well on information at the start and end but miss information placed in the middle of the context.' },
      { id:7, front:'What is RLHF?', back:'Reinforcement Learning from Human Feedback — training LLMs to align outputs with human preferences using a reward model trained on human comparisons.' },
      { id:8, front:'What is the hallucination problem?', back:'LLMs confidently generate plausible but factually incorrect information. No current method completely prevents this.' },
      { id:9, front:'Why is multilingual NLP a gap?', back:'99% of research is English-centric. Of 7,000+ languages, <100 have adequate data for LLM training.' },
      { id:10, front:'What are the three frontier directions?', back:'(1) Dynamic evaluation frameworks for reasoning. (2) Efficient MoE+SSM hybrid architectures. (3) Multilingual LLMs for 1000+ languages.' },
    ],
    mindmap: {
      root: 'Natural Language Processing',
      branches: [
        { label:'LLM scaling & architecture', children: [
          { label:'Kaplan et al. 2023', finding:'Performance scales log-linearly with compute' },
          { label:'Zhou et al. (LIMA) 2023', finding:'1,000 curated examples match GPT-4 alignment' },
          { label:'Jiang (Mixtral) 2024', finding:'MoE achieves 79.0 MMLU with sparse activation' },
        ]},
        { label:'Reasoning & emergence', children: [
          { label:'Wei et al. 2023', finding:'Emergent abilities at scale thresholds' },
          { label:'Schaeffer et al. 2024', finding:'Emergence is a metric artifact — improvement is smooth' },
          { label:'Bubeck et al. 2023', finding:'"Sparks of AGI" in GPT-4 capabilities' },
          { label:'Marcus 2024', finding:'Compositional reasoning failures persist at all scales' },
        ]},
        { label:'Efficient inference', children: [
          { label:'Gu & Dao (Mamba) 2024', finding:'State-space model matches transformer at 2× speed' },
          { label:'Smaller models (Phi-3)', finding:'1–7B models rival 70B on specific tasks' },
        ]},
        { label:'Alignment & safety', children: [
          { label:'RLHF', finding:'Standard alignment technique but DPO emerging as simpler alternative' },
          { label:'Constitutional AI', finding:'Self-critique based alignment without human labels' },
        ]},
        { label:'Multilingual & low-resource', children: [
          { label:'Language gap', finding:'<100 of 7,000+ languages have adequate LLM training data' },
          { label:'Cross-lingual transfer', finding:'Promising but performance drops sharply for distant language families' },
        ]},
      ]
    }
  }
};

// ─────────────────────────────────────────────────────────────────
// 6. BLOCKCHAIN & DECENTRALIZED FINANCE (DeFi)
// ─────────────────────────────────────────────────────────────────
MOCK_DOMAINS['blockchain'] = {
  keywords: ['blockchain','defi','decentralized','cryptocurrency','ethereum','bitcoin','smart contract','web3','token','nft','dao','consensus','ledger','crypto'],
  session_id: 'mock_bc_' + Math.random().toString(36).slice(2,9),

  log_steps: [
    { ts:'00:00', msg:'Session initialised. Agent starting...', cls:'dim', step:0, papers:0, depth:1, nodes:0, contra:0, progress:5 },
    { ts:'00:02', msg:'Depth 1: Fetching papers from Semantic Scholar...', cls:'', step:0, papers:11, depth:1, nodes:0, contra:0, progress:12 },
    { ts:'00:05', msg:'Depth 1: Fetching papers from SSRN / arXiv (cs.CR)...', cls:'', step:0, papers:21, depth:1, nodes:0, contra:0, progress:20 },
    { ts:'00:08', msg:'Depth 1: 27 papers indexed. Building coverage map...', cls:'', step:0, papers:27, depth:1, nodes:0, contra:0, progress:26 },
    { ts:'00:11', msg:'AI evaluating coverage → Cluster "CBDC design" has <3 papers', cls:'ai-decision', step:1, papers:27, depth:1, nodes:0, contra:0, progress:32 },
    { ts:'00:12', msg:'AI decision: should_expand=true  expand_terms=["CBDC privacy architecture","MEV mitigation"]', cls:'ai-expand', step:1, papers:27, depth:1, nodes:0, contra:0, progress:37 },
    { ts:'00:15', msg:'Depth 2: Fetching 13 more papers on expanded terms...', cls:'', step:1, papers:36, depth:2, nodes:0, contra:0, progress:44 },
    { ts:'00:19', msg:'AI evaluating coverage → All clusters sufficiently covered', cls:'ai-decision', step:1, papers:36, depth:2, nodes:0, contra:0, progress:50 },
    { ts:'00:20', msg:'AI: Coverage sufficient. Stopping search loop.', cls:'success', step:1, papers:36, depth:2, nodes:0, contra:0, progress:54 },
    { ts:'00:23', msg:'Building knowledge graph: clustering 36 papers...', cls:'', step:2, papers:36, depth:2, nodes:18, contra:0, progress:60 },
    { ts:'00:27', msg:'Knowledge graph complete: 36 nodes · 48 edges · 5 clusters', cls:'success', step:2, papers:36, depth:2, nodes:36, contra:0, progress:67 },
    { ts:'00:30', msg:'Detecting contradictions across paper pairs...', cls:'', step:3, papers:36, depth:2, nodes:36, contra:2, progress:72 },
    { ts:'00:34', msg:'Contradiction: PoS security vs environmental claims debate [HIGH]', cls:'ai-decision', step:3, papers:36, depth:2, nodes:36, contra:4, progress:78 },
    { ts:'00:38', msg:'Analysing research gaps and trend directions...', cls:'', step:3, papers:36, depth:2, nodes:36, contra:4, progress:83 },
    { ts:'00:44', msg:'Synthesising frontier directions from contradictions + gaps...', cls:'ai-decision', step:3, papers:36, depth:2, nodes:36, contra:4, progress:88 },
    { ts:'00:50', msg:'Assembling publication-grade literature review report...', cls:'', step:4, papers:36, depth:2, nodes:36, contra:4, progress:94 },
    { ts:'00:57', msg:'Report complete. Session status: done.', cls:'success', step:4, papers:36, depth:2, nodes:36, contra:4, progress:100 },
  ],

  report: {
    executive_summary: [
      "Blockchain technology and decentralized finance have evolved from cryptocurrency speculation into a serious area of computer science and financial engineering research. Following the 2022 market crash and high-profile collapses (FTX, Terra/Luna), academic research has shifted from hype-driven to fundamentals-focused, with a 150% increase in peer-reviewed publications over three years. The field now exhibits systematic contradictions — particularly around the scalability-decentralisation-security trilemma.",
      "This review synthesises 36 papers across five clusters: consensus mechanisms, DeFi protocols & risk, smart contract security, Layer-2 scaling solutions, and Central Bank Digital Currencies (CBDCs). The field is characterised by strong industry/academic collaboration but also by significant conflicts of interest — many researchers hold financial positions in the protocols they study.",
      "The most significant research gap is the absence of formal verification frameworks for DeFi protocol composition — when multiple protocols interact, emergent risks (flash loans, oracle manipulation, cascading liquidations) are poorly understood. Frontier directions converge on formally-verified smart contracts, privacy-preserving CBDCs, and MEV (Maximal Extractable Value) mitigation for fair transaction ordering."
    ],
    field_snapshot: [
      { label:'Maturity', value:'Post-hype maturation', cls:'snap-val--amber' },
      { label:'Velocity', value:'Moderate growth', cls:'snap-val--amber' },
      { label:'Consensus', value:'Contested (scalability)', cls:'snap-val--red' },
      { label:'Total papers', value:'36', cls:'' },
      { label:'Top platform', value:'Ethereum', cls:'' },
      { label:'Top challenge', value:'Scalability trilemma', cls:'' },
      { label:'Top metric', value:'TPS / TVL / exploit $', cls:'' },
      { label:'Pub trend', value:'+150% (3yr)', cls:'snap-val--green' },
    ],
    contradictions: [
      { id:'c1', paper_a:'Buterin 2023', paper_b:'Solana Labs 2024', claim_a:'Rollup-centric scaling (L2) is the only way to scale Ethereum without sacrificing decentralisation. The scalability trilemma is real and binding.', claim_b:'Monolithic L1 chains can achieve >10,000 TPS with parallel execution while maintaining sufficient decentralisation for most applications.', severity:'HIGH', year_gap:1, implication:'The L1 vs L2 scaling debate determines which blockchain architecture dominates. Trillions in ecosystem value at stake.' },
      { id:'c2', paper_a:'de Vries 2023', paper_b:'Gallersdörfer et al. 2024', claim_a:'Proof-of-Stake reduces blockchain energy consumption by 99.95% vs Proof-of-Work, solving the environmental criticism entirely.', claim_b:'PoS introduces new centralisation risks (wealth concentration, validator cartels) that may be worse than PoW energy costs from a systemic risk perspective.', severity:'MEDIUM', year_gap:1, implication:'The PoW vs PoS debate is not just environmental but structural. Centralisation risk must be quantified alongside energy savings.' },
      { id:'c3', paper_a:'Werner et al. 2023', paper_b:'Qin et al. 2024', claim_a:'DeFi composability is a feature — Lego-like protocol interoperability enables unprecedented financial innovation.', claim_b:'DeFi composability is a systemic risk — cascading failures across interconnected protocols caused $3.8B in losses in 2022 alone.', severity:'HIGH', year_gap:1, implication:'The "DeFi Lego" narrative must be balanced with formal risk analysis of protocol dependencies.' },
    ],
    research_gaps: [
      { area:'Formal verification of DeFi composability', desc:'When multiple DeFi protocols interact, emergent attack vectors arise (flash loans, oracle manipulation). No framework formally verifies multi-protocol safety.', opportunity_score:9.0, why_missing:'Protocol interactions create a combinatorial explosion of states. Existing formal methods don\'t scale to multi-contract systems.', suggested_methodology:'Compositional formal verification with modular invariant checking across protocol dependency graphs.' },
      { area:'CBDC privacy architecture', desc:'Central banks want programmable money but citizens demand privacy. No CBDC design satisfactorily balances surveillance resistance with regulatory compliance.', opportunity_score:8.5, why_missing:'A fundamental tension: privacy and auditability are inherently opposed. Zero-knowledge proofs offer a path but remain too computationally expensive for retail payments.', suggested_methodology:'ZK-rollup-based CBDC architectures with tiered privacy levels and selective disclosure for regulatory compliance.' },
      { area:'MEV mitigation and fair ordering', desc:'Miners/validators extract $1B+/year by reordering transactions (MEV). This is a hidden tax on users and undermines fairness.', opportunity_score:8.0, why_missing:'MEV is profitable for validators, creating a misaligned incentive structure. Technical solutions (PBS, encrypted mempools) are nascent.', suggested_methodology:'Threshold encryption of transactions with commit-reveal ordering schemes.' },
      { area:'Cross-chain bridge security', desc:'Cross-chain bridges have lost $2.5B+ to exploits (Wormhole, Ronin). Interoperability remains the weakest link in multi-chain ecosystems.', opportunity_score:7.5, why_missing:'Bridge designs inherit trust assumptions from the weakest connected chain. No formal bridge security model exists.', suggested_methodology:'Light-client-based bridges with formal proofs of correctness and economic security bonds.' },
      { area:'DAO governance effectiveness', desc:'DAOs promise decentralised governance but voter participation averages <5%. Governance is dominated by token whales, undermining the decentralisation thesis.', opportunity_score:6.5, why_missing:'Token-weighted voting is a blunt instrument. Quadratic voting and conviction voting are proposed but untested at scale.', suggested_methodology:'Longitudinal analysis of DAO governance outcomes with comparison of voting mechanism designs.' },
    ],
    trends: [
      { name:'Layer-2 rollups (ZK & optimistic)', direction:'rising', projection:'Dominant scaling solution for Ethereum. ZK-rollups projected to surpass optimistic rollups in TPS and security by 2026.' },
      { name:'Real-world asset tokenisation', direction:'rising', projection:'BlackRock, JPMorgan entering tokenised treasuries. Could bring $16T in traditional assets on-chain by 2030.' },
      { name:'Account abstraction', direction:'rising', projection:'ERC-4337 enables smart contract wallets with social recovery, gas sponsorship. Critical for mainstream UX.' },
      { name:'NFT speculation', direction:'declining', projection:'Trade volumes down 95% from 2022 peak. Market shifting to utility NFTs (identity, gaming, credentials).' },
      { name:'DeFi yield farming', direction:'declining', projection:'Unsustainable token emissions subsiding. Surviving protocols focus on real yield from actual economic activity.' },
    ],
    frontier_directions: [
      { title:'Formally-verified DeFi protocol composition', rationale:'Directly addresses the systemic risk gap. Would prevent cascading failures and flash loan attacks through mathematical guarantees.', impact_score:9, difficulty:'HIGH' },
      { title:'Privacy-preserving CBDC with ZK-proofs', rationale:'Resolves the privacy-compliance tension for central bankers. Mass-market impact: affects all citizens in adopting countries.', impact_score:9, difficulty:'HIGH' },
      { title:'MEV-resistant fair transaction ordering', rationale:'Eliminates the hidden tax on blockchain users. Protocol-level solution required before institutional DeFi adoption.', impact_score:8, difficulty:'MEDIUM' },
    ],
    methodology_table: [
      { paper:'Buterin (Ethereum)', year:2023, method:'Rollup-centric roadmap analysis', dataset:'Ethereum mainnet + L2s', metric:'TPS / decentralisation', result:'100K TPS (aggregate L2)' },
      { paper:'Solana Labs', year:2024, method:'Parallel execution engine', dataset:'Solana mainnet', metric:'TPS (sustained)', result:'5,000–10,000' },
      { paper:'de Vries', year:2023, method:'Energy consumption analysis', dataset:'Ethereum pre/post Merge', metric:'TWh/year', result:'0.01 (PoS) vs 94 (PoW)' },
      { paper:'Gallersdörfer et al.', year:2024, method:'Stake concentration analysis', dataset:'Ethereum validator set', metric:'Nakamoto coefficient', result:'3 (Lido, Coinbase, Kraken)' },
      { paper:'Werner et al.', year:2023, method:'DeFi dependency mapping', dataset:'Ethereum DeFi protocols', metric:'TVL interconnectedness', result:'87% (shared dependencies)' },
      { paper:'Qin et al.', year:2024, method:'Attack surface analysis', dataset:'341 DeFi exploits', metric:'Losses ($)', result:'$3.8B (2022)' },
      { paper:'Flashbots', year:2024, method:'MEV measurement', dataset:'Ethereum mempool', metric:'MEV extracted ($/yr)', result:'$1.2B' },
      { paper:'BIS Innovation Hub', year:2024, method:'CBDC prototype (Project mBridge)', dataset:'4 central banks', metric:'Settlement time', result:'<10 seconds' },
    ],
    citation_index: [
      { num:1, title:'An incomplete guide to rollups', authors:'Buterin, V.', year:2023, doi:'N/A (blog post)' },
      { num:2, title:'Sealevel: parallel processing for the Solana runtime', authors:'Solana Labs', year:2024, doi:'N/A (whitepaper)' },
      { num:3, title:'Ethereum\'s energy consumption after The Merge', authors:'de Vries, A.', year:2023, doi:'10.1016/j.joule.2023.01.018' },
      { num:4, title:'Centralisation risks in proof-of-stake systems', authors:'Gallersdörfer, U., et al.', year:2024, doi:'10.1145/3589339' },
      { num:5, title:'SoK: Decentralized Finance (DeFi)', authors:'Werner, S.M., et al.', year:2023, doi:'10.1145/3558535.3559780' },
      { num:6, title:'Attacks, defenses and tools in DeFi: a survey', authors:'Qin, K., et al.', year:2024, doi:'10.1145/3605768' },
    ],
  },

  graph_nodes: [
    { node_id:'p1', label:'Buterin (Rollups) 2023', type:'paper', cluster_id:0 },
    { node_id:'p2', label:'Solana Labs 2024', type:'paper', cluster_id:0 },
    { node_id:'p3', label:'de Vries (Energy) 2023', type:'paper', cluster_id:1 },
    { node_id:'p4', label:'Gallersdörfer 2024', type:'paper', cluster_id:1 },
    { node_id:'p5', label:'Werner (DeFi SoK) 2023', type:'paper', cluster_id:2 },
    { node_id:'p6', label:'Qin (DeFi attacks) 2024', type:'paper', cluster_id:2 },
    { node_id:'p7', label:'Flashbots (MEV) 2024', type:'paper', cluster_id:3 },
    { node_id:'p8', label:'BIS mBridge 2024', type:'paper', cluster_id:3 },
    { node_id:'p9', label:'Trail of Bits 2023', type:'paper', cluster_id:4 },
    { node_id:'p10', label:'Daian et al. 2023', type:'paper', cluster_id:4 },
    { node_id:'m1', label:'ZK-Rollups', type:'method', cluster_id:0 },
    { node_id:'m2', label:'Proof-of-Stake', type:'method', cluster_id:1 },
    { node_id:'m3', label:'Formal verification', type:'method', cluster_id:4 },
    { node_id:'m4', label:'Zero-knowledge proofs', type:'method', cluster_id:3 },
    { node_id:'c1', label:'Scalability trilemma', type:'concept', cluster_id:0 },
    { node_id:'c2', label:'Energy consumption', type:'concept', cluster_id:1 },
    { node_id:'c3', label:'Composability risk', type:'concept', cluster_id:2 },
    { node_id:'c4', label:'MEV extraction', type:'concept', cluster_id:3 },
    { node_id:'c5', label:'Smart contract bugs', type:'concept', cluster_id:4 },
  ],
  graph_edges: [
    { source_id:'p1', target_id:'p2', relationship_type:'contradicts', reason:'L2 rollups vs monolithic L1 scaling', contradiction_id:'c1' },
    { source_id:'p3', target_id:'p4', relationship_type:'contradicts', reason:'PoS energy savings vs centralisation risk', contradiction_id:'c2' },
    { source_id:'p5', target_id:'p6', relationship_type:'contradicts', reason:'DeFi composability: feature vs systemic risk', contradiction_id:'c3' },
    { source_id:'p1', target_id:'m1', relationship_type:'cites_concept', reason:'Proposes ZK-rollup scaling' },
    { source_id:'p3', target_id:'m2', relationship_type:'cites_concept', reason:'Analyses PoS energy impact' },
    { source_id:'p9', target_id:'m3', relationship_type:'cites_concept', reason:'Formal verification of contracts' },
    { source_id:'p8', target_id:'m4', relationship_type:'cites_concept', reason:'ZK-proofs for CBDC privacy' },
    { source_id:'p1', target_id:'c1', relationship_type:'cites_concept', reason:'Addresses scalability trilemma' },
    { source_id:'p3', target_id:'c2', relationship_type:'cites_concept', reason:'Measures energy consumption' },
    { source_id:'p5', target_id:'c3', relationship_type:'cites_concept', reason:'Maps composability risks' },
    { source_id:'p7', target_id:'c4', relationship_type:'cites_concept', reason:'Measures MEV extraction' },
    { source_id:'p9', target_id:'c5', relationship_type:'cites_concept', reason:'Audits smart contract vulnerabilities' },
    { source_id:'p10', target_id:'p7', relationship_type:'extends', reason:'Flash Boys 2.0 formalises MEV concept' },
    { source_id:'p6', target_id:'p5', relationship_type:'extends', reason:'Attack analysis extends DeFi survey' },
    { source_id:'p8', target_id:'p3', relationship_type:'supports', reason:'CBDC on PoS validates energy efficiency claims' },
  ],

  representations: {
    slides: [
      { slide_number:1, title:'ResearchPulse: Blockchain & DeFi', bullets:['36 papers · 5 clusters · 90-second analysis','Focus: consensus, DeFi, security, CBDCs, scaling','4 contradictions + 5 research gaps detected'], speaker_note:'Opening.' },
      { slide_number:2, title:'The scalability trilemma', bullets:['Buterin: Rollup-centric L2 scaling preserves decentralisation','Solana: Monolithic L1 can achieve 10K+ TPS','No architecture solves all three: scalability, security, decentralisation'], speaker_note:'Core tension.' },
      { slide_number:3, title:'PoW vs PoS: not just energy', bullets:['PoS reduces energy by 99.95%','But introduces stake centralisation (Nakamoto coeff = 3)','Lido + Coinbase + Kraken control >50% of Ethereum stake'], speaker_note:'Centralisation concern.' },
      { slide_number:4, title:'DeFi composability: feature or risk?', bullets:['$87B+ in interconnected protocol dependencies','$3.8B lost to cascading exploits in 2022','Flash loans enable atomic arbitrage attacks'], speaker_note:'Systemic risk.' },
      { slide_number:5, title:'Top research gaps', bullets:['Formal verification of DeFi composition — 9.0/10','CBDC privacy architecture — 8.5/10','MEV mitigation — 8.0/10'], speaker_note:'Research opportunities.' },
      { slide_number:6, title:'CBDCs: the institutional frontier', bullets:['100+ central banks exploring digital currencies','Project mBridge: 4 banks, <10s settlement','Privacy vs surveillance: the core design tension'], speaker_note:'Institutional adoption.' },
      { slide_number:7, title:'Trends', bullets:['ZK-rollups — rising (will surpass optimistic rollups)','Real-world asset tokenisation — rising ($16T potential)','NFT speculation — declining sharply (-95% volume)'], speaker_note:'Trend summary.' },
      { slide_number:8, title:'Frontier directions', bullets:['Formally-verified DeFi protocol composition (9/10)','Privacy-preserving CBDC with ZK-proofs (9/10)','MEV-resistant fair transaction ordering (8/10)'], speaker_note:'Actionable frontiers.' },
    ],
    flashcards: [
      { id:1, front:'What is the blockchain scalability trilemma?', back:'The observation that blockchain systems can optimise for at most two of three properties: scalability, security, decentralisation. No system has fully solved all three.' },
      { id:2, front:'What are ZK-rollups?', back:'Layer-2 scaling solutions that bundle many transactions off-chain and post a validity proof (zero-knowledge proof) to the main chain. Enables 100×+ throughput without sacrificing security.' },
      { id:3, front:'What is MEV?', back:'Maximal Extractable Value — profit that validators/miners extract by reordering, inserting, or censoring transactions. A hidden tax on users estimated at $1.2B/year on Ethereum.' },
      { id:4, front:'Why is DeFi composability risky?', back:'Protocols reference each other (e.g., Aave → Chainlink → USDC). When one component fails, cascading liquidations can spread across the ecosystem — $3.8B lost in 2022.' },
      { id:5, front:'What is a CBDC?', back:'Central Bank Digital Currency — a digital form of sovereign money. Unlike crypto, issued and backed by a central bank. 100+ countries are exploring CBDCs.' },
      { id:6, front:'What is the Nakamoto coefficient?', back:'The minimum number of entities that must collude to control a blockchain. For Ethereum PoS, it is currently 3 (Lido, Coinbase, Kraken).' },
      { id:7, front:'What are flash loans?', back:'Uncollateralised loans that must be borrowed and repaid within a single blockchain transaction. Used for arbitrage but also exploits — enable complex atomic attacks.' },
      { id:8, front:'What is formal verification in smart contracts?', back:'Using mathematical proofs to guarantee that smart contract code behaves as intended. Prevents bugs that cause exploits but is computationally expensive.' },
      { id:9, front:'How much has PoS reduced Ethereum energy usage?', back:'By 99.95% — from ~94 TWh/year (PoW) to ~0.01 TWh/year (PoS). Equivalent to removing a medium-sized country from the grid.' },
      { id:10, front:'What are the three frontier directions?', back:'(1) Formally-verified DeFi composition. (2) Privacy-preserving CBDC with ZK-proofs. (3) MEV-resistant fair transaction ordering.' },
    ],
    mindmap: {
      root: 'Blockchain & DeFi',
      branches: [
        { label:'Consensus & scaling', children: [
          { label:'Buterin (Rollups) 2023', finding:'Rollup-centric L2 scaling — 100K aggregate TPS' },
          { label:'Solana Labs 2024', finding:'Monolithic L1 parallel execution — 5K-10K TPS' },
          { label:'de Vries 2023', finding:'PoS reduces energy 99.95% vs PoW' },
        ]},
        { label:'DeFi protocols', children: [
          { label:'Werner et al. 2023', finding:'87% of DeFi TVL shares protocol dependencies' },
          { label:'Qin et al. 2024', finding:'$3.8B lost to DeFi exploits in 2022' },
          { label:'Flashbots 2024', finding:'$1.2B/year in MEV extracted from Ethereum' },
        ]},
        { label:'Smart contract security', children: [
          { label:'Trail of Bits 2023', finding:'50% of audited contracts contain critical vulnerabilities' },
          { label:'Formal verification', finding:'Mathematical proofs of contract correctness — computationally expensive' },
        ]},
        { label:'CBDCs', children: [
          { label:'BIS mBridge 2024', finding:'4-central-bank prototype — <10s cross-border settlement' },
          { label:'Privacy tension', finding:'ZK-proofs enable privacy but add computational overhead' },
        ]},
        { label:'Governance & economics', children: [
          { label:'DAO participation', finding:'Average voter participation <5% — governance dominated by whales' },
          { label:'Gallersdörfer 2024', finding:'Nakamoto coefficient = 3 for Ethereum — centralisation risk' },
        ]},
      ]
    }
  }
};


// ═══════════════════════ TOPIC MATCHER ═══════════════════════

/**
 * Fuzzy-match a user-entered topic to the best mock domain.
 * Returns the full mock data object for that domain.
 * Falls back to 'healthcare' (original) if no keywords match.
 */
function getMockForTopic(topic) {
  const lower = topic.toLowerCase();
  let bestKey = 'healthcare'; // default
  let bestScore = 0;

  for (const [key, domain] of Object.entries(MOCK_DOMAINS)) {
    let score = 0;
    for (const kw of domain.keywords) {
      if (lower.includes(kw)) {
        score += kw.length; // longer keyword matches are more specific
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestKey = key;
    }
  }

  return MOCK_DOMAINS[bestKey];
}
