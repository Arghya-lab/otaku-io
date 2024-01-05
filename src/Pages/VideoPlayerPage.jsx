import { useLocation } from "react-router-dom";
import TopNavbar from "../Components/TopNavbar";
// import BackBtn from "../Components/Ui/BackBtn";
// import MaximizeBtn from "../Components/Ui/MaximizeBtn";
// import UserBtn from "../Components/Ui/UserBtn";
import Player from "../Components/Ui/Player";
import SimpleBar from "simplebar-react";
import EpStreamSheet from "../Components/EpStreamSheet";
import PosterItemVertical from "../Components/PosterItemVertical";
import { useSelector } from "react-redux";

function VideoPlayerPage() {
  const { episode } = useLocation().state;
  const { detailInfo } = useSelector((state) => state.content);

  return (
    <div
      className=""
      style={{
        background: "linear-gradient(to right,  #141e30, #243b55)",
      }}>
      <TopNavbar />
      {/* <div className="w-screen px-5 h-20 flex items-center justify-between">
        <BackBtn />
        <div className="flex gap-4">
          <MaximizeBtn />
          <UserBtn />
        </div>
      </div> */}
      <SimpleBar className="h-[calc(100vh-5rem)]">
        <div className="flex">
          <div className="w-[960px] mx-12 my-5 flex flex-col">
            <Player />
            <div className="pb-8">
              <p className="py-4 font-bold font-nunito text-xl text-slate-100">
                {episode?.title}
              </p>
              <p className=" text-slate-100">{episode?.description}</p>
            </div>
            <EpStreamSheet />
          </div>
      {/* <SimpleBar className="h-[calc(100vh-5rem)]"> */}
          <div className="flex-1">
            {detailInfo?.recommendations.map((reco) => (
              <PosterItemVertical key={reco?.id} item={reco} />
            ))}
          </div>
      {/* </SimpleBar> */}
        </div>
      </SimpleBar>
    </div>
  );
}

export default VideoPlayerPage;
