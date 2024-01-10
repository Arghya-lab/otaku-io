import { useDispatch, useSelector } from "react-redux";
import PosterItem from "./PosterItem";
import SimpleBar from "simplebar-react";
// import MetaMiniPreview from "./MetaMiniPreview";
// import { posterItemType } from "../constants";
import usePosterItemCount from "../hooks/usePosterItemCount";
import Filter from "./Ui/Filter";
import { LineWave } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { applyFilter, clearFilterData } from "../features/content/contentSlice";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { setMiniMeta } from "../features/selected/selectedSlice";

function DiscoverContentContainer() {
  const dispatch = useDispatch();

  const posterItemCount = usePosterItemCount();
  const [searchParams] = useSearchParams();
  const searchParam = useLocation().search;

  const { filterContent, hasMoreFilterContent, currentFilterContentPage } =
    useSelector((state) => state.content);

  const filterQuery = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    dispatch(clearFilterData());
    dispatch(applyFilter(filterQuery)).then((promiseResult) => {
      const filterFirstResult = promiseResult?.payload?.results[0];
      dispatch(setMiniMeta(filterFirstResult));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam]);

  const handleFetchMoreFilterData = () => {
    console.log("trigger");
    dispatch(
      applyFilter({ ...filterQuery, page: currentFilterContentPage + 1 })
    );
  };

  return (
    <div className="absolute top-20 bottom-20 xs:bottom-0 left-0 xs:left-20 right-0 z-20 flex flex-row">
      <div className="flex-1">
        {/* Selectable input container */}
        <Filter />
        {/* Meta items container */}
        <div className="">
          <InfiniteScroll
            className="h-full"
            dataLength={filterContent.length} //This is important field to render the next data
            next={handleFetchMoreFilterData}
            hasMore={hasMoreFilterContent}
            loader={
              <div className="w-full flex justify-center">
                <LineWave
                  visible={true}
                  height="200"
                  width="200"
                  color="#4fa94d"
                />
              </div>
            }
            endMessage={
              <p style={{ textAlign: "center" }}>
                nothing to show more
              </p>
            }>
            <SimpleBar className="h-[calc(100vh-5rem-6rem)]">
              <div
                className="px-2 xxs:px-4 grid"
                style={{
                  gridTemplateColumns: `repeat( ${posterItemCount}, 1fr)`,
                }}>
                {filterContent.map((item, id) => (
                  <PosterItem
                    key={id}
                    item={item}
                    // type={posterItemType.filter}
                  />
                ))}
              </div>
            </SimpleBar>
          </InfiniteScroll>
        </div>
      </div>
      {/* {windowWidth>1000 && (
      <MetaMiniPreview />)} */}
    </div>
  );
}

export default DiscoverContentContainer;
