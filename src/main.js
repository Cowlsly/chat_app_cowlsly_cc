import './style.css';
import { cleanId, cloneStarter, escapeHtml, normaliseState } from './state.js';

const STORAGE_KEY = 'cowlsly-chat-demo-v1';

const conversationList = document.querySelector('#conversation-list');
const messageList = document.querySelector('#message-list');
const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#message-input');
const chatTitle = document.querySelector('#chat-title');
const newChatButton = document.querySelector('#new-chat');
const resetButton = document.querySelector('#reset-demo');

if (!conversationList || !messageList || !messageForm || !messageInput || !chatTitle || !newChatButton || !resetButton) {
  throw new Error('Cowlsly Chat could not start because a required page element is missing.');
}

let state = loadState();

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? normaliseState(JSON.parse(stored)) : cloneStarter();
  } catch {
    return cloneStarter();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Cowlsly Chat could not save its local demo state.', error);
  }
}

function activeConversation() {
  return state.conversations.find((conversation) => conversation.id === state.activeId)
    || state.conversations[0];
}

function render() {
  const active = activeConversation();
  state.activeId = active.id;
  chatTitle.textContent = active.name;
  conversationList.innerHTML = state.conversations.map((conversation) => {
    const last = conversation.messages.at(-1)?.text || 'No messages yet';
    return `<button type="button" class="conversation ${conversation.id === active.id ? 'active' : ''}" data-id="${escapeHtml(conversation.id)}">
      <span class="avatar">${escapeHtml(conversation.emoji)}</span>
      <span><strong>${escapeHtml(conversation.name)}</strong><small>${escapeHtml(last)}</small></span>
    </button>`;
  }).join('');

  messageList.innerHTML = active.messages.map((message) => `<article class="message ${message.from}">
    <p>${escapeHtml(message.text)}</p><time>${escapeHtml(message.time)}</time>
  </article>`).join('');
  messageList.scrollTop = messageList.scrollHeight;

  document.querySelectorAll('.conversation').forEach((button) => button.addEventListener('click', () => {
    const selectedId = cleanId(button.dataset.id);
    if (!state.conversations.some((conversation) => conversation.id === selectedId)) return;
    state.activeId = selectedId;
    saveState();
    render();
  }));
}

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = messageInput.value.trim().slice(0, 500);
  if (!text) return;
  activeConversation().messages.push({
    from: 'me',
    text,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  });
  messageInput.value = '';
  saveState();
  render();
});

newChatButton.addEventListener('click', () => {
  const id = `demo-${Date.now()}`;
  state.conversations.unshift({
    id,
    name: `Demo contact ${state.conversations.length + 1}`,
    emoji: '💬',
    messages: [],
  });
  state.activeId = id;
  saveState();
  render();
  messageInput.focus();
});

resetButton.addEventListener('click', () => {
  if (!window.confirm('Reset all local Cowlsly Chat demo conversations?')) return;
  state = cloneStarter();
  saveState();
  render();
});

render();
