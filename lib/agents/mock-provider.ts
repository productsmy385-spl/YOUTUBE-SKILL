import {
  CreatorBriefInput,
  ProductionBriefArtifact,
  TeluguScriptArtifact,
  StoryboardArtifact,
  CharacterBibleArtifact,
  VideoClipArtifact,
  VoiceStemArtifact,
  MusicAndSFXArtifact,
  RenderOutputArtifact,
  ThumbnailArtifact,
  QCReportArtifact,
  PublishingMetadataArtifact,
} from "./types";

export class MockAgentProvider {
  static generateBrief(input: CreatorBriefInput): ProductionBriefArtifact {
    return {
      oneLineConcept: `${input.title} - హాస్యభరితమైన తెలుగు లఘు చిత్రం (Authentic Telugu Comedy Short)`,
      hookThreeSeconds: "మొదటి 3 సెకన్లలో ఆఫీస్ లోకి ఆత్రుతగా పరిగెత్తుకుంటూ రావడం, పంచు డైలాగ్ తో ఆరంభం.",
      genre: input.genre || "Comedy",
      emotionalArc: "ఆందోళన &rarr; ఉపశమనం &rarr; ఆకస్మిక షాక్ &rarr; హాస్యభరిత ముగింపు",
      targetAudience: "తెలుగు యూత్, ఉద్యోగులు, రోజువారీ హాస్యం ఇష్టపడే వీక్షకులు (18-35)",
      endingPayoff: "బాస్ వ్యంగ్య సమాధానంతో నవ్వుల ముగింపు, లైక్ & సబ్స్క్రైబ్ కాల్ టు యాక్షన్.",
      callToAction: "మీ ఆఫీస్ లో కూడా ఇలా జరిగిందా? కామెంట్ చేయండి! మరింత తెలుగు కంటెంట్ కోసం సబ్స్క్రైబ్ చేసుకోండి!",
      directorialNotes: "సంభాషణలు సహజంగా ఉండాలి. సీన్ 3 లో బాస్ కనిపించగానే సంగీతం ఒక్కసారిగా ఆగిపోవాలి.",
    };
  }

  static generateTeluguScript(brief: ProductionBriefArtifact, rawInput: string): TeluguScriptArtifact {
    return {
      title: "ఆఫీస్ లేట్ ఎంట్రీ ఫన్నీ డైలాగ్ (Office Late Entry)",
      totalScenes: 4,
      fullTeluguText: rawInput || "రవి: అరె సురేష్! బాస్ ఇంకా రాలేదా? అబ్బా దేవుడా బ్రతికించావు!\nసురేష్: వెనక్కి తిరిగి చూడు రా బాబు... బాస్ నీ వెనకాలే నిలబడి 10 నిమిషాల నుంచి వింటున్నారు!\nరవి: (షాక్ అయ్యి నవ్వుతూ) నమస్తే సార్! మీరు ఎప్పుడు వచ్చారు? ట్రాఫిక్ బాగుందా?\nబాస్: ట్రాఫిక్ బాగుంది రవి... రేపటినుంచి నీకు రోజూ లీవ్ కావాలా?",
      dialectRegister: "Conversational Urban Telugu (స్వాభావిక తెలుగు)",
      grammarVerified: true,
      dialogueScenes: [
        {
          sceneId: 1,
          speaker: "రవి (Ravi)",
          dialogueTelugu: "రవి: అరె సురేష్! బాస్ ఇంకా రాలేదా? అబ్బా దేవుడా బ్రతికించావు!",
          englishMeaning: "Ravi: Hey Suresh! Has boss not arrived yet? Oh God, you saved me!",
          emotionCue: "ఆందోళన & ఆత్రుత (Anxious Rush)",
          pauseAfterSeconds: 0.3,
        },
        {
          sceneId: 2,
          speaker: "సురేష్ (Suresh)",
          dialogueTelugu: "సురేష్: వెనక్కి తిరిగి చూడు రా బాబు... బాస్ నీ వెనకాలే నిలబడి 10 నిమిషాల నుంచి వింటున్నారు!",
          englishMeaning: "Suresh: Look behind you, man... The boss has been standing behind you listening for 10 minutes!",
          emotionCue: "వ్యంగ్యం & గుసగుస (Sarcastic Whisper)",
          pauseAfterSeconds: 0.5,
        },
        {
          sceneId: 3,
          speaker: "రవి (Ravi)",
          dialogueTelugu: "రవి: (షాక్ అయ్యి నవ్వుతూ) నమస్తే సార్! మీరు ఎప్పుడు వచ్చారు? ట్రాఫిక్ బాగుందా?",
          englishMeaning: "Ravi: (Shocked, with fake smile) Namaste sir! When did you arrive? Is the traffic good?",
          emotionCue: "షాక్ & నవ్వుతూ కవర్ చేయడం (Shock to Awkward Respect)",
          pauseAfterSeconds: 0.4,
        },
        {
          sceneId: 4,
          speaker: "మేనేజర్ (Boss)",
          dialogueTelugu: "బాస్: ట్రాఫిక్ బాగుంది రవి... రేపటినుంచి నీకు రోజూ లీవ్ కావాలా?",
          englishMeaning: "Boss: Traffic was fine, Ravi... Do you want daily leave starting tomorrow?",
          emotionCue: "గంభీరమైన వ్యంగ్యం (Deadpan Sarcasm)",
          pauseAfterSeconds: 1.0,
        },
      ],
    };
  }

