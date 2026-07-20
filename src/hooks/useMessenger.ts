import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { AppSettings, Conversation, Message, ReactionEmoji } from '../types'
import { createReactions, DEMO_CONVERSATIONS, DEMO_MESSAGES } from '../data/demoData'

const SEND_DELAY = 1000
const FAIL_RATE = 0.15
const STORAGE_KEY = 'cowlsly-messenger-demo-v1'

let nextId = 100

interface StoredMessengerState {
  conversations: Conversation[]
  messages: Message[]
  activeConversationId: string | null
  settings: AppSettings
}

function getInitialReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getDefaultSettings(): AppSettings {
  return {
    soundEnabled: false,
    reducedMotion: getInitialReducedMotion(),
  }
}

function getDefaultState(): StoredMessengerState {
  return {
    conversations: DEMO_CONVERSATIONS,
    messages: DEMO_MESSAGES,
    activeConversationId: 'c1',
    settings: getDefaultSettings(),
  }
}

function loadStoredState(): StoredMessengerState {
  if (typeof window === 'undefined') {
    return getDefaultState()
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return getDefaultState()
    }
    const parsed = JSON.parse(raw) as Partial<StoredMessengerState>
    const defaults = getDefaultState()
    const conversations = parsed.conversations?.length ? parsed.conversations : defaults.conversations
    const messages = parsed.messages?.length ? parsed.messages : defaults.messages
    const activeConversationId =
      parsed.activeConversationId && conversations.some((conversation) => conversation.id === parsed.activeConversationId)
        ? parsed.activeConversationId
        : defaults.activeConversationId

    return {
      conversations,
      messages,
      activeConversationId,
      settings: {
        ...defaults.settings,
        ...parsed.settings,
      },
    }
  } catch {
    return getDefaultState()
  }
}

function syncConversationPreviews(
  conversations: Conversation[],
  messages: Message[],
): Conversation[] {
  return conversations.map((conversation) => {
    const lastMessage = messages
      .filter((message) => message.conversationId === conversation.id)
      .sort((a, b) => b.timestamp - a.timestamp)[0]

    if (!lastMessage) {
      return { ...conversation, lastMessage: '', lastTimestamp: conversation.lastTimestamp }
    }

    return {
      ...conversation,
      lastMessage: lastMessage.text,
      lastTimestamp: lastMessage.timestamp,
    }
  })
}

