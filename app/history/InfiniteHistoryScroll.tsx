"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { LineWave } from "react-loader-spinner";
import { useState } from "react";
import usePosterItemCount from "@/hooks/usePosterItemCount";
import axios from "axios";
import { usePreference } from "@/components/providers/PreferenceProvider";
import ContinueWatchingPosterItem from "@/components/ContinueWatchingPosterItem";
import { themes } from "@/theme";
import { WatchingAnimeType } from "@/types/anime";

function InfiniteHistoryScroll({
  initialData,
  hasNextPage,
  perPage,
}: {
  initialData: WatchingAnimeType[];
  hasNextPage: boolean;
  perPage: number;
}) {
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];
  const posterItemCount = usePosterItemCount();

  const [pageNo, setPageNo] = useState(1);

  const [data, setData] = useState(initialData);
  const [hasMore, setHasMore] = useState(hasNextPage);

  const handleFetchMoreData = async () => {
    try {
      const res = await axios.get(`/api/anime/history`, {
        params: {
          page: pageNo + 1,
          perPage: perPage,
        },
      });

      const {
        currentPage,
        hasNextPage,
        results,
      }: {
        currentPage: number;
        hasNextPage: boolean;
        results: WatchingAnimeType[];
      } = res.data;

      setData((prev) => [...prev, ...results]);
      setHasMore(hasNextPage);
      setPageNo(currentPage);
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
        className="px-2 xxs:px-4 grid pb-16 xs:pb-0"
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
