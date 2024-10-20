import "client-only";

import { AnimeWatchedType } from "@/types/States";
import axios from "axios";
import { Session } from "next-auth";

export default async function setWatchedTill(
  animeId: string,
  episodeNo: string,
  watchedTill: number,
  session?: Session | null
) {
  const animesWatched: AnimeWatchedType[] = JSON.parse(
    localStorage.getItem("animesWatched") || "[]"
  );
  const curAnime = animesWatched.find((item) => item.animeId === animeId);

  if (curAnime) {
    const curEpIdx = curAnime.episodes.findIndex(
      (ep) => ep.episodeNo === episodeNo
    );
    if (curEpIdx === -1) {
      // specific ep not present have to add ep
      curAnime.episodes.unshift({
        episodeNo,
        watchedTill: +watchedTill.toFixed(4),
      });
    } else {
      curAnime.episodes[curEpIdx] = {
        episodeNo,
        watchedTill: +watchedTill.toFixed(4),
      };
    }
    curAnime.lastWatchedEp = episodeNo;
    curAnime.lastWatchedAt = Date.now();

    const curAnimeIdx = animesWatched.findIndex(
      (item) => item.animeId === animeId
    );
    animesWatched[curAnimeIdx] = curAnime;
  } else {
    animesWatched.unshift({
      animeId,
      episodes: [
        {
          episodeNo,
          watchedTill: +watchedTill.toFixed(4),
        },
      ],
      lastWatchedEp: episodeNo,
      lastWatchedAt: Date.now(),
    });
  }
  localStorage.setItem("animesWatched", JSON.stringify(animesWatched));

  // If session present

  if (session) {
    const payload = {
      animeId,
      episodeNo,
      watchedTill: watchedTill.toFixed(4),
    };

    await axios.patch("/api/anime/watched-till", payload);
  }
}
