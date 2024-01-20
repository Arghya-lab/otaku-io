import { useSelector } from "react-redux";
import Carousel from "./Ui/Carousel";
import PosterBoard from "./PosterBoard";
import ContinueWatchingBoard from "./continueWatchingBoard";

function HomeContentContainer() {
  const { trending, popular } = useSelector((state) => state.content);

  return (
    <div className="xs:pl-20 pb-16 xs:pb-0">
      <Carousel />
      <ContinueWatchingBoard />
      <PosterBoard name={"trending"} content={trending} />
      <PosterBoard name={"popular"} content={popular} />
    </div>
  );
}

export default HomeContentContainer;
