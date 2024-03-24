"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { LineWave } from "react-loader-spinner";
import PosterItem from "@/components/PosterItem";
import { usePreference } from "@/components/PreferenceProvider";
import { useState } from "react";
import { getAnimesByIds } from "@/services/getAnimesByIds";
import usePosterItemCount from "@/hooks/usePosterItemCount";
import { themes } from "@/theme";
import { AnimeItemType } from "@/types/anime";

function InfiniteLibraryScroll({
  bookmarkAnimeIds,
  initialData,
  hasNextPage,
}: {
  bookmarkAnimeIds: string[];
  initialData: AnimeItemType[];
  hasNextPage: boolean;
}) {
  const { themeId } = usePreference();
  const theme = themes[themeId];
  const posterItemCount = usePosterItemCount();

  let currentPage = 1;

  const [data, setData] = useState(initialData);
  const [hasMore, setHasMore] = useState(hasNextPage);

  const handleFetchMoreData = async () => {
    const { results, hasNextPage } = await getAnimesByIds(
      bookmarkAnimeIds,
      currentPage + 1
    );

    currentPage++;
    setData((prev) => [...prev, ...results]);
    setHasMore(hasNextPage);
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
        className="px-2 xxs:px-4 grid"
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

export default InfiniteLibraryScroll;
