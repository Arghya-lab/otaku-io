/* eslint-disable @next/next/no-img-element */
"use client";

import { themes } from "@/theme";
import { WatchingAnimeType } from "@/types/anime";
import { shade } from "@/utils/color";
import getTitle from "@/utils/getTitle";
import setDetailInfoAndGetWatchPageLink from "@/utils/setDetailInfoAndGetWatchPageLink";
import classNames from "classnames";
import { PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import { usePreference } from "./providers/PreferenceProvider";

function ContinueWatchingPosterItem({
  WatchingAnime,
  isHorizontalScroll = false,
}: {
  WatchingAnime: WatchingAnimeType;
  isHorizontalScroll?: boolean;
}) {
  const { animeInfo, lastWatched } = WatchingAnime;
  const { themeId, isDub } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  const router = useRouter();
  const [isHover, setIsHover] = useState(false);
  const [isDetailDataFetching, setIsDetailDataFetching] = useState(false);

  if (!animeInfo) return null;

  const title = getTitle(animeInfo.title);

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
      className={classNames("p-1", {
        "w-[152px] p-2 xxs:p-3 sm:w-48": isHorizontalScroll,
        "min-w-24 max-w-48": !isHorizontalScroll,
      })}
    >
      <div
        className="w-full cursor-pointer"
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
        onClick={handleClick}
      >
        <div
          className={`relative w-full overflow-hidden rounded-xl ring-[3px] ${
            isHover ? "ring-slate-50" : "ring-transparent"
          }`}
        >
          <div
            className={`absolute bottom-0 left-0 right-0 top-0 z-0 flex items-center justify-center`}
          >
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
            className={`relative mb-auto flex aspect-[5/7] h-full w-full transform-gpu select-none items-start overflow-hidden transition-transform duration-200 ease-in ${
              isHover ? "scale-110" : null
            }`}
          >
            <img
              alt={title || ""}
              className="h-full w-full object-cover object-center"
              src={animeInfo?.image}
            />
          </div>
        </div>
        <div className="flex h-16 items-center overflow-visible">
          <p
            className="line-clamp-2 w-full px-2 text-center text-xs font-medium"
            style={{
              color:
                isHover && animeInfo?.color
                  ? shade(animeInfo.color, -2).toString()
                  : theme.textColor,
            }}
          >
            {title || ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContinueWatchingPosterItem;
