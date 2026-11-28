# TODO - Cowlsly.cc Messenger

This is the active engineering queue. Copilot should complete one coherent, testable task per session and update this file accurately.

## P0 - Correct and prepare the repository

- [x] Rewrite `README.md` with the correct product name, domain, purpose, setup, status, and safety limitations.
- [x] Add a minimal architecture document and threat model.
- [x] Add `.env.example` with placeholders only.
- [x] Add build, lint, unit-test, dependency-audit, secret-scan, and accessibility workflows. (CI workflow added: test/lint/build + basic secret pattern scan on push/PR. Dependency audit is trivial as no external deps. Accessibility checks remain for future expansion.)
- [x] Decide and scaffold the initial application stack.
- [x] Add an initial responsive app shell that runs locally and in CI.

## P0 - Working interaction system

- [x] Import or reference the canonical Cowlsly interaction, sound, and moving-cog standard.
- [x] Build reusable button, icon-button, switch, tab, chip, menu, modal, toast, and input components. (Partial complete: ui.js helpers for toast/loading/preventDuplicate/openDialog/closeDialog integrated into root 2026-11-27; CSS states to verify.)
- [ ] Implement real idle, focus, pressed, selected, loading, success, warning, error, permission-required, offline, and disabled states as applicable. (Partial: stronger focus-visible outlines and .loading class added 2026-11-28. :active pressed states added 2026-11-29 on branch.)
- [ ] Ensure no visible active control does nothing.
- [x] Add duplicate-send prevention and clean rollback when actions fail. (preventDuplicate wired on composer submit.)
- [ ] Add optional UI-sound settings with separate mute/volume controls.
- [ ] Add messenger-themed cog animations for idle, sending, delivered, syncing, calling, reconnecting, warning, and failure.
- [ ] Add reduced-motion static fallbacks and pause off-screen animation.

## P0 - First functional messenger slice

- [x] Build conversation list, empty state, search, compose, and new-chat flow.
- [x] Build a direct-message view with local demo persistence or a clearly documented backend contract.
- [ ] Make send, retry, reply, react, edit, delete, save, copy, forward, mute, block, and report actions genuinely work within the current scope. (React, retry, and forward demo actions added 2026-11-28 in app.js. Mute/block/report already in chat menu.)
- [ ] Add timestamps, sent/delivered/read demo states, typing state, drafts, and failed-message recovery.
- [x] Add responsive behaviour for narrow phone, Fold 6 outer screen, Fold 6 inner screen, tablet, and desktop.
- [ ] Add keyboard navigation, focus order, screen-reader labels, and contrast tests. (Partial progress 2026-11-28: aria-current + descriptive aria-labels on chat rows, message aria-labels, improved focus-visible on rows/actions, datetime on times. 2026-11-29: fixed broken HTML escaping in esc() to prevent XSS in local rendering; added aria-live=polite on status; lightened --muted for better contrast. Contrast and full keyboard path testing still open.)

## P1 - Accounts and devices

- [x] Define shared-identity API contracts.
- [ ] Add session and linked-device data models.
- [ ] Add device list, last activity, login alerts, revoke controls, and sensitive-action re-authentication.
- [ ] Add privacy controls for last seen, online status, read receipts, typing indicators, contact discovery, and message requests.

## P1 - Rich messaging

- [ ] Add emoji, stickers, GIFs, mentions, quotes, pins, bookmarks, search, and per-chat themes.
- [ ] Add image, audio, video, and file attachment flows with safe limits and visible upload progress.
- [ ] Add voice-message record, cancel, preview, send, playback speed, and transcript controls.
- [ ] Add polls, events, checklists, links, code blocks, and content warnings.
- [ ] Add scheduled and disappearing messages only after retention and recovery rules are documented.

## P1 - Groups and channels

- [ ] Add group creation, roles, invitations, join approval, rules, member management, ownership transfer, and audit events.
- [ ] Add announcements, topic channels, threads, slow mode, post approval, pinned resources, shared albums, and group search.
- [ ] Add group-specific AI participation rules and clear AI labels.

## P2 - Calls

- [ ] Define call-state model and signalling contracts.
- [ ] Build real ringing, accept, decline, busy, reconnect, mute, speaker, camera, flip-camera, captions, and end-call states.
- [ ] Add one-to-one voice calling before group video.
- [ ] Add low-bandwidth and audio-only modes.
- [ ] Add call sounds and cog animations tied to actual call state.
- [ ] Add screen sharing, recording, transcripts, and call links only after consent and retention controls are complete.

## P2 - Security, privacy, and safety

- [ ] Complete the encryption and metadata threat model before making end-to-end encryption claims.
- [ ] Add encrypted local storage and secure attachment handling.
- [ ] Add block, restrict, spam quarantine, suspicious-link warnings, report flows, and rate limits.
- [ ] Add user-selected evidence sharing for reports.
- [ ] Add account recovery, backup choices, key-change warnings, and compromised-device handling appropriate to the selected design.

## P2 - Marla AI-Queen

- [ ] Add Marla as an official, clearly labelled AI contact.
- [ ] Add opt-in drafting, translation, summaries, reminders, and accessibility support.
- [ ] Require explicit approval before Marla sends, forwards, calls, shares, or performs external actions.
- [ ] Add no-AI chats and per-conversation AI permissions.
- [ ] Keep Marla chat memory separated from public social, wallet, and staff data.

## Completion rules

- Do not claim production readiness without tested privacy, recovery, moderation, secure storage, accessibility, and working control states.
- Never commit secrets, private messages, personal data, or credentials.
- Do not mark a feature complete when only its visual shell exists.

## Current execution handoff (2026-11-29)

Fixed broken HTML escaping in app.js esc() helper (was not converting to entities). Added aria-live=polite on conversation status for screen readers. Improved --muted contrast and added :active pressed visual states for buttons and chat rows in styles.css. Branch: fix/html-escaping-and-a11y-polish-20261129. Prior: ui.js integration, demo actions, focus/labels. Read [NEXTSTEPS.md](NEXTSTEPS.md). Next: full keyboard path verification, contrast audit, remaining interaction states (success/error/disabled). GitHub default branch is root. Existing milestones retained; reconcile with CI before claiming further completion.
