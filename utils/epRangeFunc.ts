import { perSelectEpisodesAmount } from "@/types/constants";
import { IAnimeEpisode } from "@consumet/extensions";

const limit = perSelectEpisodesAmount;

export const getMapEpisodes = (
  episodes: IAnimeEpisode[] = [],
  selectedIdx: number
) => {
  const startEp = selectedIdx * limit + 1;
  const endEp = (selectedIdx + 1) * limit;

  const startEpId = episodes.findIndex((ep) => ep?.number >= startEp);
  const endEpId = episodes.findIndex((ep) => ep?.number >= endEp);

  return episodes.slice(startEpId, endEpId !== -1 ? endEpId + 1 : undefined);
};

export const epSelectableList = (episodes: IAnimeEpisode[] = []) => {
  const lastEpNo = episodes[episodes.length - 1]?.number || episodes.length;

  const totalSelectable = Math.ceil(lastEpNo / limit);
  const list = Array(totalSelectable).fill(0);

  return list.map((_, id) => ({
    name: `${id * limit + 1} - ${
      (id + 1) * limit <= lastEpNo ? (id + 1) * limit : lastEpNo
    }`,
    value: id,
  }));
};

export const getInitialEpRangeIdx = (epNo: number) => {
  let initialSelectedIdx = 0;
  let isFound = false;
  while (!isFound) {
    const startEpNo = initialSelectedIdx * limit + 1;
    const endEpNo = (initialSelectedIdx + 1) * limit;
    if (startEpNo <= epNo && endEpNo >= epNo) {
      isFound = true;
    } else {
      initialSelectedIdx++;
    }
  }
  return initialSelectedIdx;
};