export function useMessenger() {
  const initialState = useMemo(loadStoredState, [])
  const [conversations, setConversations] = useState<Conversation[]>(initialState.conversations)
  const [messages, setMessages] = useState<Message[]>(initialState.messages)
  const [activeConversationId, setActiveConversationIdState] = useState<string | null>(initialState.activeConversationId)
  const [settings, setSettings] = useState<AppSettings>(initialState.settings)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const sendingRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    const state: StoredMessengerState = {
      conversations,
      messages,
      activeConversationId,
      settings,
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [activeConversationId, conversations, messages, settings])

  const activeConversation = conversations.find((conversation) => conversation.id === activeConversationId) ?? null
  const activeMessages = messages
    .filter((message) => message.conversationId === activeConversationId)
    .sort((a, b) => a.timestamp - b.timestamp)
  const filteredConversations = conversations
    .filter(
      (conversation) =>
        conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => b.lastTimestamp - a.lastTimestamp)

  const sendMessage = useCallback(
    (text: string, replyToId?: string): boolean => {
      const trimmed = text.trim()
      if (!trimmed || !activeConversationId) {
        return false
      }

      const now = Date.now()
      const recentDuplicate = messages.some(
        (message) =>
          message.conversationId === activeConversationId &&
          message.isOwn &&
          message.text === trimmed &&
          now - message.timestamp < 2000,
      )
      if (recentDuplicate) {
        return false
      }

      const id = `msg-${++nextId}`
      if (sendingRef.current.has(id)) {
        return false
      }
      sendingRef.current.add(id)

      const newMessage: Message = {
        id,
        conversationId: activeConversationId,
        text: trimmed,
        timestamp: now,
        isOwn: true,
        status: 'sending',
        replyToId,
        reactions: createReactions(),
        saved: false,
      }

      const nextMessages = [...messages, newMessage]
      setMessages(nextMessages)
      setConversations((current) =>
        current.map((conversation) =>
          conversation.id === activeConversationId
            ? { ...conversation, lastMessage: trimmed, lastTimestamp: now }
            : conversation,
        ),
      )

      window.setTimeout(() => {
        const shouldFail = Math.random() < FAIL_RATE
        setMessages((current) =>
          current.map((message) =>
            message.id === id ? { ...message, status: shouldFail ? 'failed' : 'delivered' } : message,
          ),
        )
        sendingRef.current.delete(id)
      }, SEND_DELAY)

      return true
    },
    [activeConversationId, messages],
  )

  const retryMessage = useCallback((messageId: string) => {
    if (sendingRef.current.has(messageId)) {
      return
    }
    sendingRef.current.add(messageId)

    setMessages((current) => current.map((message) => (message.id === messageId ? { ...message, status: 'sending' } : message)))

    window.setTimeout(() => {
      setMessages((current) =>
        current.map((message) => (message.id === messageId ? { ...message, status: 'delivered' } : message)),
      )
      sendingRef.current.delete(messageId)
    }, SEND_DELAY)
  }, [])

  const deleteMessage = useCallback(
    (messageId: string) => {
      const nextMessages = messages.filter((message) => message.id !== messageId)
      setMessages(nextMessages)
      setConversations(syncConversationPreviews(conversations, nextMessages))
    },
    [conversations, messages],
  )

  const editMessage = useCallback(
    (messageId: string, newText: string) => {
      const trimmed = newText.trim()
      if (!trimmed) {
        return
      }
      const nextMessages = messages.map((message) =>
        message.id === messageId ? { ...message, text: trimmed, editedAt: Date.now() } : message,
      )
      setMessages(nextMessages)
      setConversations(syncConversationPreviews(conversations, nextMessages))
    },
    [conversations, messages],
  )

  const toggleReaction = useCallback((messageId: string, emoji: ReactionEmoji) => {
    setMessages((current) =>
      current.map((message) => {
        if (message.id !== messageId) {
          return message
        }
        return {
          ...message,
          reactions: { ...message.reactions, [emoji]: !message.reactions[emoji] },
        }
      }),
    )
  }, [])

  const toggleSaved = useCallback((messageId: string) => {
    setMessages((current) => current.map((message) => (message.id === messageId ? { ...message, saved: !message.saved } : message)))
  }, [])

  const copyMessage = useCallback((text: string) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return
    }
    void navigator.clipboard.writeText(text).catch(() => {
      // Clipboard not available in test/demo env
    })
  }, [])

  const toggleMuteConversation = useCallback((conversationId: string) => {
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === conversationId ? { ...conversation, muted: !conversation.muted } : conversation,
      ),
    )
  }, [])

  const blockConversation = useCallback((conversationId: string) => {
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === conversationId ? { ...conversation, blocked: true } : conversation,
      ),
    )
  }, [])

  const reportConversation = useCallback((_conversationId: string, _reason: string) => {
    void _conversationId
    void _reason
    // Demo only — no real reporting backend
  }, [])

  const newConversation = useCallback((name: string) => {
    const trimmed = name.trim()
    if (!trimmed) {
      return
    }

    const id = `c-${++nextId}`
    const initials = trimmed
      .split(' ')
      .map((word) => word[0] ?? '')
      .join('')
      .slice(0, 2)
      .toUpperCase()

    const conversation: Conversation = {
      id,
      name: trimmed,
      avatar: initials || 'NC',
      lastMessage: '',
      lastTimestamp: Date.now(),
      unread: 0,
      muted: false,
      blocked: false,
    }

    setConversations((current) => [conversation, ...current])
    setActiveConversationIdState(id)
  }, [])

  const markAsRead = useCallback((conversationId: string) => {
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === conversationId ? { ...conversation, unread: 0 } : conversation,
      ),
    )
  }, [])

  const updateSettings = useCallback((patch: Partial<AppSettings>) => {
    setSettings((current) => ({ ...current, ...patch }))
  }, [])

  return {
    conversations: filteredConversations,
    messages: activeMessages,
    allMessages: messages,
    activeConversationId,
    activeConversation,
    settings,
    searchQuery,
    isSettingsOpen,
    setActiveConversationId: (id: string) => {
      setActiveConversationIdState(id)
      markAsRead(id)
    },
    setSearchQuery,
    setIsSettingsOpen,
    sendMessage,
    retryMessage,
    deleteMessage,
    editMessage,
    toggleReaction,
    toggleSaved,
    copyMessage,
    toggleMuteConversation,
    blockConversation,
    reportConversation,
    newConversation,
    updateSettings,
  }
}
