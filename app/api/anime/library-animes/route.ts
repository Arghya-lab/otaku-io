import { NextRequest, NextResponse } from "next/server";
import { getAnimesByIds } from "@/services/getAnimesByIds";
import { getUserBookmarkAnime } from "@/services/getUserBookmarkAnimeIds";
import connectDB from "@/db/db";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const pageNo = Number(url.searchParams.get("pageNo")) || 1;
    let perPage = Number(url.searchParams.get("perPage")) || 20;
    if (perPage > 20) perPage = 20;

    const bookmarkAnimeIds = await getUserBookmarkAnime();
    if (!bookmarkAnimeIds) {
      return NextResponse.json(
        { error: "UNauthorize access." },
        { status: 400 }
      );
    }

    const results = await getAnimesByIds(
      bookmarkAnimeIds.slice((pageNo - 1) * perPage, pageNo * perPage)
    );
    const hasNextPage = bookmarkAnimeIds.length > pageNo * perPage;

    return NextResponse.json(
      { results, hasNextPage, currentPage: pageNo },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    ); // Return error response
  }
}
