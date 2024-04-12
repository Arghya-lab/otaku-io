"use client";

import { useEffect, useState } from "react";
import chroma from "chroma-js";
import Skeleton from "react-loading-skeleton";
import axios, { isAxiosError } from "axios";
import EpBtnSheet from "@/components/EpBtnSheet";
import TopNavbar from "@/components/TopNavbar";
import RecommendItem from "./RecommendItem";
import Player from "./Player";
import { AnimeEpisodeType, DetailAnimeInfoType } from "@/types/anime";
import { themes } from "@/theme";
import { usePreference } from "@/components/providers/PreferenceProvider";

function VideoWatchPage({
  params,
  searchParams,
}: {
  params: { slug: ["animeId", "epNo", "epId"] };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  const animeId = decodeURIComponent(params.slug[0]);
  const epNo = decodeURIComponent(params.slug[1]);
  const epId = decodeURIComponent(params.slug[2]);
  const isDub = searchParams.dub === "true" ? true : false;

  const [detailInfo, setDetailInfo] = useState<DetailAnimeInfoType | null>(
    null
  );
  const [episode, setEpisode] = useState<AnimeEpisodeType | null>(null);

  useEffect(() => {
    (async () => {
      const savedDetailInfo: DetailAnimeInfoType | null = await JSON.parse(
        localStorage.getItem("detailInfo") || "null"
      );
      if (savedDetailInfo && savedDetailInfo?.episodes) {
        const savedEpisode = savedDetailInfo.episodes.find(
          (ep) => ep.id === epId
        );
        if (savedEpisode) {
          setDetailInfo(savedDetailInfo);
          setEpisode(savedEpisode);
        }
      } else {
        try {
          const res = await axios.get(
            `/api/detail-info/${animeId}?dub=${isDub}`
          );
          const data: DetailAnimeInfoType = res.data;

          setDetailInfo(data);
          if (data?.episodes) {
            setEpisode(data.episodes.find((ep) => ep.id === epId) ?? null);
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

  if (!detailInfo || !episode) {
    return (
      <div className="w-full relative h-full">
      <TopNavbar />
      <Skeleton
        className="rounded-md my-4 h-[75vh] w-[90%] m-[5%]"
        baseColor={chroma(theme.primaryColor).darken(1).toString()}
        highlightColor={chroma(theme.primaryColor).darken(1.5).toString()}
      />
    </div>
    );
  }

  const title =
    typeof detailInfo.title === "string"
      ? detailInfo.title
      : detailInfo.title?.english ||
        detailInfo.title?.romaji ||
        detailInfo.title?.native ||
        detailInfo.title?.userPreferred;

  return (
    <>
      <TopNavbar />
      <div className="flex flex-col md:flex-row">
        <div className="xxs:px-2 xs:px-6 lg:px-12 pb-8 pt-4 flex flex-col md:min-w-[700px] md:w-[66%] lg:min-w-[1000px] lg:w-[75%]">
          <Player
            animeId={animeId}
            title={
              detailInfo?.episodes?.length === 1
                ? title ?? ""
                : episode?.title ?? ""
            }
            detailInfo={detailInfo}
            epId={epId}
            epNo={epNo}
            isDub={isDub}
          />
          <p
            className="py-4 px-2 font-bold font-nunito text-xl"
            style={{ color: theme.textColor }}>
            {detailInfo?.episodes?.length === 1 ? title ?? "" : episode?.title}
          </p>
          <p
            className="pb-4 md:pb-18 lg:pb-12"
            style={{ color: theme.textColor }}>
            {episode?.description}
          </p>
          <div className="px-2 xxs:px-0">
            <EpBtnSheet
              detailInfo={detailInfo}
              isDubEnable={isDub}
              episodeNo={Number(epNo)}
              isWatchPage={true}
            />
          </div>
        </div>
        {detailInfo?.recommendations ? (
          <div
            className="flex-1 grid gap-4 justify-evenly pb-8 px-2 md:p-0"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 24rem))",
            }}>
            {detailInfo?.recommendations.slice(0, 8).map((recommendation) => (
              <RecommendItem key={recommendation.id} item={recommendation} />
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default VideoWatchPage;
