"use client";

import PosterItem from "@/components/PosterItem";
import { ApiSuccessType } from "@/types/apiResponse";
import { IAnimeResult } from "@consumet/extensions";
import axios from "axios";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function InfiniteLibraryScroll({
  initialData,
  hasNextPage,
  perPage,
}: {
  initialData: IAnimeResult[];
  hasNextPage: boolean;
  perPage: number;
}) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(initialData);
  const [hasMore, setHasMore] = useState(hasNextPage);

  const handleFetchMoreData = async () => {
    const {
      data,
    }: {
      data: ApiSuccessType<{
        results: IAnimeResult[];
        hasNextPage: boolean;
        currentPage: number;
      }>;
    } = await axios.get("/api/anime/library-animes", {
      params: { page: page + 1, perPage: perPage },
    });

    setPage(data.data.currentPage);
    setData((prev) => [...prev, ...data.data.results]);
    setHasMore(data.data.hasNextPage);
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
        {data.map((item, id) => (
          <PosterItem key={id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default InfiniteLibraryScroll;
