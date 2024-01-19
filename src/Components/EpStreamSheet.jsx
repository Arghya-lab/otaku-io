import { useEffect, useState } from "react";
import PropType from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Play } from "lucide-react";
import SimpleBar from "simplebar-react";
import Radio from "../Components/Ui/Radio";
import Select from "../Components/Ui/Select";
import EpBtn from "../Components/Ui/EpBtn";
import { providerList } from "../constants";
import { mapEpisodes } from "../utils/mapEpisodes";
import { epSelectableList } from "../utils/mapEpisodes";
import watched from "../appwrite/watched";

function EpStreamSheet({
  modeResponsiveness = true,
  enabledDub,
  setEnabledDub,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const { detailInfo } = useSelector((state) => state.content);
  const { userData } = useSelector((state) => state.auth);
  const [isHovered, setIsHovered] = useState(false);

  const [selectedEpRangeIdx, setSelectedEpRangeIdx] = useState(0);
  const [episodes, setEpisodes] = useState([]);
  const [watchedEp, setWatchedEp] = useState([]);

  useEffect(() => {
    setEpisodes(mapEpisodes(detailInfo?.episodes, selectedEpRangeIdx));
  }, [selectedEpRangeIdx, detailInfo]);

  useEffect(() => {
    (async () => {
      if (userData.$id) {
        const eps = await watched.getAnimeWatchedEps(userData.$id, id);
        setWatchedEp(eps);
      }
    })();
  }, [userData, id]);

  const handleClick = (ep) => {
    if (ep?.id) {
      navigate(`/watch/${detailInfo?.id}/${ep.number}/${ep.id}`, {
        state: { episode: ep },
      });
    }
  };

  return (
    <div>
      <div>
        {/* radio dub / sub btn */}
        <div className="pb-4 max-w-lg flex items-center justify-between">
          <div
            className={`flex gap-1 capitalize items-center ${
              modeResponsiveness
                ? "text-neutral-800 dark:text-slate-300"
                : "text-slate-300"
            }`}>
            <Radio
              color={detailInfo?.color}
              enabled={enabledDub}
              setEnabled={setEnabledDub}
            />
            <p>dub</p>
          </div>
          <Select
            // name={"providers"}
            color={detailInfo?.color}
            list={providerList}
            selected={providerList[0]}
            onChange={(data) => {
              // dispatch(changeFilter({ type: "format", data }));
              console.log(data);
            }}
          />
        </div>
      </div>
      {detailInfo?.episodes && (
        <div>
          {detailInfo?.episodes.length === 1 ? (
            <div
              role="button"
              className={`px-4 py-2 w-36 m-auto my-4 ${
                modeResponsiveness ? "bg-black dark:bg-white" : "bg-white"
              } bg-opacity-20 border-2 rounded-[45px] flex justify-center gap-2`}
              style={{
                color: isHovered ? detailInfo?.color || "#fff" : "#fff",
                borderColor: isHovered ? detailInfo?.color || "#fff" : "#fff",
                transition: "color 0.3s, border-color 0.3s",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => handleClick(detailInfo?.episodes[0])}>
              <p className="text-xl font-medium">Watch</p>
              <Play strokeWidth={3} size={20} />
            </div>
          ) : (
            <>
              <Select
                color={detailInfo?.color}
                list={epSelectableList(detailInfo?.episodes)}
                selected={
                  epSelectableList(detailInfo?.episodes)[selectedEpRangeIdx]
                }
                onChange={(data) => {
                  setSelectedEpRangeIdx(data.value);
                }}
              />
              <SimpleBar className="pr-2 mt-3">
                <div
                  style={{
                    display: "grid",
                    gap: "1rem",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(3.5rem, 3.5rem))",
                  }}>
                  {episodes.map((episode, id) => (
                    <EpBtn
                      key={id}
                      episode={episode}
                      color={detailInfo?.color}
                      watched={watchedEp.includes(episode?.number)}
                      modeResponsiveness={modeResponsiveness}
                      handleClick={() => handleClick(episode)}
                    />
                  ))}
                </div>
              </SimpleBar>
            </>
          )}
        </div>
      )}
    </div>
  );
}

EpStreamSheet.propTypes = {
  modeResponsiveness: PropType.bool,
  enabledDub: PropType.bool.isRequired,
  setEnabledDub: PropType.func.isRequired,
};

export default EpStreamSheet;
