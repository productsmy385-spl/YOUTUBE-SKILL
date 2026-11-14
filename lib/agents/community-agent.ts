export interface YouTubeComment {
  id: string;
  authorName: string;
  authorProfileUrl: string;
  publishedAt: string;
  text: string;
  likeCount: number;
  sentiment: "heartwarming" | "curious" | "critical" | "spam";
  sentimentScore: number; // -1.0 to 1.0
  recommendedAction: "pin" | "reply" | "like" | "hide";
  suggestedTeluguReply: string;
  replied: boolean;
}

export class CommunityManagerAgent {
  /**
   * Evaluates incoming YouTube comments and drafts colloquial Telugu responses
   */
  public static evaluateComments(comments: { id: string; author: string; text: string; likes: number }[]): YouTubeComment[] {
    return comments.map((c) => {
      let sentiment: "heartwarming" | "curious" | "critical" | "spam" = "heartwarming";
      let sentimentScore = 0.85;
      let recommendedAction: "pin" | "reply" | "like" | "hide" = "reply";
      let reply = "మీ అభిమానానికి చాలా ధన్యవాదాలు అండి! ❤️🌾";

      const textLower = c.text.toLowerCase();

      if (textLower.includes("next part") || textLower.includes("ఎప్పుడు") || textLower.includes("part 2") || textLower.includes("episode 2")) {
        sentiment = "curious";
        sentimentScore = 0.9;
        recommendedAction = "reply";
        reply = "తప్పకుండా అండి! ఎపిసోడ్ 2 పనులు శరవేగంగా జరుగుతున్నాయి. వచ్చే ఆదివారం సాయంత్రం 6 గంటలకు విడుదల కానుంది. సబ్‌స్క్రైబ్ చేసుకుని ఉండండి! ✨🎬";
      } else if (textLower.includes("kallallo neellu") || textLower.includes("కన్నీరు") || textLower.includes("బామ్మ") || textLower.includes("మా ఊరు")) {
        sentiment = "heartwarming";
        sentimentScore = 0.98;
        recommendedAction = "pin";
        reply = "మీ మాటలు మా హృదయాన్ని తాకాయి అండి. మన సంస్కృతిని, పల్లె ప్రేమానుబంధాలను ఇలాగే కాపాడుకుందాం. సర్ సినిమాస్ తరపున మీకు ప్రత్యేక ధన్యవాదాలు! ❤️🌾";
      } else if (textLower.includes("sound") || textLower.includes("music") || textLower.includes("వాయిస్")) {
        sentiment = "curious";
        sentimentScore = 0.75;
        recommendedAction = "reply";
        reply = "మీ అమూల్యమైన సూచనకు ధన్యవాదాలు అండి! మా సౌండ్ డిజైన్ టీమ్ దీనిపై మరింత శ్రద్ధ పెడుతుంది. 🙏🎧";
      }

      return {
        id: c.id,
        authorName: c.author,
        authorProfileUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
        publishedAt: "2 hours ago",
        text: c.text,
        likeCount: c.likes,
        sentiment,
        sentimentScore,
        recommendedAction,
        suggestedTeluguReply: reply,
        replied: false,
      };
    });
  }
}

