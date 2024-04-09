"use client";

import { useState } from "react";
import Image from "next/image";
import { shade } from "@/utils/color";
import { usePreference } from "../app/PreferenceProvider";
import { AnimeItemType } from "@/types/anime";
import { themes } from "@/theme";
import Link from "next/link";

function PosterItem({ item }: { item: AnimeItemType }) {
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
    <Link
      href={`/detail/${item.id}/${title}?dub=${isDub}`}
      role="button"
      className="p-1.5 xxs:p-3 xs:p-4 w-full"
      onPointerEnter={() => {
        setIsHover(true);
      }}
      onPointerLeave={() => {
        setIsHover(false);
      }}>
      <div
        className={`pt-[calc(100%*1.464)] w-full relative overflow-hidden rounded-xl ring-[3px] ${
          isHover ? "ring-slate-50" : "ring-transparent"
        }`}>
        <div
          className={`h-[calc(100%*1.464)] absolute top-0 -z-10 overflow-hidden transition-transform duration-200 ease-in transform-gpu ${
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
    // </div>
  );
}

export default PosterItem;
