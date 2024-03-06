import Filter from "@/app/discover/Filter";
import InfiniteDiscoverScroll from "@/app/discover/InfiniteDiscoverScroll";
import SideNavbar from "@/components/SideNavbar";
import { advancedSearch } from "@/services/getAnime";

async function DiscoverPage({
  searchParams,
}: {
  searchParams: {
    format: string | undefined;
    genres: string | undefined;
    sort: string | undefined;
    status: string | undefined;
  };
}) {
  const { results, hasNextPage } = await advancedSearch({
    format: searchParams?.format,
    genres: searchParams?.genres,
    sort: searchParams?.sort,
    status: searchParams?.status,
  });  

  return (
    <div className="h-full relative">
      <SideNavbar pathName="discover" />
      <main className="xs:pl-20 pt-24 flex flex-row">
        {/* Selectable input container */}
        <Filter />
        {/* Meta items container */}
        <InfiniteDiscoverScroll
          initialData={results}
          hasNextPage={hasNextPage}
        />
      </main>
    </div>
  );
}

export default DiscoverPage;
