import { useEffect, useState } from "react";
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
  const { isDubEnabled } = useSelector((state) => state.preference);
  const [enabledDub, setEnabledDub] = useState(isDubEnabled);

  const handleChangeSubOrDub = () => {
    dispatch(
      loadDetailInfo({
        id,
        params: { dub: !enabledDub, provider: "gogoanime" },
      })
    ).then(() => setEnabledDub(!enabledDub));
  };

  useEffect(() => {
    dispatch(
      loadDetailInfo({
        id,
        params: { dub: isDubEnabled, provider: "gogoanime" },
      })
    );
  }, [id, isDubEnabled, dispatch]);

  return (
    <div className="max-w-[1600px] m-auto overflow-x-hidden">
      <TopNavbar color={detailInfo?.color} />
      <div className="flex flex-col md:flex-row">
        <div className="px-3.5 xxs:px-6 lg:px-12 mb-8 mt-2 flex flex-col md:min-w-[700px] md:w-[66%] lg:min-w-[1000px] lg:w-[75%]">
          <div className="rounded-lg overflow-hidden">
            <Player />
          </div>
          <div className="pb-4 md:pb-18 lg:pb-12">
            <p className="py-4 px-2 font-bold font-nunito text-xl text-neutral-900 dark:text-slate-100">
              {episode?.title}
            </p>
            <p className="text-neutral-900 dark:text-slate-100">
              {episode?.description}
            </p>
          </div>
          <EpStreamSheet
            enabledDub={enabledDub}
            setEnabledDub={handleChangeSubOrDub}
          />
        </div>
        {detailInfo?.recommendations && (
          <div>
            <p className="text-2xl text-center pt-6 pb-3 capitalize text-neutral-950 dark:text-slate-50">
              recommended
            </p>
            <div
              className="flex-1 grid gap-4 justify-evenly pb-8 px-2 md:p-0"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 24rem))",
              }}>
              {detailInfo?.recommendations.slice(0, 8).map((reco) => (
                <PosterItemVertical key={reco?.id} item={reco} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoPlayerPage;
