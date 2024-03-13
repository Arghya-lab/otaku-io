"use client";

import EpBtnSheet from "@/components/EpBtnSheet";
import TopNavbar from "@/components/TopNavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import RecommendItem from "./RecommendItem";
import Player from "./Player";

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

  const [detailInfo, setDetailInfo] = useState<any>(null);
  const [episode, setEpisode] = useState<any>(null);

  if (!animeId || !epNo || !epId) {
    return <p>Invalid url</p>;
  }

  useEffect(() => {
    (async () => {
      const savedDetailInfo = await JSON.parse(
        localStorage.getItem("detailInfo") || "null"
      );
      const savedEpisode = savedDetailInfo?.episodes.find(
        (ep: any) => ep.id == epId
      );
      
      if (savedDetailInfo && savedEpisode) {
        setDetailInfo(savedDetailInfo);
        setEpisode(savedEpisode);
      } else {
        const res = await axios.get(`/api/detail-info/${animeId}?dub=${isDub}`);

        setDetailInfo(res.data);
        setEpisode(res.data?.episodes.find((ep: any) => ep.id == epId));
      }
    })();
  }, []);

  if (!detailInfo || !episode) {
    return <p>Loading....</p>;
  }

  return (
    <div className="max-w-[1600px] m-auto overflow-x-hidden">
      <TopNavbar />
      {/* <div
        onClick={async () => {
          try {
            const data = await getStreamingLinks("spy-x-family-episode-1");
            console.log(data);
          } catch (error) {
            console.log("test err", error);
          }
        }}>
        test
      </div> */}
      <div className="flex flex-col md:flex-row">
        <div className="px-3.5 xxs:px-6 lg:px-12 pb-8 flex flex-col md:min-w-[700px] md:w-[66%] lg:min-w-[1000px] lg:w-[75%]">
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
          <EpBtnSheet
            modeResponsiveness={true}
            detailInfo={detailInfo}
            isDubEnable={isDub}
            episodeNo={Number(epNo)}
            isWatchPage={true}
          />
        </div>
        {detailInfo?.recommendations ? (
          <div>
            <p className="text-2xl text-center pt-6 pb-3 capitalize text-neutral-950 dark:text-slate-50">
              recommended
            </p>
            <div
              className="flex-1 grid gap-4 justify-evenly pb-8 px-2 md:p-0"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 24rem))",
              }}>
              {detailInfo?.recommendations.slice(0, 8).map((reco: any) => (
                <RecommendItem key={reco?.id} item={reco} />
              ))}
            </div>
          </div>
        ) : null}
        h
      </div>
    </div>
  );
}

export default VideoWatchPage;
