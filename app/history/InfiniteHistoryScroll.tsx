"use client";

import ContinueWatchingPosterItem from "@/components/ContinueWatchingPosterItem";
import { WatchingAnimeType } from "@/types/anime";
import { ApiSuccessType } from "@/types/apiResponse";
import axios, { isAxiosError } from "axios";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function InfiniteHistoryScroll({
  initialData,
  hasNextPage,
  perPage,
}: {
  initialData: WatchingAnimeType[];
  hasNextPage: boolean;
  perPage: number;
}) {
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
        console.error(error.message);
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
        <div className="flex h-32 w-full items-center justify-center">
          <div className="dot-loader" />
        </div>
      }
      endMessage={
        <p className="pt-8 text-center text-secondary-foreground">
          Nothing to show more
        </p>
      }
    >
      <div className="poster-grid px-4 pb-16 xs:pb-0">
        {data.map((WatchingAnime, id) => (
          <ContinueWatchingPosterItem key={id} WatchingAnime={WatchingAnime} />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default InfiniteHistoryScroll;
