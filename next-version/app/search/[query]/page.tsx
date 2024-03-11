import SideNavbar from "@/components/SideNavbar";
import TopNavbar from "@/components/TopNavbar";
import InfiniteSearchScroll from "./InfiniteSearchScroll";
import { getSearchData } from "@/services/getAnime";

async function SearchPage({ params }: { params: { query: string } }) {
  const { hasNextPage, results: initialData } = await getSearchData(
    params.query
  );

  return (
    <>
      <TopNavbar />
      <SideNavbar pathName="/search" />
      <div className="xs:pl-20 flex flex-row">
        {/* Meta items container */}
        <InfiniteSearchScroll
          query={params.query}
          initialData={initialData}
          hasNextPage={hasNextPage || false}
        />
      </div>
    </>
  );
}

export default SearchPage;
