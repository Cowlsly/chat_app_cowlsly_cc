import './style.css';

const STORAGE_KEY = 'cowlsly-chat-demo-v1';
const starter = {
  activeId: 'river',
  conversations: [
    { id: 'river', name: 'River', emoji: '🌿', messages: [
      { from: 'them', text: 'Hey! Nice to meet you. This is a safe demo conversation.', time: 'Now' }
    ] },
    { id: 'support', name: 'Cowlsly Guide', emoji: '🛟', messages: [
      { from: 'them', text: 'Use this build to test navigation, message sending and local persistence.', time: 'Now' }
    ] }
  ]
};

let state = loadState();
const conversationList = document.querySelector('#conversation-list');
const messageList = document.querySelector('#message-list');
const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#message-input');

function cloneStarter() {
  return JSON.parse(JSON.stringify(starter));
}

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || cloneStarter();
  } catch {
    return cloneStarter();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function activeConversation() {
  return state.conversations.find((conversation) => conversation.id === state.activeId) || state.conversations[0];
}

function render() {
  const active = activeConversation();
  state.activeId = active.id;
  document.querySelector('#chat-title').textContent = active.name;
  conversationList.innerHTML = state.conversations.map((conversation) => {
    const last = conversation.messages.at(-1)?.text || 'No messages yet';
    return `<button class="conversation ${conversation.id === active.id ? 'active' : ''}" data-id="${conversation.id}">
      <span class="avatar">${conversation.emoji}</span>
      <span><strong>${conversation.name}</strong><small>${escapeHtml(last)}</small></span>
    </button>`;
  }).join('');

  messageList.innerHTML = active.messages.map((message) => `<article class="message ${message.from}">
    <p>${escapeHtml(message.text)}</p><time>${message.time}</time>
  </article>`).join('');
  messageList.scrollTop = messageList.scrollHeight;

  document.querySelectorAll('.conversation').forEach((button) => button.addEventListener('click', () => {
    state.activeId = button.dataset.id;
    saveState();
    render();
  }));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
}

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = messageInput.value.trim();
  if (!text) return;
  activeConversation().messages.push({ from: 'me', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
  messageInput.value = '';
  saveState();
  render();
});

document.querySelector('#new-chat').addEventListener('click', () => {
  const id = `demo-${Date.now()}`;
  state.conversations.unshift({ id, name: `Demo contact ${state.conversations.length + 1}`, emoji: '💬', messages: [] });
  state.activeId = id;
  saveState();
  render();
  messageInput.focus();
});

document.querySelector('#reset-demo').addEventListener('click', () => {
  state = cloneStarter();
  saveState();
  render();
});

render();
