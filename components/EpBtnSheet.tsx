"use client";

import { ApiSuccessType } from "@/types/apiResponse";
import {
  epSelectableList,
  getInitialEpRangeIdx,
  getMapEpisodes,
} from "@/utils/epRangeFunc";
import { IAnimeInfo } from "@consumet/extensions";
import axios, { isAxiosError } from "axios";
import classNames from "classnames";
import { Play } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useEffect, useMemo, useState } from "react";
import EpBtn from "./ui/EpBtn";
import Radio from "./ui/Radio";
import Select from "./ui/Select";

function EpBtnSheet({
  animeInfo = null,
  episodeNo = 1,
  isWatchPage = false,
}: {
  animeInfo: IAnimeInfo | null;
  episodeNo?: number;
  isWatchPage?: boolean;
}) {
  const { data: session } = useSession();
  const [isDub, setIsDub] = useQueryState(
    "dub",
    parseAsBoolean.withDefault(false)
  );

  const [isHovered, setIsHovered] = useState(false);
  const [watchedEp, setWatchedEp] = useState<number[]>([]);
  const [selectedEpRangeIdx, setSelectedEpRangeIdx] = useState(0);

  useEffect(() => {
    if (animeInfo?.id && episodeNo) {
      setSelectedEpRangeIdx(getInitialEpRangeIdx(episodeNo));
    }
  }, [animeInfo?.id, episodeNo]);

  useEffect(() => {
    localStorage.setItem("animeInfo", JSON.stringify(animeInfo));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animeInfo?.id, session]);

  const episodes = useMemo(
    () => (isDub ? animeInfo?.dubEpisodes : animeInfo?.episodes),
    [isDub, animeInfo]
  );

  // const handleClick = (ep: IAnimeEpisode) => {
  //   if (animeInfo?.id && ep?.id) {
  //     localStorage.setItem("animeInfo", JSON.stringify(animeInfo));

  //     router.push(`/watch/${animeInfo.id}/${ep.number}/${ep.id}?dub=${isDub}`);
  //   }
  // };

  if (!animeInfo || !(animeInfo?.episodes || animeInfo.dubEpisodes)) {
    return null;
  }

  return (
    <>
      {/* radio dub / sub btn */}
      <section className="flex max-w-lg items-center justify-between pb-4">
        <div className="flex items-center gap-1 capitalize">
          <Radio
            color={animeInfo?.color}
            isWatchPage={isWatchPage}
            enabled={isDub}
            handleChange={() => setIsDub((prev) => !prev)}
          />
          <p className={classNames({ "text-white": !isWatchPage })}>dub</p>
        </div>
      </section>
      {episodes &&
        (episodes.length === 1 ? (
          isWatchPage ? null : (
            <Link
              href={`/watch/${animeInfo.id}/${episodes[0].number}/${episodes[0].id}?dub=${isDub}`}
              className="m-auto my-4 flex w-36 items-center justify-center gap-2 rounded-[45px] border-2 bg-opacity-20 px-4 py-2"
              style={{
                color: isHovered ? animeInfo?.color || "#fff" : "#fff",
                borderColor: isHovered ? animeInfo?.color || "#fff" : "#fff",
                transition: "color 0.3s, border-color 0.3s",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <p className="text-xl font-medium">Watch</p>
              <Play strokeWidth={3} size={20} />
            </Link>
          )
        ) : (
          <>
            <Select
              color={animeInfo?.color}
              list={epSelectableList(episodes)}
              selected={epSelectableList(episodes)[selectedEpRangeIdx]}
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
              {getMapEpisodes(episodes, selectedEpRangeIdx).map(
                (episode, id) => (
                  <EpBtn
                    key={id}
                    episode={episode}
                    href={`/watch/${animeInfo.id}/${episode.number}/${episode.id}?dub=${isDub}`}
                    color={animeInfo?.color}
                    isWatchPage={isWatchPage}
                    watching={episodeNo === episode.number}
                    watched={watchedEp.includes(episode.number)}
                  />
                )
              )}
            </div>
          </>
        ))}
    </>
  );
}

export default EpBtnSheet;
