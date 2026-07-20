# GitHub Copilot instructions — Cowlsly.cc

## Repository identity
This repository is the Cowlsly private chat application for `cowlsly.cc`. The domain is `.cc`, not `.ccc`, and the product name is Cowlsly, not Cowly. Its default branch is `main`.

## Scope
- A Copilot cloud-agent session for this repository can modify only this repository. The Cowlsly `.com`, `.net`, `.org`, platform, auth, asset, and Marla repositories are separate workspaces.
- Do not stop because sibling repositories are unavailable. Complete the current repository's task independently and document any cross-repository contract needed.
- Read `README.md` and any `ROADMAP.md`, `TODO.md`, `PATH.of.TRUTH.md`, or `FOR.COWY.md` files that exist before changing code.

## Execution rules
- Complete one small, coherent, testable task per session.
- This repository is at an early foundation stage. Do not invent a production backend, authentication service, encryption claim, or deployed integration that does not exist.
- Prefer a clear scaffold, documented interfaces, tests, and safe placeholders over fake working features.
- Run all relevant build, lint, and test commands available in the repository. If none exist, add only the minimal checks appropriate to the task.
- Keep changes mobile-first, foldable-friendly, accessible, and easy to review.

## Security and privacy
- Never commit API keys, tokens, passwords, private messages, personal data, or production credentials.
- Use `.env.example` with non-secret placeholders when configuration is required.
- Private chat, calls, attachments, notification access, contact access, and device sync must be default-deny and must not be represented as secure or end-to-end encrypted until implemented and verified.
- Do not enable automated messaging, scraping, or external-app actions without an explicit reviewed task.

## Cross-repository coordination
When another Cowlsly service is needed, document the proposed API/event contract in this repository rather than attempting to modify the sibling repository. Name the exact target repository and required follow-up.

## Blockers and final response
Use `FOR.COWY.md` only for genuine owner-controlled blockers. Never include secrets. In the final response, list changed files, commands/tests, limitations, and the next single recommended task. Do not claim the entire app is complete or production-ready.
