import SimpleBar from "simplebar-react";
import Carousel from "./Ui/Carousel";
import PosterBoard from "./PosterBoard";
import { useSelector } from "react-redux";

function HomeContentContainer() {
  const { trending, popular } = useSelector(state=>state.content
    )
  return (
    <SimpleBar className="h-[calc(100vh-88px)]">
      <Carousel />
      <PosterBoard name={"trending"} content={trending} />
      <PosterBoard name={"popular"} content={popular} />
    </SimpleBar>
  );
}

export default HomeContentContainer;
