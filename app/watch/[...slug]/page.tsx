"use client";

import EpBtnSheet from "@/components/EpBtnSheet";
import TopNavbar from "@/components/TopNavbar";
import { usePreference } from "@/components/providers/PreferenceProvider";
import { themes } from "@/theme";
import { AnimeEpisodeType, DetailAnimeInfoType } from "@/types/anime";
import { ApiSuccessType } from "@/types/apiResponse";
import getTitle from "@/utils/getTitle";
import axios, { isAxiosError } from "axios";
import chroma from "chroma-js";
import htmlParse from "html-react-parser";
import { useEffect, useState } from "react";
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
          const { data }: { data: ApiSuccessType<DetailAnimeInfoType> } =
            await axios.get(`/api/anime/detail-info/${animeId}?dub=${isDub}`);

          setDetailInfo(data.data);
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

  if (!detailInfo || !episode) {
    return (
      <div className="relative h-full w-full">
        <TopNavbar />
        <Skeleton
          className="m-[5%] my-4 h-[75vh] w-[90%] rounded-md"
          baseColor={chroma(theme.primaryColor).darken(1).toString()}
          highlightColor={chroma(theme.primaryColor).darken(1.5).toString()}
        />
      </div>
    );
  }

  const title = getTitle(detailInfo.title);

  return (
    <>
      <TopNavbar />
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col pb-8 xxs:px-2 xs:px-6 md:w-[66%] md:min-w-[700px] lg:w-[75%] lg:min-w-[1000px] lg:px-12">
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
          <h2
            className="px-2 py-4 font-nunito text-2xl font-bold xxs:px-0"
            style={{ color: theme.textColor }}
          >
            {detailInfo?.episodes?.length === 1 ? title ?? "" : episode?.title}
          </h2>
          <p
            className="md:pb-18 px-2 pb-4 xxs:px-0 lg:pb-12"
            style={{ color: theme.textColor }}
          >
            {htmlParse(episode?.description || "")}
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
        <section className="flex flex-col md:pr-6">
          <p
            className="px-2 pb-4 pt-8 text-2xl capitalize xs:px-6 md:px-0 md:pt-0"
            style={{ color: theme.textColor }}
          >
            Recommendations
          </p>
          {detailInfo?.recommendations ? (
            <div
              className="grid flex-1 justify-evenly gap-4 px-2 pb-8 md:p-0 md:pb-8"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 24rem))",
              }}
            >
              {detailInfo?.recommendations
                .slice(0, 8)
                .map((recommendation) => (
                  <RecommendItem
                    key={recommendation.id}
                    item={recommendation}
                  />
                ))}
            </div>
          ) : null}
        </section>
      </div>
    </>
  );
}

export default VideoWatchPage;
