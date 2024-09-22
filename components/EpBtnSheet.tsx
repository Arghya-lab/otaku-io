"use client";

import { usePreference } from "@/components/providers/PreferenceProvider";
import { themes } from "@/theme";
import { ApiSuccessType } from "@/types/apiResponse";
import {
  epSelectableList,
  getInitialEpRangeIdx,
  mapEpisodes,
} from "@/utils/epRangeFunc";
import setDetailInfoAndGetWatchPageLink from "@/utils/setDetailInfoAndGetWatchPageLink";
import { IAnimeEpisode, IAnimeInfo } from "@consumet/extensions";
import axios, { isAxiosError } from "axios";
import { Play } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import EpBtn from "./ui/EpBtn";
import Radio from "./ui/Radio";
import Select from "./ui/Select";

function EpBtnSheet({
  animeInfo = null,
  isDubEnable = false,
  episodeNo = 1,
  isWatchPage = false,
}: {
  animeInfo: IAnimeInfo | null;
  isDubEnable: boolean;
  episodeNo?: number;
  isWatchPage?: boolean;
}) {
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  const router = useRouter();
  const { data: session } = useSession();

  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState<IAnimeEpisode[]>([]);
  const [watchedEp, setWatchedEp] = useState<number[]>([]);

  const [selectedEpRangeIdx, setSelectedEpRangeIdx] = useState(0);

  useEffect(() => {
    if (animeInfo?.id && episodeNo) {
      setSelectedEpRangeIdx(getInitialEpRangeIdx(episodeNo));
    }
  }, [animeInfo?.id, episodeNo]);

  useEffect(() => {
    if (animeInfo?.id && session) {
      (async () => {
        try {
          const { data }: { data: ApiSuccessType<number[]> } = await axios.get(
            `/api/anime/watched-episodes?animeId=${animeInfo.id}`
          );
          setWatchedEp(data.data);
        } catch (error) {
          if (isAxiosError(error)) {
            console.error(error.message);
          }
        }
      })();
    }
  }, [animeInfo?.id, session]);

  useEffect(() => {
    if (animeInfo?.episodes) {
      setIsLoading(false);
      setEpisodes(mapEpisodes(animeInfo.episodes, selectedEpRangeIdx));
    }
  }, [selectedEpRangeIdx, animeInfo]);

  const handleChangeLang = () => {
    setIsLoading(true);

    setTimeout(async () => {
      if (isWatchPage && animeInfo) {
        await setDetailInfoAndGetWatchPageLink(
          animeInfo.id,
          isDubEnable,
          episodeNo
        );
      } else {
        const currentPath = window.location.pathname;
        const title = new URLSearchParams(window.location.search).get("title");
        router.push(`${currentPath}?title=${title}&dub=${!isDubEnable}`);
      }
    }, 0);
  };

  const handleClick = (ep: IAnimeEpisode) => {
    if (animeInfo?.id && ep?.id) {
      localStorage.setItem("animeInfo", JSON.stringify(animeInfo));

      router.push(
        `/watch/${animeInfo.id}/${ep.number}/${ep.id}?dub=${isDubEnable}`
      );
    }
  };

  if (!animeInfo || !animeInfo?.episodes) {
    return null;
  }

  return (
    <>
      {/* radio dub / sub btn */}
      <section className="flex max-w-lg items-center justify-between pb-4">
        <div className="flex items-center gap-1 capitalize">
          {!isLoading ? (
            <Radio
              color={animeInfo?.color}
              isWatchPage={isWatchPage}
              enabled={isDubEnable}
              handleChange={handleChangeLang}
            />
          ) : (
            <DNA
              visible={true}
              height="22"
              width="42"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          )}
          <p style={{ color: isWatchPage ? theme.textColor : "#fff" }}>
            {!isLoading ? "dub" : "Loading"}
          </p>
        </div>
        {/* <Select
            // name={"providers"}
            color={animeInfo?.color}
            list={providerList}
            selected={providerList[0]}
            onChange={(data) => {
              console.log(data);
            }}
          /> */}
      </section>
      {animeInfo?.episodes.length > 0 &&
        (animeInfo?.episodes.length === 1 ? (
          isWatchPage ? null : (
            <div
              role="button"
              className="m-auto my-4 flex w-36 items-center justify-center gap-2 rounded-[45px] border-2 bg-opacity-20 px-4 py-2"
              style={{
                color: isHovered ? animeInfo?.color || "#fff" : "#fff",
                borderColor: isHovered ? animeInfo?.color || "#fff" : "#fff",
                transition: "color 0.3s, border-color 0.3s",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => {
                if (animeInfo.episodes) {
                  handleClick(animeInfo.episodes[0]);
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
              color={animeInfo?.color}
              list={epSelectableList(animeInfo?.episodes)}
              selected={
                epSelectableList(animeInfo?.episodes)[selectedEpRangeIdx]
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
                  color={animeInfo?.color}
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
