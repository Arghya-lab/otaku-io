"use server"

import Link from "next/link";
import { LogIn } from "lucide-react";
import { getUserBookmarkAnime } from "@/services/getUserBookmarkAnimeIds";
import { getAnimesByIds } from "@/services/getAnimesByIds";
import { getUserTheme } from "@/app/layout";
import InfiniteLibraryScroll from "./InfiniteLibraryScroll";

async function HistoryPage() {
  const bookmarkAnimeIds = await getUserBookmarkAnime();
  const theme = await getUserTheme();

  if (!bookmarkAnimeIds) {
    return (
      <>
        <p
          className="font-poppins text-lg text-center pt-8"
          style={{ color: theme.textColor }}>
          You are not login
        </p>
        <div className="flex items-center justify-center gap-2">
          <LogIn size={16} style={{ color: theme.secondaryColor }} />
          <Link
            href="/api/auth/signin?callbackUrl=/library"
            className="hover:underline font-nunito"
            style={{ color: theme.secondaryColor }}>
            click here to login
          </Link>
        </div>
      </>
    );
  }

  const perPageResult = 20;
  const results = await getAnimesByIds(bookmarkAnimeIds.slice(0, perPageResult));
  const hasNextPage = bookmarkAnimeIds.length >= perPageResult;

  return (
    <>
      <h2
        className="py-3 pl-8 xs:pl-28 text-2xl capitalize"
        style={{ color: theme.textColor }}>
        library
      </h2>
      <main className="xs:pl-20 flex flex-row">
        {/* Meta items container */}
        <InfiniteLibraryScroll
          initialData={results}
          hasNextPage={hasNextPage}
          perPage={perPageResult}
        />
      </main>
    </>
  );
}

export default HistoryPage;
