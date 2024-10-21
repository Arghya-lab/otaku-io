"use client";

import EpBtnSheet from "@/components/EpBtnSheet";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiSuccessType } from "@/types/apiResponse";
import getTitle from "@/utils/getTitle";
import { IAnimeEpisode, IAnimeInfo } from "@consumet/extensions";
import axios, { isAxiosError } from "axios";
import htmlParse from "html-react-parser";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useEffect, useRef, useState } from "react";
import AnimeInfo from "./AnimeInfo";
import Player from "./Player";
import RecommendItem from "./RecommendItem";
import StreamingServersList from "./StreamingServersList";
import VideoLinkProvider from "./VideoLinkProvider";

function VideoWatchPage({
  params,
}: {
  params: { slug: ["animeId", "epNo", "epId"] };
}) {
  const currentAnimeContainer = useRef<HTMLDivElement>(null);

  const animeId = decodeURIComponent(params.slug[0]);
  const epNo = decodeURIComponent(params.slug[1]);
  const epId = decodeURIComponent(params.slug[2]);
  const [isDub] = useQueryState("dub", parseAsBoolean.withDefault(false));

  const [animeInfo, setAnimeInfo] = useState<IAnimeInfo | null>(null);
  const [playingEp, setPlayingEp] = useState<IAnimeEpisode | null>(null);

  useEffect(() => {
    (async () => {
      const savedAnimeInfo: IAnimeInfo | null = await JSON.parse(
        localStorage.getItem("animeInfo") || "null"
      );

      if (savedAnimeInfo && savedAnimeInfo.id === animeId) {
        const episodeList = isDub
          ? savedAnimeInfo?.dubEpisodes
          : savedAnimeInfo?.episodes;
        const savedEpisode =
          episodeList && episodeList.find((ep) => ep.id === epId);

        if (savedEpisode) {
          setAnimeInfo(savedAnimeInfo);
          setPlayingEp(savedEpisode);
        }

        //TODO :: throw error if save episode is not found
      } else {
        try {
          const { data }: { data: ApiSuccessType<IAnimeInfo> } =
            await axios.get(`/api/anime/info/${animeId}`);

          setAnimeInfo(data.data);
          if (data.data?.episodes) {
            setPlayingEp(
              data.data.episodes.find((ep) => ep.id === epId) ?? null
            );
          }
        } catch (error) {
          if (isAxiosError(error)) {
            console.error(error.message);
          }
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animeId, epId]);

  const episodes = isDub ? animeInfo?.dubEpisodes : animeInfo?.episodes;

  if (!animeId || !epNo || !epId) {
    return <p>Invalid url</p>;
  }

  if (!animeInfo || !playingEp) {
    // TODO :: Fix this  //
    return (
      <div className="relative h-full w-full">
        <Skeleton className="m-[5%] my-4 h-[75vh] w-[90%] rounded-md" />
      </div>
    );
  }

  const title = getTitle(animeInfo.title);

  return (
    <VideoLinkProvider animeId={animeId} epId={epId} epNo={epNo}>
      <div className="flex flex-col md:flex-row">
        <div
          ref={currentAnimeContainer}
          className="flex h-auto flex-grow-0 flex-col xxs:px-2 xs:px-6 md:w-[66%] md:min-w-[700px] lg:w-[75%] lg:min-w-[1000px] lg:px-12"
        >
          <Player
            animeId={animeId}
            infoText={{
              title: episodes?.length !== 1 ? playingEp?.title || "" : title,
              summery: episodes?.length !== 1 ? title : undefined,
            }}
            animeInfo={animeInfo}
            epId={epId}
            epNo={epNo}
          />
          <h1 className="px-2 pt-4 font-poppins text-2xl font-bold xxs:px-0">
            {getTitle(animeInfo.title)}
          </h1>
          <h3 className="px-2 pb-4 pt-3 font-barlow text-xl font-semibold xxs:px-0">
            {episodes &&
              episodes.length > 1 &&
              playingEp.title &&
              `Episode ${epNo} • ${playingEp.title ?? ""}`}
          </h3>
          {playingEp?.description && (
            <article className="md:pb-18 px-2 pb-4 xxs:px-0 lg:pb-12">
              {htmlParse(playingEp.description)}
            </article>
          )}
          <div className="my-4 border-t" />
          <StreamingServersList epNo={epNo} />
          <div className="my-4 border-t" />
          <div className="px-2 xxs:px-0">
            <EpBtnSheet
              animeInfo={animeInfo}
              episodeNo={Number(epNo)}
              isWatchPage={true}
            />
          </div>
          <div className="mb-4 mt-6 border-t" />
          <AnimeInfo animeInfo={animeInfo} />
          <div className="my-4 border-t" />
        </div>
        <section className="flex h-min flex-col overflow-y-auto md:pr-6">
          <h2 className="px-2 pb-4 pt-8 text-2xl capitalize xs:px-6 md:px-0 md:pt-0">
            Recommendations
          </h2>
          {animeInfo?.recommendations ? (
            <div
              className="grid flex-1 justify-evenly gap-4 px-2 pb-8 md:p-0 md:pb-8"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 24rem))",
              }}
            >
              {animeInfo?.recommendations
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
    </VideoLinkProvider>
  );
}

export default VideoWatchPage;
