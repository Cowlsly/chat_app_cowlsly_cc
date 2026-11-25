# Cowlsly.cc Messenger: next steps

Updated 2026-11-25 (AWST). Canonical default branch: `root`. This is the runnable queue, not a release certification.

## Baseline and dependencies
README describes functional local demo; screenshot reports branch work and an unsubmitted PR form, not merged evidence. Open PRs #4–#7 observed. Existing ROADMAP says main, but GitHub default is root; use root. No feat/reusable-ui-components branch found; work continues on current root-based demo.

## Ordered execution queue
| ID | Priority | Next action | Acceptance evidence |
|---|---|---|---|
| 01 | P0 | Inspect reported feat/reusable-ui-components branch and actual commit/PR existence; compare with #4 preview, #5 doc audit and #6 palette. (inspected: branch absent; #4–#7 open as drafts/active) | Exact SHA/PR evidence; resume existing work rather than duplicate it. |
| 02 | P0 | Finish reusable JS helpers, tabs, modal/toast/switch/chip and interaction state wiring; guard duplicate sends and retries. | npm test, lint, build and double-tap/failure regression. |
| 03 | P0 | Complete demo retry/react/forward and keyboard/focus/screen-reader paths; disable unsupported controls. (react + forward demo added 2026-11-25 on feat/demo-actions-and-docs-20261125) | Responsive browser checks and accessible labels; clear demo-only delivery. |
| 04 | P1 | Connect pinned canonical cog/assets and sound preferences; add off-screen pause and reduced-motion fallbacks. | Mute/volume and motion tests, no forced audio. |
| 05 | P1 | Design backend/session, contact privacy and encrypted-message threat model before real messaging. | Cross-user isolation and protocol review; no encryption claims until proven. |


## Execution and evidence rules
- Read README.md, ROADMAP.md, TODO.md and any repository-specific authority/lease files before changes. Check active branches, issues and PRs; claim one coherent task and avoid duplicate work.
- P0 = release/security blocker or immediately runnable foundation; P1 = core feature; P2 = polish/extension. BLOCKED = dependency or approval missing. All entries below are proposed/queued, not claims of completion.
- Prefer highest-priority unblocked task. Use review branches for code; inspect exact-head CI and required reviews; no forced merges, spending, real customer data or live privileged actions without authorization.
- On completion record commit/PR, tests (including failures/skips), deployment evidence if relevant, remaining blockers, and next three runnable actions. Update TODO.md and this file in the same work shift; never mark a task complete on a report alone.
- Keep plans outside public deployment output. Check CI/deployment status separately; docs commits are not product release evidence.

## Sources
Repository README, existing planning documents where present, and open PR metadata inspected on 2026-11-25. No code tests or live infrastructure verification performed during this documentation pass. Demo react/forward implemented locally in browser only.
