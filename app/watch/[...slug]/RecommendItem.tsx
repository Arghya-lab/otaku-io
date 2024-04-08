"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimeItemType } from "@/types/anime";
import { usePreference } from "@/app/PreferenceProvider";
import { themeEnum, themes } from "@/theme";
import chroma from "chroma-js";

function RecommendItem({ item }: { item: AnimeItemType }) {
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  const [isHover, setIsHover] = useState(false);

  const title =
    typeof item.title === "string"
      ? item.title
      : item.title?.english ||
        item.title?.romaji ||
        item.title?.native ||
        item.title?.userPreferred ||
        "";

  return (
    <Link
      href={`/detail/${item.id}/${title}`}
      style={{
        backgroundColor: chroma(theme.primaryColor)
          .darken(isHover ? 0.3 : 0.1)
          .toString(),
        borderColor: isHover
          ? chroma(theme.primaryColor).darken(1).toString()
          : chroma(theme.primaryColor).darken(0.5).toString(),
      }}
      className={`p-3 mr-4 max-w-md min-w-40 h-48 flex flex-row rounded-xl border-2`}
      onPointerEnter={() => setIsHover(true)}
      onPointerLeave={() => setIsHover(false)}>
      <div className={`pl-24 relative overflow-hidden`}>
        <div
          className={`absolute left-0 rounded-md transition-transform duration-200 ease-in transform-gpu ${
            isHover ? "scale-110" : null
          }`}>
          {item?.image && (
            <Image
              width={100}
              height={143}
              alt={title}
              title={title}
              className="object-cover w-24 rounded-lg"
              src={item.image}
            />
          )}
        </div>
      </div>
      <div className="flex-1 py-2 px-4" style={{ color: theme.textColor }}>
        <p className="px-6 font-nunito font-semibold w-full text-center pb-2 line-clamp-2 overflow-x-ellipsis">
          {title}
        </p>
        <div className="text-sm opacity-85" style={{ color: theme.textColor }}>
          {item?.rating && (
            <div>
              <span>Rating : </span>
              <span>{item.rating}</span>
            </div>
          )}
          {item?.type && (
            <div>
              <span>Type : </span>
              <span>{item.type}</span>
            </div>
          )}
          {/* {item?.type != "MOVIE" && item?.episodes && (
            <div>
              <span>Total episodes : </span>
              <span>{item?.episodes}</span>
            </div>
          )} */}
          {/* {item?.status && (
            <div>
              <span>Status : </span>
              <span>{item?.status}</span>
            </div>
          )} */}
        </div>
      </div>
    </Link>
  );
}

export default RecommendItem;
