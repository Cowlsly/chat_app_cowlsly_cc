export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'failed'
export type CogState = 'idle' | 'sending' | 'delivered' | 'syncing' | 'warning' | 'failure'
export type ReactionEmoji = '👍' | '❤️' | '😂' | '😮' | '😢' | '🙏'

export interface Message {
  id: string
  conversationId: string
  text: string
  timestamp: number
  isOwn: boolean
  status: MessageStatus
  replyToId?: string
  reactions: Record<ReactionEmoji, boolean>
  editedAt?: number
  saved?: boolean
}

export interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastTimestamp: number
  unread: number
  muted: boolean
  blocked: boolean
}

export interface AppSettings {
  soundEnabled: boolean
  reducedMotion: boolean
}
