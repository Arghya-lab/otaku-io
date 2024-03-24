import axios from "axios";
import { DetailAnimeInfoType } from "@/types/anime";

const setDetailInfoAndGetWatchPageLink = async (
  id: string,
  isDub: boolean,
  epNo: number
) => {
  let detailInfo: DetailAnimeInfoType;

  try {
    const savedDetailInfo: DetailAnimeInfoType | null = await JSON.parse(
      localStorage.getItem("detailInfo") || "null"
    );
    const isSaveInfoDubType = savedDetailInfo?.subOrDub === "dub";

    if (
      savedDetailInfo &&
      savedDetailInfo.id === id &&
      isSaveInfoDubType === isDub
    ) {
      detailInfo = savedDetailInfo;
    } else {
      const { data }: { data: DetailAnimeInfoType } = await axios.get(
        `/api/detail-info/${id}?dub=${!isDub}`
      );
      detailInfo = data;
      localStorage.setItem("detailInfo", JSON.stringify(detailInfo));
    }

    const resEpisodes = detailInfo?.episodes;
    const isResDubType = detailInfo?.subOrDub === "dub";
    if (resEpisodes) {
      const currentEpisodeIdx = resEpisodes.findIndex(
        (episode: any) => episode.number == epNo
      );
      const currentEpisode = resEpisodes[currentEpisodeIdx];

      return `/watch/${detailInfo.id}/${currentEpisode.number}/${currentEpisode.id}?dub=${isResDubType}`;
    }
  } catch (error) {
    console.error(error);
  }
};

export default setDetailInfoAndGetWatchPageLink;
