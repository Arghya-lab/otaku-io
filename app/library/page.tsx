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
        <p className="font-poppins text-lg text-gray-100 text-center pt-8">
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

  const { results, hasNextPage } = await getAnimesByIds(bookmarkAnimeIds);

  return (
    <>
      <h2 className="py-3 pl-8 xs:pl-28 text-2xl capitalize text-neutral-900 dark:text-slate-100">
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
