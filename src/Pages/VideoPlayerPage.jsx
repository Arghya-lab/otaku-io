import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import SimpleBar from "simplebar-react";
import Player from "../Components/Ui/Player";
import EpStreamSheet from "../Components/EpStreamSheet";
import PosterItemVertical from "../Components/PosterItemVertical";
import { loadDetailInfo } from "../features/content/contentSlice";
import BackBtn from "../Components/Ui/BackBtn";
import MinMaximizeBtn from "../Components/Ui/MinMaximizeBtn";

function VideoPlayerPage() {
  const { id } = useParams();
  const { episode } = useLocation().state;

  const dispatch = useDispatch();
  const { detailInfo } = useSelector((state) => state.content);

  useEffect(() => {
    if (Object.keys(detailInfo).length == 0) {
      dispatch(loadDetailInfo({ id, params: { provider: "gogoanime" } }));
    }
  }, [detailInfo, id, dispatch]);

  return (
    <div
      style={{
        background: "linear-gradient(to right,  #141e30, #243b55)",
      }}>
        <div 
    className="max-w-[1600px] m-auto">
      {/* <TopNavbar /> */}
      <div className="px-5 h-20 flex items-center justify-between">
        <BackBtn />
        <MinMaximizeBtn />
      </div>
      <SimpleBar className="h-[calc(100vh-5rem)] bg-transparent">
        <div className="flex flex-col md:flex-row">
          <div className="px-2 xxs:px-6 xs:px-12 mb-8 mt-2 flex flex-col md:w-3/4 md:min-w-[700px] lg:min-w-[900px]">
            <Player />
            <div className="pb-20">
              <p className="py-4 font-bold font-nunito text-xl text-slate-100">
                {episode?.title}
              </p>
              <p className=" text-slate-100">{episode?.description}</p>
            </div>
            <EpStreamSheet />
          </div>
          {/* <SimpleBar className="h-[calc(100vh-5rem)]"> */}
          {detailInfo?.recommendations && (
          <div className="flex-1 h-[calc(100vh-5rem)] flex flex-col px-2 xxs:px-6 xs:px-12 md:p-0">
            {detailInfo?.recommendations.slice(0, 5).map((reco) => (
              <PosterItemVertical key={reco?.id} item={reco} />
            ))}
          </div>
          )}
          {/* </SimpleBar> */}
        </div>
      </SimpleBar>
    </div></div>
  );
}

export default VideoPlayerPage;
