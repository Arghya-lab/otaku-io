import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import usePosterItemCount from "../hooks/usePosterItemCount";
import ContinueWatchingPosterItem from "./ContinueWatchingPosterItem";
import useUserWatching from "../hooks/useUserWatching";

function ContinueWatchingBoard() {
  const navigate = useNavigate();

  const posterItemCount = usePosterItemCount();
  const { watching } = useUserWatching();

  if (watching.length === 0) return null;

  return (
    <div className="mt-4 pb-8 px-2 xxs:px-4">
      {/* Header */}
      <div className="mb-1 px-3 xxs:px-4 flex items-center justify-between text-neutral-900 dark:text-slate-100">
        <p className="text-2xl capitalize">continue watching</p>
        {/* See all btn */}
        <div
          role="button"
          className="p-2 pl-4 rounded-[45px] flex flex-row gap-2 items-center opacity-65 text-neutral-800 dark:text-slate-300 bg-white bg-opacity-15 hover:bg-opacity-10 hover:opacity-100 hover:text-neutral-900 dark:hover:text-slate-100"
          onClick={() => navigate("/continueWatching")}>
          <p className="text-[15px]">See All</p>
          <ChevronRight size={24} />
        </div>
      </div>
      {/* Poster container */}
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${posterItemCount}, 1fr)` }}>
        {watching.slice(0, posterItemCount).map((WatchingInfo) => (
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
