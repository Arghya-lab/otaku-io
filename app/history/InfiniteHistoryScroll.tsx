"use client";

import axios, { isAxiosError } from "axios";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LineWave } from "react-loader-spinner";
import usePosterItemCount from "@/hooks/usePosterItemCount";
import { usePreference } from "@/components/providers/PreferenceProvider";
import ContinueWatchingPosterItem from "@/components/ContinueWatchingPosterItem";
import { themes } from "@/theme";
import { WatchingAnimeType } from "@/types/anime";
import { ApiSuccessType } from "@/types/apiResponse";

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
      const {
        data,
      }: {
        data: ApiSuccessType<{
          results: WatchingAnimeType[];
          hasNextPage: boolean;
          currentPage: number;
        }>;
      } = await axios.get(`/api/anime/history`, {
        params: {
          page: pageNo + 1,
          perPage: perPage,
        },
      });

      setData((prev) => [...prev, ...data.data.results]);
      setHasMore(data.data.hasNextPage);
      setPageNo(data.data.currentPage);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.message);
      }
    }
  };

  return (
    <InfiniteScroll
      className="h-full"
      dataLength={data.length}
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
        className="px-4 grid gap-2 xxs:gap-3 xs:gap-4 pb-16 xs:pb-0 grid-cols-2 xxs:grid-cols-3"
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
