"use client";

import PosterItem from "@/components/PosterItem";
import { usePreference } from "@/components/providers/PreferenceProvider";
import usePosterItemCount from "@/hooks/usePosterItemCount";
import { themes } from "@/theme";
import { ApiSuccessType } from "@/types/apiResponse";
import { IAnimeResult, ISearch } from "@consumet/extensions";
import axios from "axios";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LineWave } from "react-loader-spinner";

function InfiniteSearchScroll({
  query,
  initialData,
  hasNextPage,
}: {
  query: string;
  initialData: IAnimeResult[];
  hasNextPage: boolean;
}) {
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  const posterItemCount = usePosterItemCount();

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
        {data.map((item, id) => (
          <PosterItem key={id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default InfiniteSearchScroll;
