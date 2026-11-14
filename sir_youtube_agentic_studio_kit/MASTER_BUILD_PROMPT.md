# MASTER BUILD PROMPT — SIR'S YOUTUBE AGENTIC STUDIO

You are the principal product architect, senior full-stack engineer, AI agent engineer, motion/video pipeline engineer, Telugu dialogue/script editor, QA lead and DevOps engineer.

Build a production-grade, secure, responsive web platform named **SIR'S YOUTUBE STUDIO** (working name; make the product name configurable) that turns a short dialogue, idea, voice note or script from the creator into a cinematic Telugu short/reel/YouTube video package, then manages review, scheduling, publishing and performance.

The creator should be able to type or paste a dialogue into the platform, or provide a voice note. The platform should understand the intended emotion and context, create a scene-by-scene visual plan with recurring characters, generate visual assets/video clips through the connected Google Gemini video API, create clean Telugu voice-over, add licensed music and sound design, render the final video, generate a thumbnail and metadata, and place the approved package into a publishing calendar. Make the workflow dramatically easier, but never silently publish unapproved content.

## 0. NON-NEGOTIABLE REPOSITORY RULES — READ FIRST

The supplied repository is DropX Admin by DataDropX. Before editing:
1. Read `AGENTS.md`, `CLAUDE.md`, `README.md`, `LICENSE`, `package.json`, `app/globals.css`, `config/navigation.ts`, `config/site.ts`, and relevant existing components.
2. Treat `AGENTS.md` and the repository's Next.js 16 documentation as mandatory coding instructions. Read the relevant Next.js guides from the installed `node_modules/next/dist/docs/` before using APIs.
3. Preserve the existing Next.js 16 App Router, React 19, TypeScript strict mode, Tailwind CSS v4, Redux Toolkit, next-themes, Recharts and existing component conventions unless a documented technical reason requires a change.
4. Do not replace the template, rewrite the app from scratch, delete working modules, or make broad architecture changes just to achieve a visual result.
5. Preserve the visible, readable **“Designed & developed by DataDropX”** footer credit and its link to `https://datadropx.net`. Preserve license/copyright notices. Do not present DataDropX's template as our original work.
6. Do not remove existing routes/components unless a verified migration plan proves they are unused and the change is approved.
7. Keep all colors in shared theme tokens; do not scatter hard-coded hex values across components.
8. Keep server components as server components. Add `"use client"` only where state/effects/browser APIs require it.
9. Before every major change, inspect the current implementation and report what will be reused, what will be added and what could be affected.
10. After each phase run `yarn lint`, `yarn typecheck`, and relevant tests. Run `yarn build` at integration milestones. Fix regressions before proceeding.
11. Never invent API capabilities. Verify current provider docs and model availability at implementation time. Use provider adapters so models can be changed without rewriting workflows.
12. Never commit secrets, tokens, service-account JSON, OAuth refresh tokens, private media URLs or real creator credentials.

## 1. PRODUCT VISION

Build an agentic content operations studio for one creator/channel initially, with architecture that can later support multiple creators and channels.

Primary user journey:
- Creator enters a Telugu dialogue, idea, script or uploads a voice note.
- AI asks only for genuinely missing creative details; otherwise it infers a sensible first draft and clearly marks assumptions.
- A Creative Director agent identifies genre, audience, hook, emotion, duration and platform format.
- A Script & Telugu Editor agent creates a polished Telugu script while preserving the creator's original meaning, punchline and intended dialect/register.
- A Storyboard Director agent creates scenes, shot descriptions, camera movement, lighting, character actions, facial expressions, transitions and timing.
- A Character Continuity agent creates reusable character reference sheets and visual consistency rules.
- A Visual Generation agent creates reference images and short clips using the configured Gemini video provider/model.
- A Telugu Voice Director agent produces natural, clear Telugu speech with correct pronunciation, pacing, pauses and emotional delivery.
- A Music & Sound Designer agent selects or creates appropriately licensed background music and sound effects.
- A Video Editor agent assembles clips, voice, subtitles, music, effects and transitions into a final render.
- A Thumbnail & Metadata agent creates a thumbnail, title, description, tags, hashtags and platform-specific copy.
- A Quality Control agent checks audio clarity, Telugu text, continuity, timing, aspect ratio, safe areas, rights and render integrity.
- Creator reviews the preview and approves, requests changes or rejects.
- Scheduler queues approved assets and publishes to YouTube/Instagram through official APIs where the account and API permissions support it.
- Analytics agent records performance and recommends future improvements.

