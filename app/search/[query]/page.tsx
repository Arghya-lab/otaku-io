import { getSearchData } from "@/services/getAnime";
import InfiniteSearchScroll from "./InfiniteSearchScroll";

async function SearchPage({ params }: { params: { query: string } }) {
  const { hasNextPage, results: initialData } = await getSearchData({
    query: params.query,
  });

  return (
    <InfiniteSearchScroll
      query={params.query}
      initialData={initialData}
      hasNextPage={!!hasNextPage}
    />
  );
}

export default SearchPage;
