export const STARTER_STATE = Object.freeze({
  activeId: 'river',
  conversations: [
    {
      id: 'river',
      name: 'River',
      emoji: '🌿',
      messages: [
        { from: 'them', text: 'Hey! Nice to meet you. This is a safe demo conversation.', time: 'Now' },
      ],
    },
    {
      id: 'support',
      name: 'Cowlsly Guide',
      emoji: '🛟',
      messages: [
        { from: 'them', text: 'Use this build to test navigation, message sending and local persistence.', time: 'Now' },
      ],
    },
  ],
});

export function cloneStarter() {
  return JSON.parse(JSON.stringify(STARTER_STATE));
}

function isRecord(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function cleanText(value, fallback, maxLength) {
  if (typeof value !== 'string') return fallback;
  const cleaned = value.trim();
  return cleaned ? cleaned.slice(0, maxLength) : fallback;
}

export function cleanId(value) {
  if (typeof value !== 'string') return '';
  const cleaned = value.trim();
  return /^[A-Za-z0-9_-]{1,80}$/.test(cleaned) ? cleaned : '';
}

function normaliseMessage(value) {
  if (!isRecord(value) || typeof value.text !== 'string') return null;
  const text = value.text.trim().slice(0, 500);
  if (!text) return null;
  return {
    from: value.from === 'me' ? 'me' : 'them',
    text,
    time: cleanText(value.time, '', 40),
  };
}

export function normaliseState(value) {
  if (!isRecord(value) || !Array.isArray(value.conversations)) return cloneStarter();

  const seenIds = new Set();
  const conversations = [];
  value.conversations.slice(0, 100).forEach((candidate, index) => {
    if (!isRecord(candidate)) return;
    let id = cleanId(candidate.id);
    if (!id || seenIds.has(id)) {
      id = `restored-${index + 1}`;
      while (seenIds.has(id)) id = `${id}-copy`;
    }
    seenIds.add(id);
    const messages = Array.isArray(candidate.messages)
      ? candidate.messages.slice(-1000).map(normaliseMessage).filter(Boolean)
      : [];
    conversations.push({
      id,
      name: cleanText(candidate.name, `Demo contact ${index + 1}`, 60),
      emoji: cleanText(candidate.emoji, '💬', 12),
      messages,
    });
  });

  if (!conversations.length) return cloneStarter();
  const requestedActiveId = cleanId(value.activeId);
  const activeId = conversations.some((conversation) => conversation.id === requestedActiveId)
    ? requestedActiveId
    : conversations[0].id;
  return { activeId, conversations };
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[char]);
}
