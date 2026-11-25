// Reusable UI helpers for Cowlsly.cc messenger demo
// Keep DOM-focused; no framework dependency.

export function setLoading(el, on = true) {
  if (!el) return;
  el.classList.toggle('loading', on);
  el.disabled = on;
  el.setAttribute('aria-busy', String(on));
}

export function setPressed(el, on = true) {
  if (!el) return;
  el.classList.toggle('selected', on);
  el.setAttribute('aria-pressed', String(on));
}

export function toast(text, ms = 1800) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = text;
  t.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { t.hidden = true; }, ms);
}

export function makeChip(text, selected = false) {
  const chip = document.createElement('button');
  chip.type = 'button';
  chip.className = 'chip' + (selected ? ' selected' : '');
  chip.textContent = text;
  chip.setAttribute('aria-pressed', String(selected));
  chip.onclick = () => setPressed(chip, !chip.classList.contains('selected'));
  return chip;
}

export function guardOnce(fn, delay = 600) {
  let busy = false;
  return async (...args) => {
    if (busy) return;
    busy = true;
    try { return await fn(...args); }
    finally { setTimeout(() => { busy = false; }, delay); }
  };
}
