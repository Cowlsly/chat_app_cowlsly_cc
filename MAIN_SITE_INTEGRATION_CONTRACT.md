# Cowlsly.cc Chat ↔ Cowlsly.com Integration Contract

Cowlsly Chat is the dedicated messenger surface. Cowlsly.com remains the public social/platform shell.

## Required behaviour

- Accept navigation from an allowlisted Cowlsly.com origin without trusting browser-provided authority.
- Authenticate and authorise every protected chat resource independently.
- Never accept passwords, API keys, session secrets, recovery tokens, approval tokens, private message bodies, or privileged action payloads through URL parameters.
- Treat conversation/profile deep-link identifiers as opaque locators only; server-side access checks remain mandatory.
- Provide a clear Return to Cowlsly control that does not discard unsent drafts without warning.
- Preserve responsive behaviour on narrow phone, Fold outer/inner display, tablet, and desktop.

## Shared identity

Future shared identity must use a reviewed authenticated contract rather than localStorage copying. Keep claims minimal and scoped. Sensitive profile fields remain hidden by default.

## Shared preferences

Non-authoritative comfort preferences such as reduced motion and optional interaction audio may be mapped explicitly. Browser preference state must never grant account/security/moderation/payment/external-action permissions.

## Failure behaviour

If identity verification, access checks, origin validation, backend availability, or configuration fails, show a safe unavailable/sign-in state and do not reveal conversation metadata.

## Production handoff gate

The dedicated production handoff remains disabled until the Cowlsly.cc deployment URL, HTTPS, identity flow, origin allowlist, return navigation, accessibility, and both repository builds are verified.
