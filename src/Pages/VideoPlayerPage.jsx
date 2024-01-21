import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Player from "../Components/Ui/Player";
import EpStreamSheet from "../Components/EpStreamSheet";
import PosterItemVertical from "../Components/PosterItemVertical";
import { loadDetailInfo } from "../features/content/contentSlice";
import TopNavbar from "../Components/TopNavbar";

function VideoPlayerPage() {
  const { id, epNo } = useParams();
  const episode = useLocation().state?.episode;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { detailInfo } = useSelector((state) => state.content);

  const isEnabledDub = JSON.parse(
    searchParams.get("dub")?.toLowerCase() || false
  );

  const handleToggleSubOrDub = () => {
    dispatch(
      loadDetailInfo({
        id,
        params: { dub: !isEnabledDub, provider: "gogoanime" },
      })
    ).then((res) => {
      if (res?.payload) {
        const resEpisodes = res.payload?.episodes;
        const isResDubType = res.payload?.subOrDub === "dub";
        const currentEpisodeIdx = resEpisodes.findIndex(
          (episode) => episode.number == epNo
        );
        const currentEpisode = resEpisodes[currentEpisodeIdx];
        navigate(
          `/watch/${id}/${epNo}/${currentEpisode.id}?dub=${isResDubType}`,
          { replace: true }
        );
      }
    });
  };

  return (
    <div className="max-w-[1600px] m-auto overflow-x-hidden">
      <TopNavbar color={detailInfo?.color} />
      <div className="flex flex-col md:flex-row">
        <div className="px-3.5 xxs:px-6 lg:px-12 pb-8 flex flex-col md:min-w-[700px] md:w-[66%] lg:min-w-[1000px] lg:w-[75%]">
          <Player />
          <div className="pb-4 md:pb-18 lg:pb-12">
            <p className="py-4 px-2 font-bold font-nunito text-xl text-neutral-900 dark:text-slate-100">
              {episode?.title}
            </p>
            <p className="text-neutral-900 dark:text-slate-100">
              {episode?.description}
            </p>
          </div>
          <EpStreamSheet
            enabledDub={isEnabledDub}
            setEnabledDub={handleToggleSubOrDub}
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
