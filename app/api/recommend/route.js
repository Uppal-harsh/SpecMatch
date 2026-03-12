import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("[Claude Mock] Generating recommendation for:", body.category);
    
    // TODO: Backend Team - Integrate Claude Sonnet 3.5 API here using ANTHROPIC_API_KEY
    return NextResponse.json({
      success: true,
      recommendations: [
        {
          name: "Mocked Top Choice",
          brand: "SpecBrand",
          matchScore: 98,
          whyThisDevice: "This is a placeholder from the frontend team. Connect Claude here to generate real insights based on the wizardAnswers JSON.",
          specs: ["Awesome Spec A", "Incredible Battery B", "Stunning Display C"]
        }
      ]
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
