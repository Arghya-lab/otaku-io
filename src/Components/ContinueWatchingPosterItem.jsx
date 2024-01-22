import { useEffect, useState } from "react";
import PropType from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import { PlayCircle } from "lucide-react";
import animeApi from "../Api/animeApi";
import { shade } from "../utils/color";
import { loadDetailInfo } from "../features/content/contentSlice";

function ContinueWatchingPosterItem({ WatchingInfo }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isDubEnabled } = useSelector((state) => state.preference);

  const [itemData, setItemData] = useState(null);
  const [isHover, setIsHover] = useState(false);
  const [isDetailDataFetching, setIsDetailDataFetching] = useState(false);

  const handleClick = () => {
    setIsDetailDataFetching(true);
    dispatch(
      loadDetailInfo({
        id: itemData.id,
        params: { dub: isDubEnabled, provider: "gogoanime" },
      })
    ).then((res) => {
      const detailData = res.payload;
      const lastWatchedEp = detailData?.episodes.find(
        (episode) => episode?.number == WatchingInfo?.episodeNo
      );
      if (lastWatchedEp?.id) {
        navigate(
          `/watch/${detailData?.id}/${lastWatchedEp.number}/${lastWatchedEp.id}?dub=${isDubEnabled}`,
          {
            state: { episode: lastWatchedEp },
          }
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  };

  useEffect(() => {
    const setData = async () => {
      const { data } = await animeApi.getAnimeById(WatchingInfo.animeId);
      setItemData(data?.results[0]);
    };
    if (WatchingInfo?.animeId) setData();
  }, [WatchingInfo?.animeId]);

  return (
    <div
      role="button"
      className="p-1.5 xxs:p-3 xs:p-4 w-full"
      onPointerEnter={() => {
        setIsHover(true);
      }}
      onPointerLeave={() => {
        setIsHover(false);
      }}
      onClick={handleClick}>
      <div
        className={`pt-[calc(100%*1.464)] w-full relative overflow-hidden rounded-xl ring-[3px] ${
          isHover ? "ring-slate-50" : "ring-transparent"
        }`}>
        <div
          className={`absolute top-0 bottom-0 left-0 right-0 z-0 flex items-center justify-center`}>
          {!isDetailDataFetching ? (
            <PlayCircle
              size={48}
              strokeWidth={isHover ? 1.5 : 1}
              className={`text-white ${isHover ? "scale-125" : null}`}
              style={
                isHover
                  ? itemData?.color
                    ? { color: shade(itemData?.color, -2) }
                    : null
                  : null
              }
            />
          ) : (
            <Oval
              visible={true}
              height="60"
              width="60"
              color="#fff"
              secondaryColor="#fff"
              strokeWidth={5}
              ariaLabel="oval-loading"
            />
          )}
        </div>
        <div
          className={`h-[calc(100%*1.464)] absolute top-0 -z-10 overflow-hidden transition-transform duration-200 ease-in transform-gpu ${
            isHover ? "scale-110" : null
          }`}>
          <img
            className="object-cover object-center h-full w-full"
            src={itemData?.image}
          />
        </div>
      </div>
      <div className="h-16 text-sm font-medium flex items-center overflow-visible">
        <p
          className="px-2 w-full line-clamp-2 text-center text-neutral-950 dark:text-white"
          style={
            isHover
              ? itemData?.color
                ? { color: shade(itemData?.color, -2) }
                : null
              : null
          }>
          {itemData?.title?.english ||
            itemData?.title?.userPreferred ||
            itemData?.title?.romaji ||
            itemData?.title?.native}
        </p>
      </div>
    </div>
  );
}

ContinueWatchingPosterItem.propTypes = {
  WatchingInfo: PropType.object.isRequired,
};

export default ContinueWatchingPosterItem;