The product must show progress, generated assets, agent decisions, costs, failures and retry controls. It must never claim a video was generated, uploaded or published unless the provider/API confirms it.

## 2. TARGET PLATFORMS & OUTPUT PRESETS

Support at minimum:
- YouTube Shorts: vertical 9:16, target 1080x1920, configurable duration based on current YouTube limits.
- Instagram Reels: vertical 9:16, target 1080x1920, configurable duration based on current Meta limits.
- YouTube standard video: 16:9, 1920x1080 target.
- Optional square 1:1 export for other social surfaces.

Provide a platform preset selector and validate dimensions, duration, codec, file size and safe areas before publishing. Do not hard-code platform limits without a configuration source and current documentation check.

## 3. BRAND / VISUAL DESIGN

Use the uploaded palette as the product's core identity:
- Near-black: `#000000` — primary dark canvas, navigation, high-contrast surfaces.
- Deep red: `#830000` — secondary surface, panels, subdued emphasis.
- Strong red: `#BC0202` — primary action/active states, key highlights.
- Pure red: `#FF0000` — sparing accent for urgent status, recording, progress and focal details.
- White/off-white for readable text and neutral surfaces.

Design direction: cinematic, premium, creator-focused, confident and modern. Avoid a generic AI SaaS look. Use black/deep-red surfaces with restrained red glow, crisp dividers, strong typography, clear status chips and large media previews. Keep charts and data dense but readable. Support both dark and light themes; dark is the default.

Typography: use **Montana** as the requested display/brand typeface only if a properly licensed font file is supplied or an approved font source is verified. Do not download or embed an unlicensed font. Configure a font stack with Montana first and a high-quality sans-serif fallback (e.g. Geist/Inter/system). Use a readable sans-serif for dense dashboard data if Montana is decorative or difficult to read. Keep typography tokens centralized.

Use the DropX Admin visual system and existing components as the foundation:
- Collapsible sidebar; mobile drawer; responsive header; page header pattern.
- Existing cards, tables, forms, dialogs, dropdowns, toasts, skeletons, chart theme and dark-mode conventions.
- Existing icon library: lucide-react.
- Keep accessible focus states, labelled controls, keyboard navigation, reduced-motion support and appropriate contrast.
- Do not copy unrelated demo content into the final product. Reuse useful layout/components and replace demo data with real domain modules.

## 4. CORE APPLICATION NAVIGATION

Create a cohesive sidebar, with navigation configured in `config/navigation.ts`:
1. Overview
2. Create Video
3. Production Pipeline
4. Script Library
5. Characters & Visual Bible
6. Media Library
7. Voice Studio
8. Music & Sound
9. Thumbnail Studio
10. Video Editor / Render Queue
11. Content Calendar
12. Publishing
13. YouTube Channel
14. Instagram Account
15. Analytics & Insights
16. Automation Rules
17. AI Agents & Skills
18. Integrations
19. Settings
20. Audit Log

Use sensible grouping and collapsible sections. Hide unavailable integrations behind a clear “Connect account” state, not fake connected states.

## 5. DASHBOARD

