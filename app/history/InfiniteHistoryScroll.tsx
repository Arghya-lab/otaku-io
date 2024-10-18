"use client";

import ContinueWatchingPosterItem from "@/components/ContinueWatchingPosterItem";
import usePosterItemCount from "@/hooks/usePosterItemCount";
import { WatchingAnimeType } from "@/types/anime";
import { ApiSuccessType } from "@/types/apiResponse";
import axios, { isAxiosError } from "axios";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LineWave } from "react-loader-spinner";

function InfiniteHistoryScroll({
  initialData,
  hasNextPage,
  perPage,
}: {
  initialData: WatchingAnimeType[];
  hasNextPage: boolean;
  perPage: number;
}) {
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
        <div className="m-auto w-28">
          <LineWave visible={true} height="200" width="200" />
        </div>
      }
      endMessage={
        <p className="text-center text-muted-foreground">
          Nothing to show more
        </p>
      }
    >
      <div
        className="grid grid-cols-2 gap-2 px-4 pb-16 xxs:grid-cols-3 xxs:gap-3 xs:gap-4 xs:pb-0"
        style={{
          gridTemplateColumns: `repeat( ${posterItemCount}, 1fr)`,
        }}
      >
        {data.map((WatchingAnime, id) => (
          <ContinueWatchingPosterItem key={id} WatchingAnime={WatchingAnime} />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default InfiniteHistoryScroll;
