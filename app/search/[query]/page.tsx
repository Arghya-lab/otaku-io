import InfiniteSearchScroll from "./InfiniteSearchScroll";
import { getSearchData } from "@/services/getAnime";

async function SearchPage({ params }: { params: { query: string } }) {
  const { hasNextPage, results: initialData } = await getSearchData(
    params.query
  );

  return (
    <InfiniteSearchScroll
      query={params.query}
      initialData={initialData}
      hasNextPage={!!hasNextPage}
    />
  );
}

export default SearchPage;
