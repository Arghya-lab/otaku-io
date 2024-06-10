"use client";

import { useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { LineWave } from "react-loader-spinner";
import PosterItem from "@/components/PosterItem";
import { themes } from "@/theme";
import usePosterItemCount from "@/hooks/usePosterItemCount";
import { usePreference } from "@/components/providers/PreferenceProvider";
import { AnimeItemType, AnimeSearchResType } from "@/types/anime";
import { ApiSuccessType } from "@/types/apiResponse";

function InfiniteSearchScroll({
  query,
  initialData,
  hasNextPage,
}: {
  query: string;
  initialData: AnimeItemType[];
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
      const { data }: { data: ApiSuccessType<AnimeSearchResType> } =
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
        {data.map((item, id) => (
          <PosterItem key={id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default InfiniteSearchScroll;