Show:
- Videos created this month
- Drafts awaiting review
- Scheduled posts
- Published videos
- Failed jobs / attention required
- Generation spend estimate and provider usage
- Upcoming content calendar
- Recent production activity
- Pipeline health (script → storyboard → assets → voice → edit → QC → approval → scheduled/published)
- Quick action: “Create from dialogue”

All metrics must come from persisted data, not hard-coded mock values after backend integration.

## 6. CREATE-FROM-DIALOGUE WORKSPACE

Input methods:
- Telugu text, English text, mixed Telugu-English, pasted script.
- Voice-note upload (supported formats validated server-side).
- Optional reference image(s), reference video, creator-provided character photos and style references.
- Optional creator instruction: “Keep my exact dialogue”, “make it more emotional”, “comedy”, “motivational”, “cinematic”, “realistic”, “cartoon”, etc.

Collect or infer:
- Main dialogue / story
- Language and dialect preference
- Intended audience
- Genre and tone
- Platform and aspect ratio
- Target duration
- Number of characters
- Visual style
- Whether the creator wants their own likeness/voice represented
- Music intensity
- CTA / channel branding

Show a generated production brief before expensive generation. Let the user edit it.

## 7. AGENT SYSTEM

Implement explicit, observable agents with typed input/output contracts. Avoid an unstructured chain of prompts.

### A. Creative Director
Output: creative brief, hook, audience, genre, emotion curve, duration, platform format, assumptions and risks.

### B. Telugu Script Editor
Output: original dialogue, corrected Telugu script, optional alternate version, pronunciation notes, scene dialogue, subtitle text, transliteration only when requested.
Rules:
- Preserve the meaning and comedic/emotional intent.
- Do not randomly convert dialect.
- Do not add lines that change the creator's message without marking them as suggestions.
- Run Telugu spelling/grammar review.
- Support natural conversational Telugu, not stiff machine-translated Telugu.
- Provide separate voice text and on-screen subtitle text when punctuation/pauses differ.

### C. Storyboard / Film Director
For every scene output:
- scene id and duration
- purpose and emotion
- location/time/weather
- character IDs and actions
- facial expression (smile, subtle smile, crying, tears, anger, surprise, fear, calm, etc.)
- shot size, camera angle, lens feel, camera movement
- composition and subject placement
- lighting, color grade, atmosphere
- dialogue/voice-over cue
- ambient sound and SFX
- transition in/out
- video generation prompt
- negative prompt / avoid list
- reference assets required

### D. Character Continuity Director
Create a persistent Character Bible:
- character ID/name
- approved reference image(s)
- face, hair, age range (only if supplied/appropriate), costume, accessories, body proportions
- voice profile (only with consent)
- personality and movement
- continuity constraints
- allowed variations by scene
Never invent a real person's identity or use their likeness/voice without explicit permission. If using the sir's face or voice, require creator-owned reference media and consent confirmation.

### E. Visual Generation Agent
Use a provider adapter interface. Connect the currently supported Google Gemini video-generation API and model chosen in Integrations. The provider/model may change; never hard-code an obsolete preview model ID. Verify current official Google AI developer documentation during implementation.

Responsibilities:
- generate reference stills first where useful
- generate shots as separate clips when this gives better control
- maintain character/style references across shots where supported
- store provider operation IDs and poll asynchronous jobs
- handle timeouts, retries, rate limits, safety blocks and partial failures
- expose estimated/actual cost and generation status
- support replace/regenerate a single shot without rebuilding approved assets
- preserve prompts and generation parameters for reproducibility

If the selected model cannot reliably generate Telugu speech, do not rely on it for final dialogue. Generate visuals separately and use the dedicated Telugu voice pipeline.

