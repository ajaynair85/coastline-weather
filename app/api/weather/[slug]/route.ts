import { NextResponse } from "next/server";
import { getBeach } from "@/lib/beaches";
import { getBeachWeather } from "@/lib/weather";

export const revalidate = 900;

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const beach = getBeach((await params).slug);
  if (!beach) return NextResponse.json({ error: "Beach not found" }, { status: 404 });
  try {
    return NextResponse.json(await getBeachWeather(beach));
  } catch {
    return NextResponse.json({ error: "Live weather is temporarily unavailable" }, { status: 503 });
  }
}
