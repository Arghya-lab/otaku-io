"use client";

import usePosterItemCount from "@/hooks/usePosterItemCount";
import ContinueWatchingPosterItem from "@/components/ContinueWatchingPosterItem";
import { WatchingAnimeType } from "@/types/anime";

function HistoryPosterContainer({
  watchingAnimes,
}: {
  watchingAnimes: WatchingAnimeType[];
}) {
  const posterItemCount = usePosterItemCount();

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${posterItemCount}, 1fr)`,
      }}>
      {watchingAnimes.slice(0, posterItemCount).map((WatchingAnime, id) => (
        <ContinueWatchingPosterItem key={id} WatchingAnime={WatchingAnime} />
      ))}
    </div>
  );
}

export default HistoryPosterContainer;