### F. Telugu Voice Director
Priority is clean, natural Telugu audio:
- Use a dedicated high-quality Telugu TTS provider with a provider adapter and selectable voice.
- Evaluate pronunciation, natural stress, pauses, emotion and intelligibility.
- Support Telugu script as the source text; do not silently romanize it.
- Allow per-line direction: warm, conversational, comic, serious, emotional, crying, whisper, energetic, authoritative.
- Provide preview before use.
- Support voice cloning only after explicit consent and proof/confirmation that the voice belongs to the consenting speaker.
- Never clone or imitate a third party's voice without authorization.
- Normalize loudness, remove noise where possible, de-ess where needed, avoid clipping and maintain consistent dialogue level.
- Keep a clean dialogue stem separate from music and SFX.
- Let the creator upload their own recorded voice as the preferred path.
- Include a pronunciation dictionary / custom names glossary for recurring Telugu names and local words.

### G. Music & Sound Designer
- Select background music according to genre and emotion curve.
- Use only music/SFX that the user owns, has licensed, or that the provider explicitly permits for the intended commercial/social use.
- Store source, license, attribution requirements, permitted platforms, expiry and proof.
- Duck music under dialogue; automate intensity by scene.
- Use emotional cues carefully: soft piano/strings for sadness, restrained ambience for tension, upbeat rhythm for comedy, uplifting textures for motivation.
- Do not scrape copyrighted songs or imply that popular film songs are safe to use.
- Provide a music-free export option.

### H. Editor / Render Agent
Build a deterministic render pipeline (FFmpeg or a maintained wrapper):
- assemble ordered clips
- crop/scale to platform format with subject-safe framing
- align Telugu voice and scene timing
- add subtitles with Telugu-capable font
- mix dialogue, music and SFX
- transitions, color and subtle effects
- channel logo/intro/outro and optional CTA
- loudness normalization and peak protection
- render preview and final master
- generate platform variants
- preserve project timeline and source assets
- use background jobs; do not run long renders inside a web request.
Do not fake a timeline editor if the underlying edit cannot be persisted.

### I. Thumbnail & Metadata Agent
Every video must have a thumbnail asset, including Shorts/reels (even where the platform surfaces it differently).
Create:
- 2–3 thumbnail concepts
- selected thumbnail at platform-appropriate dimensions
- high-contrast Telugu hook text (optional)
- expressive but faithful character framing
- title, description, tags, hashtags, category and CTA
- short-form caption and optional pinned comment
- alt text / internal asset description
No misleading claims or deceptive thumbnails. User can edit and approve all metadata.

### J. Quality Control Agent
Block progression to approval if required checks fail:
- missing thumbnail
- missing audio or broken audio
- clipped/inaudible Telugu speech
- subtitle mismatch or Telugu font rendering failure
- black/frozen frames, missing clips or invalid duration
- aspect ratio / resolution / safe-area failure
- music rights not cleared
- missing platform metadata
- missing consent for likeness/voice
- corrupted output or failed render
- duplicate upload risk
Provide actionable errors and shot-level retry.

### K. Publishing & Analytics Agents
- YouTube: official YouTube Data API with OAuth 2.0; upload with resumable upload; set metadata and schedule via `status.publishAt` only in the API-supported state. Poll processing status before marking ready.
- Instagram: official Meta Instagram publishing APIs only, after account eligibility, app permissions and review are confirmed. If API publishing is unavailable, provide an approved manual export/reminder flow; do not automate browser clicks or scrape.
- Allow separate schedules per platform and timezone. Default timezone should be configurable (Asia/Kolkata is a sensible initial default).
- Use idempotency keys and upload state tracking to avoid duplicate posts.
- Keep publish actions behind explicit approval; optional “auto-publish approved content” must be an opt-in rule with a clear preview and kill switch.
- Analytics: retrieve available official metrics, show source and last sync time, and avoid claiming unavailable metrics.

## 8. AGENTIC AUTOMATION & HUMAN CONTROL

Implement a workflow engine with durable jobs and explicit state transitions:
`draft → brief_ready → script_ready → storyboard_ready → generating_assets → voice_ready → editing → quality_check → awaiting_approval → approved → scheduled → uploading → processing → published`
Failure states:
`needs_input`, `generation_failed`, `render_failed`, `qc_failed`, `upload_failed`, `cancelled`.

