"use client";

import { useState } from "react";
import Image from "next/image";
import { shade } from "@/utils/color";
import { usePreference } from "./providers/PreferenceProvider";
import { AnimeItemType } from "@/types/anime";
import { themes } from "@/theme";
import Link from "next/link";
import classNames from "classnames";

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

  const title =
    typeof item.title === "string"
      ? item.title
      : item.title?.english ||
        item.title?.romaji ||
        item.title?.native ||
        item.title?.userPreferred;

  return (
    <div
      className={classNames("p-2 xxs:p-3", {
        "w-[152px] sm:w-48": isHorizontalScroll,
      })}>
      <Link
        href={`/detail/${item.id}?title=${title}&dub=${isDub}`}
        className="w-full"
        onPointerEnter={() => {
          setIsHover(true);
        }}
        onPointerLeave={() => {
          setIsHover(false);
        }}>
        <div
          className={`w-full relative overflow-hidden shadow-xl rounded-xl ring-[3px] ${
            isHover ? "ring-slate-50" : "ring-transparent"
          }`}>
          <div
            className={`flex items-start relative mb-auto select-none w-full h-full aspect-[5/7] overflow-hidden transition-transform duration-200 ease-in transform-gpu ${
              isHover ? "scale-110" : null
            }`}>
            {item.image && (
              <Image
                width={173}
                height={370}
                alt={title ?? ""}
                className="object-cover object-center h-full w-full"
                src={item.image}
              />
            )}
          </div>
        </div>
        <div className="h-16 text-sm font-medium flex items-center overflow-visible">
          <p
            className="px-2 w-full line-clamp-2 text-center text-neutral-950 dark:text-white"
            style={{
              color:
                isHover && item?.color
                  ? // ? adjustTextColor(item.color, theme.primaryColor)
                    shade(item?.color, -2).toString()
                  : theme.textColor,
            }}>
            {title ?? ""}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default PosterItem;
