import { useState } from 'react'
import './App.css'
import { ChatView } from './components/ChatView'
import { CogStatus } from './components/CogStatus'
import { ConversationList } from './components/ConversationList'
import { SettingsPanel } from './components/SettingsPanel'
import { useMessenger } from './hooks/useMessenger'
import { useSounds } from './hooks/useSounds'
import type { CogState } from './types'

export default function App() {
  const messenger = useMessenger()
  const sounds = useSounds(messenger.settings)
  const [cogState, setCogState] = useState<CogState>('idle')
  const [showList, setShowList] = useState(true)
  const [newChatName, setNewChatName] = useState('')
  const [showNewChat, setShowNewChat] = useState(false)

  function handleSend(text: string, replyToId?: string): boolean {
    setCogState('sending')
    sounds.play('send')
    const sent = messenger.sendMessage(text, replyToId)
    if (sent) {
      window.setTimeout(() => {
        setCogState('delivered')
        sounds.play('success')
        window.setTimeout(() => setCogState('idle'), 1500)
      }, 1200)
    } else {
      setCogState('warning')
      window.setTimeout(() => setCogState('idle'), 1500)
    }
    return sent
  }

  function handleNewChat() {
    sounds.play('button')
    setShowNewChat(true)
  }

  function handleCreateChat() {
    if (newChatName.trim()) {
      messenger.newConversation(newChatName)
      setNewChatName('')
      setShowNewChat(false)
      setShowList(false)
    }
  }

  function handleSelectConversation(id: string) {
    sounds.play('button')
    messenger.setActiveConversationId(id)
    setShowList(false)
  }

  return (
    <div className={`app ${messenger.settings.reducedMotion ? 'reduced-motion' : ''}`} data-testid="app">
      <div className="app-layout">
        <div className={`app-sidebar ${showList ? 'app-sidebar--visible' : ''}`}>
          <ConversationList
            conversations={messenger.conversations}
            activeId={messenger.activeConversationId}
            searchQuery={messenger.searchQuery}
            onSearchChange={messenger.setSearchQuery}
            onSelect={handleSelectConversation}
            onNewChat={handleNewChat}
            onOpenSettings={() => {
              sounds.play('button')
              messenger.setIsSettingsOpen(true)
            }}
          />
        </div>

        <div className={`app-chat ${!showList ? 'app-chat--visible' : ''}`}>
          <ChatView
            conversation={messenger.activeConversation}
            messages={messenger.messages}
            allMessages={messenger.allMessages}
            onBack={() => {
              sounds.play('button')
              setShowList(true)
            }}
            onSend={handleSend}
            onRetry={(id) => {
              sounds.play('button')
              messenger.retryMessage(id)
            }}
            onDelete={messenger.deleteMessage}
            onEdit={messenger.editMessage}
            onReact={(id, emoji) => {
              sounds.play('button')
              messenger.toggleReaction(id, emoji)
            }}
            onSave={(id) => {
              sounds.play('button')
              messenger.toggleSaved(id)
            }}
            onCopy={(text) => {
              sounds.play('button')
              messenger.copyMessage(text)
            }}
            onToggleMute={(id) => {
              sounds.play('button')
              messenger.toggleMuteConversation(id)
            }}
            onBlock={(id) => {
              sounds.play('button')
              messenger.blockConversation(id)
            }}
            onReport={(id) => messenger.reportConversation(id, 'user-report')}
          />
        </div>
      </div>

      <div className="app-status-bar" aria-label="App status">
        <CogStatus state={cogState} reducedMotion={messenger.settings.reducedMotion} />
      </div>

      {messenger.isSettingsOpen && (
        <>
          <div className="app-overlay" onClick={() => messenger.setIsSettingsOpen(false)} aria-hidden="true" />
          <SettingsPanel settings={messenger.settings} onUpdate={messenger.updateSettings} onClose={() => messenger.setIsSettingsOpen(false)} />
        </>
      )}

      {showNewChat && (
        <div className="app-overlay" role="alertdialog" aria-label="New conversation">
          <div className="new-chat-dialog">
            <h2>New Conversation</h2>
            <p className="new-chat-note">Demo only — enter any name</p>
            <label htmlFor="new-chat-name" className="new-chat-label">
              Name
            </label>
            <input
              id="new-chat-name"
              type="text"
              className="new-chat-input"
              value={newChatName}
              onChange={(event) => setNewChatName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleCreateChat()
                }
                if (event.key === 'Escape') {
                  setShowNewChat(false)
                  setNewChatName('')
                }
              }}
              placeholder="Contact name…"
              autoFocus
              aria-label="New contact name"
            />
            <div className="new-chat-actions">
              <button
                className="btn btn--ghost"
                onClick={() => {
                  setShowNewChat(false)
                  setNewChatName('')
                }}
                type="button"
              >
                Cancel
              </button>
              <button className="btn btn--primary" onClick={handleCreateChat} disabled={!newChatName.trim()} type="button">
                Start Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
