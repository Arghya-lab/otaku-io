import SideNavbar from "@/components/SideNavbar";
import TopNavbar from "@/components/TopNavbar";
import { getUserBookmarkAnime } from "@/services/getUserBookmarkAnimeIds";
import InfiniteLibraryScroll from "./InfiniteLibraryScroll";
import { getAnimesByIds } from "@/services/getAnimesByIds";

async function HistoryPage() {
  const bookmarkAnimeIds = await getUserBookmarkAnime();

  if (!bookmarkAnimeIds) {
    return <p>you are not login</p>;
  }

  const { results, hasNextPage } = await getAnimesByIds(bookmarkAnimeIds);

  return (
    <>
      <TopNavbar />
      <div className="h-full relative">
        <SideNavbar pathName="/library" />
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
      </div>
    </>
  );
}

export default HistoryPage;
