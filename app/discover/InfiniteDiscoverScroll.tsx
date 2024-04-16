"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import { LineWave } from "react-loader-spinner";
import axios from "axios";
import PosterItem from "@/components/PosterItem";
import { usePreference } from "@/components/providers/PreferenceProvider";
import usePosterItemCount from "@/hooks/usePosterItemCount";
import { themes } from "@/theme";
import { AnimeItemType } from "@/types/anime";

function InfiniteDiscoverScroll({
  initialData,
  hasNextPage,
}: {
  initialData: AnimeItemType[];
  hasNextPage: boolean;
}) {
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];
  const posterItemCount = usePosterItemCount();
  const searchParams = useSearchParams();

  const [data, setData] = useState(initialData);
  const [hasMore, setHasMore] = useState(hasNextPage);
  const [pageNo, setPageNo] = useState(1);

  const handleFetchMoreData = async () => {
    try {
      const response = await axios.get(`/api/discover`, {
        timeout: 15000,
        params: {
          page: pageNo + 1,
          format: searchParams.get("format"),
          genres: searchParams.get("genres"),
          sort: searchParams.get("sort"),
          status: searchParams.get("status"),
        },
      });

      const { currentPage, hasNextPage, results } = response.data;

      setData((prev) => [...prev, ...results]);
      setHasMore(hasNextPage);
      setPageNo(currentPage);
    } catch (error) {
      console.error("Error fetching more data:", error);
      // Handle other error scenarios as needed (e.g., display error message to user)
    }
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
        className="px-2 xxs:px-4 grid pb-16 xs:pb-0"
        style={{
          gridTemplateColumns: `repeat( ${posterItemCount}, 1fr)`,
        }}>
        {data.map((item, id) => (
          <PosterItem
            key={id}
            item={item}
            // type={posterItemType.filter}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default InfiniteDiscoverScroll;
