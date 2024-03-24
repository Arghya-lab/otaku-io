"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Oval } from "react-loader-spinner";
import { PlayCircle } from "lucide-react";
import { usePreference } from "./PreferenceProvider";
import { shade } from "@/utils/color";
import setDetailInfoAndGetWatchPageLink from "@/utils/setDetailInfoAndGetWatchPageLink";
import { WatchingAnimeType } from "@/types/anime";

function ContinueWatchingPosterItem({
  WatchingAnime,
}: {
  WatchingAnime: WatchingAnimeType;
}) {
  const { animeInfo, lastWatched } = WatchingAnime;
  const { isDub } = usePreference();

  const router = useRouter();
  const [isHover, setIsHover] = useState(false);
  const [isDetailDataFetching, setIsDetailDataFetching] = useState(false);

  if (!animeInfo) return null;

  const title =
    typeof animeInfo.title === "string"
      ? animeInfo.title
      : animeInfo.title?.english ||
        animeInfo.title?.romaji ||
        animeInfo.title?.native ||
        animeInfo.title?.userPreferred;

  const handleClick = async () => {
    setIsDetailDataFetching(true);

    const watchPageLink = await setDetailInfoAndGetWatchPageLink(
      animeInfo.id,
      isDub,
      lastWatched
    );
    if (watchPageLink) {
      router.push(watchPageLink);
    }
  };

  return (
    <div
      role="button"
      className="p-1.5 xxs:p-3 xs:p-4 w-full"
      onPointerEnter={() => {
        setIsHover(true);
      }}
      onPointerLeave={() => {
        setIsHover(false);
      }}
      onClick={handleClick}>
      <div
        className={`pt-[calc(100%*1.464)] w-full relative overflow-hidden rounded-xl ring-[3px] ${
          isHover ? "ring-slate-50" : "ring-transparent"
        }`}>
        <div
          className={`absolute top-0 bottom-0 left-0 right-0 z-0 flex items-center justify-center`}>
          {!isDetailDataFetching ? (
            <PlayCircle
              size={48}
              strokeWidth={isHover ? 1.5 : 1}
              className={`text-white ${isHover ? "scale-125" : null}`}
              style={
                isHover
                  ? animeInfo?.color
                    ? { color: shade(animeInfo.color, -2).toString() }
                    : {}
                  : {}
              }
            />
          ) : (
            <Oval
              visible={true}
              height="60"
              width="60"
              color="#fff"
              secondaryColor="#fff"
              strokeWidth={5}
              ariaLabel="oval-loading"
            />
          )}
        </div>
        <div
          className={`h-[calc(100%*1.464)] absolute top-0 -z-10 overflow-hidden transition-transform duration-200 ease-in transform-gpu ${
            isHover ? "scale-110" : null
          }`}>
          <Image
            width={173}
            height={370}
            alt={title || ""}
            className="object-cover object-center h-full w-full"
            src={animeInfo?.image || ""}
          />
        </div>
      </div>
      <div className="h-16 text-sm font-medium flex items-center overflow-visible">
        <p
          className="px-2 w-full line-clamp-2 text-center text-neutral-950 dark:text-white"
          style={
            isHover
              ? animeInfo?.color
                ? { color: shade(animeInfo.color, -2).toString() }
                : {}
              : {}
          }>
          {title || ""}
        </p>
      </div>
    </div>
  );
}

export default ContinueWatchingPosterItem;
