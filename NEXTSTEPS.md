# Cowlsly.cc Messenger: next steps

Updated 2026-11-25 (AWST). Branch: feat/reusable-ui-components (inspected and advanced).

## Ordered execution queue
| ID | Priority | Next action | Acceptance evidence |
|---|---|---|---|
| 01 | P0 | Inspected feat/reusable-ui-components; CSS + COMPONENTS.md present. Added ui.js helpers and send duplicate guard. | Commit 098de1d... ; local demo still functional. |
| 02 | P0 | Finish tabs, modal/toast/switch/chip full usage; expand interaction state wiring; add simple tests. | npm test, lint, build pass; double-tap/failure regression. |
| 03 | P0 | Complete demo retry/react/forward and keyboard/focus/screen-reader paths; disable unsupported controls. | Responsive browser checks and accessible labels. |
| 04 | P1 | Connect pinned canonical cog/assets and sound preferences; add off-screen pause and reduced-motion fallbacks. | Mute/volume and motion tests. |
| 05 | P1 | Design backend/session, contact privacy and encrypted-message threat model before real messaging. | Cross-user isolation and protocol review. |

## Sources
Repository files, open PRs #4-#7, and branch inspection on 2026-11-25.
