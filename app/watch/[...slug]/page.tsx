"use client";

import EpBtnSheet from "@/components/EpBtnSheet";
import TopNavbar from "@/components/TopNavbar";
import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import RecommendItem from "./RecommendItem";
import Player from "./Player";
import { AnimeEpisodeType, DetailAnimeInfoType } from "@/types/anime";

function VideoWatchPage({
  params,
  searchParams,
}: {
  params: { slug: ["animeId", "epNo", "epId"] };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
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
    return <p>Loading....</p>;
  }

  return (
    <div className="max-w-[1600px] m-auto overflow-x-hidden">
      <TopNavbar />
      <div className="flex flex-col md:flex-row">
        <div className="xxs:px-2 xs:px-6 lg:px-12 pb-8 flex flex-col md:min-w-[700px] md:w-[66%] lg:min-w-[1000px] lg:w-[75%]">
          <Player
            animeId={animeId}
            detailInfo={detailInfo}
            epId={epId}
            epNo={epNo}
            isDub={isDub}
          />
          <div className="pb-4 md:pb-18 lg:pb-12">
            <p className="py-4 px-2 font-bold font-nunito text-xl text-neutral-900 dark:text-slate-100">
              {episode?.title}
            </p>
            <p className="text-neutral-900 dark:text-slate-100">
              {episode?.description}
            </p>
          </div>
          <div className="px-2 xxs:px-0">
            <EpBtnSheet
              modeResponsiveness={true}
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
    </div>
  );
}

export default VideoWatchPage;
