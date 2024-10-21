import { advancedSearch } from "@/services/getAnime";
import { Suspense } from "react";
import InfiniteDiscoverScroll from "./InfiniteDiscoverScroll";

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
  const format = searchParams?.format;
  const genres = searchParams?.genres
    ? JSON.stringify([searchParams.genres])
    : undefined;
  const sort = searchParams?.sort
    ? JSON.stringify([searchParams.sort])
    : undefined;
  const status = searchParams?.status;
  const perPage = 30;

  const { results, hasNextPage } = await advancedSearch({
    format,
    genres,
    sort,
    status,
    perPage,
  });

  return (
    <Suspense>
      <InfiniteDiscoverScroll
        initialData={results}
        hasNextPage={!!hasNextPage}
        initialFormat={format}
        initialGenres={genres}
        initialSort={sort}
        initialStatus={status}
      />
    </Suspense>
  );
}

export default DiscoverPage;
