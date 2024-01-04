import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BackBtn from "../Components/Ui/BackBtn";
import MaximizeBtn from "../Components/Ui/MaximizeBtn";
import UserBtn from "../Components/Ui/UserBtn";
import { loadDetailInfo } from "../features/content/contentSlice";
import MetaPreviewContainer from "../Components/MetaPreviewContainer";
import Radio from "../Components/Ui/Radio";
import Select from "../Components/Ui/Select";
import { providerList } from "../constants";
import SimpleBar from "simplebar-react";
import { EpSelectableList, mapEpisodes } from "../utils/mapEpisodes";
import EpBtn from "../Components/Ui/EpBtn";

function DetailViewPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailInfo } = useSelector((state) => state.content);

  const [enabledDub, setEnabledDub] = useState(true);
  const [selectedEpRangeIdx, setSelectedEpRangeIdx] = useState(0);
  const [episodes, setEpisodes] = useState(true);

  useEffect(() => {
    setEpisodes(mapEpisodes(detailInfo?.episodes, selectedEpRangeIdx));
  }, [selectedEpRangeIdx, detailInfo]);

  const color = "#e4a15d";
  const url = "https://images.metahub.space/background/medium/tt0388629/img";

  useEffect(() => {
    dispatch(loadDetailInfo({ id, params: { provider: "gogoanime" } }));
  }, [id, dispatch]);

  return (
    <div
      className="h-screen w-screen overflow-hidden relative flex flex-col"
      // style={{
      //   background: "linear-gradient(to right,  #141e30, #243b55)",
      // }}
    >
      <div
        className="fixed -z-10 top-0 left-0 right-0 bottom-0 bg-cover bg-[#0f0d20]"
        style={{ backgroundImage: `url(${url})` }}>
        {/* <img className="opacity-30 object-cover" src={url} /> */}
        <div className="bg-black w-full h-full opacity-70"></div>
      </div>
      {/* Navbar */}
      <div className="w-screen px-5 h-20 flex items-center justify-between">
        <BackBtn />
        <div className="flex gap-4">
          <MaximizeBtn />
          <UserBtn />
        </div>
      </div>
      {/* Body */}
      <div className="flex">
        <div className="flex-1 ml-16 mt-4">
          <MetaPreviewContainer />
        </div>
        <div
          className="w-[416px] p-8 mx-4 mb-4 relative bg-black bg-opacity-20 rounded-xl"
          style={{ backdropFilter: "blur(15px)" }}>
          <div>
            {/* radio dub / sub btn */}
            <div className="pb-16 flex items-center justify-between">
              <Radio
                color={color}
                enabled={enabledDub}
                setEnabled={setEnabledDub}
              />
              <Select
                name={"providers"}
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
              <Select
                name={"select"}
                list={EpSelectableList(detailInfo?.episodes)}
                selected={EpSelectableList(detailInfo?.episodes)[0]}
                onChange={(data) => {
                  setSelectedEpRangeIdx(data.value);
                }}
              />
              <SimpleBar className="h-[545px] pr-2 mt-2">
                <div
                  style={{
                    display: "grid",
                    gap: "1rem",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(3.5rem, 3.5rem))",
                  }}>
                  {episodes.map((episode, id) => (
                    <EpBtn key={id} episode={episode} color={color} />
                  ))}
                </div>
              </SimpleBar>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailViewPage;
