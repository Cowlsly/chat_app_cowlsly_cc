# Cowlsly.cc — Private Messenger

**Cowlsly.cc** is the private messaging and calling service for [Cowlsly](https://cowlsly.cc).

This repository contains the front-end messenger shell. It runs entirely on local demo data — no real accounts, messages, contacts, or credentials are included.

## Status

🚧 **Early foundation / demo shell** — Not production-ready. No encryption, no real accounts, no real messages.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |
| `npm run typecheck` | TypeScript check |
| `npm test` | Run Vitest tests |
| `npm run preview` | Preview production build |

## Stack

- React 19 + TypeScript
- Vite 8
- Vitest + React Testing Library
- Plain CSS (no external UI library)
- Web Audio API for optional UI sounds

## Limitations

- No real authentication, encryption, or messaging backend
- All data is local demo state; browser-local persistence is demo-only
- Do not use for real private communications

## Safety

- No API keys, credentials, or personal data
- No real user accounts or message history
- See TODO.md and ROADMAP.md for planned features
