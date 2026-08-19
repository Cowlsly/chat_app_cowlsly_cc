# Cowlsly Chat — Cowlsly.cc Messenger

[![Automatic Build](https://github.com/Cowlsly/chat_app_cowlsly_cc/actions/workflows/auto-build.yml/badge.svg?branch=root)](https://github.com/Cowlsly/chat_app_cowlsly_cc/actions/workflows/auto-build.yml)

Cowlsly Chat is the responsive messenger surface for Cowlsly.cc.

## Current status

The repository now contains a **buildable first messenger slice** rather than a documentation-only placeholder.

Current demo capabilities:

- responsive conversation list and message view
- phone/Fold-friendly single-pane behaviour below 720px
- local demo persistence using browser `localStorage`
- conversation search and per-chat message search
- new-chat flow
- send, reply, edit, delete, save, and copy message actions
- mute, block, report-demo, and clear-chat controls
- sent/delivered demo state
- optional interaction feedback and reduced-motion preference
- keyboard send with Enter and multiline Shift+Enter
- accessible labels, focus states, skip link, and live status regions
- deterministic static build output in `dist/`

This is still a **demo shell**, not a production messaging service. It has no real account backend, network message delivery, attachment upload, encryption claim, calling, payment flow, or privileged automation.

## Build locally

```bash
npm install
npm test
npm run lint
npm run build
```

Open `index.html` directly for the local demo, or serve the generated `dist/` directory with any static web server.

## Safety boundaries

- Demo messages remain in the current browser only.
- No secrets, credentials, private-message exports, or personal data belong in this repository.
- Do not claim end-to-end encryption until a reviewed cryptographic and metadata threat model has been implemented and tested.
- Any future AI-assisted sending, forwarding, calling, sharing, moderation, account, security, or external action must require clear user intent and appropriate confirmation.
- Attachment handling remains disabled until limits, malware handling, retention, and privacy behaviour are defined.

## Next priorities

1. Integrate the canonical Cowlsly UI assets and messenger-specific animated cog states.
2. Add a documented backend/session contract without enabling unsafe live functionality prematurely.
3. Expand automated accessibility, unit, dependency-audit, and security checks.
4. Add account/device/privacy controls and a real authenticated persistence layer.
