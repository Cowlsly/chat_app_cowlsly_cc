# Cowlsly Chat UI Asset Source

Canonical shared UI repository: `Cowlsly/ui_assets_and_data_files`

Canonical branch: `root`

Pinned canonical commit: `40fbc7d7edc57ff3c988e0130f63dbdcfb055173`

Cowlsly Chat is a **consumer**, never a master source, for reusable Cowlsly branding, cogs, buttons, panels, icons, transitions, UI audio, top-bar elements, and profile-card elements.

## Rules

- Shared UI masters are edited only in the canonical UI repository.
- This repository may contain generated deployment copies required by the web build.
- Generated copies must be reproducible from the pinned canonical commit.
- Every generated copy must have an entry in `ui_asset_dependencies.json` before it is relied upon by production code.
- Do not silently substitute legacy repository names or branches.
- Do not delete an existing local asset until its canonical source, checksum, consumer mapping, build result, and browser behaviour are verified.
- Repository-specific messenger artwork may remain here when it is not reusable across Cowlsly products.
- Reduced-motion and no-audio fallbacks must remain functional when animated/audio assets are unavailable.

## Required shared standards

The chat surface is expected to adopt the Cowlsly Top Bar + Profile Identity Card standard and the approved Cowlsly Vault Transition or a documented lightweight variant. These features must not expose sensitive profile fields by default; privacy and field-visibility rules take precedence over display completeness.

## Update procedure

1. Review the newer canonical UI commit.
2. Update `ui_asset_dependencies.json` with exact required paths and the new immutable commit.
3. Regenerate deployment copies rather than hand-editing them.
4. Verify narrow phone, Fold inner display, tablet, desktop, keyboard, reduced-motion, and no-audio states.
5. Run build/lint/tests.
6. Only then move the pinned commit forward.
