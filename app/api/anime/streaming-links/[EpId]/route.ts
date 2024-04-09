import { getStreamingLinks } from "@/services/getAnime";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { EpId: string } }
) {
  try {
    const data = await getStreamingLinks(params.EpId);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    ); // Return error response
  }
}
