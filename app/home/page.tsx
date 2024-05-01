import Carousel from "@/app/home/Carousel";
import PosterBoard from "@/app/home/PosterBoard";
import { getPopular, getTrending } from "@/services/getAnime";
import ContinueWatchingPosterBoard from "./ContinueWatchingPosterBoard";

export default async function Home() {
  const [{ results: trending }, { results: popular }] = await Promise.all([
    getTrending(),
    getPopular(),
  ]);

  return trending.length > 0 && popular.length > 0 ? (
    <>
      <Carousel trending={trending} />
      <ContinueWatchingPosterBoard />
      <PosterBoard name={"trending"} content={trending} />
      <PosterBoard name={"popular"} content={popular} />
    </>
  ) : null;
}