  static generateStoryboard(script: TeluguScriptArtifact, aspectRatio: string): StoryboardArtifact {
    return {
      totalRuntimeSeconds: 45,
      aspectRatio,
      visualStyle: "Cinematic Realistic Telugu Workplace Comedy (24fps)",
      scenes: [
        {
          sceneId: 1,
          sceneNumber: "Scene 01",
          location: "హైదరాబాద్ కార్పొరేట్ ఆఫీస్ కారిడార్ (Glass Office Corridor)",
          shotType: "Medium Tracking Shot",
          cameraMovement: "Fast push forward with subject",
          lighting: "Crisp fluorescent office lighting with warm daylight rim",
          atmosphere: "Fast-paced, stressed morning rush",
          durationSeconds: 9.5,
          dialogueTelugu: script.dialogueScenes[0].dialogueTelugu,
          emotion: "Panicked Rush (ఆందోళన)",
          characterAction: "Young Telugu man running while clutching office laptop bag, checking watch repeatedly.",
          visualPrompt: "A 26-year-old South Indian Telugu tech employee in a blue checked formal shirt rushing down a glass modern corporate office corridor, wiping sweat from forehead with high anxiety, 9:16 vertical cinematography, realistic lighting.",
          negativePrompt: "cartoon, flat, 3d render, deformed hands, western office style, low quality.",
        },
        {
          sceneId: 2,
          sceneNumber: "Scene 02",
          location: "డెస్క్ క్యూబికల్స్ (Cubicle Desk Row)",
          shotType: "Over-the-shoulder Two-shot",
          cameraMovement: "Subtle handheld breathing",
          lighting: "Soft ambient fill from computer monitors",
          atmosphere: "Mischievous tension",
          durationSeconds: 11.0,
          dialogueTelugu: script.dialogueScenes[1].dialogueTelugu,
          emotion: "Gossip Whisper (గుసగుస)",
          characterAction: "Colleague leaning over desk pointing discreetly behind Ravi's shoulder.",
          visualPrompt: "Two South Indian male colleagues talking at an IT office cubicle, one whispering with wide alert eyes pointing his thumb backward. Shallow depth of field reveals an out-of-focus stern boss standing behind, vertical 9:16 composition.",
          negativePrompt: "blur, artifact, bad anatomy, duplicate faces.",
        },
        {
          sceneId: 3,
          sceneNumber: "Scene 03",
          location: "క్యూబికల్ ఎంట్రన్స్ (Behind Ravi)",
          shotType: "Dynamic Whip Pan into Extreme Close-Up",
          cameraMovement: "Snap 180-degree rotation and zoom into eyes",
          lighting: "Dramatic spotlight comedy rim",
          atmosphere: "Hilarious shock and panic",
          durationSeconds: 13.5,
          dialogueTelugu: script.dialogueScenes[2].dialogueTelugu,
          emotion: "Terrified to Fake Smile (షాక్ నుండి నవ్వు)",
          characterAction: "Slow turnaround, jaw drops in terror, rapidly folds hands in respect with awkward plastic grin.",
          visualPrompt: "Dynamic comedy turnaround: young Telugu man's face shifting instantly from sheer petrified terror to a hilarious plastic respect smile with folded hands (Namaste), eye twitching, hyper-detailed facial expressions.",
          negativePrompt: "extra limbs, unnatural expressions, low resolution.",
        },
        {
          sceneId: 4,
          sceneNumber: "Scene 04",
          location: "మేనేజర్ క్లోజప్ & ముగింపు (Manager Deadpan Payoff)",
          shotType: "Low angle static close-up",
          cameraMovement: "Slow creeping push-in",
          lighting: "Moody shadow on manager's face",
          atmosphere: "Deadpan comic silence",
          durationSeconds: 11.0,
          dialogueTelugu: script.dialogueScenes[3].dialogueTelugu,
          emotion: "Deadpan Sarcasm (గంభీరమైన వ్యంగ్యం)",
          characterAction: "Boss calmly holding attendance sheet, raising one eyebrow with iconic Telugu comedic timing.",
          visualPrompt: "A 50-year-old South Indian corporate manager in spectacles and dark blazer staring deadpan at the camera with raised eyebrow, holding an attendance ledger, comic timing lighting, vertical 9:16 framing.",
          negativePrompt: "exaggerated cartoon, blur.",
        },
      ],
    };
  }

