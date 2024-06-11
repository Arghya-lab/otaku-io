/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { shade } from "@/utils/color";
import { usePreference } from "./providers/PreferenceProvider";
import { AnimeItemType } from "@/types/anime";
import { themes } from "@/theme";
import Link from "next/link";
import classNames from "classnames";
import getTitle from "@/utils/getTitle";

function PosterItem({
  item,
  isHorizontalScroll = false,
}: {
  item: AnimeItemType;
  isHorizontalScroll?: boolean;
}) {
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  const { isDub } = usePreference();
  const [isHover, setIsHover] = useState(false);

  const title = getTitle(item.title);

  return (
    <div
      className={classNames({
        "w-[152px] sm:w-48 p-2 xxs:p-3": isHorizontalScroll,
        "min-w-24 max-w-48 p-1": !isHorizontalScroll,
      })}>
      <Link
        href={`/detail/${item.id}?title=${title}&dub=${isDub}`}
        className="w-full"
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}>
        <div
          className={`w-full relative overflow-hidden shadow-xl rounded-xl ring-[3px] ${
            isHover ? "ring-slate-50" : "ring-transparent"
          }`}>
          <div
            className={`flex items-start relative mb-auto select-none w-full aspect-[5/7] overflow-hidden transition-transform duration-200 ease-in transform-gpu ${
              isHover ? "scale-110" : null
            }`}>
            {item.image && (
              <img
                alt={title}
                className="object-cover object-center w-full"
                src={item.image}
              />
            )}
          </div>
        </div>
        <div className="h-16 flex items-center overflow-visible">
          <p
            className="px-2 w-full text-xs font-medium line-clamp-2 text-center text-neutral-950 dark:text-white"
            style={{
              color:
                isHover && item?.color
                  ? 
                    shade(item?.color, -2).toString()
                  : theme.textColor,
            }}>
            {title}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default PosterItem;
