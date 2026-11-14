# Product Architecture

## Product shape
A creator-first production control plane with a web dashboard, durable workflow orchestration, provider adapters, media storage and a background render worker.

## Suggested architecture (validate against deployment constraints)
- Frontend: existing Next.js 16 App Router + React 19 + TypeScript + Tailwind v4.
- Backend: Next.js route handlers/server actions for short authenticated operations; domain services for business logic.
- Database: PostgreSQL with a migration-managed ORM selected after repository audit (Drizzle or Prisma; do not add both).
- Queue: Redis-backed durable queue for generation/render/publish jobs if Redis is available; otherwise a DB-backed job table for MVP.
- Worker: separate Node worker process for polling providers, FFmpeg rendering, audio processing and resumable uploads.
- Storage: private S3-compatible object storage or an approved managed storage provider; signed URLs for access.
- Media processing: FFmpeg installed in worker environment, not serverless request handlers.
- AI: Gemini video/image provider adapters; dedicated Telugu speech provider adapter; optional transcription provider.
- Publishing: YouTube Data API OAuth 2.0 and Meta's official Instagram publishing API where eligible.
- Observability: structured logs, correlation IDs, job history, provider usage ledger and audit trail.

## Workflow topology
`Input → Brief → Script → Storyboard → Character refs → Visual generation → Voice → Music/SFX → Edit/render → QC → Human approval → Schedule → Upload → Platform processing → Published → Analytics`

Each stage emits immutable, versioned artifacts. Editing an upstream artifact marks downstream outputs stale and offers selective regeneration.

## Agent contracts
Each agent has:
- stable `agentId`, version and enabled state;
- typed input schema and typed output schema;
- allowed tools/providers;
- timeout and retry policy;
- cost budget;
- structured logs and trace ID;
- deterministic mock mode for tests.

Do not let agents directly mutate arbitrary database rows. Agents return validated artifacts; domain services persist them and enforce state transitions.

## Core entities
`User`, `Workspace`, `Membership`, `Channel`, `SocialAccount`, `VideoProject`, `ProductionBrief`, `ScriptVersion`, `Scene`, `Shot`, `Character`, `CharacterConsent`, `MediaAsset`, `AssetLicense`, `VoiceProfile`, `VoiceGeneration`, `AudioTrack`, `MusicTrack`, `StoryboardVersion`, `GenerationJob`, `AgentRun`, `AgentArtifact`, `RenderJob`, `RenderOutput`, `Thumbnail`, `VideoMetadata`, `Approval`, `Schedule`, `PublishJob`, `PublishAttempt`, `AnalyticsSnapshot`, `AutomationRule`, `Notification`, `AuditEvent`, `ProviderConfig`, `UsageLedger`, `CostBudget`.

## Important state machine
- Draft: `draft`
- Planning: `brief_ready`, `script_ready`, `storyboard_ready`
- Production: `generating_assets`, `voice_ready`, `editing`
- Review: `quality_check`, `awaiting_approval`
- Publishing: `approved`, `scheduled`, `uploading`, `processing`, `published`
- Exceptions: `needs_input`, `generation_failed`, `render_failed`, `qc_failed`, `upload_failed`, `cancelled`

Only validated transitions are allowed. All transitions must be audited. Publish jobs must be idempotent.

## Provider interfaces
Normalize providers behind contracts:
- `VideoGenerationProvider.generateShot()/getJobStatus()/cancelJob()`
- `ImageGenerationProvider.generateImage()/getJobStatus()`
- `SpeechSynthesisProvider.synthesize()/previewVoice()`
- `StorageProvider.putObject()/createSignedUrl()/deleteObject()`
- `SocialPublishingProvider.upload()/schedule()/getStatus()`
- `RenderService.createRender()/getRenderStatus()`

Never expose provider credentials to client code. Record model and API version with every generation.

## Publishing notes
YouTube upload uses OAuth and the official Data API. Use resumable uploads and poll processing status. Scheduling must follow the API's `publishAt` constraints. Instagram publishing must use official Meta APIs and only show enabled capabilities after account eligibility and permissions are verified. Provide manual export when API access is unavailable.

## Cost controls
Before each paid generation, estimate cost where provider pricing supports it, show the estimate and enforce per-project/monthly budgets. Record actual provider usage after completion. Do not invent pricing if unavailable.
