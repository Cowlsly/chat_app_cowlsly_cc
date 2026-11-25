# Cowlsly.cc Messenger: next steps

Updated 2026-11-25 (AWST). Branch: feat/ui-helpers-and-a11y-20261125 (advanced from feat/reusable-ui-components).

## Ordered execution queue
| ID | Priority | Next action | Acceptance evidence |
|---|---|---|---|
| 01 | P0 | Fixed HTML escaping in app.js; retained ui.js helpers and duplicate-send guard. | Demo loads without XSS risk in message rendering; localStorage persistence intact. |
| 02 | P0 | Finish tabs, modal/toast/switch/chip full usage; expand interaction state wiring; add simple tests. | npm test, lint, build pass; double-tap/failure regression. |
| 03 | P0 | Complete demo retry/react/forward and keyboard/focus/screen-reader paths; disable unsupported controls. | Responsive browser checks and accessible labels. |
| 04 | P1 | Connect pinned canonical cog/assets and sound preferences; add off-screen pause and reduced-motion fallbacks. | Mute/volume and motion tests. |
| 05 | P1 | Design backend/session, contact privacy and encrypted-message threat model before real messaging. | Cross-user isolation and protocol review. |

## Sources
Repository files, open PRs #4-#7, and branch inspection on 2026-11-25. Escaping fix applied; no production claims.
