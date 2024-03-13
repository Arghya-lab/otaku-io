import axios from "axios";

export const getSkipTimes = async (malId:string, epNo:string, epLength = 0) =>
  await axios.get(
    `https://api.aniskip.com/v2/skip-times/${malId}/${epNo}?episodeLength=${epLength}&types=op&types=ed&types=mixed-op&types=mixed-ed&types=recap`
  );
