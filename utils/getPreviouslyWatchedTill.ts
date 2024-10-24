import "client-only";

import { AnimeWatchedType } from "@/types/States";
import { ApiSuccessType } from "@/types/apiResponse";
import axios from "axios";
import { Session } from "next-auth";

export default async function getPreviouslyWatchedTill(
  animeId: string,
  epNo: string,
  session?: Session | null
) {
  if (session) {
    try {
      const {
        data,
      }: {
        data: ApiSuccessType<{
          animeId: string;
          episodeNo: string;
          watchedTill: number;
        }>;
      } = await axios.get(
        `/api/anime/watched-till?animeId=${animeId}&episodeNo=${epNo}`
      );
      return data.data.watchedTill;
    } catch {
      return OfflinePreviouslyWatchedTill(animeId, epNo);
    }
  }
  const data = OfflinePreviouslyWatchedTill(animeId, epNo);

  return data;
}

function OfflinePreviouslyWatchedTill(animeId: string, epNo: string) {
  const animesWatched: AnimeWatchedType[] = JSON.parse(
    localStorage.getItem("animesWatched") || "[]"
  );

  const curAnime = animesWatched.find((item) => item.animeId === animeId);
  if (curAnime) {
    const curAnimeEp = curAnime.episodes.find(
      (item) => item.episodeNo === epNo
    );
    return curAnimeEp?.watchedTill;
  }
  return;
}
