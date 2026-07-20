import { useEffect, useRef, useState } from 'react'
import type { CogState } from '../types'
import './CogStatus.css'

interface CogStatusProps {
  state: CogState
  reducedMotion: boolean
  label?: string
}

const STATE_LABELS: Record<CogState, string> = {
  idle: 'Idle',
  sending: 'Sending…',
  delivered: 'Delivered',
  syncing: 'Syncing…',
  warning: 'Warning',
  failure: 'Failed',
}

const STATE_COLORS: Record<CogState, string> = {
  idle: '#888',
  sending: '#4a9eff',
  delivered: '#22c55e',
  syncing: '#a855f7',
  warning: '#f59e0b',
  failure: '#ef4444',
}

export function CogStatus({ state, reducedMotion, label }: CogStatusProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') {
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(Boolean(entry?.isIntersecting))
    }, { threshold: 0.1 })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const color = STATE_COLORS[state]
  const displayLabel = label ?? STATE_LABELS[state]
  const paused = reducedMotion || !isVisible

  return (
    <div
      ref={containerRef}
      className={`cog-status cog-status--${state}`}
      role="status"
      aria-label={`Status: ${displayLabel}`}
      aria-live="polite"
    >
      <svg className="cog-svg" width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        <g
          className={`cog-large ${paused ? 'cog-paused' : ''} cog-cw--${state}`}
          style={{ transformOrigin: '14px 14px', color }}
        >
          <CogShape cx={14} cy={14} r={7} teeth={8} toothSize={2.5} fill={color} />
        </g>
        <g
          className={`cog-small ${paused ? 'cog-paused' : ''} cog-ccw--${state}`}
          style={{ transformOrigin: '26px 26px', color }}
        >
          <CogShape cx={26} cy={26} r={5} teeth={6} toothSize={2} fill={color} />
        </g>
      </svg>
      <span className="cog-label">{displayLabel}</span>
    </div>
  )
}

interface CogShapeProps {
  cx: number
  cy: number
  r: number
  teeth: number
  toothSize: number
  fill: string
}

function CogShape({ cx, cy, r, teeth, toothSize, fill }: CogShapeProps) {
  const points: string[] = []
  for (let index = 0; index < teeth; index += 1) {
    const angle = (index / teeth) * 2 * Math.PI
    const nextAngle = ((index + 0.5) / teeth) * 2 * Math.PI
    const outerRadius = r + toothSize
    points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`)
    points.push(
      `${cx + outerRadius * Math.cos(nextAngle - Math.PI / (teeth * 2))},${cy + outerRadius * Math.sin(nextAngle - Math.PI / (teeth * 2))}`,
    )
    points.push(
      `${cx + outerRadius * Math.cos(nextAngle + Math.PI / (teeth * 2))},${cy + outerRadius * Math.sin(nextAngle + Math.PI / (teeth * 2))}`,
    )
  }

  return (
    <>
      <polygon points={points.join(' ')} fill={fill} opacity="0.9" />
      <circle cx={cx} cy={cy} r={r * 0.45} fill="var(--bg-primary, #1a1a2e)" />
    </>
  )
}
