// Reusable UI helpers for Cowlsly Chat demo
export function showToast(text, duration = 1800) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = text;
  t.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => t.hidden = true, duration);
}

export function setLoading(el, isLoading) {
  if (!el) return;
  el.classList.toggle('loading', isLoading);
  el.disabled = isLoading;
}

export function preventDuplicate(el, action) {
  if (el.dataset.busy === 'true') return;
  el.dataset.busy = 'true';
  setLoading(el, true);
  try {
    return action();
  } finally {
    setTimeout(() => {
      el.dataset.busy = 'false';
      setLoading(el, false);
    }, 300);
  }
}

export function openDialog(id) {
  const d = document.getElementById(id);
  if (d && typeof d.showModal === 'function') d.showModal();
}

export function closeDialog(id) {
  const d = document.getElementById(id);
  if (d) d.close();
}
