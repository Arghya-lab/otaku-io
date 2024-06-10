"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { LineWave } from "react-loader-spinner";
import PosterItem from "@/components/PosterItem";
import { usePreference } from "@/components/providers/PreferenceProvider";
import { useState } from "react";
import usePosterItemCount from "@/hooks/usePosterItemCount";
import { themes } from "@/theme";
import { AnimeItemType } from "@/types/anime";
import axios from "axios";
import { ApiSuccessType } from "@/types/apiResponse";

function InfiniteLibraryScroll({
  initialData,
  hasNextPage,
  perPage,
}: {
  initialData: AnimeItemType[];
  hasNextPage: boolean;
  perPage: number;
}) {
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];
  const posterItemCount = usePosterItemCount();

  const [page, setPage] = useState(1);
  const [data, setData] = useState(initialData);
  const [hasMore, setHasMore] = useState(hasNextPage);

  const handleFetchMoreData = async () => {
    const {
      data,
    }: {
      data: ApiSuccessType<{
        results: AnimeItemType[];
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

export default InfiniteLibraryScroll;
