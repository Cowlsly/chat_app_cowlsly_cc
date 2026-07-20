import { useState } from 'react'
import type { Message, ReactionEmoji } from '../types'
import './MessageBubble.css'

const REACTIONS: ReactionEmoji[] = ['👍', '❤️', '😂', '😮', '😢', '🙏']

interface MessageBubbleProps {
  message: Message
  replyToMessage?: Message
  onReply: (id: string) => void
  onReact: (id: string, emoji: ReactionEmoji) => void
  onEdit: (id: string, newText: string) => void
  onDelete: (id: string) => void
  onSave: (id: string) => void
  onCopy: (text: string) => void
  onRetry: (id: string) => void
  onReport: (id: string) => void
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function MessageBubble({
  message,
  replyToMessage,
  onReply,
  onReact,
  onEdit,
  onDelete,
  onSave,
  onCopy,
  onRetry,
  onReport,
}: MessageBubbleProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [showReactions, setShowReactions] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(message.text)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showReportMenu, setShowReportMenu] = useState(false)

  const activeReactions = REACTIONS.filter((emoji) => message.reactions[emoji])

  function handleEdit() {
    setShowMenu(false)
    setIsEditing(true)
    setEditText(message.text)
  }

  function handleEditSubmit() {
    if (editText.trim()) {
      onEdit(message.id, editText)
    }
    setIsEditing(false)
  }

  function handleDelete() {
    setShowMenu(false)
    setShowDeleteConfirm(true)
  }

  function handleDeleteConfirm() {
    onDelete(message.id)
    setShowDeleteConfirm(false)
  }

  function handleReport(reason: string) {
    onReport(message.id)
    setShowReportMenu(false)
    setShowMenu(false)
    alert(`Demo: Reported for "${reason}". No real report is sent.`)
  }

  const statusIcon = {
    sending: '⏳',
    sent: '✓',
    delivered: '✓✓',
    failed: '⚠️',
  }[message.status]

  const statusLabel = {
    sending: 'Sending',
    sent: 'Sent',
    delivered: 'Delivered',
    failed: 'Failed to send',
  }[message.status]

