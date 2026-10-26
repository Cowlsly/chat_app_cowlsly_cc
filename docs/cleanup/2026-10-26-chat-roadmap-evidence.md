# Chat application TODO/ROADMAP evidence snapshot — 2026-10-26

## Scope and fixed inputs

This Phase 5 snapshot audits checked claims without changing the canonical planning files.

- Repository: `Cowlsly/chat_app_cowlsly_cc`
- Default branch reported by GitHub: `root`
- Audited root commit: [`650a03730b99d153ad87377ca8dbb4e1ed2674a1`](https://github.com/Cowlsly/chat_app_cowlsly_cc/commit/650a03730b99d153ad87377ca8dbb4e1ed2674a1)
- Audited planning blobs: [`TODO.md`](https://github.com/Cowlsly/chat_app_cowlsly_cc/blob/650a03730b99d153ad87377ca8dbb4e1ed2674a1/TODO.md) `00131bc3ae9cb8d72534c667912db1ecb2754e4e`; [`ROADMAP.md`](https://github.com/Cowlsly/chat_app_cowlsly_cc/blob/650a03730b99d153ad87377ca8dbb4e1ed2674a1/ROADMAP.md) `15f6642c0d9f164d84c685e3a2e73f4c43cff65e`
- Counts at that commit: TODO **10 checked / 38 open**; ROADMAP **0 checked / 57 open**
- Root tree: 24 entries, complete (`truncated: false`)
- Repository instructions: no `AGENTS.md` exists. [`.github/copilot-instructions.md`](https://github.com/Cowlsly/chat_app_cowlsly_cc/blob/650a03730b99d153ad87377ca8dbb4e1ed2674a1/.github/copilot-instructions.md) applies, but its statement that the default branch is `main` is stale; GitHub reports `root`.
- Concurrent work before this audit: four non-root branches and one open PR, [PR #4](https://github.com/Cowlsly/chat_app_cowlsly_cc/pull/4) at `1b3b31f4c437c7709ac616e5df774be658e49860`. They were read only. Including this report branch, there are five non-root branches.

“Verified” below means the named artifact or retrieved log directly supports the bounded claim. It does not mean production acceptance. “Claimed, unverified” means supporting material exists but does not prove the full checkbox wording.

## Checked TODO claims

| # | Checked claim | Assessment | Current evidence and limit |
|---|---|---|---|
| 1 | Rewrite `README.md` with correct product/domain/purpose/setup/status/safety limits | **Verified (documentation)** | [README](https://github.com/Cowlsly/chat_app_cowlsly_cc/blob/650a03730b99d153ad87377ca8dbb4e1ed2674a1/README.md) blob `9b3cc3da336878a74bced542fd98c9f44347678c` names Cowlsly Chat and Cowlsly.cc, gives local commands, labels the app a demo shell and lists safety boundaries. |
| 2 | Add a minimal architecture document and threat model | **Verified (documentation)** | [ARCHITECTURE_AND_THREAT_MODEL.md](https://github.com/Cowlsly/chat_app_cowlsly_cc/blob/650a03730b99d153ad87377ca8dbb4e1ed2674a1/ARCHITECTURE_AND_THREAT_MODEL.md) blob `ab0210fb598d37aaea6ca78aeeefacafe6e4435c` describes components, trust boundaries, threats and production gates. Implementation of future mitigations is not claimed. |
| 3 | Add `.env.example` with placeholders only | **Verified (repository content)** | [`.env.example`](https://github.com/Cowlsly/chat_app_cowlsly_cc/blob/650a03730b99d153ad87377ca8dbb4e1ed2674a1/.env.example) blob `b8dca376ea81041b2803657cfc303d806272e745` contains named origins/feature flags and blank API/auth origins; no credential value is present in that file. This is not a repository-wide secret-scan result. |
| 4 | Decide and scaffold the initial application stack | **Verified (bounded static stack)** | [`package.json`](https://github.com/Cowlsly/chat_app_cowlsly_cc/blob/650a03730b99d153ad87377ca8dbb4e1ed2674a1/package.json) blob `9ae1ef7e1c2d04e13d7a0b2f984f567beb7e23f2` defines a Node 20+ static build/lint/test scaffold; root also contains `index.html`, `app.js`, `styles.css` and build/lint scripts. |
| 5 | Add an initial responsive app shell that runs locally and in CI | **Claimed, partially verified for the checked-in shell and CI build; local/browser acceptance not retrieved** | [Exact-root run 38362005337](https://github.com/Cowlsly/chat_app_cowlsly_cc/actions/runs/38362005337), job `115178161845`, checked out `650a0373…`; raw log shows static lint passed and three files built into `dist/`. The same log reports TAP `tests 0 / pass 0 / fail 0`. |
| 6 | Import or reference the canonical Cowlsly interaction, sound and moving-cog standard | **Verified as a pinned reference only** | [UI_ASSET_SOURCE.md](https://github.com/Cowlsly/chat_app_cowlsly_cc/blob/650a03730b99d153ad87377ca8dbb4e1ed2674a1/UI_ASSET_SOURCE.md) blob `3c1ef3c251e81fb3b7145690d14681d2dd2107be` and `ui_asset_dependencies.json` blob `42999bd8ba45d6a4f269f8540395be19ffd19faa` pin `Cowlsly/ui_assets_and_data_files@40fbc7d7…`. The manifest has no generated copies, so runtime asset consumption is not claimed. |
| 7 | Build conversation list, empty state, search, compose and new-chat flow | **Verified as source implementation; browser acceptance not retrieved** | [`index.html`](https://github.com/Cowlsly/chat_app_cowlsly_cc/blob/650a03730b99d153ad87377ca8dbb4e1ed2674a1/index.html) blob `2684cd530763d42a37cc51b0c1ae976566169058` defines the surfaces; [`app.js`](https://github.com/Cowlsly/chat_app_cowlsly_cc/blob/650a03730b99d153ad87377ca8dbb4e1ed2674a1/app.js) blob `5ed747c4bda9404c66f33e7032dc22d190a86b1e` binds list/search/composer/new-chat behavior. Exact-root CI builds the files but runs zero tests. |
| 8 | Build a direct-message view with local demo persistence or a documented backend contract | **Verified for browser-local demo persistence** | `app.js` uses `localStorage` key `cowlsly-chat-demo-v1`, seeded direct conversations and message actions. README and architecture documents explicitly limit this to one browser and deny backend/network/encryption claims. No persistence/recovery browser test was retrieved. |
| 9 | Add responsive behavior for narrow phone, Fold 6 outer/inner, tablet and desktop | **Claimed, unverified for the named device classes** | [`styles.css`](https://github.com/Cowlsly/chat_app_cowlsly_cc/blob/650a03730b99d153ad87377ca8dbb4e1ed2674a1/styles.css) blob `be96d13235b57903923314b1a4c07dea493ed668` has a `max-width: 720px` single-pane rule and a default two-column layout. No viewport matrix, screenshots, browser log or Fold/tablet acceptance evidence exists on the audited root run. |
| 10 | Define shared-identity API contracts | **Claimed, partially documented; unverified as an API contract** | [MAIN_SITE_INTEGRATION_CONTRACT.md](https://github.com/Cowlsly/chat_app_cowlsly_cc/blob/650a03730b99d153ad87377ca8dbb4e1ed2674a1/MAIN_SITE_INTEGRATION_CONTRACT.md) blob `b78fd76046363d0d002f6484c45f6c760e9e358f` defines trust/failure boundaries and states that future identity needs a reviewed authenticated contract. It provides no versioned endpoints/schema and has no contract test, so the full checkbox remains unverified. |

## CI evidence and gaps

The only workflow on audited root is [`.github/workflows/auto-build.yml`](https://github.com/Cowlsly/chat_app_cowlsly_cc/blob/650a03730b99d153ad87377ca8dbb4e1ed2674a1/.github/workflows/auto-build.yml), blob `42b24ba5b0e816637b04be16426b46eff9bb1fb1`.

[Run 38362005337](https://github.com/Cowlsly/chat_app_cowlsly_cc/actions/runs/38362005337) is an exact-root push run and concluded success. Retrieved job `115178161845` shows checkout, Node setup, the combined Node build step and final confirmation succeeded. Its raw log shows:

- dependency install/audit command reported one package and no install failure;
- `node --test` executed with **zero tests**;
- static lint checks passed;
- the build copied three files into `dist/`.

This is evidence of a successful exact-root lint/build job. It is not evidence of unit-test coverage, dependency-audit policy, secret scanning, accessibility testing, browser behavior, deployment or production. The TODO item requesting build, lint, unit-test, dependency-audit, secret-scan and accessibility workflows remains open and was not changed.

## Reconciliation result

- **7** checked TODO claims have bounded current evidence.
- **3** checked TODO claims remain **claimed, unverified/partial** at their full wording (local execution of the app shell, device-specific responsiveness and the shared-identity API contract).
- **95** unchecked items (38 TODO + 57 ROADMAP) remain open.
- ROADMAP’s “Default branch: `main`” and Copilot instructions’ equivalent statement conflict with GitHub’s current default `root`; this administrative discrepancy is recorded, not silently corrected.
- Canonical TODO/ROADMAP checkboxes are unchanged. No runtime, asset, test, workflow, branch history or open PR was modified.
