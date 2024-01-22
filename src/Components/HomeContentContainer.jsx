import { useSelector } from "react-redux";
import Carousel from "./Ui/Carousel";
import PosterBoard from "./PosterBoard";
import ContinueWatchingBoard from "./ContinueWatchingBoard";
import Skeleton from "react-loading-skeleton";

function HomeContentContainer() {
  const { trending, popular } = useSelector((state) => state.content);
  const { theme } = useSelector((state) => state.preference);

  return (
    <div className="xs:pl-20 pb-16 xs:pb-0">
      {trending.length > 0 && popular.length > 0 ? (
        <>
          <Carousel />
          <ContinueWatchingBoard />
          <PosterBoard name={"trending"} content={trending} />
          <PosterBoard name={"popular"} content={popular} />
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
