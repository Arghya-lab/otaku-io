import "client-only";

import { ApiSuccessType } from "@/types/apiResponse";
import { IAnimeEpisode, IAnimeInfo, SubOrSub } from "@consumet/extensions";
import axios from "axios";

const setAnimeInfoAndGetWatchPageLink = async (
  id: string,
  isDub: boolean,
  epNo: number
) => {
  let animeInfo: IAnimeInfo;
  let currentEpisode: IAnimeEpisode;
  let resEpisodes: IAnimeEpisode[] | undefined;

  try {
    const savedAnimeInfo: IAnimeInfo | null = await JSON.parse(
      localStorage.getItem("animeInfo") || "null"
    );
    if (savedAnimeInfo && savedAnimeInfo.id === id) {
      animeInfo = savedAnimeInfo;

      if (
        animeInfo.hasDub !== isDub ||
        (isDub && animeInfo.subOrDub === "sub") ||
        (!isDub && animeInfo.subOrDub === "dub")
      ) {
        const { data }: { data: ApiSuccessType<IAnimeEpisode[]> } =
          await axios.get(`/api/anime/episodes/${id}?dub=${isDub}`);
        animeInfo.episodes = data.data;
        if (isDub) {
          animeInfo.hasDub = true;
          animeInfo.subOrDub = "dub" as SubOrSub;
        } else {
          animeInfo.hasSub = true;
          animeInfo.subOrDub = "sub" as SubOrSub;
        }
      }
    } else {
      const { data }: { data: ApiSuccessType<IAnimeInfo> } = await axios.get(
        `/api/anime/info/${id}?dub=${isDub}`
      );
      animeInfo = data.data;
      localStorage.setItem("animeInfo", JSON.stringify(animeInfo));
    }

    resEpisodes = animeInfo?.episodes;
    if (resEpisodes && resEpisodes.length > 0) {
      const currentEpisodeIdx = resEpisodes.findIndex(
        (episode) => episode.number == epNo
      );
      currentEpisode = resEpisodes[currentEpisodeIdx];

      return `/watch/${animeInfo.id}/${currentEpisode.number}/${
        currentEpisode.id
      }?dub=${animeInfo.hasDub === true || animeInfo.subOrDub === "dub"}`;
    } else {
      const { data }: { data: ApiSuccessType<IAnimeInfo> } = await axios.get(
        `/api/anime/info/${id}?dub=${!isDub}`
      );
      animeInfo = data.data;
      localStorage.setItem("animeInfo", JSON.stringify(animeInfo));

      resEpisodes = animeInfo?.episodes;
      if (resEpisodes) {
        const currentEpisodeIdx = resEpisodes.findIndex(
          (episode) => episode.number == epNo
        );
        currentEpisode = resEpisodes[currentEpisodeIdx];
        return `/watch/${animeInfo.id}/${currentEpisode.number}/${
          currentEpisode.id
        }?dub=${animeInfo.hasDub === true || animeInfo.subOrDub === "dub"}`;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export default setAnimeInfoAndGetWatchPageLink;
