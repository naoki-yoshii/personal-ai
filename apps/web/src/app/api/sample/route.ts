import { NextResponse } from "next/server";
import { makeCitation } from "@personal/shared";

export async function GET() {
  const c = makeCitation({
    title: "Example",
    url: "https://example.com",
    snippet: "Hello from shared!"
  });
  return NextResponse.json({ ok: true, sample: c });
}
