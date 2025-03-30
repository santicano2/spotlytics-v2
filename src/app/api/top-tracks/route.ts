import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Obtiene el token desde las cookies de NextAuth
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token?.accessToken) {
    return NextResponse.json({ error: "Unauthorized", token }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const timeRange = searchParams.get("time_range") || "short_term";

  const response = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`,
    {
      headers: { Authorization: `Bearer ${token.accessToken}` },
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
