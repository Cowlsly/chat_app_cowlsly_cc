import { Fragment, useEffect, useRef, useState } from 'react'
import type { Conversation, Message, ReactionEmoji } from '../types'
import { Composer } from './Composer'
import { MessageBubble } from './MessageBubble'
import './ChatView.css'

interface ChatViewProps {
  conversation: Conversation | null
  messages: Message[]
  allMessages: Message[]
  onBack: () => void
  onSend: (text: string, replyToId?: string) => boolean
  onRetry: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
  onReact: (id: string, emoji: ReactionEmoji) => void
  onSave: (id: string) => void
  onCopy: (text: string) => void
  onToggleMute: (id: string) => void
  onBlock: (id: string) => void
  onReport: (id: string) => void
  isOffline?: boolean
}

export function ChatView({
  conversation,
  messages,
  allMessages,
  onBack,
  onSend,
  onRetry,
  onDelete,
  onEdit,
  onReact,
  onSave,
  onCopy,
  onToggleMute,
  onBlock,
  onReport,
  isOffline,
}: ChatViewProps) {
  const [replyToId, setReplyToId] = useState<string | null>(null)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [showBlockConfirm, setShowBlockConfirm] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  useEffect(() => {
    setReplyToId(null)
    setShowMoreMenu(false)
    setShowBlockConfirm(false)
  }, [conversation?.id])

  if (!conversation) {
    return (
      <main className="chat-view chat-view--empty" aria-label="No conversation selected">
        <div className="chat-empty-state">
          <span className="chat-empty-icon" aria-hidden="true">
            ⚙️
          </span>
          <h2>Welcome to Cowlsly.cc</h2>
          <p>Select a conversation or start a new chat</p>
        </div>
      </main>
    )
  }

  const replyToMessage = replyToId ? allMessages.find((message) => message.id === replyToId) : undefined
  const isBlocked = conversation.blocked

  return (
    <main className="chat-view" aria-label={`Chat with ${conversation.name}`}>
      <header className="chat-header">
        <button className="icon-btn chat-back-btn" onClick={onBack} aria-label="Back to conversations" type="button">
          ←
        </button>
        <span className="chat-avatar" aria-hidden="true">
          {conversation.avatar}
        </span>
        <div className="chat-header-info">
          <span className="chat-name">{conversation.name}</span>
          <span className="chat-status-text">{isBlocked ? '⛔ Blocked' : conversation.muted ? '🔇 Muted' : '● Demo'}</span>
        </div>
        <div className="chat-header-actions">
          <button
            className="icon-btn"
            disabled
            aria-label="Voice call (not available in demo)"
            title="Voice call — not available in this demo"
            aria-disabled="true"
            type="button"
          >
            📞
          </button>
          <button
            className="icon-btn"
            disabled
            aria-label="Video call (not available in demo)"
            title="Video call — not available in this demo"
            aria-disabled="true"
            type="button"
          >
            📹
          </button>
          <button
            className="icon-btn"
            onClick={() => setShowMoreMenu((current) => !current)}
            aria-label="More options"
            aria-expanded={showMoreMenu}
            aria-haspopup="menu"
            type="button"
          >
            ⋯
          </button>
        </div>
      </header>

      {showMoreMenu && (
        <div className="chat-more-menu" role="menu" aria-label="Chat options">
          <button
            role="menuitem"
            className="chat-menu-item"
            onClick={() => {
              onToggleMute(conversation.id)
              setShowMoreMenu(false)
            }}
            type="button"
          >
            {conversation.muted ? '🔔 Unmute' : '🔇 Mute conversation'}
          </button>
          {!isBlocked && (
            <button
              role="menuitem"
              className="chat-menu-item chat-menu-item--danger"
              onClick={() => {
                setShowBlockConfirm(true)
                setShowMoreMenu(false)
              }}
              type="button"
            >
              ⛔ Block {conversation.name}
            </button>
          )}
          <button
            role="menuitem"
            className="chat-menu-item chat-menu-item--danger"
            onClick={() => {
              onReport(conversation.id)
              setShowMoreMenu(false)
              alert('Demo: Report submitted. No real report sent.')
            }}
            type="button"
          >
            ⚠️ Report
          </button>
          <button role="menuitem" className="chat-menu-item" onClick={() => setShowMoreMenu(false)} type="button">
            ✕ Close
          </button>
        </div>
      )}

      {showBlockConfirm && (
        <div className="chat-overlay" role="alertdialog" aria-label={`Block ${conversation.name}?`}>
          <div className="chat-dialog">
            <h3>Block {conversation.name}?</h3>
            <p>They won't be able to message you. You can unblock them later.</p>
            <p className="chat-dialog-note">Demo only — local state is the only thing changed.</p>
            <div className="chat-dialog-actions">
              <button className="btn btn--ghost" onClick={() => setShowBlockConfirm(false)} type="button">
                Cancel
              </button>
              <button
                className="btn btn--danger"
                onClick={() => {
                  onBlock(conversation.id)
                  setShowBlockConfirm(false)
                }}
                type="button"
              >
                Block
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="chat-messages" role="log" aria-label="Messages" aria-live="polite" aria-relevant="additions">
        {messages.length === 0 && <p className="chat-no-messages">No messages yet. Say hello!</p>}
        {messages.map((message, index) => {
          const previousMessage = messages[index - 1]
          const showDateSeparator =
            !previousMessage || new Date(previousMessage.timestamp).toDateString() !== new Date(message.timestamp).toDateString()

          return (
            <Fragment key={message.id}>
              {showDateSeparator && (
                <div className="chat-date-sep" aria-label={new Date(message.timestamp).toDateString()}>
                  {new Date(message.timestamp).toLocaleDateString([], {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              )}
              <MessageBubble
                message={message}
                replyToMessage={message.replyToId ? allMessages.find((item) => item.id === message.replyToId) : undefined}
                onReply={setReplyToId}
                onReact={onReact}
                onEdit={onEdit}
                onDelete={onDelete}
                onSave={onSave}
                onCopy={onCopy}
                onRetry={onRetry}
                onReport={onReport}
              />
            </Fragment>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <Composer
        onSend={onSend}
        replyToId={replyToId}
        replyToText={replyToMessage?.text}
        onCancelReply={() => setReplyToId(null)}
        disabled={isBlocked}
        isOffline={isOffline}
      />
    </main>
  )
}
