# Implementation Roadmap

## Phase 0 — Audit (no code changes)
- Read all repo rules and license.
- Map existing routes/components, dependencies, mock-data patterns and theme tokens.
- Identify hosting target, database, storage and worker constraints.
- Produce file-level plan and risk register.

## Phase 1 — Product shell
- Apply brand tokens and typography safely.
- Add navigation and responsive page shells.
- Build overview, create-video, project, storyboard, character, media, calendar and integration screens using clearly labelled mock data.
- Keep existing template pages intact unless approved for removal.

## Phase 2 — Persistence and auth
- Select one ORM and database.
- Add migrations, ownership model, RBAC, audit events and private media storage.
- Add seed data and migration/rollback notes.

## Phase 3 — Workflow engine and agents
- Add typed contracts, state machine, job queue, mock providers and run history.
- Complete a full mock-mode project workflow with retry/cancel/pause.

## Phase 4 — AI providers
- Implement Gemini video/image adapter using currently supported model IDs.
- Implement Telugu TTS and optional transcription adapters.
- Add provider tests, usage/cost tracking and connection diagnostics.

## Phase 5 — Render and QC
- Build FFmpeg worker and deterministic project timeline.
- Add subtitle rendering with verified Telugu font support.
- Add thumbnail generation, audio mix, platform presets and QC.

## Phase 6 — Publishing
- YouTube OAuth, resumable upload, processing poll and scheduled publish.
- Instagram official API only after permissions/account eligibility are verified.
- Add manual export fallback, duplicate prevention and approval gates.

## Phase 7 — Automation and analytics
- Calendar, automation rules, notifications, metrics, audit log and cost caps.
- Dry-run automation before enabling any automatic publishing.

## Phase 8 — Release hardening
- Security review, E2E tests, backups, retention/deletion, monitoring, deployment and incident runbooks.

## Release gate
No production release until lint, typecheck, build, unit/integration/E2E tests pass; secrets are configured; OAuth consent and provider permissions are verified; creator approval and publishing kill switch work; and license attribution is visible.
