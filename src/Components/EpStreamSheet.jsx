import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Play } from "lucide-react";
import SimpleBar from "simplebar-react";
import Radio from "../Components/Ui/Radio";
import Select from "../Components/Ui/Select";
import EpBtn from "../Components/Ui/EpBtn";
import { providerList } from "../constants";
import { mapEpisodes } from "../utils/mapEpisodes";
import { epSelectableList } from "../utils/mapEpisodes";
import { loadDetailInfo } from "../features/content/contentSlice";

function EpStreamSheet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { detailInfo } = useSelector((state) => state.content);
  const [isHovered, setIsHovered] = useState(false);

  const [enabledDub, setEnabledDub] = useState(true);
  const [selectedEpRangeIdx, setSelectedEpRangeIdx] = useState(0);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    setEpisodes(mapEpisodes(detailInfo?.episodes, selectedEpRangeIdx));
  }, [selectedEpRangeIdx, detailInfo]);

  useEffect(() => {
    dispatch(loadDetailInfo({ id, params: { provider: "gogoanime" } }));
  }, [id, dispatch]);

  const handleClick = (ep) => {
    if (ep?.id) {
      navigate(`/watch/${detailInfo?.id}/${ep?.id}`, {
        state: { episode: ep },
      });
    }
  };

  return (
    <div>
      <div>
        {/* radio dub / sub btn */}
        <div className="pb-6 flex items-center justify-between">
          <div className="flex gap-1 capitalize items-center text-slate-200">
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
              className="px-4 py-2 w-36 m-auto my-4 bg-white hover:text-[#aeaee4] hover:border-[#aeaee4] bg-opacity-20 border-2 rounded-[45px] flex justify-center gap-2"
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

export default EpStreamSheet;
