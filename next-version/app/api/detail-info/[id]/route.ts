import { getDetailInfo } from "@/services/getAnime";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const isDub = req.nextUrl.searchParams.get("dub") === "true" ? true : false;

  try {
    return NextResponse.json(await getDetailInfo(id, isDub), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }); // Return error response
  }
}
