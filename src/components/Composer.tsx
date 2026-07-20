import { useRef, useState } from 'react'
import './Composer.css'

interface ComposerProps {
  onSend: (text: string, replyToId?: string) => boolean
  replyToId: string | null
  replyToText?: string
  onCancelReply: () => void
  disabled?: boolean
  isOffline?: boolean
}

export function Composer({ onSend, replyToId, replyToText, onCancelReply, disabled, isOffline }: ComposerProps) {
  const [text, setText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleSend() {
    if (!text.trim() || isSending || disabled) {
      return
    }
    setIsSending(true)
    const sent = onSend(text, replyToId ?? undefined)
    if (sent) {
      setText('')
      if (replyToId) {
        onCancelReply()
      }
    }
    window.setTimeout(() => setIsSending(false), 300)
    textareaRef.current?.focus()
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  const canSend = text.trim().length > 0 && !isSending && !disabled && !isOffline

  return (
    <div className="composer" aria-label="Message composer">
      {replyToId && replyToText && (
        <div className="composer-reply-banner">
          <span className="composer-reply-label">Replying to:</span>
          <span className="composer-reply-text">{replyToText.slice(0, 80)}</span>
          <button className="composer-reply-cancel" onClick={onCancelReply} aria-label="Cancel reply" type="button">
            ✕
          </button>
        </div>
      )}
      <div className={`composer-row ${isOffline ? 'composer-row--offline' : ''}`}>
        {isOffline && (
          <span className="composer-offline-badge" role="alert" aria-live="polite">
            📵 Offline
          </span>
        )}
        <label htmlFor="composer-input" className="sr-only">
          Message
        </label>
        <textarea
          id="composer-input"
          ref={textareaRef}
          className="composer-input"
          placeholder={
            isOffline
              ? 'Offline — cannot send messages'
              : disabled
                ? 'Blocked — cannot message'
                : 'Message…'
          }
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={Boolean(disabled) || Boolean(isOffline)}
          rows={1}
          aria-label="Type a message"
          aria-disabled={Boolean(disabled) || Boolean(isOffline)}
        />
        <button
          className={`send-btn ${isSending ? 'send-btn--sending' : ''} ${canSend ? 'send-btn--active' : ''}`}
          onClick={handleSend}
          disabled={!canSend}
          aria-label={isSending ? 'Sending…' : 'Send message'}
          aria-disabled={!canSend}
          data-testid="send-button"
          type="button"
        >
          {isSending ? '⏳' : '➤'}
        </button>
      </div>
      {disabled && !isOffline && (
        <p className="composer-disabled-note" role="note">
          ⛔ You've blocked this person. Unblock to message.
        </p>
      )}
    </div>
  )
}
