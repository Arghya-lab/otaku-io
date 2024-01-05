import { perSelectEpisodesAmount } from "../constants";

const limit = perSelectEpisodesAmount;

export const mapEpisodes = (episodes = [], selectedInx) => {
  const startEp = selectedInx * limit + 1;
  const endEp = (selectedInx + 1) * limit;

  const startEpId = episodes.findIndex((ep) => ep?.number >= startEp);
  const endEpId = episodes.findIndex((ep) => ep?.number >= endEp);

  return episodes.slice(startEpId, endEpId !== -1 ? endEpId : undefined);
};

export const epSelectableList = (episodes = []) => {
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
