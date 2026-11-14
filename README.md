# SIR'S AI YOUTUBE AGENTIC STUDIO

[![Next.js 16](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-v4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)](https://www.postgresql.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-C5F74F)](https://orm.drizzle.team/)
[![Railway](https://img.shields.io/badge/Deploy-Railway-0B0D0E?logo=railway)](https://railway.app/)

A production-grade, autonomous multi-agent AI operations and video production platform engineered specifically for regional Telugu visual storytelling, automated YouTube channel operations, and cross-platform publishing (YouTube Shorts, YouTube Long-form, and Instagram Reels).

---

## 🌟 Key Capabilities

- **16 Autonomous AI Agents**: Specialized agents collaborating through typed artifacts, DAG coordination, and finite state machines.
- **Authentic Telugu Production**: Natural colloquial Telugu grammar, emotion-tagged dialogues, phonetic pronunciation dictionary, and Indic font rendering (`fonts-lohit-telu`).
- **Gemini Veo Video Generation**: AI video synthesis with scene prompts, motion vectors, and individual scene re-generation without re-rendering unchanged scenes.
- **Audio Engineering & Dynamic Ducking**: Separate dialogue synthesis, -14 dB background music sidechain ducking, and EBU R128 (-14 LUFS) loudness normalization.
- **Hardware-Accelerated Timeline**: Headless Railway FFmpeg worker composing multi-track videos and burning synchronized Telugu Unicode subtitles.
- **Publishing & Slot Automation**: YouTube Data API v3 resumable chunked uploader and Meta Instagram Graph API Reels container publisher aligned to Asia/Kolkata peak audience windows.
- **Enterprise Governance**: Cryptographic credential storage (AES-256-GCM), RBAC permissions matrix, immutable audit logs, and a Global Emergency Kill Switch.

---

## 🤖 16 Specialized AI Agents

| Agent ID | Agent Name | Telugu Role | Primary Engine / Model |
| :--- | :--- | :--- | :--- |
| `agent_01` | **Master Orchestrator** | ప్రధాన సమన్వయకర్త | `gemini-2.5-pro` |
| `agent_02` | **Creative Director** | క్రియేటివ్ డైరెక్టర్ | `gemini-2.5-pro` |
| `agent_03` | **Telugu Script Writer** | రచయిత | `gemini-2.5-pro` |
| `agent_04` | **Film Director** | దర్శకుడు & స్టోరీబోర్డ్ | `gemini-2.5-pro` |
| `agent_05` | **Character Designer** | పాత్రల రూపకర్త (Continuity Bible) | `gemini-2.5-pro` |
| `agent_06` | **Gemini Video Generator** | వీడియో జనరేషన్ (Veo Engine) | `gemini-2.5-veo-video` |
| `agent_07` | **Telugu Voice Director** | వాయిస్ డైరెక్టర్ | `telugu-neural-tts-v2` |
| `agent_08` | **Music Director** | సంగీత దర్శకుడు (BGM Scoring & Ducking) | `gemini-2.5-flash` |
| `agent_09` | **Sound Designer** | శబ్ద గ్రహణం (Foley & Ambience FX) | `gemini-2.5-flash` |
| `agent_10` | **Video Editor** | ఎడిటర్ (FFmpeg Multi-Track Assembly) | `ffmpeg-worker-v1` |
| `agent_11` | **Thumbnail Designer** | థంబ్‌నైల్ డిజైనర్ (High-CTR Telugu Visuals) | `gemini-2.5-pro` |
| `agent_12` | **YouTube Operations** | యూట్యూబ్ మేనేజర్ (API Upload & SEO) | `gemini-2.5-flash` |
| `agent_13` | **Community Manager** | కమ్యూనిటీ మేనేజర్ (Audience Engagement) | `gemini-2.5-flash` |
| `agent_14` | **Quality Control (QC)** | నాణ్యత తనిఖీ (Pre-Publish Verification) | `gemini-2.5-flash` |
| `agent_15` | **Content Repurposing** | రీపర్పసింగ్ (16:9 to 9:16 Reframer) | `gemini-2.5-flash` |
| `agent_16` | **Channel Growth Strategist** | గ్రోత్ స్ట్రాటజిస్ట్ (Viral Gap Analysis) | `gemini-2.5-pro` |

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 16 App Router, React 19, TypeScript (Strict Mode), Tailwind CSS v4, Lucide React, Redux Toolkit, Recharts.
- **Backend**: Next.js Route Handlers, Server Actions, PostgreSQL 16 (59 tables across 12 domain schemas via Drizzle ORM).
- **Background Worker**: Node.js 20, FFmpeg, native Indic fonts (`fonts-lohit-telu`, `fonts-deva`).
- **AI Integrations**: Google Gemini API, Veo Video Generation, Telugu Neural Voice Synthesizer, YouTube Data API v3, Meta Instagram Graph API.
- **Deployment**: Railway multi-service topology (`railway.json`, `Dockerfile.web`, `worker/Dockerfile`).

---

## 🚀 Quick Start

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/productsmy385-spl/YOUTUBE-SKILL.git
cd YOUTUBE-SKILL
yarn install
```

### 2. Environment Configuration
Copy `.env.example` to `.env.local` and configure your API keys:
```bash
cp .env.example .env.local
```

### 3. Database Migration
```bash
npx drizzle-kit migrate
```

### 4. Run Development Server
```bash
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) to access the Studio.

### 5. Verification Commands
```bash
yarn typecheck    # Strict TypeScript verification
yarn build        # Production Next.js 16 build
```

---

## 🚂 Railway Deployment

The platform is deployment-ready for Railway with multi-service support:
1. Link this repository in Railway.
2. Add a **PostgreSQL** service and a **Redis** service from the Railway dashboard.
3. Configure the environment variables defined in `.env.example`.
4. Deploy the **Web** service (using `Dockerfile.web`) and the **Background Worker** (using `worker/Dockerfile`).

See [docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md) for full instructions.

---

## 📄 License & Attribution

Designed and developed by [DataDropX](https://datadropx.net). Distributed by ThemeWagon.
See `LICENSE` for terms.
