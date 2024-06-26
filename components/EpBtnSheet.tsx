"use client";

import { usePreference } from "@/components/providers/PreferenceProvider";
import { themes } from "@/theme";
import { AnimeEpisodeType, DetailAnimeInfoType } from "@/types/anime";
import { ApiSuccessType } from "@/types/apiResponse";
import {
  epSelectableList,
  getInitialEpRangeIdx,
  mapEpisodes,
} from "@/utils/epRangeFunc";
import setDetailInfoAndGetWatchPageLink from "@/utils/setDetailInfoAndGetWatchPageLink";
import axios, { isAxiosError } from "axios";
import { Play } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EpBtn from "./ui/EpBtn";
import Radio from "./ui/Radio";
import Select from "./ui/Select";

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
          const { data }: { data: ApiSuccessType<number[]> } = await axios.get(
            `/api/anime/watched-episodes?animeId=${detailInfo.id}`
          );
          setWatchedEp(data.data);
        } catch (error) {
          if (isAxiosError(error)) {
            console.error(error.message);
          }
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
      const currentPath = window.location.pathname;
      const title = new URLSearchParams(window.location.search).get("title");
      router.push(`${currentPath}?title=${title}&dub=${!isDubEnable}`);
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

  if (!detailInfo || !detailInfo?.episodes) {
    return null;
  }

  return (
    <>
      {/* radio dub / sub btn */}
      <section className="flex max-w-lg items-center justify-between pb-4">
        <div className="flex items-center gap-1 capitalize">
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
      </section>
      {detailInfo?.episodes.length > 0 &&
        (detailInfo?.episodes.length === 1 ? (
          isWatchPage ? null : (
            <div
              role="button"
              className="m-auto my-4 flex w-36 items-center justify-center gap-2 rounded-[45px] border-2 bg-opacity-20 px-4 py-2"
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
              }}
            >
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
              className="mt-3 grid max-h-64 justify-center gap-4 overflow-y-auto md:max-h-none"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(3.5rem, 3.5rem))",
              }}
            >
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
        ))}
    </>
  );
}

export default EpBtnSheet;
