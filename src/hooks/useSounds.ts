import { useCallback, useRef } from 'react'
import type { AppSettings } from '../types'

type SoundType = 'button' | 'send' | 'receive' | 'success' | 'error'

type AudioContextConstructor = typeof AudioContext & {
  prototype: AudioContext
}

function createTone(
  ctx: AudioContext,
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume = 0.15,
): void {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = type
  osc.frequency.setValueAtTime(frequency, ctx.currentTime)
  gain.gain.setValueAtTime(volume, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + duration)
}

const SOUND_CONFIGS: Record<SoundType, (ctx: AudioContext) => void> = {
  button: (ctx) => createTone(ctx, 440, 0.05, 'sine', 0.08),
  send: (ctx) => {
    createTone(ctx, 600, 0.1, 'sine', 0.12)
    window.setTimeout(() => createTone(ctx, 800, 0.08, 'sine', 0.08), 60)
  },
  receive: (ctx) => {
    createTone(ctx, 800, 0.08, 'sine', 0.1)
    window.setTimeout(() => createTone(ctx, 1000, 0.08, 'sine', 0.08), 50)
  },
  success: (ctx) => {
    createTone(ctx, 523, 0.1, 'sine', 0.12)
    window.setTimeout(() => createTone(ctx, 659, 0.1, 'sine', 0.12), 80)
    window.setTimeout(() => createTone(ctx, 784, 0.15, 'sine', 0.12), 160)
  },
  error: (ctx) => {
    createTone(ctx, 220, 0.15, 'sawtooth', 0.1)
    window.setTimeout(() => createTone(ctx, 180, 0.2, 'sawtooth', 0.1), 100)
  },
}

function getAudioContextConstructor(): AudioContextConstructor | null {
  const ctor = window.AudioContext ?? (window as Window & { webkitAudioContext?: AudioContextConstructor }).webkitAudioContext
  return ctor ?? null
}

export function useSounds(settings: AppSettings) {
  const audioCtxRef = useRef<AudioContext | null>(null)

  const play = useCallback(
    (type: SoundType) => {
      if (!settings.soundEnabled) {
        return
      }

      try {
        const AudioCtor = getAudioContextConstructor()
        if (!AudioCtor) {
          return
        }
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
          audioCtxRef.current = new AudioCtor()
        }
        if (audioCtxRef.current.state === 'suspended') {
          void audioCtxRef.current.resume().then(() => {
            if (audioCtxRef.current) {
              SOUND_CONFIGS[type](audioCtxRef.current)
            }
          })
        } else {
          SOUND_CONFIGS[type](audioCtxRef.current)
        }
      } catch {
        // Audio not available — silently skip
      }
    },
    [settings.soundEnabled],
  )

  return { play }
}