  static generateCharacterBible(): CharacterBibleArtifact {
    return {
      characters: [
        {
          id: "char-ravi-01",
          name: "రవి (Ravi)",
          gender: "Male",
          age: "26",
          appearance: "South Indian Telugu software engineer, trimmed beard, short black hair, expressive eyes.",
          clothing: "Navy blue checked formal shirt, dark trousers, brown leather wristwatch.",
          facialFeatures: "High eyebrows, mobile comedic facial flexibility, relatable everyday hero look.",
          voiceProfile: "Natural conversational Telugu (Youth tone, Hyderabad dialect hints).",
          referenceImages: ["/media/chars/ravi_front.webp", "/media/chars/ravi_profile.webp"],
        },
        {
          id: "char-boss-02",
          name: "రామారావు (Manager Rama Rao)",
          gender: "Male",
          age: "52",
          appearance: "Senior manager, silver-streaked hair, rimless spectacles, authoritative posture.",
          clothing: "Charcoal gray blazer over crisp white shirt, silver wristwatch.",
          facialFeatures: "Piercing direct gaze, calm deadpan expressions.",
          voiceProfile: "Deep dramatic Telugu (Bass resonance, authoritative boss register).",
          referenceImages: ["/media/chars/boss_front.webp"],
        },
      ],
      continuityRules: [
        "Ravi's blue checked shirt pattern must remain identical in color and button styling across all 4 scenes.",
        "Rama Rao's rimless spectacles and charcoal blazer must not morph between cuts.",
      ],
    };
  }

  static generateVideoClips(storyboard: StoryboardArtifact): VideoClipArtifact[] {
    return storyboard.scenes.map((s) => ({
      sceneId: s.sceneId,
      assetUrl: `/media/clips/scene_${s.sceneId}_master.mp4`,
      providerJobId: `gemini-veo-job-${s.sceneId}-${Date.now()}`,
      durationSeconds: s.durationSeconds,
      status: "ready",
    }));
  }

  static generateVoiceStems(script: TeluguScriptArtifact): VoiceStemArtifact[] {
    return script.dialogueScenes.map((d) => ({
      sceneId: d.sceneId,
      audioUrl: `/media/voice/scene_${d.sceneId}_voice_te.wav`,
      durationSeconds: 4.8,
      sampleRate: 48000,
      emotionTag: d.emotionCue,
      normalizedLufs: -14.2,
    }));
  }

