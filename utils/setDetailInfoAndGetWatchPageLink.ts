import { ApiSuccessType } from "@/types/apiResponse";
import { IAnimeEpisode, IAnimeInfo } from "@consumet/extensions";
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
