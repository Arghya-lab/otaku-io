import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { LineWave } from "react-loader-spinner";
import Skeleton from "react-loading-skeleton";
import SideNavbar from "../Components/SideNavbar";
import TopNavbar from "../Components/TopNavbar";
import usePosterItemCount from "../hooks/usePosterItemCount";
import useUserWatching from "../hooks/useUserWatching";
import ContinueWatchingPosterItem from "../Components/ContinueWatchingPosterItem";

function ContinueWatchingPage() {
  const posterItemCount = usePosterItemCount();
  const { watching } = useUserWatching();

  const { theme } = useSelector((state) => state.preference);

  const perPageItemCount = 25;
  let currentPage = 1;
  const [subWatchingList, setSubWatchingList] = useState([]);

  useEffect(() => {
    setSubWatchingList(watching.slice(0, perPageItemCount));
  }, [watching]);

  const handleAddMoreWatching = () => {
    const newSubWatchingList = subWatchingList.concat(
      watching.slice(
        (currentPage - 1) * perPageItemCount,
        perPageItemCount * currentPage
      )
    );

    currentPage++;
    setSubWatchingList(newSubWatchingList);
  };

  return (
    <div className="h-full relative">
      <TopNavbar />
      <SideNavbar />
      <div className="xs:pl-20 pb-16 xs:pb-0">
        <p className="py-3 px-3 xxs:px-4 text-2xl capitalize text-neutral-900 dark:text-slate-100">
          continue watching
        </p>
        {watching.length != 0 ? (
          <InfiniteScroll
            className="h-full"
            dataLength={subWatchingList.length} //This is important field to render the next data
            next={handleAddMoreWatching}
            hasMore={watching.length != subWatchingList.length}
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
              {subWatchingList.map((WatchingInfo) => (
                <ContinueWatchingPosterItem
                  key={WatchingInfo.$id}
                  WatchingInfo={WatchingInfo}
                />
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <div
            className="px-2 xxs:px-4 grid gap-4"
            style={{
              gridTemplateColumns: `repeat( ${posterItemCount}, 1fr)`,
            }}>
            {new Array(25).fill("").map((_, id) => (
              <Skeleton
                key={id}
                className="rounded-xl aspect-[1/1.464]"
                baseColor={theme.type === "dark" ? "#111" : "#ddd"}
                highlightColor={theme.type === "dark" ? "#222" : "#bbb"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContinueWatchingPage;
