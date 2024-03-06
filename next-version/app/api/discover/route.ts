import { advancedSearch } from "@/services/getAnime";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") ?? undefined;
  const page =
    parseInt(req.nextUrl.searchParams.get("page") ?? "", 10) ?? undefined;
  const perPage =
    parseInt(req.nextUrl.searchParams.get("perPage") ?? "", 10) ?? undefined;
  const type = req.nextUrl.searchParams.get("type") ?? undefined;
  const genres = req.nextUrl.searchParams.get("genres") ?? undefined;
  const id = req.nextUrl.searchParams.get("id") ?? undefined;
  const format = req.nextUrl.searchParams.get("format") ?? undefined;
  const sort = req.nextUrl.searchParams.get("sort") ?? undefined;
  const status = req.nextUrl.searchParams.get("status") ?? undefined;
  const year =
    parseInt(req.nextUrl.searchParams.get("year") ?? "", 10) ?? undefined;
  const season = req.nextUrl.searchParams.get("query") ?? undefined;
  try {
    const data = await advancedSearch({
      query,
      page,
      perPage,
      type,
      genres,
      id,
      format,
      sort,
      status,
      year,
      season,
    });
    return NextResponse.json(data); // Return JSON data
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }); // Return error response
  }
}
