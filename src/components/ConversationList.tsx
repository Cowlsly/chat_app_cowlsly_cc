import type { Conversation } from '../types'
import './ConversationList.css'

function formatTime(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  if (diff < 60000) return 'now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`
  return `${Math.floor(diff / 86400000)}d`
}

interface ConversationListProps {
  conversations: Conversation[]
  activeId: string | null
  searchQuery: string
  onSearchChange: (query: string) => void
  onSelect: (id: string) => void
  onNewChat: () => void
  onOpenSettings: () => void
}

export function ConversationList({
  conversations,
  activeId,
  searchQuery,
  onSearchChange,
  onSelect,
  onNewChat,
  onOpenSettings,
}: ConversationListProps) {
  return (
    <aside className="conversation-list" aria-label="Conversations">
      <header className="cl-header">
        <span className="cl-logo">⚙️ Cowlsly</span>
        <div className="cl-header-actions">
          <button
            className="icon-btn"
            onClick={onOpenSettings}
            aria-label="Open settings"
            title="Settings"
            type="button"
          >
            ⚙️
          </button>
          <button
            className="icon-btn icon-btn--primary"
            onClick={onNewChat}
            aria-label="New conversation"
            title="New chat"
            type="button"
          >
            ✏️
          </button>
        </div>
      </header>

      <div className="cl-search">
        <label htmlFor="conversation-search" className="sr-only">
          Search conversations
        </label>
        <input
          id="conversation-search"
          type="search"
          className="search-input"
          placeholder="Search…"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          aria-label="Search conversations"
        />
      </div>

      <ul className="cl-list" role="listbox" aria-label="Conversation list">
        {conversations.length === 0 && (
          <li className="cl-empty" role="option" aria-selected={false}>
            {searchQuery ? `No results for "${searchQuery}"` : 'No conversations yet'}
          </li>
        )}
        {conversations.map((conversation) => (
          <li
            key={conversation.id}
            role="option"
            aria-selected={conversation.id === activeId}
            className={`cl-item ${conversation.id === activeId ? 'cl-item--active' : ''} ${conversation.muted ? 'cl-item--muted' : ''} ${conversation.blocked ? 'cl-item--blocked' : ''}`}
          >
            <button
              className="cl-item-btn"
              onClick={() => onSelect(conversation.id)}
              aria-label={`${conversation.name}${conversation.unread > 0 ? `, ${conversation.unread} unread` : ''}${conversation.muted ? ', muted' : ''}${conversation.blocked ? ', blocked' : ''}`}
              type="button"
            >
              <span className="cl-avatar" aria-hidden="true">
                {conversation.avatar}
              </span>
              <span className="cl-info">
                <span className="cl-name">
                  {conversation.name}
                  {conversation.muted && (
                    <span className="cl-mute-badge" aria-label="muted">
                      {' '}
                      🔇
                    </span>
                  )}
                </span>
                <span className="cl-last">{conversation.lastMessage || 'No messages yet'}</span>
              </span>
              <span className="cl-meta">
                <span className="cl-time">{formatTime(conversation.lastTimestamp)}</span>
                {conversation.unread > 0 && (
                  <span className="cl-unread-badge" aria-label={`${conversation.unread} unread`}>
                    {conversation.unread > 99 ? '99+' : conversation.unread}
                  </span>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
