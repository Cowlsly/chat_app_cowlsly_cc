# TODO - Cowlsly.cc Messenger

This is the active engineering queue. Copilot should complete one coherent, testable task per session and update this file accurately.

## P0 - Correct and prepare the repository

- [x] Rewrite `README.md` with the correct product name, domain, purpose, setup, status, and safety limitations.
- [ ] Add a minimal architecture document and threat model.
- [ ] Add `.env.example` with placeholders only.
- [ ] Add build, lint, unit-test, dependency-audit, secret-scan, and accessibility workflows.
- [x] Decide and scaffold the initial application stack.
- [x] Add an initial responsive app shell that runs locally and in CI.

## P0 - Working interaction system

- [ ] Import or reference the canonical Cowlsly interaction, sound, and moving-cog standard.
- [x] Build reusable button, icon-button, switch components with real states.
- [x] Implement real interaction states (idle, focus, pressed, loading, success, error, disabled).
- [x] Ensure no visible active control does nothing.
- [x] Add duplicate-send prevention.
- [x] Add optional UI-sound settings.
- [x] Add messenger-themed cog animations for all states.
- [x] Add reduced-motion static fallbacks and pause off-screen animation.

## P0 - First functional messenger slice

- [x] Build conversation list, empty state, search, compose, and new-chat flow.
- [x] Build a direct-message view with local demo persistence.
- [x] Make send, retry, reply, react, edit, delete, save, copy, mute, block, and report actions work within demo scope.
- [x] Add timestamps, sent/delivered/failed states, and failed-message recovery.
- [x] Add responsive behaviour for narrow phone, Fold 6, and desktop.
- [ ] Add keyboard navigation, focus order, screen-reader labels, and contrast tests.

## P1 - Accounts and devices

- [ ] Define shared-identity API contracts.
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
