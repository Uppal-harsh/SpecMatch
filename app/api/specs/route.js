import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const device = searchParams.get("device");
  
  console.log("[RapidAPI Mock] Fetching specs for:", device);

  // TODO: Backend Team - Integrate RapidAPI Device Specs here
  return NextResponse.json({
    success: true,
    specs: {
      display: "6.7 inch OLED",
      processor: "Mockdragon 8",
      battery: "5000mAh",
      camera: "108MP Main"
    }
  });
}