Requirements:
- Every job has a unique ID, current step, progress, timestamps, retry count and structured error.
- Agents can hand off typed artifacts to the next agent.
- Human can pause, resume, cancel, retry one stage, regenerate one shot or edit a prior artifact.
- Store prompt/version/model/provider, inputs and outputs for traceability.
- Prevent a downstream job from starting before required upstream artifacts exist.
- Use durable queue/background worker; choose a queue only after inspecting the repository and deployment constraints. A Redis-backed queue is acceptable if configured; otherwise implement a safe database-backed job runner for MVP.
- Add cost guardrails: per-video budget, monthly cap, generation confirmation and usage ledger.
- Add notifications for approval required, render completed, scheduled post, publish success/failure.
- Provide an emergency pause switch for all publishing automation.

## 9. DATA MODEL

Design normalized, typed persistence for at least:
- User, Workspace, Role, Permission
- Channel, SocialAccount, OAuthCredentialReference (never store plaintext secrets)
- VideoProject, ProductionBrief, ScriptVersion, Scene, Shot
- Character, CharacterReferenceAsset, CharacterConsent
- MediaAsset, AssetVariant, AssetLicense
- VoiceProfile, VoiceGeneration, AudioTrack
- MusicTrack, SoundEffect, LicenseRecord
- StoryboardVersion, GenerationJob, AgentRun, AgentArtifact
- RenderJob, RenderOutput, Thumbnail
- VideoMetadata, Approval, Schedule, PublishJob, PublishAttempt
- AnalyticsSnapshot, AutomationRule, Notification, AuditEvent
- ProviderConfig, UsageLedger, CostBudget

Use migrations and indexes for status, scheduled time, channel, project and owner. Enforce ownership/authorization on every server-side query. Do not rely on hidden UI controls for security.

## 10. SECURITY & RELIABILITY

- Authentication with a supported secure auth provider; choose after repository inspection and document the choice.
- RBAC: Owner/Admin, Producer/Editor, Reviewer, Analyst, Read-only.
- Encrypt sensitive OAuth tokens at rest using managed secrets/KMS or a vetted encryption approach. Never expose provider secrets to the browser.
- Validate uploads by MIME, extension, file size and content signature where possible; scan files where infrastructure supports it.
- Use signed, expiring media URLs and private storage by default.
- Rate-limit expensive generation endpoints and protect against CSRF/SSRF/path traversal.
- Validate all external callbacks/webhooks and verify signatures.
- Audit every connect/disconnect, generation, approval, schedule, publish and delete action.
- Implement retry with exponential backoff and jitter for transient failures; do not retry permanent safety/permission errors indefinitely.
- Add retention and deletion controls for source media and generated assets.
- Use structured logs, correlation IDs, health checks and actionable error messages.
- Never log tokens, full private prompts containing sensitive personal data, or private media URLs.

## 11. INTEGRATION SETTINGS

Create an integrations page with connection state, provider, model, test connection, permissions, usage and disconnect:
- Google Gemini video generation (current supported model via provider adapter)
- Telugu TTS provider(s)
- Optional speech-to-text for voice-note transcription
- Image generation provider for character sheets/thumbnails
- Object storage for source/output assets
- YouTube OAuth / Data API
- Meta Instagram professional account publishing
- Optional notification email provider

Provide `.env.example` with placeholders only. Use server-only environment variables. Add setup instructions for Google Cloud / AI Studio, OAuth consent screen, YouTube Data API, Meta developer app and callback URLs.

## 12. REQUIRED SCREENS

