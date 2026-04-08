/**
 * ResearchPulse — Representations (Slides · Flashcards · Mindmap)
 */

// ═══════════════════════ SLIDES ═══════════════════════
function renderSlides(slides) {
  const container = document.getElementById('slides-container');
  container.innerHTML = '';

  if (!slides || !slides.length) {
    container.innerHTML = '<p style="color:var(--ink-muted);padding:24px">No slides generated.</p>';
    return;
  }

  slides.forEach((s, i) => {
    const noteId = `note-${i}`;
    const div = document.createElement('div');
    div.className = 'slide-card';
    div.innerHTML = `
      <div class="slide-num-line">
        <div class="slide-num">Slide ${s.slide_number} of ${slides.length}</div>
      </div>
      <div class="slide-title">${s.title}</div>
      <div class="slide-bullets">
        ${(s.bullets || []).map(b =>
          `<div class="slide-bullet">
             <div class="slide-bullet-dot"></div>
             <div>${b}</div>
           </div>`
        ).join('')}
      </div>
      ${s.speaker_note ? `
        <div class="notes-toggle" onclick="toggleNote('${noteId}', this)">
          <span class="notes-caret">▾</span>
          <span>Speaker notes</span>
        </div>
        <div class="notes-content" id="${noteId}">
          <div class="notes-text">${s.speaker_note}</div>
        </div>` : ''}`;
    container.appendChild(div);
  });
}

function toggleNote(id, toggle) {
  const el = document.getElementById(id);
  const caret = toggle.querySelector('.notes-caret');
  el.classList.toggle('open');
  caret.textContent = el.classList.contains('open') ? '▴' : '▾';
}

// ═══════════════════════ FLASHCARDS ═══════════════════════
let fcCards = [];
let fcIndex = 0;
let fcFlipped = false;

function renderFlashcards(cards) {
  fcCards = cards || [];
  fcIndex = 0;
  fcFlipped = false;

  if (!fcCards.length) {
    document.getElementById('flashcards-wrapper').innerHTML =
      '<p style="color:var(--ink-muted);padding:24px;text-align:center">No flashcards generated.</p>';
    return;
  }

  buildFcDots();
  updateCard();

  // Keyboard navigation
  document.removeEventListener('keydown', fcKeyHandler);
  document.addEventListener('keydown', fcKeyHandler);
}

function fcKeyHandler(e) {
  if (document.querySelector('.tab[data-tab="flashcards"]')?.classList.contains('active')) {
    if (e.key === 'ArrowRight') { e.preventDefault(); nextCard(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); prevCard(); }
    if (e.key === ' ')          { e.preventDefault(); flipCard(); }
  }
}

function buildFcDots() {
  const dotsEl = document.getElementById('fc-dots');
  if (!dotsEl) return;
  const show = Math.min(fcCards.length, 10);
  dotsEl.innerHTML = Array.from({ length: show }, (_, i) =>
    `<div class="fc-dot${i === 0 ? ' active' : ''}" data-idx="${i}"></div>`
  ).join('') + (fcCards.length > show ? `<div class="fc-dot" style="opacity:0.3">…</div>` : '');
}

function updateCard() {
  if (!fcCards.length) return;
  const card = fcCards[fcIndex];

  // Reset flip
  const inner = document.getElementById('fc-inner');
  if (inner) {
    inner.classList.remove('flipped');
    fcFlipped = false;
  }

  // Small delay so flip resets before content changes
  setTimeout(() => {
    const frontEl = document.getElementById('fc-front-text');
    const backEl  = document.getElementById('fc-back-text');
    if (frontEl) frontEl.textContent = card.front;
    if (backEl)  backEl.textContent  = card.back;
  }, 50);

  // Progress
  const prog = document.getElementById('fc-progress');
  if (prog) prog.textContent = `Card ${fcIndex + 1} / ${fcCards.length}`;

  // Dots
  document.querySelectorAll('.fc-dot').forEach((d, i) => {
    d.classList.toggle('active', i === fcIndex);
  });
}

