# Cowlsly.cc Messenger: next steps

Updated 2026-11-26 (AWST). Canonical default branch: `root`. This is the runnable queue, not a release certification.

## Baseline and dependencies
README describes functional local demo. Open PRs #4–#7 observed. Existing ROADMAP says main, but GitHub default is root; use root.

## Inspection evidence (2026-11-26)
- Integrated `ui.js` helpers and expanded interaction CSS from `feat/reusable-ui-components` into this branch.
- `app.js` imports showToast / preventDuplicate / setLoading; send is guarded.
- Styles include loading spinner, selected/aria-pressed, switch, chip, focus-visible, disabled, reduced-motion.
- Open PRs remain #4 (consolidated preview), #5 (docs audit), #6 (palette), #7 (naming). Do not overwrite branding without reconciliation.

## Ordered execution queue
| ID | Priority | Next action | Acceptance evidence |
|---|---|---|---|
| 01 | P0 | Integrate `ui.js` helpers and interaction-state CSS from `feat/reusable-ui-components` into root; wire preventDuplicate on send and other high-impact actions. | **Done** on this branch (SHA pending merge). Diff review, local demo persistence intact. |
| 02 | P0 | Complete demo retry/react/forward and keyboard/focus/screen-reader paths; disable unsupported controls with clear labels. | Responsive browser checks and accessible labels; clear demo-only delivery. |
| 03 | P1 | Connect pinned canonical cog/assets and sound preferences; add off-screen pause and reduced-motion fallbacks. | Mute/volume and motion tests, no forced audio. |
| 04 | P1 | Design backend/session, contact privacy and encrypted-message threat model before real messaging. | Cross-user isolation and protocol review; no encryption claims until proven. |
| 05 | P2 | Reconcile palette PR #6 and naming PR #7 with integrated UI. | Colour inventory and asset references verified. |


## Execution and evidence rules
- Read README.md, ROADMAP.md, TODO.md and any repository-specific authority/lease files before changes. Check active branches, issues and PRs; claim one coherent task and avoid duplicate work.
- P0 = release/security blocker or immediately runnable foundation; P1 = core feature; P2 = polish/extension. BLOCKED = dependency or approval missing. All entries below are proposed/queued, not claims of completion.
- Prefer highest-priority unblocked task. Use review branches for code; inspect exact-head CI and required reviews; no forced merges, spending, real customer data or live privileged actions without authorization.
- On completion record commit/PR, tests (including failures/skips), deployment evidence if relevant, remaining blockers, and next three runnable actions. Update TODO.md and this file in the same work shift; never mark a task complete on a report alone.
- Keep plans outside public deployment output. Check CI/deployment status separately; docs commits are not product release evidence.

## Sources
Repository README, existing planning documents, open PR metadata, and integration of `feat/reusable-ui-components` helpers performed 2026-11-26. No live CI run claimed here; verify on PR.
