"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import {
  getInitialEpRangeIdx,
  mapEpisodes,
  epSelectableList,
} from "@/utils/epRangeFunc";
import Radio from "./ui/Radio";
import Select from "./ui/Select";
import EpBtn from "./ui/EpBtn";
import { useRouter } from "next/navigation";

function EpBtnSheet({
  detailInfo = null,
  isDubEnable = false,
  modeResponsiveness = true,
  episodeNo = 1,
}: {
  detailInfo: any;
  modeResponsiveness: boolean;
  isDubEnable: boolean;
  episodeNo?: number;
}) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [episodes, setEpisodes] = useState<any>([]);

  const [selectedEpRangeIdx, setSelectedEpRangeIdx] = useState(0);

  useEffect(() => {
    if (detailInfo?.id && episodeNo) {
      setSelectedEpRangeIdx(getInitialEpRangeIdx(episodeNo));
    }
  }, [detailInfo?.id, episodeNo]);

  useEffect(() => {
    setEpisodes(mapEpisodes(detailInfo?.episodes, selectedEpRangeIdx));
  }, [selectedEpRangeIdx, detailInfo]);

  const [watchedEp, setWatchedEp] = useState<number[]>([]);

  const handleChangeDubEnable = () => {
    router.push(`${window.location.pathname}?dub=${!isDubEnable}`);
  };

  const handleClick = (ep: any) => {
    if (ep?.id) {
      router.push(
        `/watch/${detailInfo?.id}/${ep.number}/${ep.id}?dub=${isDubEnable}`
        // {
        //   replace: true,
        //   state: { episode: ep },
        // }
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!detailInfo?.episodes.length) {
    return;
  }

  return (
    <>
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
            enabled={isDubEnable}
            setEnabled={handleChangeDubEnable}
          />
          <p>dub</p>
        </div>
        {/* <Select
            // name={"providers"}
            color={detailInfo?.color}
            list={providerList}
            selected={providerList[0]}
            onChange={(data) => {
              console.log(data);
            }}
          /> */}
      </div>
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
              setSelectedEpRangeIdx(Number(data.value));
            }}
          />
          <div
            className="grid gap-4 mt-3 justify-center"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(3.5rem, 3.5rem))",
            }}>
            {episodes.map((episode: any, id: number) => (
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
        </>
      )}
    </>
  );
}

export default EpBtnSheet;
