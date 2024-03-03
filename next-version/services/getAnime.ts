import { ANIME, META, PROVIDERS_LIST } from "@consumet/extensions";
import Anilist from "@consumet/extensions/dist/providers/meta/anilist";
import NineAnime from "@consumet/extensions/dist/providers/anime/9anime";

const generateAnilistMeta = (
  provider: string | undefined = undefined
): Anilist => {
  if (typeof provider !== "undefined") {
    let possibleProvider = PROVIDERS_LIST.ANIME.find(
      (p) => p.name.toLowerCase() === provider.toLocaleLowerCase()
    );

    if (possibleProvider instanceof NineAnime) {
      possibleProvider = new ANIME.NineAnime(
        process.env?.NINE_ANIME_HELPER_URL,
        {
          url: process.env?.NINE_ANIME_PROXY as string,
        },
        process.env?.NINE_ANIME_HELPER_KEY as string
      );
    }

    return new META.Anilist(possibleProvider, {
      url: process.env.PROXY as string | string[],
    });
  } else {
    return new Anilist(undefined, {
      url: process.env.PROXY as string | string[],
    });
  }
};

// Query Parameters for getTrending:  page, perPage
export const getTrending = async (page = 1, perPage = 10) => {
  const anilist = generateAnilistMeta();
  return await anilist.fetchTrendingAnime(page, perPage);
};

// Query Parameters for getPopular:  page, perPage
export const getPopular = async (page = 1, perPage = 10) => {
  const anilist = generateAnilistMeta();
  return await anilist.fetchPopularAnime(page, perPage);
};
