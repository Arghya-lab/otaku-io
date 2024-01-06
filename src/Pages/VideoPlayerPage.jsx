import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import SimpleBar from "simplebar-react";
import Player from "../Components/Ui/Player";
import TopNavbar from "../Components/TopNavbar";
import EpStreamSheet from "../Components/EpStreamSheet";
import PosterItemVertical from "../Components/PosterItemVertical";
import { loadDetailInfo } from "../features/content/contentSlice";

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
          <div className="w-[960px] mx-12 mb-8mt-2 flex flex-col">
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
            <div className="flex-1">
              {detailInfo?.recommendations.map((reco) => (
                <PosterItemVertical key={reco?.id} item={reco} />
              ))}
            </div>
          )}
          {/* </SimpleBar> */}
        </div>
      </SimpleBar>
    </div>
  );
}

export default VideoPlayerPage;