function flipCard() {
  const inner = document.getElementById('fc-inner');
  if (!inner) return;
  inner.classList.toggle('flipped');
  fcFlipped = !fcFlipped;
}

function nextCard() {
  fcIndex = (fcIndex + 1) % fcCards.length;
  updateCard();
}

function prevCard() {
  fcIndex = (fcIndex - 1 + fcCards.length) % fcCards.length;
  updateCard();
}

// ═══════════════════════ MINDMAP ═══════════════════════
function renderMindmap(mindmap) {
  const treeEl = document.getElementById('mm-tree');
  if (!treeEl) return;
  treeEl.innerHTML = '';

  if (!mindmap) {
    treeEl.innerHTML = '<p style="color:var(--ink-muted)">No mindmap generated.</p>';
    return;
  }

  // Root
  const rootNode = buildMmNode(mindmap.root, 'root', true);
  const rootChildren = document.createElement('div');
  rootChildren.className = 'mm-children open';
  rootChildren.id = 'mm-root-children';

  (mindmap.branches || []).forEach((branch, bi) => {
    const l1Node = buildMmNode(branch.label, 'l1', true);
    const l1Children = document.createElement('div');
    l1Children.className = 'mm-children open';
    l1Children.id = `mm-l1-${bi}`;

    (branch.children || []).forEach((child, ci) => {
      const l2Node = buildMmNode(child.label, 'l2', true);
      const l2Children = document.createElement('div');
      l2Children.className = 'mm-children open';
      l2Children.id = `mm-l2-${bi}-${ci}`;

      if (child.finding) {
        const leaf = document.createElement('div');
        leaf.className = 'mm-node mm-node--leaf';
        leaf.innerHTML = `<div class="mm-row"><span class="mm-dot"></span><span class="mm-label">${child.finding}</span></div>`;
        l2Children.appendChild(leaf);
      }

      l2Node.querySelector('.mm-row').addEventListener('click', () =>
        toggleMmNode(l2Node, l2Children, `mm-l2-${bi}-${ci}`)
      );
      l1Children.appendChild(l2Node);
      l1Children.appendChild(l2Children);
    });

    l1Node.querySelector('.mm-row').addEventListener('click', () =>
      toggleMmNode(l1Node, l1Children, `mm-l1-${bi}`)
    );
    rootChildren.appendChild(l1Node);
    rootChildren.appendChild(l1Children);
  });

  rootNode.querySelector('.mm-row').addEventListener('click', () =>
    toggleMmNode(rootNode, rootChildren, 'mm-root-children')
  );

  treeEl.appendChild(rootNode);
  treeEl.appendChild(rootChildren);
}

function buildMmNode(label, level, hasChildren) {
  const div = document.createElement('div');
  div.className = `mm-node mm-node--${level}`;
  div.innerHTML = `
    <div class="mm-row">
      ${hasChildren ? '<span class="mm-caret open">▶</span>' : ''}
      <span class="mm-dot"></span>
      <span class="mm-label">${label}</span>
    </div>`;
  return div;
}

function toggleMmNode(nodeEl, childrenEl, childrenId) {
  const caret = nodeEl.querySelector('.mm-caret');
  const open  = childrenEl.classList.toggle('open');
  if (caret) caret.classList.toggle('open', open);
}

function mmExpandAll() {
  document.querySelectorAll('.mm-children').forEach(el => el.classList.add('open'));
  document.querySelectorAll('.mm-caret').forEach(el => el.classList.add('open'));
}
function mmCollapseAll() {
  document.querySelectorAll('.mm-children').forEach(el => {
    if (el.id !== 'mm-root-children') el.classList.remove('open');
  });
  document.querySelectorAll('.mm-caret').forEach(el => el.classList.remove('open'));
}
