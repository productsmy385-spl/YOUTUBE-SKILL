export interface MusicTrackItem {
  id: string;
  title: string;
  genre: string;
  mood: "comedy" | "emotional" | "motivational" | "devotional" | "suspense";
  tempoBpm: number;
  durationSeconds: number;
  audioUrl: string;
  licenseType: "commercial_royalty_free";
  recommendedDuckingDb: number;
}

export const LICENSED_STUDIO_MUSIC: MusicTrackItem[] = [
  {
    id: "bgm-comedy-01",
    title: "Telugu Workplace Comic Bounce (తెలుగు హాస్య లయ)",
    genre: "Comedy / Acoustic",
    mood: "comedy",
    tempoBpm: 120,
    durationSeconds: 180,
    audioUrl: "/media/music/telugu_comedy_quirk_loop.mp3",
    licenseType: "commercial_royalty_free",
    recommendedDuckingDb: -22.0,
  },
  {
    id: "bgm-emotion-02",
    title: "Mother's Love Veena & Piano (అమ్మ ప్రేమ వీణ)",
    genre: "Emotional / Indian Classical Fusion",
    mood: "emotional",
    tempoBpm: 75,
    durationSeconds: 240,
    audioUrl: "/media/music/telugu_emotional_veena.mp3",
    licenseType: "commercial_royalty_free",
    recommendedDuckingDb: -24.0,
  },
  {
    id: "bgm-mass-03",
    title: "Mass Dholak Telugu Heroic Anthem (మాస్ స్పూర్తి)",
    genre: "Mass / Motivational Drums",
    mood: "motivational",
    tempoBpm: 135,
    durationSeconds: 195,
    audioUrl: "/media/music/telugu_mass_dholak.mp3",
    licenseType: "commercial_royalty_free",
    recommendedDuckingDb: -20.0,
  },
  {
    id: "bgm-devotion-04",
    title: "Temple Chants & Flute Ambience (భక్తి నాదం)",
    genre: "Devotional / Flute Ambience",
    mood: "devotional",
    tempoBpm: 68,
    durationSeconds: 300,
    audioUrl: "/media/music/temple_flute_bgm.mp3",
    licenseType: "commercial_royalty_free",
    recommendedDuckingDb: -25.0,
  },
];

export function selectMusicForMood(mood: string): MusicTrackItem {
  const match = LICENSED_STUDIO_MUSIC.find((m) => m.mood === mood);
  return match || LICENSED_STUDIO_MUSIC[0];
}

