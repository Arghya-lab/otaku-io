"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Play } from "lucide-react";
import {
  getInitialEpRangeIdx,
  mapEpisodes,
  epSelectableList,
} from "@/utils/epRangeFunc";
import Radio from "./ui/Radio";
import Select from "./ui/Select";
import EpBtn from "./ui/EpBtn";
import setDetailInfoAndGetWatchPageLink from "@/utils/setDetailInfoAndGetWatchPageLink";
import { AnimeEpisodeType, DetailAnimeInfoType } from "@/types/anime";
import { useSession } from "next-auth/react";
import { usePreference } from "@/app/PreferenceProvider";
import { themes } from "@/theme";

function EpBtnSheet({
  detailInfo = null,
  isDubEnable = false,
  episodeNo = 1,
  isWatchPage = false,
}: {
  detailInfo: DetailAnimeInfoType | null;
  isDubEnable: boolean;
  episodeNo?: number;
  isWatchPage?: boolean;
}) {
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  const router = useRouter();
  const { data: session } = useSession();

  const [isHovered, setIsHovered] = useState(false);
  const [episodes, setEpisodes] = useState<AnimeEpisodeType[]>([]);
  const [watchedEp, setWatchedEp] = useState<number[]>([]);

  const [selectedEpRangeIdx, setSelectedEpRangeIdx] = useState(0);

  useEffect(() => {
    if (detailInfo?.id && episodeNo) {
      setSelectedEpRangeIdx(getInitialEpRangeIdx(episodeNo));
    }
  }, [detailInfo?.id, episodeNo]);

  useEffect(() => {
    if (detailInfo?.id && session) {
      (async () => {
        try {
          const { data }: { data: number[] } = await axios.get(
            `/api/anime/watched-episodes?animeId=${detailInfo.id}`
          );
          setWatchedEp(data);
        } catch (error) {
          console.log("error occur while fetching watched ep data :", error);
        }
      })();
    }
  }, [detailInfo?.id, session]);

  useEffect(() => {
    if (detailInfo?.episodes) {
      setEpisodes(mapEpisodes(detailInfo.episodes, selectedEpRangeIdx));
    }
  }, [selectedEpRangeIdx, detailInfo]);

  const handleChangeLang = async () => {
    if (isWatchPage && detailInfo) {
      setDetailInfoAndGetWatchPageLink(detailInfo.id, isDubEnable, episodeNo);
    } else {
      let currentPath = window.location.pathname;
      router.push(`${currentPath}?dub=${!isDubEnable}`);
    }
  };

  const handleClick = (ep: AnimeEpisodeType) => {
    if (detailInfo?.id && ep?.id) {
      localStorage.setItem("detailInfo", JSON.stringify(detailInfo));

      router.push(
        `/watch/${detailInfo.id}/${ep.number}/${ep.id}?dub=${isDubEnable}`
      );
    }
  };

  if (!detailInfo || !detailInfo?.episodes || !detailInfo?.episodes.length) {
    return null;
  }

  return (
    <>
      {/* radio dub / sub btn */}
      <div className="pb-4 max-w-lg flex items-center justify-between">
        <div className="flex gap-1 capitalize items-center\">
          <Radio
            color={detailInfo?.color}
            isWatchPage={isWatchPage}
            enabled={isDubEnable}
            setEnabled={handleChangeLang}
          />
          <p style={{ color: isWatchPage ? theme.textColor : "#fff" }}>dub</p>
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
        isWatchPage ? null : (
          <div
            role="button"
            className="px-4 py-2 w-36 m-auto my-4 bg-opacity-20 border-2 rounded-[45px] flex justify-center items-center gap-2"
            style={{
              color: isHovered ? detailInfo?.color || "#fff" : "#fff",
              borderColor: isHovered ? detailInfo?.color || "#fff" : "#fff",
              transition: "color 0.3s, border-color 0.3s",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
              if (detailInfo.episodes) {
                handleClick(detailInfo.episodes[0]);
              }
            }}>
            <p className="text-xl font-medium">Watch</p>
            <Play strokeWidth={3} size={20} />
          </div>
        )
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
            isWatchPage={isWatchPage}
          />
          <div
            className="grid gap-4 mt-3 justify-center"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(3.5rem, 3.5rem))",
            }}>
            {episodes.map((episode, id) => (
              <EpBtn
                key={id}
                episode={episode}
                color={detailInfo?.color}
                isWatchPage={isWatchPage}
                watching={episodeNo === episode.number}
                watched={watchedEp.includes(episode.number)}
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
