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

  const results = await getAnimesByIds(bookmarkAnimeIds.slice(0, 20));
  const hasNextPage = bookmarkAnimeIds.length >= 20;

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
          bookmarkAnimeIds={bookmarkAnimeIds}
          initialData={results}
          hasNextPage={hasNextPage}
        />
      </main>
    </>
  );
}

export default HistoryPage;
