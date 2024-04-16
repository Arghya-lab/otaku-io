import axios from "axios";
import { AnimeEpisodeType, DetailAnimeInfoType } from "@/types/anime";

const setDetailInfoAndGetWatchPageLink = async (
  id: string,
  isDub: boolean,
  epNo: number
) => {
  let detailInfo: DetailAnimeInfoType;
  let currentEpisode: AnimeEpisodeType;
  let resEpisodes: AnimeEpisodeType[] | undefined;

  try {
    const savedDetailInfo: DetailAnimeInfoType | null = await JSON.parse(
      localStorage.getItem("detailInfo") || "null"
    );
    if (savedDetailInfo && savedDetailInfo.id === id) {
      detailInfo = savedDetailInfo;
    } else {
      const { data }: { data: DetailAnimeInfoType } = await axios.get(
        `/api/detail-info/${id}?dub=${isDub}`
      );
      detailInfo = data;
      localStorage.setItem("detailInfo", JSON.stringify(detailInfo));
    }

    resEpisodes = detailInfo?.episodes;
    if (resEpisodes && resEpisodes.length > 0) {
      const currentEpisodeIdx = resEpisodes.findIndex(
        (episode: any) => episode.number == epNo
      );
      currentEpisode = resEpisodes[currentEpisodeIdx];
      return `/watch/${detailInfo.id}/${currentEpisode.number}/${
        currentEpisode.id
      }?dub=${detailInfo?.subOrDub === "dub"}`;
    } else {
      const { data }: { data: DetailAnimeInfoType } = await axios.get(
        `/api/detail-info/${id}?dub=${!isDub}`
      );
      detailInfo = data;
      localStorage.setItem("detailInfo", JSON.stringify(detailInfo));

      resEpisodes = detailInfo?.episodes;
      if (resEpisodes) {
        const currentEpisodeIdx = resEpisodes.findIndex(
          (episode: any) => episode.number == epNo
        );
        currentEpisode = resEpisodes[currentEpisodeIdx];
        return `/watch/${detailInfo.id}/${currentEpisode.number}/${
          currentEpisode.id
        }?dub=${detailInfo?.subOrDub === "dub"}`;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export default setDetailInfoAndGetWatchPageLink;
