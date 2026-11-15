import { NextRequest, NextResponse } from "next/server";
import {
  CreativeDirectorAgent,
  TeluguScriptWriterAgent,
  FilmDirectorAgent,
  CharacterDesignerAgent,
  GeminiVideoAgent,
  TeluguVoiceDirectorAgent,
  MusicAndSoundAgent,
  VideoEditorAgent,
  ThumbnailDesignerAgent,
  SEOMetadataAgent,
  QualityControlAgent,
  recordAgentExecutionInPostgres,
} from "@/lib/agents/agent-engine";
import { CreatorBriefInput, ProductionBriefArtifact, TeluguScriptArtifact, StoryboardArtifact } from "@/lib/agents/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { agentCode, payload, projectId = "00000000-0000-0000-0000-000000000001" } = body;

    if (!agentCode) {
      return NextResponse.json({ error: "Missing agentCode" }, { status: 400 });
    }

    const startTime = Date.now();
    let result: unknown = null;
    let cost = 0.02;

    switch (agentCode) {
      case "creative_director": {
        const input: CreatorBriefInput = {
          projectId,
          title: payload?.title || "Telugu Creative Concept",
          rawInput: payload?.rawInput || payload?.dialogue || "",
          inputLanguage: payload?.inputLanguage || "te",
          platform: payload?.platform || "youtube_shorts",
          aspectRatio: payload?.aspectRatio || "9:16",
          targetDurationSeconds: payload?.targetDurationSeconds || 45,
          genre: payload?.genre || "Comedy",
          emotionalTone: payload?.emotionalTone || "Conversational",
          voiceRegister: payload?.voiceRegister || "Natural",
        };
        result = await CreativeDirectorAgent.execute(input);
        cost = 0.02;
        break;
      }

      case "telugu_script_writer": {
        const input: CreatorBriefInput = {
          projectId,
          title: payload?.title || "Telugu Script",
          rawInput: payload?.rawInput || payload?.dialogue || "",
          inputLanguage: "te",
          platform: payload?.platform || "youtube_shorts",
          aspectRatio: payload?.aspectRatio || "9:16",
          targetDurationSeconds: payload?.targetDurationSeconds || 45,
          genre: payload?.genre || "Comedy",
          emotionalTone: payload?.emotionalTone || "Conversational",
          voiceRegister: "Natural",
        };
        const brief = (payload?.brief || {
          genre: input.genre,
          oneLineConcept: input.title,
        }) as ProductionBriefArtifact;
        result = await TeluguScriptWriterAgent.execute(input, brief);
        cost = 0.03;
        break;
      }

      case "film_director": {
        const script = (payload?.script || {
          title: payload?.title || "Telugu Short",
          totalScenes: 4,
          dialogueScenes: [
            { sceneId: 1, speaker: "Hero", dialogueTelugu: "అసలు ఏం జరిగింది?", englishMeaning: "What happened?", emotionCue: "Curious", pauseAfterSeconds: 0.5 },
            { sceneId: 2, speaker: "Friend", dialogueTelugu: "తెలిస్తే షాక్ అవుతావు!", englishMeaning: "You will be shocked!", emotionCue: "Shock", pauseAfterSeconds: 0.5 },
          ],
          fullTeluguText: "అసలు ఏం జరిగింది? తెలిస్తే షాక్ అవుతావు!",
          dialectRegister: "Conversational Urban Telugu",
          grammarVerified: true,
        }) as TeluguScriptArtifact;
        const input: CreatorBriefInput = {
          projectId,
          title: payload?.title || script.title,
          rawInput: "",
          inputLanguage: "te",
          platform: payload?.platform || "youtube_shorts",
          aspectRatio: payload?.aspectRatio || "9:16",
          targetDurationSeconds: payload?.targetDurationSeconds || 45,
          genre: "Comedy",
          emotionalTone: "Cinematic",
          voiceRegister: "Natural",
        };
        result = await FilmDirectorAgent.execute(script, input);
        cost = 0.03;
        break;
      }

      case "character_designer": {
        const script = (payload?.script || {
          title: payload?.title || "Telugu Short",
          totalScenes: 4,
          dialogueScenes: [
            { sceneId: 1, speaker: "Hero", dialogueTelugu: "హలో", englishMeaning: "Hello", emotionCue: "Happy", pauseAfterSeconds: 0.5 },
            { sceneId: 2, speaker: "Friend", dialogueTelugu: "ఏంటి సంగతి?", englishMeaning: "What is up?", emotionCue: "Curious", pauseAfterSeconds: 0.5 },
          ],
          fullTeluguText: "హలో, ఏంటి సంగతి?",
          dialectRegister: "Conversational Urban Telugu",
          grammarVerified: true,
        }) as TeluguScriptArtifact;
        result = await CharacterDesignerAgent.execute(script);
        cost = 0.02;
        break;
      }

      case "gemini_video": {
        const storyboard = (payload?.storyboard || {
          scenes: [
            {
              sceneNumber: 1,
              visualDescription: payload?.prompt || "Cinematic close-up of dynamic Telugu protagonist reacting with curiosity",
              cameraMovement: "Slow push in",
              lighting: "Warm cinematic",
              estimatedDurationSeconds: 4,
              teluguVisualCue: "నాయకుడి ఆసక్తికరమైన ముఖ కవళికలు",
            },
          ],
          totalDurationSeconds: 4,
          visualContinuityNotes: "100% Character Bible consistency maintained",
        }) as StoryboardArtifact;
        result = await GeminiVideoAgent.execute(storyboard);
        cost = 0.08;
        break;
      }

      case "telugu_voice": {
        const script = (payload?.script || {
          title: payload?.title || "Telugu Voice",
          totalScenes: 1,
          dialogueScenes: [
            { sceneId: 1, speaker: "Hero", dialogueTelugu: payload?.text || "నమస్కారం! సిరి యూట్యూబ్ స్టూడియోకి స్వాగతం.", englishMeaning: "Welcome", emotionCue: "Enthusiastic", pauseAfterSeconds: 0.5 },
          ],
          fullTeluguText: payload?.text || "నమస్కారం!",
          dialectRegister: "Conversational Urban Telugu",
          grammarVerified: true,
        }) as TeluguScriptArtifact;
        result = await TeluguVoiceDirectorAgent.execute(script);
        cost = 0.03;
        break;
      }

      case "music_director":
      case "sound_designer": {
        const brief = (payload?.brief || {
          genre: "Comedy",
          oneLineConcept: payload?.title || "Telugu Short",
        }) as ProductionBriefArtifact;
        const storyboard = (payload?.storyboard || {
          scenes: [],
          totalDurationSeconds: 45,
          visualContinuityNotes: "",
        }) as StoryboardArtifact;
        result = await MusicAndSoundAgent.execute(brief, storyboard);
        cost = 0.02;
        break;
      }

      case "video_editor": {
        const input: CreatorBriefInput = {
          projectId,
          title: payload?.title || "Video Master",
          rawInput: "",
          inputLanguage: "te",
          platform: payload?.platform || "youtube_shorts",
          aspectRatio: payload?.aspectRatio || "9:16",
          targetDurationSeconds: payload?.durationSeconds || 45,
          genre: "Comedy",
          emotionalTone: "Cinematic",
          voiceRegister: "Natural",
        };
        result = await VideoEditorAgent.execute(input, payload?.durationSeconds || 45);
        cost = 0.01;
        break;
      }

      case "thumbnail_designer": {
        const script = (payload?.script || {
          title: payload?.title || "Viral Telugu Video",
          totalScenes: 4,
          dialogueScenes: [],
          fullTeluguText: "",
          dialectRegister: "Conversational Urban Telugu",
          grammarVerified: true,
        }) as TeluguScriptArtifact;
        const brief = (payload?.brief || {
          genre: "Comedy",
          oneLineConcept: payload?.title || "Viral Telugu Video",
        }) as ProductionBriefArtifact;
        result = await ThumbnailDesignerAgent.execute(script, brief);
        cost = 0.02;
        break;
      }

      case "seo_metadata": {
        const script = (payload?.script || {
          title: payload?.title || "Viral Telugu Video",
          totalScenes: 4,
          dialogueScenes: [],
          fullTeluguText: payload?.description || "తెలుగు లో అద్భుతమైన వీడియో",
          dialectRegister: "Conversational Urban Telugu",
          grammarVerified: true,
        }) as TeluguScriptArtifact;
        const brief = (payload?.brief || {
          genre: "Comedy",
          oneLineConcept: payload?.title || "Viral Telugu Video",
        }) as ProductionBriefArtifact;
        const input: CreatorBriefInput = {
          projectId,
          title: payload?.title || "Viral Telugu Video",
          rawInput: "",
          inputLanguage: "te",
          platform: "youtube_shorts",
          aspectRatio: "9:16",
          targetDurationSeconds: 45,
          genre: "Comedy",
          emotionalTone: "Natural",
          voiceRegister: "Natural",
        };
        result = await SEOMetadataAgent.execute(input, script, brief);
        cost = 0.01;
        break;
      }

      case "quality_control": {
        const script = (payload?.script || {
          title: "QC Check",
          totalScenes: 4,
          dialogueScenes: [],
          fullTeluguText: "",
          dialectRegister: "Conversational Urban Telugu",
          grammarVerified: true,
        }) as TeluguScriptArtifact;
        const storyboard = (payload?.storyboard || {
          scenes: [],
          totalDurationSeconds: 45,
          visualContinuityNotes: "",
        }) as StoryboardArtifact;
        result = await QualityControlAgent.execute(script, storyboard);
        cost = 0.01;
        break;
      }

      default: {
        return NextResponse.json({ error: `Unknown agent code: ${agentCode}` }, { status: 400 });
      }
    }

    const durationMs = Date.now() - startTime;

    // Persist agent run into PostgreSQL
    await recordAgentExecutionInPostgres({
      projectId,
      agentCode,
      triggerEvent: "api_direct_invocation",
      taskName: `execute_${agentCode}`,
      inputPayload: payload || {},
      outputPayload: result as Record<string, unknown>,
      costUsd: cost,
      durationMs,
    });

    return NextResponse.json({
      success: true,
      agentCode,
      durationMs,
      costUsd: cost,
      data: result,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[AgentExecute] Error executing agent:", err);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
