import { AnimeEpisodeType, DetailAnimeInfoType } from "@/types/anime";
import { ApiSuccessType } from "@/types/apiResponse";
import axios from "axios";

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
      const { data }: { data: ApiSuccessType<DetailAnimeInfoType> } =
        await axios.get(`/api/anime/detail-info/${id}?dub=${isDub}`);
      detailInfo = data.data;
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
      const { data }: { data: ApiSuccessType<DetailAnimeInfoType> } =
        await axios.get(`/api/anime/detail-info/${id}?dub=${!isDub}`);
      detailInfo = data.data;
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
