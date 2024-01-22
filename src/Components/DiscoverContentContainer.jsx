import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { LineWave } from "react-loader-spinner";
import PosterItem from "./PosterItem";
// import MetaMiniPreview from "./MetaMiniPreview";
// import { posterItemType } from "../constants";
import usePosterItemCount from "../hooks/usePosterItemCount";
import Filter from "./Filter";
import { applyFilter, clearFilterData } from "../features/content/contentSlice";
import { setMiniMeta } from "../features/selected/selectedSlice";
import Skeleton from "react-loading-skeleton";

function DiscoverContentContainer() {
  const dispatch = useDispatch();

  const posterItemCount = usePosterItemCount();
  const [searchParams] = useSearchParams();
  const searchParam = useLocation().search;

  const { filterContent, hasMoreFilterContent, currentFilterContentPage } =
    useSelector((state) => state.content);
  const { theme } = useSelector((state) => state.preference);

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
    dispatch(
      applyFilter({ ...filterQuery, page: currentFilterContentPage + 1 })
    );
  };

  return (
    <div className="xs:pl-20 pt-24 flex flex-row">
      <div>
        {/* Selectable input container */}
        <Filter />
        {/* Meta items container */}
        {currentFilterContentPage !== 0 ? (
          <InfiniteScroll
            className="h-full"
            dataLength={filterContent.length} //This is important field to render the next data
            next={handleFetchMoreFilterData}
            hasMore={hasMoreFilterContent}
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
              {filterContent.map((item, id) => (
                <PosterItem
                  key={id}
                  item={item}
                  // type={posterItemType.filter}
                />
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <div className="px-4 flex flex-row gap-4 flex-wrap justify-around">
            {new Array(25).fill("").map((_, id) => (
              <Skeleton
                key={id}
                className="h-64 w-44 rounded-xl flex-1"
                baseColor={theme.type === "dark" ? "#111" : "#ddd"}
                highlightColor={theme.type === "dark" ? "#222" : "#bbb"}
              />
            ))}
          </div>
        )}
      </div>
      {/* {windowWidth>1000 && (
      <MetaMiniPreview />)} */}
    </div>
  );
}

export default DiscoverContentContainer;
