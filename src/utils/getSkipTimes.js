import animeApi from "../Api/animeApi";

const getSkipTimes = async (malId, epNo, epLength = 0) => {
  try {
    const { data } = await animeApi.getSkipTimes(malId, epNo, epLength);

    if (data?.found) {
      const results = data?.results || [];
      const output = results.map((result) => {
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

export default getSkipTimes;
