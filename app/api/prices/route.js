import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("query");
  
  console.log("[SerpAPI Mock] Fetching prices for:", q);

  // TODO: Backend Team - Integrate SerpAPI Google Shopping here
  return NextResponse.json({
    success: true,
    prices: [
      { name: "Amazon", price: 54999, rating: 4.5, link: "#mock" },
      { name: "Flipkart", price: 55999, rating: 4.4, link: "#mock" },
      { name: "Croma", price: 56999, rating: 4.8, link: "#mock" }
    ]
  });
}
