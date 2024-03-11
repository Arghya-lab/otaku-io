import PosterItem from "@/components/PosterItem";
import SideNavbar from "@/components/SideNavbar";
import TopNavbar from "@/components/TopNavbar";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LineWave } from "react-loader-spinner";

function SearchPage() {

  const posterItemCount = usePosterItemCount();
  const { theme } = useSelector((state) => state.preference);
  const { searchContent, hasMoreSearchContent, currentSearchContentPage } =
    useSelector((state) => state.content);

  useEffect(() => {
    dispatch(clearSearchData());
    dispatch(applySearch({ query, params: { page: 1 } }));
  }, [query, dispatch]);

  const handleFetchMoreFilterData = () => {
    dispatch(
      applySearch({ query, params: { page: currentSearchContentPage + 1 } })
    );
  };

  return (
    <div className="h-full relative">
      <TopNavbar />
      <SideNavbar pathName="/search" />
      <div className="xs:pl-20 flex flex-row">
        {/* Meta items container */}
        <InfiniteScroll
          className="h-full"
          dataLength={searchContent.length} //This is important field to render the next data
          next={handleFetchMoreFilterData}
          hasMore={hasMoreSearchContent}
          loader={
            <div className="w-28 m-auto">
              <LineWave
                visible={true}
                height="200"
                width="200"
                color={theme.secondaryColor}
              />
            </div>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>nothing to show more</p>
          }>
          <div
            className="px-2 xxs:px-4 grid"
            style={{
              gridTemplateColumns: `repeat( ${posterItemCount}, 1fr)`,
            }}>
            {searchContent.map((item, id) => (
              <PosterItem
                key={id}
                item={item}
                // type={posterItemType.filter}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default SearchPage;