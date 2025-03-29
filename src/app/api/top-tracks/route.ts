import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get("accessToken");
  const timeRange = searchParams.get("timeRange") || "short_term"; // default to 6 months

  if (!accessToken) {
    return NextResponse.json(
      { error: "No access token provided" },
      { status: 400 }
    );
  }

  const response = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch top tracks" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
