import SimpleBar from "simplebar-react";
import Carousel from "./Ui/Carousel";
import PosterBoard from "./PosterBoard";
import { useSelector } from "react-redux";

function HomeContentContainer() {
  const { trending, popular } = useSelector((state) => state.content);

  return (
    <div className="overflow-y-auto absolute top-20 bottom-20 xs:bottom-0 left-0 xs:left-20 right-0 z-20">
      <SimpleBar className="h-[calc(100vh-5rem)]">
        <Carousel />
        <PosterBoard name={"trending"} content={trending} />
        <PosterBoard name={"popular"} content={popular} />
      </SimpleBar>
    </div>
  );
}

export default HomeContentContainer;
