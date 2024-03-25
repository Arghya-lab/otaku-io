"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { LineWave } from "react-loader-spinner";
import { useState } from "react";
import usePosterItemCount from "@/hooks/usePosterItemCount";
import axios from "axios";
import { usePreference } from "@/app/PreferenceProvider";
import ContinueWatchingPosterItem from "@/components/ContinueWatchingPosterItem";
import { themes } from "@/theme";
import { WatchingAnimeType } from "@/types/anime";

function InfiniteHistoryScroll({
  initialData,
  hasNextPage,
}: {
  initialData: WatchingAnimeType[];
  hasNextPage: boolean;
}) {
  const { themeId } = usePreference();
  const theme = themes.find(theme=>theme.id===themeId) || themes[0];

  const posterItemCount = usePosterItemCount();

  const [data, setData] = useState(initialData);
  const [hasMore, setHasMore] = useState(hasNextPage);
  const [pageNo, setPageNo] = useState(1);

  const handleFetchMoreData = async () => {
    try {
      const res = await axios.get(`/api/anime/history`, {
        timeout: 15000,
        params: {
          page: pageNo + 1,
        },
      });

      const { currentPage, hasNextPage, results } = res.data;

      setData((prev) => [...prev, ...results] as WatchingAnimeType[]);
      setHasMore(hasNextPage as boolean);
      setPageNo(currentPage as number);
    } catch (error) {
      console.error("Error fetching more data:", error);
      // Handle other error scenarios as needed (e.g., display error message to user)
    }
  };

  return (
    <InfiniteScroll
      className="h-full"
      dataLength={data.length} //This is important field to render the next data
      next={handleFetchMoreData}
      hasMore={hasMore}
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
      endMessage={<p style={{ textAlign: "center" }}>nothing to show more</p>}>
      <div
        className="px-2 xxs:px-4 grid"
        style={{
          gridTemplateColumns: `repeat( ${posterItemCount}, 1fr)`,
        }}>
        {data.map((WatchingAnime, id) => (
          <ContinueWatchingPosterItem key={id} WatchingAnime={WatchingAnime} />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default InfiniteHistoryScroll;
