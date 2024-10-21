"use client";

import PosterItem from "@/components/PosterItem";
import { ApiSuccessType } from "@/types/apiResponse";
import { IAnimeResult, ISearch } from "@consumet/extensions";
import axios from "axios";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function InfiniteSearchScroll({
  query,
  initialData,
  hasNextPage,
}: {
  query: string;
  initialData: IAnimeResult[];
  hasNextPage: boolean;
}) {
  const [data, setData] = useState(initialData);
  const [hasMore, setHasMore] = useState(hasNextPage);
  const [pageNo, setPageNo] = useState(1);

  const handleFetchMoreData = async () => {
    try {
      const { data }: { data: ApiSuccessType<ISearch<IAnimeResult>> } =
        await axios.get(`/api/anime/search`, {
          timeout: 15000,
          params: {
            page: pageNo + 1,
            query,
          },
        });

      setData((prev) => [...prev, ...data.data.results]);
      setHasMore(data.data.hasNextPage || false);
      setPageNo(data.data.currentPage || pageNo + 1);
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  return (
    <InfiniteScroll
      className="h-full"
      dataLength={data.length}
      next={handleFetchMoreData}
      hasMore={hasMore}
      loader={
        <div className="flex h-24 w-full items-center justify-center">
          <div className="dot-loader" />
        </div>
      }
      endMessage={
        <p className="pb-8 text-center text-secondary-foreground">
          Nothing to show more
        </p>
      }
    >
      <div className="poster-grid px-4 pb-16 xs:pb-0">
        {data.map((item, id) => (
          <PosterItem key={id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default InfiniteSearchScroll;
