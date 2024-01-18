import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Player from "../Components/Ui/Player";
import EpStreamSheet from "../Components/EpStreamSheet";
import PosterItemVertical from "../Components/PosterItemVertical";
import { loadDetailInfo } from "../features/content/contentSlice";
import TopNavbar from "../Components/TopNavbar";

function VideoPlayerPage() {
  const { id } = useParams();
  const episode = useLocation().state?.episode;

  const dispatch = useDispatch();
  const { detailInfo } = useSelector((state) => state.content);

  useEffect(() => {
    if (Object.keys(detailInfo).length == 0) {
      dispatch(loadDetailInfo({ id, params: { provider: "gogoanime" } }));
    }
  }, [detailInfo, id, dispatch]);

  return (
    <div className="max-w-[1600px] m-auto">
      <TopNavbar color={detailInfo?.color} />
      <div className="flex flex-col md:flex-row">
        <div className="px-3.5 xxs:px-6 xs:px-12 mb-8 mt-2 flex flex-col md:w-3/4 md:min-w-[700px] lg:min-w-[900px]">
          <Player />
          <div className="pb-4 md:pb-18 lg:pb-12">
            <p className="py-4 px-2 font-bold font-nunito text-xl text-neutral-900 dark:text-slate-100">
              {episode?.title}
            </p>
            <p className="text-neutral-900 dark:text-slate-100">
              {episode?.description}
            </p>
          </div>
          <EpStreamSheet />
        </div>
        {detailInfo?.recommendations && (
          <div className="flex-1 flex flex-col px-2 xxs:px-6 xs:px-12 md:p-0">
            {detailInfo?.recommendations.slice(0, 5).map((reco) => (
              <PosterItemVertical key={reco?.id} item={reco} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoPlayerPage;
