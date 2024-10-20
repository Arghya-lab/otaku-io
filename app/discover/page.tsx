import { advancedSearch } from "@/services/getAnime";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import InfiniteDiscoverScroll so that it runs only on the client
const InfiniteDiscoverScroll = dynamic(
  () => import("@/app/discover/InfiniteDiscoverScroll"),
  {
    ssr: false, // Disable SSR for this component
  }
);

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
    perPage: 30,
  });

  return (
    <Suspense>
      <InfiniteDiscoverScroll
        initialData={results}
        hasNextPage={!!hasNextPage}
        initialFormat={searchParams?.format}
        initialGenres={searchParams?.genres}
        initialSort={searchParams?.sort}
        initialStatus={searchParams?.status}
      />
    </Suspense>
  );
}

export default DiscoverPage;
