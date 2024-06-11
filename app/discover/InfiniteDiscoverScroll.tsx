"use client";

import PosterItem from "@/components/PosterItem";
import { usePreference } from "@/components/providers/PreferenceProvider";
import usePosterItemCount from "@/hooks/usePosterItemCount";
import { themes } from "@/theme";
import { AdvancedAnimeSearchResType, AnimeItemType } from "@/types/anime";
import { ApiSuccessType } from "@/types/apiResponse";
import axios, { isAxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LineWave } from "react-loader-spinner";

function InfiniteDiscoverScroll() {
  const { themeId } = usePreference();
  const posterItemCount = usePosterItemCount();
  const searchParams = useSearchParams();

  const [data, setData] = useState<AnimeItemType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNo, setPageNo] = useState(0);

  const theme = themes.find((theme) => theme.id === themeId) || themes[0];
  const format = searchParams.get("format");
  const genres = searchParams.get("genres");
  const sort = searchParams.get("sort");
  const status = searchParams.get("status");

  const fetchData = async () => {
    try {
      const { data }: { data: ApiSuccessType<AdvancedAnimeSearchResType> } =
        await axios.get(`/api/anime/discover`, {
          params: {
            page: pageNo + 1,
            format,
            genres,
            sort,
            status,
          },
        });

      setData((prev) => [...prev, ...data.data.results]);
      setHasMore(data.data.hasNextPage || false);
      setPageNo(data.data.currentPage || pageNo + 1);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data }: { data: ApiSuccessType<AdvancedAnimeSearchResType> } =
          await axios.get(`/api/anime/discover`, {
            params: {
              format,
              genres,
              sort,
              status,
            },
          });

        setData(data.data.results);
        setHasMore(data.data.hasNextPage || false);
        setPageNo(data.data.currentPage || pageNo + 1);
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error.message);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format, genres, sort, status]);

  return (
    <InfiniteScroll
      className="h-full"
      dataLength={data.length}
      next={fetchData}
      hasMore={hasMore}
      loader={
        <div className="m-auto w-28">
          <LineWave
            visible={true}
            height="200"
            width="200"
            color={theme.secondaryColor}
          />
        </div>
      }
      endMessage={<p style={{ textAlign: "center" }}>nothing to show more</p>}
    >
      <div
        className="grid grid-cols-2 gap-2 px-4 pb-16 xxs:grid-cols-3 xxs:gap-3 xs:gap-4 xs:pb-0"
        style={{
          gridTemplateColumns: `repeat( ${posterItemCount}, 1fr)`,
        }}
      >
        {data.map((item) => (
          <PosterItem key={item.id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default InfiniteDiscoverScroll;
