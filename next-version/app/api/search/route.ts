import { NextRequest, NextResponse } from "next/server";
import { getSearchData } from "@/services/getAnime";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || "";
  const page = parseInt(req.nextUrl.searchParams.get("page") ?? "", 10) || 1;
  const perPage =
    parseInt(req.nextUrl.searchParams.get("perPage") ?? "", 10) || 30;

  try {
    return NextResponse.json(await getSearchData(query, page, perPage), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }); // Return error response
  }
}
