import "client-only";

import { SkipTimeType } from "@/types/anime";
import axios from "axios";

export const getSkipTimes = async (
  malId: string | number,
  epNo: string | number,
  epLength = 0
) => {
  try {
    const { data } = await axios.get(
      `https://api.aniskip.com/v2/skip-times/${malId}/${epNo}?episodeLength=${epLength}&types=op&types=ed&types=mixed-op&types=mixed-ed&types=recap`
    );
    if (data?.found) {
      const results = data?.results || [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const output: SkipTimeType[] = results.map((result: any) => {
        switch (result.skipType) {
          case "op":
            return {
              type: "intro",
              startTime: result.interval.startTime,
              endTime: result.interval.endTime,
            };

          case "ed":
            return {
              type: "outro",
              startTime: result.interval.startTime,
              endTime: result.interval.endTime,
            };

          case "mixed-op":
            return {
              type: "mix-intro",
              startTime: result.interval.startTime,
              endTime: result.interval.endTime,
            };

          case "mixed-ed":
            return {
              type: "mix-outro",
              startTime: result.interval.startTime,
              endTime: result.interval.endTime,
            };

          case "recap":
            return {
              type: "recap",
              startTime: result.interval.startTime,
              endTime: result.interval.endTime,
            };

          default:
            return {};
        }
      });
      return output;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};
