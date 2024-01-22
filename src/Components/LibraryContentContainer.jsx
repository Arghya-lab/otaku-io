import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { LineWave } from "react-loader-spinner";
import usePosterItemCount from "../hooks/usePosterItemCount";
import BookmarkedPosterItem from "./BookmarkedPosterItem";
import Skeleton from "react-loading-skeleton";

function LibraryContentContainer() {
  const posterItemCount = usePosterItemCount();
  const { bookmarks, theme } = useSelector((state) => state.preference);

  const perPageItemCount = 25;
  let currentPage = 1;
  const [subBookmarks, setSubBookmarks] = useState([]);

  useEffect(() => {
    setSubBookmarks(bookmarks.slice(0, perPageItemCount));
  }, [bookmarks]);

  const handleAddMoreBookmarks = () => {
    const newSubBookmarks = subBookmarks.concat(
      bookmarks.slice(
        (currentPage - 1) * perPageItemCount,
        perPageItemCount * currentPage
      )
    );

    currentPage++;
    setSubBookmarks(newSubBookmarks);
  };

  return (
    <div className="xs:pl-20 pb-16 xs:pb-0">
      {bookmarks.length != 0 ? (
        <InfiniteScroll
          className="h-full"
          dataLength={subBookmarks.length} //This is important field to render the next data
          next={handleAddMoreBookmarks}
          hasMore={bookmarks.length != subBookmarks.length}
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
          endMessage={
            <p style={{ textAlign: "center" }}>nothing to show more</p>
          }>
          <div
            className="px-2 xxs:px-4 grid"
            style={{
              gridTemplateColumns: `repeat( ${posterItemCount}, 1fr)`,
            }}>
            {subBookmarks.map((animeId, id) => (
              <BookmarkedPosterItem key={id} id={animeId} />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <div className="px-4 flex flex-row gap-4 flex-wrap justify-around">
          {new Array(25).fill("").map((_, id) => (
            <Skeleton
              key={id}
              className="h-64 w-44 rounded-xl flex-1"
              baseColor={theme.type === "dark" ? "#111" : "#ddd"}
              highlightColor={theme.type === "dark" ? "#222" : "#bbb"}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default LibraryContentContainer;
