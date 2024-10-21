"use client"; // This ensures the component is client-side

import PosterItem from "@/components/PosterItem";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiSuccessType } from "@/types/apiResponse";
import { IAnimeResult, ISearch } from "@consumet/extensions";
import axios, { isAxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function InfiniteDiscoverScroll({
  initialData,
  hasNextPage,
  initialFormat,
  initialGenres,
  initialSort,
  initialStatus,
}: {
  initialData: IAnimeResult[];
  hasNextPage: boolean;
  initialFormat?: string;
  initialGenres?: string;
  initialSort?: string;
  initialStatus?: string;
}) {
  const searchParams = useSearchParams(); // Client-side only hook

  const [data, setData] = useState<IAnimeResult[]>(initialData);
  const [hasMore, setHasMore] = useState(hasNextPage);
  const [pageNo, setPageNo] = useState(1);

  const format = searchParams.get("format");
  const genres = searchParams.get("genres")
    ? JSON.stringify([searchParams.get("genres")])
    : null;
  const sort = searchParams.get("sort")
    ? JSON.stringify([searchParams.get("sort")])
    : null;
  const status = searchParams.get("status");

  const [PrevFormat, setPrevFormat] = useState(initialFormat);
  const [PrevGenres, setPrevGenres] = useState(initialGenres);
  const [PrevSort, setPrevSort] = useState(initialSort);
  const [PrevStatus, setPrevStatus] = useState(initialStatus);

  const [isNewFilterDataFetching, setIsNewFilterDataFetching] = useState(false);

  useEffect(() => {
    (async () => {
      if (
        format != PrevFormat ||
        genres != PrevGenres ||
        sort != PrevSort ||
        status != PrevStatus
      ) {
        setIsNewFilterDataFetching(true);
        try {
          const { data }: { data: ApiSuccessType<ISearch<IAnimeResult>> } =
            await axios.get(`/api/anime/discover`, {
              params: {
                format,
                genres,
                sort,
                status,
                perPage: 30,
              },
            });

          setData(data.data.results);
          setHasMore(data.data.hasNextPage || false);
          setPageNo(data.data.currentPage || 1);
          setPrevFormat(format || undefined);
          setPrevGenres(genres || undefined);
          setPrevSort(sort || undefined);
          setPrevStatus(status || undefined);
        } finally {
          setIsNewFilterDataFetching(false);
        }
      }
    })();
  }, [
    format,
    PrevFormat,
    genres,
    PrevGenres,
    sort,
    PrevSort,
    status,
    PrevStatus,
  ]);

  const fetchMoreData = async () => {
    try {
      const { data }: { data: ApiSuccessType<ISearch<IAnimeResult>> } =
        await axios.get(`/api/anime/discover`, {
          params: {
            page: pageNo + 1,
            format,
            genres,
            sort,
            status,
            perPage: 30,
          },
        });

      setData((prev) => [...prev, ...data.data.results]);
      setHasMore(data.data.hasNextPage || false);
      setPageNo(data.data.currentPage || pageNo + 1);
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
      next={fetchMoreData}
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
        {!isNewFilterDataFetching
          ? data.map((item) => <PosterItem key={item.id} item={item} />)
          : Array.from({ length: 30 }, (_, id) => (
              <Skeleton className="aspect-[5/7] min-w-24 max-w-48" key={id} />
            ))}
      </div>
    </InfiniteScroll>
  );
}

export default InfiniteDiscoverScroll;
