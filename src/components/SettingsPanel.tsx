import type { AppSettings } from '../types'
import { CogStatus } from './CogStatus'
import './SettingsPanel.css'

interface SettingsPanelProps {
  settings: AppSettings
  onUpdate: (patch: Partial<AppSettings>) => void
  onClose: () => void
}

export function SettingsPanel({ settings, onUpdate, onClose }: SettingsPanelProps) {
  return (
    <div className="settings-panel" role="dialog" aria-label="Settings" aria-modal="true">
      <header className="settings-header">
        <h2 className="settings-title">⚙️ Settings</h2>
        <button className="icon-btn" onClick={onClose} aria-label="Close settings" type="button">
          ✕
        </button>
      </header>

      <div className="settings-body">
        <section className="settings-section" aria-labelledby="sound-settings-heading">
          <h3 id="sound-settings-heading" className="settings-section-title">
            Sound
          </h3>
          <div className="settings-row">
            <label className="switch-label" htmlFor="sound-switch">
              <span>UI Sounds</span>
              <span className="switch-desc">Play sounds for send, receive, and button clicks</span>
            </label>
            <button
              id="sound-switch"
              role="switch"
              aria-checked={settings.soundEnabled}
              className={`toggle-switch ${settings.soundEnabled ? 'toggle-switch--on' : ''}`}
              onClick={() => onUpdate({ soundEnabled: !settings.soundEnabled })}
              aria-label={`UI Sounds ${settings.soundEnabled ? 'on' : 'off'}`}
              data-testid="sound-switch"
              type="button"
            >
              <span className="toggle-thumb" />
              <span className="sr-only">{settings.soundEnabled ? 'On' : 'Off'}</span>
            </button>
          </div>
        </section>

        <section className="settings-section" aria-labelledby="motion-settings-heading">
          <h3 id="motion-settings-heading" className="settings-section-title">
            Motion
          </h3>
          <div className="settings-row">
            <label className="switch-label" htmlFor="motion-switch">
              <span>Reduced Motion</span>
              <span className="switch-desc">Pause all animations and use static fallbacks</span>
            </label>
            <button
              id="motion-switch"
              role="switch"
              aria-checked={settings.reducedMotion}
              className={`toggle-switch ${settings.reducedMotion ? 'toggle-switch--on' : ''}`}
              onClick={() => onUpdate({ reducedMotion: !settings.reducedMotion })}
              aria-label={`Reduced motion ${settings.reducedMotion ? 'on' : 'off'}`}
              data-testid="reduced-motion-switch"
              type="button"
            >
              <span className="toggle-thumb" />
              <span className="sr-only">{settings.reducedMotion ? 'On' : 'Off'}</span>
            </button>
          </div>
        </section>

        <section className="settings-section" aria-labelledby="status-demo-heading">
          <h3 id="status-demo-heading" className="settings-section-title">
            Status indicators (demo)
          </h3>
          <div className="cog-demo-grid">
            {(['idle', 'sending', 'delivered', 'syncing', 'warning', 'failure'] as const).map((state) => (
              <CogStatus key={state} state={state} reducedMotion={settings.reducedMotion} />
            ))}
          </div>
        </section>

        <section className="settings-section" aria-labelledby="info-heading">
          <h3 id="info-heading" className="settings-section-title">
            About
          </h3>
          <p className="settings-info">
            <strong>Cowlsly.cc</strong> — Private Messenger demo shell.
            <br />
            No real accounts, messages, or encryption.
            <br />
            Local demo data only. Not production-ready.
          </p>
          <p className="settings-info settings-info--note">
            🔒 No calls, file sharing, or contact sync available in this demo.
          </p>
        </section>
      </div>
    </div>
  )
}
