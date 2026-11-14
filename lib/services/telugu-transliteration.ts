export interface TransliterationMapping {
  english: string;
  telugu: string;
}

const COMMON_DICTIONARY: Record<string, string> = {
  namaskaram: "నమస్కారం",
  namaste: "నమస్తే",
  bagunnara: "బాగున్నారా",
  sankranti: "సంక్రాంతి",
  panduga: "పండుగ",
  godavari: "గోదావరి",
  hyderabad: "హైదరాబాద్",
  cyberabad: "సైబరాబాద్",
  cinema: "సినిమా",
  tollywood: "టాలీవుడ్",
  katha: "కథ",
  rahasyam: "రహస్యం",
  amma: "అమ్మ",
  nanna: "నాన్న",
  tatha: "తాత",
  bamma: "బామ్మ",
  palletooru: "పల్లెటూరు",
  polam: "పొలం",
  panta: "పంట",
  raithu: "రైతు",
  sneham: "స్నేహం",
  prema: "ప్రేమ",
  bhayam: "భయం",
  aashcharyam: "ఆశ్చర్యం",
  santhosham: "సంతోషం",
  badha: "బాధ",
  kanniru: "కన్నీరు",
  dhanyavadalu: "ధన్యవాదాలు",
  subhakankshalu: "శుభాకాంక్షలు",
  anandam: "ఆనందం",
  samayam: "సమయం",
  udayam: "ఉదయం",
  sainthram: "సాయంత్రం",
  ratri: "రాత్రి",
};

export type TeluguDialect = "standard" | "godavari" | "telangana" | "rayalaseema";

export interface DialectVocabulary {
  dialect: TeluguDialect;
  name: string;
  description: string;
  idioms: { phrase: string; standardMeaning: string; tone: string }[];
}

export const TELUGU_DIALECTS: DialectVocabulary[] = [
  {
    dialect: "standard",
    name: "Standard Colloquial (ప్రామాణిక తెలుగు)",
    description: "Neutral broadcasting Telugu suitable for statewide audiences and formal narratives.",
    idioms: [
      { phrase: "ఏమిటి సంగతులు?", standardMeaning: "What is happening?", tone: "Friendly" },
      { phrase: "చాలా బాగుంది", standardMeaning: "It is very good", tone: "Appreciative" },
      { phrase: "త్వరగా రండి", standardMeaning: "Come quickly", tone: "Urgent" },
    ],
  },
  {
    dialect: "godavari",
    name: "Godavari Accent (గోదావరి యాస)",
    description: "Warm, respectful, musical cadence famous for 'అండి', hospitality, and rich storytelling flavor.",
    idioms: [
      { phrase: "ఏవండీ వింటున్నారా?", standardMeaning: "Are you listening?", tone: "Affectionate Respect" },
      { phrase: "మహా బాగుందండి బాబూ!", standardMeaning: "It is extraordinarily wonderful!", tone: "High Enthusiasm" },
      { phrase: "కాస్త మర్యాదగా ఉండండీ", standardMeaning: "Please be courteous", tone: "Gentle Humor" },
    ],
  },
  {
    dialect: "telangana",
    name: "Telangana / Cyberabad Accent (తెలంగాణ యాస)",
    description: "Punchy, dynamic, modern urban and rural energy ideal for fast-paced dialogues and action thrillers.",
    idioms: [
      { phrase: "గిట్ల ఉంటది మనతోని!", standardMeaning: "This is how we roll!", tone: "Swag / Mass" },
      { phrase: "ఏం జేత్తున్నవ్ భై?", standardMeaning: "What are you doing brother?", tone: "Casual Street" },
      { phrase: "దూకుడు మామూలుగా ఉండదు", standardMeaning: "The momentum is unstoppable", tone: "High Intensity" },
    ],
  },
  {
    dialect: "rayalaseema",
    name: "Rayalaseema Dialect (రాయలసీమ యాస)",
    description: "Deep, powerful, rugged emotional cadence perfect for high-stakes drama and heroic resilience.",
    idioms: [
      { phrase: "మాట్లాడితే లెక్క తేలాల!", standardMeaning: "When we speak, truth must settle!", tone: "Authoritative" },
      { phrase: "ఏం నాయనా, అంతా కులాసాయేనా?", standardMeaning: "How are you son, all is well?", tone: "Elder Affection" },
      { phrase: "రక్తం మరిగిపోతాంది", standardMeaning: "Blood is boiling", tone: "Fierce Emotion" },
    ],
  },
];

export class TeluguTransliterationService {
  /**
   * Transliterates English phonetic Roman script into Telugu Unicode
   */
  public static transliterate(input: string): string {
    if (!input) return "";

    const words = input.split(/\b/);
    const result = words.map((w) => {
      const lower = w.toLowerCase().trim();
      if (COMMON_DICTIONARY[lower]) {
        return COMMON_DICTIONARY[lower];
      }
      return w;
    });

    return result.join("");
  }

  /**
   * Adapts standard dialogue into a specific regional Telugu dialect
   */
  public static adaptToDialect(text: string, dialect: TeluguDialect): string {
    if (dialect === "standard") return text;

    if (dialect === "godavari") {
      return text
        .replace(/బాగుంది/g, "భలే బాగుందండి బాబూ")
        .replace(/ఏమిటి/g, "ఏటండీ")
        .replace(/ఎక్కడికి/g, "ఎక్కడికండీ")
        .replace(/వచ్చారా/g, "వచ్చారా అండి");
    }

    if (dialect === "telangana") {
      return text
        .replace(/ఏమిటి/g, "ఏంది")
        .replace(/ఎలా ఉన్నారు/g, "ఎట్లున్నారు భై")
        .replace(/చేస్తున్నాను/g, "జేత్తున్న")
        .replace(/వెళ్దాం/g, "పోదాం పా");
    }

    if (dialect === "rayalaseema") {
      return text
        .replace(/బాగున్నారా/g, "కులాసాయేనా నాయనా")
        .replace(/ఏమిటి/g, "ఏమబ్బా")
        .replace(/వెళ్ళాలి/g, "పోవాలప్ప");
    }

    return text;
  }
}