  if (isEditing) {
    return (
      <div className="msg-bubble msg-bubble--own msg-bubble--editing">
        <textarea
          className="msg-edit-input"
          value={editText}
          onChange={(event) => setEditText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              handleEditSubmit()
            }
            if (event.key === 'Escape') {
              setIsEditing(false)
            }
          }}
          autoFocus
          aria-label="Edit message"
        />
        <div className="msg-edit-actions">
          <button className="btn btn--sm btn--ghost" onClick={() => setIsEditing(false)} type="button">
            Cancel
          </button>
          <button className="btn btn--sm btn--primary" onClick={handleEditSubmit} type="button">
            Save
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`msg-bubble ${message.isOwn ? 'msg-bubble--own' : 'msg-bubble--other'} msg-bubble--${message.status}`}
      data-testid={`message-${message.id}`}
    >
      {replyToMessage && (
        <div className="msg-reply-preview" aria-label="Replying to">
          <span className="msg-reply-name">{replyToMessage.isOwn ? 'You' : 'Them'}</span>
          <span className="msg-reply-text">
            {replyToMessage.text.slice(0, 60)}
            {replyToMessage.text.length > 60 ? '…' : ''}
          </span>
        </div>
      )}

      <div className="msg-content">
        <span className="msg-text">{message.text}</span>
        {message.editedAt && (
          <span className="msg-edited" aria-label="edited">
            (edited)
          </span>
        )}
      </div>

      {activeReactions.length > 0 && (
        <div className="msg-reactions" aria-label="Reactions">
          {activeReactions.map((emoji) => (
            <button
              key={emoji}
              className="reaction-btn reaction-btn--active"
              onClick={() => onReact(message.id, emoji)}
              aria-label={`Remove ${emoji} reaction`}
              aria-pressed="true"
              type="button"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      <div className="msg-footer">
        <span className="msg-time">{formatTime(message.timestamp)}</span>
        {message.saved && (
          <span className="msg-saved-badge" aria-label="Saved">
            🔖
          </span>
        )}
        {message.isOwn && (
          <span className="msg-status" aria-label={statusLabel} title={statusLabel}>
            {statusIcon}
          </span>
        )}
      </div>

      {message.status === 'failed' && message.isOwn && (
        <button
          className="btn btn--sm btn--danger msg-retry-btn"
          onClick={() => onRetry(message.id)}
          aria-label="Retry sending message"
          type="button"
        >
          Retry
        </button>
      )}

      <div className="msg-actions" role="toolbar" aria-label="Message actions">
        <button
          className="msg-action-btn"
          onClick={() => setShowReactions((current) => !current)}
          aria-label="React to message"
          aria-expanded={showReactions}
          aria-haspopup="true"
          type="button"
        >
          😊
        </button>
        <button className="msg-action-btn" onClick={() => onReply(message.id)} aria-label="Reply to message" type="button">
          ↩️
        </button>
        <button className="msg-action-btn" onClick={() => onCopy(message.text)} aria-label="Copy message text" type="button">
          📋
        </button>
        <button
          className="msg-action-btn"
          onClick={() => onSave(message.id)}
          aria-label={message.saved ? 'Remove from saved' : 'Save message'}
          aria-pressed={message.saved}
          type="button"
        >
          {message.saved ? '🔖' : '🏷️'}
        </button>
        <button
          className="msg-action-btn"
          onClick={() => setShowMenu((current) => !current)}
          aria-label="More actions"
          aria-expanded={showMenu}
          aria-haspopup="menu"
          type="button"
        >
          ⋯
        </button>
      </div>

      {showReactions && (
        <div className="reaction-picker" role="dialog" aria-label="Choose reaction">
          {REACTIONS.map((emoji) => (
            <button
              key={emoji}
              className={`reaction-btn ${message.reactions[emoji] ? 'reaction-btn--active' : ''}`}
              onClick={() => {
                onReact(message.id, emoji)
                setShowReactions(false)
              }}
              aria-label={`React with ${emoji}`}
              aria-pressed={message.reactions[emoji]}
              type="button"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {showMenu && (
        <div className="msg-menu" role="menu" aria-label="Message options">
          {message.isOwn && (
            <button role="menuitem" className="msg-menu-item" onClick={handleEdit} type="button">
              ✏️ Edit
            </button>
          )}
          {message.isOwn && (
            <button
              role="menuitem"
              className="msg-menu-item msg-menu-item--danger"
              onClick={handleDelete}
              type="button"
            >
              🗑️ Delete
            </button>
          )}
          <button
            role="menuitem"
            className="msg-menu-item"
            onClick={() => {
              onCopy(message.text)
              setShowMenu(false)
            }}
            type="button"
          >
            📋 Copy
          </button>
          <button
            role="menuitem"
            className="msg-menu-item"
            onClick={() => {
              onSave(message.id)
              setShowMenu(false)
            }}
            type="button"
          >
            {message.saved ? '🔖 Unsave' : '🏷️ Save'}
          </button>
          {!message.isOwn && (
            <button
              role="menuitem"
              className="msg-menu-item msg-menu-item--danger"
              onClick={() => setShowReportMenu(true)}
              type="button"
            >
              ⚠️ Report
            </button>
          )}
          <button role="menuitem" className="msg-menu-item" onClick={() => setShowMenu(false)} type="button">
            ✕ Close
          </button>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="msg-confirm" role="alertdialog" aria-label="Delete message?">
          <p>Delete this message?</p>
          <div className="msg-confirm-actions">
            <button className="btn btn--sm btn--ghost" onClick={() => setShowDeleteConfirm(false)} type="button">
              Cancel
            </button>
            <button className="btn btn--sm btn--danger" onClick={handleDeleteConfirm} type="button">
              Delete
            </button>
          </div>
        </div>
      )}

      {showReportMenu && (
        <div className="msg-menu msg-menu--report" role="menu" aria-label="Report reason">
          <p className="msg-menu-title">Report as:</p>
          {['Spam', 'Harassment', 'Misinformation', 'Other'].map((reason) => (
            <button
              key={reason}
              role="menuitem"
              className="msg-menu-item msg-menu-item--danger"
              onClick={() => handleReport(reason)}
              type="button"
            >
              {reason}
            </button>
          ))}
          <button role="menuitem" className="msg-menu-item" onClick={() => setShowReportMenu(false)} type="button">
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}
