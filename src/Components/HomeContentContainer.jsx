import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Carousel from "./Ui/Carousel";
import PosterBoard from "./PosterBoard";
import ContinueWatchingBoard from "./ContinueWatchingBoard";
import animeApi from "../Api/animeApi";

function HomeContentContainer() {
  const navigate = useNavigate();
  const { trending, popular } = useSelector((state) => state.content);
  const { theme } = useSelector((state) => state.preference);

  const handleRandomBtnClick = async () => {
    try {
      const { data } = await animeApi.getRandomAnime();
      if (data?.id) {
        const title =
          data?.title?.english ||
          data?.title?.romaji ||
          data?.title?.native ||
          data?.title?.userPreferred;
        navigate(
          `/detail/${data.id}/${title}?dub=${
            data?.subOrDub === "dub" ? true : false
          }`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="xs:pl-20 pb-16 xs:pb-0">
      {trending.length > 0 && popular.length > 0 ? (
        <>
          <Carousel />
          <ContinueWatchingBoard />
          <PosterBoard name={"trending"} content={trending} />
          <PosterBoard name={"popular"} content={popular} />
          <div className="flex pt-4 pb-16">
            <p className="text-neutral-900 dark:text-slate-100 text-lg font-nunito">
              Didn&apos;t like any of the above?
            </p>
            <button
              onClick={handleRandomBtnClick}
              className="hover:underline pl-1"
              style={{ color: theme.secondaryColor }}>
              Show me a random anime!
            </button>
          </div>
        </>
      ) : (
        <div className="px-4">
          <Skeleton
            className="h-64 w-full rounded-xl"
            baseColor={theme.type === "dark" ? "#111" : "#ddd"}
            highlightColor={theme.type === "dark" ? "#222" : "#bbb"}
            count={4}
          />
        </div>
      )}
    </div>
  );
}

export default HomeContentContainer;
