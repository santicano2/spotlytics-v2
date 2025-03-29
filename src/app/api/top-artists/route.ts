import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Asegúrate de importar bien

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const timeRange = searchParams.get("time_range") || "short_term"; // Default: 6 meses

  const response = await fetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}`,
    {
      headers: { Authorization: `Bearer ${session.accessToken}` },
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
