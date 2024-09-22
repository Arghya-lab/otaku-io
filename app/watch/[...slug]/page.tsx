"use client";

import EpBtnSheet from "@/components/EpBtnSheet";
import { usePreference } from "@/components/providers/PreferenceProvider";
import { themes } from "@/theme";
import { ApiSuccessType } from "@/types/apiResponse";
import getTitle from "@/utils/getTitle";
import { IAnimeEpisode, IAnimeInfo } from "@consumet/extensions";
import axios, { isAxiosError } from "axios";
import chroma from "chroma-js";
import htmlParse from "html-react-parser";
import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Player from "./Player";
import RecommendItem from "./RecommendItem";

function VideoWatchPage({
  params,
  searchParams,
}: {
  params: { slug: ["animeId", "epNo", "epId"] };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  const currentAnimeContainer = useRef<HTMLDivElement>(null);

  const animeId = decodeURIComponent(params.slug[0]);
  const epNo = decodeURIComponent(params.slug[1]);
  const epId = decodeURIComponent(params.slug[2]);
  const isDub = searchParams.dub === "true" ? true : false;

  const [animeInfo, setAnimeInfo] = useState<IAnimeInfo | null>(null);
  const [episode, setEpisode] = useState<IAnimeEpisode | null>(null);

  useEffect(() => {
    (async () => {
      const savedAnimeInfo: IAnimeInfo | null = await JSON.parse(
        localStorage.getItem("animeInfo") || "null"
      );

      if (
        savedAnimeInfo &&
        (savedAnimeInfo.hasDub === isDub ||
          (savedAnimeInfo.subOrDub === "dub") === isDub) &&
        savedAnimeInfo?.episodes
      ) {
        const savedEpisode = savedAnimeInfo.episodes.find(
          (ep) => ep.id === epId
        );
        if (savedEpisode) {
          setAnimeInfo(savedAnimeInfo);
          setEpisode(savedEpisode);
        }
      } else {
        try {
          const { data }: { data: ApiSuccessType<IAnimeInfo> } =
            await axios.get(`/api/anime/info/${animeId}?dub=${isDub}`);

          setAnimeInfo(data.data);
          if (data.data?.episodes) {
            setEpisode(data.data.episodes.find((ep) => ep.id === epId) ?? null);
          }
        } catch (error) {
          if (isAxiosError(error)) {
            console.log(error.message);
          }
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!animeId || !epNo || !epId) {
    return <p>Invalid url</p>;
  }

  if (!animeInfo || !episode) {
    return (
      <div className="relative h-full w-full">
        <Skeleton
          className="m-[5%] my-4 h-[75vh] w-[90%] rounded-md"
          baseColor={chroma(theme.primaryColor).darken(1).toString()}
          highlightColor={chroma(theme.primaryColor).darken(1.5).toString()}
        />
      </div>
    );
  }

  const title = getTitle(animeInfo.title);

  return (
    <div className="flex flex-col md:flex-row">
      <div
        ref={currentAnimeContainer}
        className="flex h-auto flex-grow-0 flex-col pb-8 xxs:px-2 xs:px-6 md:w-[66%] md:min-w-[700px] lg:w-[75%] lg:min-w-[1000px] lg:px-12"
      >
        <Player
          animeId={animeId}
          infoText={{
            title:
              animeInfo?.episodes?.length !== 1 ? episode?.title || "" : title,
            summery: animeInfo?.episodes?.length !== 1 ? title : undefined,
          }}
          animeInfo={animeInfo}
          epId={epId}
          epNo={epNo}
          isDub={isDub}
        />
        <h2
          className="px-2 py-4 font-nunito text-2xl font-bold xxs:px-0"
          style={{ color: theme.textColor }}
        >
          {animeInfo?.episodes?.length === 1 ? (title ?? "") : episode?.title}
        </h2>
        <p
          className="md:pb-18 px-2 pb-4 xxs:px-0 lg:pb-12"
          style={{ color: theme.textColor }}
        >
          {htmlParse(episode?.description || "")}
        </p>
        <div className="px-2 xxs:px-0">
          <EpBtnSheet
            animeInfo={animeInfo}
            isDubEnable={isDub}
            episodeNo={Number(epNo)}
            isWatchPage={true}
          />
        </div>
      </div>
      <section className="flex h-min flex-col overflow-y-auto md:pr-6">
        <p
          className="px-2 pb-4 pt-8 text-2xl capitalize xs:px-6 md:px-0 md:pt-0"
          style={{ color: theme.textColor }}
        >
          Recommendations
        </p>
        {animeInfo?.recommendations ? (
          <div
            className="grid flex-1 justify-evenly gap-4 px-2 pb-8 md:p-0 md:pb-8"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 24rem))",
            }}
          >
            {animeInfo?.recommendations
              .slice(0, 6)
              .map((recommendation) => (
                <RecommendItem key={recommendation.id} item={recommendation} />
              ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default VideoWatchPage;
