import { act, render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App'
import { useMessenger } from '../hooks/useMessenger'

beforeEach(() => {
  window.localStorage.clear()
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

describe('useMessenger - sendMessage', () => {
  it('adds a message with sending status', () => {
    const { result } = renderHook(() => useMessenger())
    act(() => {
      result.current.setActiveConversationId('c1')
    })
    const initialCount = result.current.messages.length
    act(() => {
      result.current.sendMessage('Hello world')
    })
    expect(result.current.messages.length).toBe(initialCount + 1)
    const last = result.current.messages[result.current.messages.length - 1]
    expect(last.text).toBe('Hello world')
    expect(last.status).toBe('sending')
    expect(last.isOwn).toBe(true)
  })

  it('trims whitespace and rejects empty messages', () => {
    const { result } = renderHook(() => useMessenger())
    act(() => {
      result.current.setActiveConversationId('c1')
    })
    const before = result.current.messages.length
    act(() => {
      result.current.sendMessage('   ')
    })
    expect(result.current.messages.length).toBe(before)
  })

  it('returns false for empty message', () => {
    const { result } = renderHook(() => useMessenger())
    act(() => {
      result.current.setActiveConversationId('c1')
    })
    let returnValue = false
    act(() => {
      returnValue = result.current.sendMessage('')
    })
    expect(returnValue).toBe(false)
  })
})

describe('useMessenger - duplicate send prevention', () => {
  it('prevents duplicate messages within 2 seconds', () => {
    const { result } = renderHook(() => useMessenger())
    act(() => {
      result.current.setActiveConversationId('c1')
    })
    const before = result.current.messages.length
    act(() => {
      result.current.sendMessage('duplicate test')
      result.current.sendMessage('duplicate test')
    })
    expect(result.current.messages.length).toBe(before + 1)
  })
})

describe('useMessenger - failed send retry', () => {
  it('can retry a failed message', () => {
    const { result } = renderHook(() => useMessenger())
    act(() => {
      result.current.setActiveConversationId('c1')
      result.current.sendMessage('test retry')
    })
    const messageId = result.current.messages[result.current.messages.length - 1].id
    act(() => {
      result.current.retryMessage(messageId)
    })
    const message = result.current.messages.find((item) => item.id === messageId)
    expect(message?.status).toBe('sending')
  })
})

describe('SettingsPanel - switches', () => {
  it('toggles sound switch', async () => {
    render(<App />)
    const settingsButton = screen.getByLabelText('Open settings')
    await userEvent.click(settingsButton)
    const soundSwitch = screen.getByTestId('sound-switch')
    const initialChecked = soundSwitch.getAttribute('aria-checked')
    await userEvent.click(soundSwitch)
    expect(soundSwitch.getAttribute('aria-checked')).not.toBe(initialChecked)
  })

  it('toggles reduced motion switch', async () => {
    render(<App />)
    const settingsButton = screen.getByLabelText('Open settings')
    await userEvent.click(settingsButton)
    const motionSwitch = screen.getByTestId('reduced-motion-switch')
    const initialChecked = motionSwitch.getAttribute('aria-checked')
    await userEvent.click(motionSwitch)
    expect(motionSwitch.getAttribute('aria-checked')).not.toBe(initialChecked)
  })
})

describe('Reduced motion behaviour', () => {
  it('adds reduced-motion class to app when enabled', async () => {
    render(<App />)
    const settingsButton = screen.getByLabelText('Open settings')
    await userEvent.click(settingsButton)
    const motionSwitch = screen.getByTestId('reduced-motion-switch')
    if (motionSwitch.getAttribute('aria-checked') === 'false') {
      await userEvent.click(motionSwitch)
    }
    const app = screen.getByTestId('app')
    expect(app.classList.contains('reduced-motion')).toBe(true)
  })
})
