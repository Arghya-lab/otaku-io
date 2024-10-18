"use client";

import PosterItem from "@/components/PosterItem";
import usePosterItemCount from "@/hooks/usePosterItemCount";
import { ApiSuccessType } from "@/types/apiResponse";
import { IAnimeResult } from "@consumet/extensions";
import axios from "axios";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LineWave } from "react-loader-spinner";

function InfiniteLibraryScroll({
  initialData,
  hasNextPage,
  perPage,
}: {
  initialData: IAnimeResult[];
  hasNextPage: boolean;
  perPage: number;
}) {
  const posterItemCount = usePosterItemCount();

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
      dataLength={data.length} //This is important field to render the next data
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
        {data.map((item, id) => (
          <PosterItem key={id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default InfiniteLibraryScroll;
