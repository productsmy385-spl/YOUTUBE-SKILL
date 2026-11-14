export interface TitleVariant {
  id: string;
  strategy: "Curiosity Hook" | "Emotional Appeal" | "Mass Drama" | "Search SEO";
  title: string;
  teluguTitle: string;
  predictedCtrPercent: number;
  reasoning: string;
}

export interface KeywordRecommendation {
  tag: string;
  teluguTag: string;
  searchVolumeMonthly: string;
  competition: "Low" | "Medium" | "High";
  trendMultiplier: number;
}

export interface VideoChapter {
  timestamp: string;
  seconds: number;
  title: string;
  teluguTitle: string;
}

export interface CtrPredictionFactors {
  hasFaceCloseup: boolean;
  facialExpressionEmotion: "smiling" | "crying" | "shocked" | "intense" | "neutral";
  textWordsCount: number;
  textContrastRatio: number;
  dominantColorSaturation: number;
  brandWatermarkPresent: boolean;
}

export class YouTubeGrowthEngine {
  /**
   * Generates strategic bilingual title variants for A/B testing
   */
  public static generateTitleVariants(baseConcept: string, format: "Shorts" | "Long"): TitleVariant[] {
    const isShorts = format === "Shorts";

    return [
      {
        id: "var_curiosity",
        strategy: "Curiosity Hook",
        title: `You Won't Believe What Happened in Godavari! ${isShorts ? "#Shorts" : ""}`,
        teluguTitle: `ఈ నిజం తెలిస్తే ఎవరైనా ఆశ్చర్యపోవాల్సిందే! ${isShorts ? "#Shorts" : ""}`,
        predictedCtrPercent: 12.4,
        reasoning: "High information gap triggers immediate thumb-stopping curiosity in Telugu mobile feeds.",
      },
      {
        id: "var_emotional",
        strategy: "Emotional Appeal",
        title: `The Story That Touched Millions of Telugu Hearts ${isShorts ? "#Shorts" : ""}`,
        teluguTitle: `కన్నీరు పెట్టించే పల్లెటూరి ప్రేమాభిమానాలు ❤️ ${isShorts ? "#Shorts" : ""}`,
        predictedCtrPercent: 11.2,
        reasoning: "Emotional sentiment drives high shareability on WhatsApp groups and Facebook among family demographics.",
      },
      {
        id: "var_mass",
        strategy: "Mass Drama",
        title: `Unstoppable Midnight Mystery in Cyberabad ${isShorts ? "#Shorts" : ""}`,
        teluguTitle: `అర్ధరాత్రి వేళ మొదలైన దడ పుట్టించే వేట ⚡`,
        predictedCtrPercent: 10.8,
        reasoning: "High-voltage action vocabulary appeals heavily to youth (18-24) demographic in Hyderabad and Vizag.",
      },
      {
        id: "var_seo",
        strategy: "Search SEO",
        title: `Telugu Village Life & Sankranti Festive Traditions | 4K Cinematic`,
        teluguTitle: `సంక్రాంతి పండుగ సాంప్రదాయాలు & పల్లె శోభ | తెలుగు కథలు`,
        predictedCtrPercent: 9.6,
        reasoning: "Optimized for evergreen search traffic and Google/YouTube search indexing algorithms.",
      },
    ];
  }

  /**
   * Explores high-volume Telugu and Tollywood tags
   */
  public static exploreKeywords(topic: string): KeywordRecommendation[] {
    return [
      {
        tag: "#TeluguStories",
        teluguTag: "#తెలుగుకథలు",
        searchVolumeMonthly: "1.2M",
        competition: "Medium",
        trendMultiplier: 1.45,
      },
      {
        tag: "#TollywoodCinematics",
        teluguTag: "#టాలీవుడ్",
        searchVolumeMonthly: "3.4M",
        competition: "High",
        trendMultiplier: 1.82,
      },
      {
        tag: "#GodavariLife",
        teluguTag: "#గోదావరిముచ్చట్లు",
        searchVolumeMonthly: "480K",
        competition: "Low",
        trendMultiplier: 1.6,
      },
      {
        tag: "#TeluguShorts",
        teluguTag: "#తెలుగుషార్ట్స్",
        searchVolumeMonthly: "4.8M",
        competition: "High",
        trendMultiplier: 2.1,
      },
      {
        tag: "#AICinemaTelugu",
        teluguTag: "#ఏఐసినిమా",
        searchVolumeMonthly: "290K",
        competition: "Low",
        trendMultiplier: 3.4,
      },
    ];
  }

  /**
   * Computes predicted CTR based on computer vision heuristics
   */
  public static predictCtrScore(factors: CtrPredictionFactors): {
    score: number;
    grade: "S-Tier" | "A-Tier" | "B-Tier" | "C-Tier";
    recommendations: string[];
  } {
    let base = 5.0;
    const recommendations: string[] = [];

    if (factors.hasFaceCloseup) {
      base += 3.2;
    } else {
      recommendations.push("Include a high-contrast character face close-up to boost CTR by ~3.2%");
    }

    if (factors.facialExpressionEmotion === "shocked" || factors.facialExpressionEmotion === "crying") {
      base += 2.8;
    } else if (factors.facialExpressionEmotion === "smiling") {
      base += 1.6;
    } else {
      recommendations.push("Amplify emotional facial expression (tears, intense surprise, or broad joy).");
    }

    if (factors.textWordsCount >= 2 && factors.textWordsCount <= 4) {
      base += 1.5;
    } else if (factors.textWordsCount > 6) {
      base -= 1.2;
      recommendations.push("Reduce text overlay to 2-4 punchy Telugu words for mobile readability.");
    }

    if (factors.textContrastRatio >= 4.5) {
      base += 1.0;
    } else {
      recommendations.push("Increase text stroke outline (black stroke on yellow or white text).");
    }

    const finalScore = Math.min(15.0, Math.max(2.0, parseFloat(base.toFixed(1))));

    let grade: "S-Tier" | "A-Tier" | "B-Tier" | "C-Tier" = "B-Tier";
    if (finalScore >= 11.0) grade = "S-Tier";
    else if (finalScore >= 9.0) grade = "A-Tier";
    else if (finalScore >= 6.0) grade = "B-Tier";
    else grade = "C-Tier";

    return {
      score: finalScore,
      grade,
      recommendations,
    };
  }

  /**
   * Formats automatic video chapters
   */
  public static formatChaptersText(chapters: VideoChapter[]): string {
    return (
      "⏱️ Video Chapters:\n" +
      chapters
        .map((c) => `${c.timestamp} - ${c.teluguTitle} (${c.title})`)
        .join("\n")
    );
  }
}