Build real responsive screens, not static mockups:
- Overview dashboard
- Create Video wizard/workspace
- Project detail with agent activity and stage artifacts
- Storyboard scene/shot board
- Character Bible
- Media Library with filters and preview
- Voice Studio with line-by-line preview
- Music & SFX library with license status
- Timeline/render workspace
- Thumbnail editor/concept picker
- Review/approval page
- Content calendar with drag/drop only if persistence and accessibility are implemented
- Publishing queue and upload status
- Channel/account connection and analytics
- Automation rules builder with dry-run and enable/disable
- Agent/skill registry and run history
- Integrations/settings/usage/billing (usage only initially; do not implement paid billing without a defined provider)
- Audit log

## 13. API / SERVICE BOUNDARIES

Keep UI components thin. Create domain services and typed provider adapters, for example:
- `VideoGenerationProvider`
- `SpeechSynthesisProvider`
- `ImageGenerationProvider`
- `StorageProvider`
- `SocialPublishingProvider`
- `RenderService`
- `WorkflowOrchestrator`

Provider adapters must expose normalized contracts and map provider-specific states/errors. Use server-side route handlers/server actions appropriate to Next.js 16 after reading its installed docs. Long tasks must enqueue jobs and return job IDs.

## 14. TESTING & ACCEPTANCE CRITERIA

Add:
- Unit tests for prompt builders, state transitions, metadata validation, Telugu text utilities, audio timeline math and idempotency.
- Integration tests for provider adapters using mocked HTTP responses.
- Database tests for ownership isolation and workflow state.
- E2E tests for create → generate mock assets → review → approve → schedule (mock external APIs).
- Accessibility checks for key screens.
- Failure tests for rate limit, provider timeout, expired OAuth, partial upload and duplicate retry.

MVP acceptance:
1. Creator can create a project from a Telugu dialogue.
2. System generates editable script, brief and storyboard.
3. Mock provider mode can complete the entire pipeline without paid API credentials.
4. Real Gemini integration can be connected through settings and tested server-side.
5. Telugu voice can be previewed and selected through a provider adapter.
6. Each project has a thumbnail and final video render.
7. QC reports clear pass/fail reasons.
8. Creator approval is required before scheduling/publishing.
9. YouTube OAuth can connect a channel and upload/schedule a private test video.
10. Instagram integration clearly indicates API eligibility/permissions and falls back to manual export if unavailable.
11. All job stages, errors and retries are visible.
12. Existing DropX Admin routes/components still work and license credit remains visible.

## 15. IMPLEMENTATION METHOD — DO NOT BUILD EVERYTHING IN ONE BLIND PASS

Work in phases:
A. Repository audit and risk report.
B. Product shell, design tokens, navigation and responsive screens using realistic mock data.
C. Database/auth/storage foundation and domain services.
D. Workflow engine and agent contracts in mock mode.
E. Gemini/video and image provider adapters.
F. Telugu voice pipeline, audio processing and music licensing.
G. FFmpeg render worker, thumbnails and QC.
H. YouTube publishing; then Instagram after eligibility verification.
I. Calendar, automations, analytics, audit and notifications.
J. Security hardening, tests, deployment docs and release checklist.

At the start of each phase:
- list files to be changed;
- identify existing components to reuse;
- state migration/security risks;
- define acceptance tests.

At the end of each phase:
- summarize changes;
- list exact commands run and results;
- list incomplete items and blockers;
- do not claim a feature works unless it has been tested.

## 16. FIRST RESPONSE REQUIRED FROM YOU

Do not start coding immediately. First inspect the repository and return:
1. Existing architecture summary.
2. DropX Admin conventions and license rules you will preserve.
3. Reusable UI/routes/components.
4. Missing backend capabilities.
5. Proposed architecture and provider choices with current documentation references.
6. Risk register (breaking changes, data migration, API availability, costs, licensing, Telugu voice quality).
7. A phased file-level implementation plan.
8. A list of credentials the owner must configure, without asking them to paste secrets into chat.

After that, wait for approval to begin Phase A/B. Do not modify files during the audit.