  static generateMusicAndSFX(): MusicAndSFXArtifact {
    return {
      bgmAudioUrl: "/media/music/telugu_comedy_quirk_loop.mp3",
      bgmTitle: "Relatable Workplace Comedy BGM (Licensed)",
      licenseStatus: "commercial_royalty_free",
      duckingLevelDb: -22.5,
      sfxCues: [
        { timestamp: 0.1, name: "Footsteps Fast Rush", url: "/media/sfx/footsteps.mp3" },
        { timestamp: 20.5, name: "Dramatic Record Scratch / Silence", url: "/media/sfx/scratch.mp3" },
        { timestamp: 21.0, name: "Awkward Cricket Chirp", url: "/media/sfx/cricket.mp3" },
        { timestamp: 34.0, name: "Telugu Comedy Whistle Accent", url: "/media/sfx/punch.mp3" },
      ],
    };
  }

  static generateQCReport(): QCReportArtifact {
    return {
      passed: true,
      scorePercent: 98,
      checks: [
        { name: "Aspect Ratio & Resolution", passed: true, message: "1080x1920 (9:16) Vertical format valid." },
        { name: "Telugu Subtitle Glyph Accuracy", passed: true, message: "All Telugu vowel signs and conjuncts correctly shaped." },
        { name: "Audio Normalization", passed: true, message: "Dialogue -14 LUFS, Music ducked at -22.5 dB, 0 clipping." },
        { name: "Black Frames / Cut Stability", passed: true, message: "No frozen or drop frames between scene transitions." },
        { name: "Thumbnail Compliance", passed: true, message: "High contrast Telugu typography verified on 3 thumbnail concepts." },
        { name: "Commercial Licensing", passed: true, message: "All video, audio stems and music cleared for commercial monetization." },
      ],
      issues: [
        {
          severity: "info",
          category: "Framing",
          description: "Subtitle safe zone: Telugu text positioned 120px above bottom to avoid YouTube UI overlay.",
        },
      ],
    };
  }

  static generateThumbnails(): ThumbnailArtifact[] {
    return [
      {
        conceptName: "షాకింగ్ ఎక్స్‌ప్రెషన్ (Shock Face)",
        teluguHeadline: "ఆఫీస్ లేట్ ఎంట్రీ! బాస్ రియాక్షన్ చూడండి! 😂",
        thumbnailUrl: "/media/thumbnails/thumb_concept_1.webp",
        contrastScore: 94,
      },
      {
        conceptName: "బాస్ వార్నింగ్ లుక్ (Boss Stare)",
        teluguHeadline: "ట్రాఫిక్ బాగుంది రవి... రేపటినుంచి లీవ్ కావాలా? 😱",
        thumbnailUrl: "/media/thumbnails/thumb_concept_2.webp",
        contrastScore: 92,
      },
      {
        conceptName: "ఫేక్ నమస్తే స్మైల్ (Awkward Smile)",
        teluguHeadline: "బాస్ వెనకాలే ఉంటే పరిస్థితి ఏంటి? 😂",
        thumbnailUrl: "/media/thumbnails/thumb_concept_3.webp",
        contrastScore: 96,
      },
    ];
  }

  static generatePublishingMetadata(script: TeluguScriptArtifact): PublishingMetadataArtifact {
    return {
      youtubeTitle: "ఆఫీస్ లేట్ ఎంట్రీ ఫన్నీ సీన్! 😂 బాస్ వెనకాలే ఉంటే పరిస్థితి ఏంటి? #Shorts #TeluguComedy",
      youtubeDescription: `${script.fullTeluguText}\n\nఆఫీస్ లో మీతో కూడా ఇలాంటి ఫన్నీ సంఘటనలు జరిగాయా? కామెంట్ చేయండి!\nమరిన్ని వినోదాత్మక తెలుగు రీల్స్ & షార్ట్స్ కోసం ఇప్పుడే సబ్స్క్రైబ్ చేసుకోండి!\n\n#TeluguShorts #TeluguComedy #OfficeMemes #SirStudio #TeluguHumor`,
      tags: ["Telugu Comedy", "Office Humor Telugu", "Telugu Shorts", "Funny Telugu Dialogue", "Telugu Reels", "Hyderabad IT"],
      pinnedComment: "మీ ఆఫీస్ లో కూడా ఇలా జరిగిందా? కామెంట్ చేయండి! సబ్స్క్రైబ్ చేయడం మర్చిపోకండి 👇",
      category: "23", // Comedy
      privacy: "public",
    };
  }
}

