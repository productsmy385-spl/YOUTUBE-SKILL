# 16-Agent Autonomous Architecture Specification

## 1. Overview
Sir's AI YouTube Agentic Studio orchestrates 16 specialized AI agents. Each agent possesses:
- Unique deterministic Agent ID
- Strict role boundaries & Telugu language responsibilities
- Strongly-typed input and output schemas
- Tuned system instructions
- Cost tracking & execution latency telemetry
- Circuit-breaker fault isolation

---

## 2. Agent Roster & Responsibility Matrix

### Phase 1: Pre-Production & Creative Concept
1. **Agent 01 — Master Orchestrator (`agent_01`)**
   - **Role**: Coordinates the entire workflow finite state machine.
   - **Model**: `gemini-2.5-pro`
   - **Responsibilities**: Decomposes user intent, schedules DAG tasks, monitors agent health, enforces scene dependencies, handles retries, and coordinates the global kill switch.
2. **Agent 02 — Creative Director (`agent_02`)**
   - **Role**: Creative Vision, Tone & Audience Profiling.
   - **Model**: `gemini-2.5-pro`
   - **Responsibilities**: Analyzes raw dialogue/ideas to determine genre, audience profile, pacing, emotional arc, hook, visual style, and ending CTA.
3. **Agent 03 — Telugu Script Writer (`agent_03`)**
   - **Role**: Authentic Colloquial Telugu Screenwriter.
   - **Model**: `gemini-2.5-pro`
   - **Responsibilities**: Writes grammatically flawless, natural conversational Telugu dialogue with emotional cues, comedic timing, dramatic pauses, and scene separations without changing dialect or intended meaning.
4. **Agent 04 — Film Director (`agent_04`)**
   - **Role**: Cinematic Storyboarder & Camera Blocking.
   - **Model**: `gemini-2.5-pro`
   - **Responsibilities**: Converts scripts into cinematic storyboards with camera movements (dolly, pan, tracking), shot types (extreme close-up, wide), lighting, atmosphere, color palette, and generation prompts.
5. **Agent 05 — Character Designer (`agent_05`)**
   - **Role**: Character Bible & Continuity Guardian.
   - **Model**: `gemini-2.5-pro`
   - **Responsibilities**: Builds reusable Character Bibles ensuring consistent face structure, hair, clothing, body proportions, and emotional reactions across all generated scenes.

### Phase 2: Generation & Synthesis
6. **Agent 06 — Gemini Video Generator (`agent_06`)**
   - **Role**: Video Synthesis Engine Adapter.
   - **Model**: `gemini-2.5-veo-video`
   - **Responsibilities**: Generates scene video clips using Google Veo/Gemini video models, polls asynchronous rendering jobs, supports individual scene re-generation.
7. **Agent 07 — Telugu Voice Director (`agent_07`)**
   - **Role**: Emotional Telugu Speech Synthesizer.
   - **Model**: `telugu-neural-tts-v2`
   - **Responsibilities**: Synthesizes human-like Telugu speech using a dedicated pronunciation dictionary, inflection models (crying, laughter, anger, whisper), and audio normalization.
8. **Agent 08 — Music Director (`agent_08`)**
   - **Role**: Cinematic Score & Dynamic Ducking.
   - **Model**: `gemini-2.5-flash`
   - **Responsibilities**: Scores scenes with licensed emotional instruments (nadaswaram, flutes, veena, orchestral strings) and defines sidechain ducking envelopes.
9. **Agent 09 — Sound Designer (`agent_09`)**
   - **Role**: Foley & Atmospheric Soundscape.
   - **Model**: `gemini-2.5-flash`
   - **Responsibilities**: Injects realistic environmental foley (temple bells, village dawn, river flowing, cybernetic city ambiance) mixed below speech dialogue.

### Phase 3: Post-Production & Quality Control
10. **Agent 10 — Video Editor (`agent_10`)**
    - **Role**: FFmpeg Multi-Track Assembly & Subtitle Burner.
    - **Model**: `ffmpeg-worker-v1`
    - **Responsibilities**: Orchestrates multi-layer FFmpeg rendering on the Railway background worker, applies ducking filters, burns Telugu Unicode subtitles with Indic font engines.
11. **Agent 11 — Thumbnail Designer (`agent_11`)**
    - **Role**: Viral High-CTR Visual Creator.
    - **Model**: `gemini-2.5-pro`
    - **Responsibilities**: Designs high-contrast thumbnail variants with Telugu typography, emotional character expressions, and pre-renders A/B test variants.
12. **Agent 14 — Quality Control (QC) Agent (`agent_14`)**
    - **Role**: Pre-Publish Automated Verification.
    - **Model**: `gemini-2.5-flash`
    - **Responsibilities**: Verifies audio loudness (-14 LUFS standard), detects audio clipping, validates Telugu font shaping, ensures facial continuity, and issues pass/fail score.

### Phase 4: Operations, Distribution & Growth
13. **Agent 12 — YouTube Operations Manager (`agent_12`)**
    - **Role**: Resumable Uploader & Quota Controller.
    - **Model**: `gemini-2.5-flash`
    - **Responsibilities**: Executes chunked uploads via YouTube Data API v3, optimizes bilingual SEO titles and chapters, tracks daily 10,000 unit quota.
14. **Agent 13 — Community Manager (`agent_13`)**
    - **Role**: Telugu Audience Engagement.
    - **Model**: `gemini-2.5-flash`
    - **Responsibilities**: Monitors comment sentiment, generates personalized Telugu replies, and highlights trending audience requests.
15. **Agent 15 — Content Repurposing Agent (`agent_15`)**
    - **Role**: 16:9 to 9:16 Re-framer.
    - **Model**: `gemini-2.5-flash`
    - **Responsibilities**: Extracts viral hooks from long-form videos and dynamically reformats them into Instagram Reels and YouTube Shorts.
16. **Agent 16 — Channel Growth Strategist (`agent_16`)**
    - **Role**: Viral Gap Analysis & Competitor Radar.
    - **Model**: `gemini-2.5-pro`
    - **Responsibilities**: Analyzes trending Telugu topics across Tollywood and digital media to predict high-velocity story ideas.

