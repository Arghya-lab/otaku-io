import Filter from "@/app/discover/Filter";
import InfiniteDiscoverScroll from "@/app/discover/InfiniteDiscoverScroll";
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
    <>
      {/* Selectable input container */}
      <Filter />
      {/* <div className="px-2 xxs:px-4"> */}
        <InfiniteDiscoverScroll
          initialData={results}
          hasNextPage={!!hasNextPage}
        />
      {/* </div> */}
    </>
  );
}

export default DiscoverPage;
