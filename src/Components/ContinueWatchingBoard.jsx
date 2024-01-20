import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import usePosterItemCount from "../hooks/usePosterItemCount";
import watched from "../appwrite/watched";
import ContinueWatchingPosterItem from "./ContinueWatchingPosterItem";

function ContinueWatchingBoard() {
  const posterItemCount = usePosterItemCount();

  const { userData } = useSelector((state) => state.auth);
  const [watchingList, setWatchingList] = useState([]);

  useEffect(() => {
    if (userData?.$id) {
      (async () => {
        const result = await watched.getWatchingAnimeList(userData.$id);
        setWatchingList(result);
      })();
    }
  }, [userData?.$id]);

  if (watchingList.length === 0) return null;

  return (
    <div className="mt-4 pb-8 px-2 xxs:px-4">
      {/* Header */}
      <div className="mb-1 px-3 xxs:px-4 flex items-center justify-between text-neutral-900 dark:text-slate-100">
        <p className="text-2xl capitalize">continue watching</p>
        {/* See all btn */}
        <div
          role="button"
          className="p-2 pl-4 rounded-[45px] flex flex-row gap-2 items-center opacity-65 text-neutral-800 dark:text-slate-300 bg-white bg-opacity-15 hover:bg-opacity-10 hover:opacity-100 hover:text-neutral-900 dark:hover:text-slate-100"
          // onClick={handleSeeAllClick}
        >
          <p className="text-[15px]">See All</p>
          <ChevronRight size={24} />
        </div>
      </div>
      {/* Poster container */}
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${posterItemCount}, 1fr)` }}>
        {watchingList.slice(0, posterItemCount).map((WatchingInfo) => (
          <ContinueWatchingPosterItem
            key={WatchingInfo.$id}
            WatchingInfo={WatchingInfo}
          />
        ))}
      </div>
    </div>
  );
}

export default ContinueWatchingBoard;
