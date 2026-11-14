import { NextResponse } from "next/server";
import { CommunityManagerAgent } from "@/lib/agents/community-agent";

export async function GET() {
  const sampleComments = [
    {
      id: "c_01",
      author: "Venkatesh Naidu (విశాఖపట్నం)",
      text: "గోదావరి జ్ఞాపకాలు చూస్తుంటే కళ్ళల్లో నీళ్ళు తిరిగాయి బాస్... మా బామ్మ గుర్తొచ్చింది ❤️🌾",
      likes: 428,
    },
    {
      id: "c_02",
      author: "Anitha Reddy (Hyderabad)",
      text: "Super cinematography and emotion! Next part epudu release chestharu bro? Waiting eagerly!",
      likes: 194,
    },
    {
      id: "c_03",
      author: "Kalyan Ram (Vijayawada)",
      text: "Voice modulation is amazing, natural Telugu sound design is top notch!",
      likes: 86,
    },
    {
      id: "c_04",
      author: "Tollywood Fan",
      text: "Subscribe to my channel for more free movie updates and links 100% real",
      likes: 2,
    },
  ];

  const analyzed = CommunityManagerAgent.evaluateComments(sampleComments);
  return NextResponse.json({
    status: "SUCCESS",
    totalComments: analyzed.length,
    comments: analyzed,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { comments = [] } = body;

    const analyzed = CommunityManagerAgent.evaluateComments(comments);
    return NextResponse.json({
      status: "SUCCESS",
      comments: analyzed,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to analyze comments" },
      { status: 500 }
    );
  }
}

