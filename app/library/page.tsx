"use server";

import { getUserTheme } from "@/app/layout";
import { getAnimesByIds } from "@/services/getAnimesByIds";
import { getUserBookmarkAnime } from "@/services/getUserBookmarkAnimeIds";
import { LogIn } from "lucide-react";
import Link from "next/link";
import InfiniteLibraryScroll from "./InfiniteLibraryScroll";

async function HistoryPage() {
  const bookmarkAnimeIds = await getUserBookmarkAnime();
  const theme = await getUserTheme();

  if (!bookmarkAnimeIds) {
    return (
      <>
        <p
          className="pt-8 text-center font-poppins text-lg"
          style={{ color: theme.textColor }}
        >
          You are not login
        </p>
        <div className="flex items-center justify-center gap-2">
          <LogIn size={16} style={{ color: theme.secondaryColor }} />
          <Link
            href="/api/auth/signin?callbackUrl=/library"
            className="font-nunito hover:underline"
            style={{ color: theme.secondaryColor }}
          >
            click here to login
          </Link>
        </div>
      </>
    );
  }

  const perPageResult = 20;
  const results = await getAnimesByIds(
    bookmarkAnimeIds.slice(0, perPageResult)
  );
  const hasNextPage = bookmarkAnimeIds.length >= perPageResult;

  return (
    <>
      <h2
        className="py-3 pl-8 text-2xl capitalize xs:pl-28"
        style={{ color: theme.textColor }}
      >
        library
      </h2>
      <main className="flex flex-row xs:pl-20">
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
