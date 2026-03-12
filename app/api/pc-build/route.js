import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("[Claude Mock] Generating PC Build for:", body.answers);
    
    // TODO: Backend Team - Integrate Claude Sonnet 3.5 API here using ANTHROPIC_API_KEY
    return NextResponse.json({
      success: true,
      build: {
        total: 82500,
        parts: [
          { type: "CPU", name: "AMD Ryzen 5 7600X", price: 18999, link: "#mock" },
          { type: "GPU", name: "Nvidia RTX 4060", price: 32999, link: "#mock" }
        ],
        upgrade: {
          cost: 10000,
          part: "GPU",
          to: "RTX 4060 Ti",
          benefit: "+28% gaming performance"
        }
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
