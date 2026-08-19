# Cowlsly Chat Architecture and Threat Model

## Current slice

Cowlsly Chat is presently a static, browser-local messenger demonstration. The UI and interaction model are real; network delivery, authenticated accounts, production persistence, attachments, calls, and encryption claims are deliberately absent.

### Components

1. **Responsive web client** — conversation list, message view, composer, search, message actions, preferences, and responsive navigation.
2. **Browser-local demo store** — demo conversations, drafts, preferences, and message state stored locally for the current browser.
3. **Static build output** — deterministic web bundle suitable for preview/static hosting.
4. **Future identity boundary** — shared Cowlsly identity will be consumed through an explicit authenticated contract rather than duplicated credentials.
5. **Future messaging service boundary** — message transport and persistence will be server-side and separately authenticated/authorised.

## Trust boundaries

- Browser UI state is **not authority** for privileged actions.
- `localStorage` is demo convenience only and must never contain production credentials, approval tokens, private keys, or security-sensitive authority.
- The future chat backend must validate identity, membership, permissions, rate limits, message ownership, and action scope server-side.
- Cowlsly.com, Cowlsly.cc, Cowlsly.net, Cowlsly.org, Marla-private data, and training data remain separate domains/services unless an explicit reviewed contract connects them.
- AI assistance must remain visibly labelled and cannot silently send, forward, call, share, block, report, or alter account/security state.

## Primary threats and required mitigations

### Account takeover and session theft

Future production requirements: passkey-capable authentication, short-lived sessions, secure cookies, CSRF protection where applicable, session history, device revocation, re-authentication for sensitive actions, and rate-limited recovery.

### Cross-site scripting and malicious message content

Treat all message/user content as untrusted. Encode rendered text, sanitize any future rich content with an allowlist, block scriptable attachment types from inline execution, and use a restrictive Content Security Policy.

### Broken access control / IDOR

Conversation IDs and message IDs are identifiers, not permissions. Every backend read/write must verify authenticated membership and action rights server-side.

### Spam, harassment, stalking, and enumeration

Use rate limits, message-request controls, privacy settings, block/restrict/mute, contact-discovery limits, anti-enumeration responses, reporting, and audit trails. Do not expose private presence/device metadata without explicit user settings.

### Malicious links and attachments

Future uploads require size/type limits, quarantine/scanning hooks, randomized storage names, content-disposition rules, download warnings, retention policy, and explicit failure states. No attachment support is enabled in the current slice.

### Message replay, duplicate send, and race conditions

Use server-generated immutable message IDs, idempotency keys, monotonic state transitions where appropriate, duplicate-send suppression, and rollback/retry UI when server acknowledgement fails.

### Metadata leakage

Do not claim end-to-end encryption merely because message bodies are encrypted. A production encryption design must document server-visible metadata, backups, key changes, multi-device behaviour, abuse reporting, recovery, attachment handling, notification previews, and compromise scenarios.

### AI overreach

Marla or any AI participant must be clearly labelled. Drafting/summarisation may be opt-in, but external actions require explicit user intent and appropriate confirmation. Per-chat no-AI controls are required before production AI participation.

### Sensitive profile exposure

Shared profile UI must apply field-level visibility. The existence of a canonical profile-card field does not mean that field is appropriate to display in chat. Medical or other sensitive fields should be hidden by default unless a specific reviewed use case requires them.

## Production gates

The app must not be described as production-ready until it has: authenticated backend persistence; reviewed session/recovery design; server-side authorisation tests; abuse controls; secure storage; attachment policy; accessibility verification; observability without sensitive-content logging; backup/recovery policy; privacy controls; moderation/reporting; and a documented cryptographic design before any encryption claim.
