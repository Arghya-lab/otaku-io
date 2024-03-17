import axios from "axios";

const setDetailInfoAndGetWatchPageLink = async (
  id: string,
  isDub: boolean,
  epNo: number
) => {
  let detailInfo;

  try {
    const savedDetailInfo = await JSON.parse(
      localStorage.getItem("detailInfo") || "null"
    );
    const isSaveInfoDubType = savedDetailInfo?.subOrDub === "dub";

    if (savedDetailInfo?.id == id && isSaveInfoDubType === isDub) {
      detailInfo = savedDetailInfo;
    } else {
      const { data } = await axios.get(`/api/detail-info/${id}?dub=${!isDub}`);
      detailInfo = data;
      localStorage.setItem("detailInfo", JSON.stringify(detailInfo));
    }

    const resEpisodes = detailInfo?.episodes;
    const isResDubType = detailInfo?.subOrDub === "dub";

    const currentEpisodeIdx = resEpisodes.findIndex(
      (episode: any) => episode.number == epNo
    );
    const currentEpisode = resEpisodes[currentEpisodeIdx];

    return `/watch/${detailInfo.id}/${currentEpisode.number}/${currentEpisode.id}?dub=${isResDubType}`;
  } catch (error) {
    console.error(error);
  }
};

export default setDetailInfoAndGetWatchPageLink;
