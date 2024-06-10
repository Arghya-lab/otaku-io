import "server-only";
import { AnimeImdbInfoType } from "@/types/anime";
import axios, { isAxiosError } from "axios";

export const getImdbInfo = async (title: string) => {
  try {
    const { data }: { data: AnimeImdbInfoType } = await axios.get(
      "https://www.omdbapi.com/",
      {
        params: {
          apikey: process.env.OMDB_API_KEY,
          t: title,
        },
      }
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("An unexpected error occurred:", error.message);
    }
  }
};
