import { useSelector } from "react-redux";
import TopNavbar from "../Components/TopNavbar";
import MetaPreviewContainer from "../Components/MetaPreviewContainer";
import EpStreamSheet from "../Components/EpStreamSheet";

function DetailViewPage() {
  const { imdbInfo } = useSelector((state) => state.content);
  const url = `https://images.metahub.space/background/medium/${imdbInfo?.imdbID}/img`;

  return (
    <div className="w-full relative">
      <div
        className="fixed -z-10 w-screen h-screen bg-cover bg-[#0f0d20]"
        style={{ backgroundImage: `url(${url})` }}>
        {/* <img className="opacity-30 object-cover" src={url} /> */}
        <div className="bg-black w-full h-full opacity-70"></div>
      </div>
      <div>
        <TopNavbar />
        {/* Body */}
        <div className="w-full mt-20">
          <div className="pt-4 px-4 xxs:px-8 xs:px-16 sm:pr-48 md:pr-80 lg:pr-[416px]">
            <MetaPreviewContainer />
          </div>
          <div
            className="mx-4 xxs:mx-8 xs:mx-16 my-8 h-full p-8 px-4 bg-black bg-opacity-20 rounded-xl"
            style={{ backdropFilter: "blur(15px)" }}>
            <EpStreamSheet modeResponsiveness={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailViewPage;
