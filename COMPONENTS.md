# Reusable UI Components — Cowlsly.cc Messenger

Foundation for the working interaction system. All controls use CSS classes and ARIA where applicable. States are visual and functional in the demo shell.

## Buttons
- `.icon-btn` — circular icon actions (new chat, back, attach, menu)
- `.pill-btn` — rounded text actions (sounds, motion, dialogs)
- `.send-btn` — primary gradient send

States: hover, :active (pressed), :focus-visible, :disabled, `.selected` / `[aria-pressed="true"]`, `.loading` (spinner).

## Switch
- `.switch` wrapper with checkbox + `.knob` for toggle controls (sound, motion).

## Chip
- `.chip` for tags, status, or filters.

## Others (existing)
- Modal: native `<dialog>` + `.dialog-card`
- Toast: `#toast` with role="status"
- Input: standard form controls with focus styles
- Menu: `.menu-grid` in action dialog

Next: extract JS helpers, add tab/chip usage, cog animations, full a11y audit.
