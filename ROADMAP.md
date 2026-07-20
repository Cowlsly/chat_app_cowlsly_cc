# ROADMAP - Cowlsly.cc Messenger

## Mission

Build `cowlsly.cc` into Cowlsly's private messaging and calling service, inspired by the strongest parts of Messenger, WhatsApp, Signal, Telegram, Discord, iMessage, Slack, and modern social chat, while remaining unmistakably Cowlsly.

The interface must feel alive and mechanical: real working controls, animated switches, clear effects, optional UI sounds, and the shared Cowlsly moving-cog visual system adapted for messaging and calls.

Default branch: `main`.

## Product principles

1. Every visible active control must work. Unavailable features must be safely disabled or clearly demo-labelled.
2. Private by default. Contacts, microphone, camera, location, notifications, screen sharing, and external-app actions are opt-in and revocable.
3. No false security claims. End-to-end encryption may be claimed only after the protocol, key handling, metadata limits, recovery design, and tests exist.
4. Every linked device is visible and remotely revocable.
5. AI participants are clearly labelled, including Marla as **Cowlsly AI-Queen**.
6. Mobile, Fold 6, low-bandwidth, keyboard, screen-reader, reduced-motion, and muted-use cases are first-class.

## Phase 0 - Foundation and Copilot readiness

- [ ] Correct the repository description and README to say Cowlsly, `cowlsly.cc`, and private messenger.
- [ ] Add ROADMAP, TODO, architecture, threat model, local setup, `.env.example`, and contribution guidance.
- [ ] Choose and document the initial stack without pretending unimplemented infrastructure exists.
- [ ] Add build, lint, unit-test, dependency-audit, secret-scan, and accessibility checks.
- [ ] Define versioned contracts for shared identity, contacts, notifications, media, moderation, `.com` social sharing, `.net` payments, and `.org` staff support.
- [ ] Consume the canonical interaction, sound, and moving-cog standards from `Cowlsly/ui_assets_and_data_files`.

## Phase 1 - Working Cowlsly messenger shell

- [ ] Build a responsive phone/foldable conversation list, chat view, contacts view, calls view, settings view, and profile drawer.
- [ ] Implement every primary button and switch with idle, focus, pressed, selected, loading, success, error, and disabled states as applicable.
- [ ] Add real open/close, back, search, compose, attach, emoji, voice, send, retry, reply, react, save, forward, block, mute, and report actions in the chosen demo/backend scope.
- [ ] Add optional button, switch, message, call, notification, and error sounds with independent volume and mute controls.
- [ ] Add messenger-themed moving cogs for idle, sending, delivered, syncing, calling, reconnecting, secure-link, warning, and error states.
- [ ] Ensure cog animations pause off-screen and have static reduced-motion fallbacks.
- [ ] Prevent duplicate sends and duplicate high-impact actions during loading.

## Phase 2 - Identity, contacts, devices, and presence

- [ ] Integrate shared Cowlsly identity with passkeys, optional password, TOTP, recovery codes, sessions, and device revocation.
- [ ] Add username search, QR/contact links, invitation links, and privacy-respecting contact discovery.
- [ ] Add contact requests, accepted contacts, favourites, groups, blocked users, restricted users, and custom lists.
- [ ] Add presence controls: online, away, busy, invisible, last-seen permissions, custom status, and quiet hours.
- [ ] Add device names, linked-device history, last activity, login alerts, revoke controls, and re-authentication for sensitive actions.

## Phase 3 - Direct messages and rich conversation

- [ ] Add text, emoji, stickers, GIFs, reactions, replies, forwards, quotes, mentions, edits, deletions, pinned messages, bookmarks, and search.
- [ ] Add typing indicators, sent/delivered/read states, read-receipt controls, draft sync, scheduled messages, and disappearing messages.
- [ ] Add images, video, audio, files, contact cards, polls, checklists, events, music shares, link previews, and code blocks.
- [ ] Add voice messages with record lock, waveform, preview, trim, cancel, playback speed, transcript, and accessibility labels.
- [ ] Add content warnings, sensitive-media blur, alt text, captions, attachment limits, resumable upload, virus scanning hooks, and expiry controls.
- [ ] Add per-conversation themes, nicknames, colours, wallpapers, notification sounds, and shared media galleries.

