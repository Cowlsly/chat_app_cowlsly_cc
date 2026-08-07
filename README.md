# Cowlsly Chat

[![Automatic Build](https://github.com/Cowlsly/chat_app_cowlsly_cc/actions/workflows/auto-build.yml/badge.svg?branch=root)](https://github.com/Cowlsly/chat_app_cowlsly_cc/actions/workflows/auto-build.yml)

Frontend-only controlled-testing build for the Cowlsly private-chat experience at `cowlsly.cc`.

## Current status

This branch contains a buildable Vite interface for navigation, responsive-layout and local message-flow testing. Demo conversations are stored in browser `localStorage` and are not shared between users or devices.

It is **not** a production private-messaging service. It does not yet provide authentication, a shared database, server APIs, WebSocket delivery, account recovery, moderation, file storage, push notifications or end-to-end encryption.

## Local development

```bash
npm install
npm test
npm run build
npm run dev
```

Node 22 or later is required.

## Safety boundaries

- Do not enter real private information into the demo.
- Do not claim end-to-end encryption.
- Do not store access tokens in `localStorage`.
- Blocking, reporting, moderation and server-side authorisation are launch requirements, not optional enhancements.
- Production secrets belong in a secret manager, never Git.

## Deployment

The production Vite base is `/`, suitable for the `cowlsly.cc` custom-domain root. `public/staticwebapp.config.json` supplies SPA fallback and baseline security headers for Azure Static Web Apps. DNS, TLS, direct-navigation, refresh behaviour and the final hosting environment still require manual verification before release.