## Phase 4 - Group chats, communities, and channels

- [ ] Add private groups, public-linked groups, announcement channels, topic channels, forum-style threads, and temporary event chats.
- [ ] Add group roles, invitations, join approval, rules, member screening, slow mode, post approval, moderation logs, and ownership transfer.
- [ ] Add polls, events, shared albums, collaborative lists, pinned resources, group calendars, tasks, and searchable history.
- [ ] Add opt-in community bridges to `cowlsly.com` without exposing private group content.
- [ ] Add group AI rules: no AI, invite-only AI, approved service AI, or labelled AI participants.

## Phase 5 - Voice and video calls

- [ ] Add one-to-one and group voice/video calls with ringing, accept, decline, busy, reconnect, hold, mute, speaker, camera, flip-camera, captions, and end controls.
- [ ] Add optional call waiting, call links, scheduled calls, screen sharing, hand raise, host controls, waiting rooms, and breakout rooms.
- [ ] Add low-bandwidth audio mode, adaptive video quality, noise suppression, echo control, Bluetooth routing, and device selection.
- [ ] Add live captions, transcripts only with consent, recording indicators, recording consent, and retention controls.
- [ ] Add call history with privacy controls and no silent sharing of call logs.
- [ ] Use real call-state animations, cog movement, sound cues, and visible fallback/error states.

## Phase 6 - Encryption, privacy, and recovery

- [ ] Threat-model message content, metadata, key compromise, malicious devices, backups, contact discovery, abuse reporting, and recovery.
- [ ] Select a reviewed encryption design and document exactly what is and is not protected.
- [ ] Add device identity keys, verification, safety numbers/QR verification, key-change warnings, and compromised-device revocation if supported by the selected design.
- [ ] Add encrypted local storage, encrypted attachment handling, secure deletion expectations, and backup controls.
- [ ] Add optional encrypted backups with explicit recovery trade-offs.
- [ ] Minimise retained metadata and publish honest privacy explanations.

## Phase 7 - Marla and AI-assisted communication

- [ ] Add Marla's official contact as **Cowlsly AI-Queen**, clearly labelled in chats and calls.
- [ ] Add user-controlled AI drafting, summarisation, translation, transcription, reminders, search, and accessibility assistance.
- [ ] Require approval before AI sends, edits, forwards, calls, shares, or acts outside the chat.
- [ ] Keep private-chat memory separate from public social and staff data.
- [ ] Add no-AI conversations, local-only AI options, consent prompts, model disclosures, and AI activity logs.
- [ ] Add AI group participants only when the group rules and members permit them.

## Phase 8 - Safety and anti-abuse

- [ ] Add message requests, unknown-sender controls, block, mute, restrict, report, spam quarantine, and suspicious-link warnings.
- [ ] Add rate limits, bulk-message detection, impersonation protection, malicious attachment scanning, and coordinated-abuse detection.
- [ ] Add evidence-preserving reports with user-selected context rather than silently exposing entire private histories.
- [ ] Add youth-aware privacy defaults and restricted-content controls after legal review.
- [ ] Add account appeal, moderation audit, safety education, and emergency lock-down controls.

## Phase 9 - Interoperability and polish

- [ ] Add share sheets and deep links between `.com`, `.cc`, `.net`, and approved Cowlsly apps.
- [ ] Add export/import for conversations and media where lawful and technically safe.
- [ ] Add desktop/web installability, notification actions, offline queues, and multi-device draft synchronisation.
- [ ] Add theme packs that reuse the canonical Cowlsly cog system rather than creating unrelated visual languages.
- [ ] Add performance, battery, accessibility, reliability, and visual-regression test suites.

## Completion rule

The messenger is not production-ready until the working-control standard, privacy defaults, device/session controls, moderation, secure storage, honest encryption status, backups, accessibility, and recovery paths are all verified.
