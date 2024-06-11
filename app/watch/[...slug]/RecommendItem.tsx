/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimeItemType } from "@/types/anime";
import { usePreference } from "@/components/providers/PreferenceProvider";
import { themes } from "@/theme";
import chroma from "chroma-js";
import getTitle from "@/utils/getTitle";

function RecommendItem({ item }: { item: AnimeItemType }) {
  const { themeId, isDub } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  const [isHover, setIsHover] = useState(false);

  const title = getTitle(item.title);

  return (
    <Link
      href={`/detail/${item.id}?title=${title}&dub=${isDub}`}
      style={{
        backgroundColor: chroma(theme.primaryColor)
          .darken(isHover ? 0.3 : 0.1)
          .toString(),
        borderColor: isHover
          ? chroma(theme.primaryColor).darken(1).toString()
          : chroma(theme.primaryColor).darken(0.5).toString(),
      }}
      className={`p-3 max-w-md min-w-40 h-40 flex flex-row rounded-xl border-2`}
      onPointerEnter={() => setIsHover(true)}
      onPointerLeave={() => setIsHover(false)}>
      <div className={`pl-24 relative overflow-hidden rounded-lg`}>
        <div
          className={`absolute left-0 rounded-md transition-transform duration-200 ease-in transform-gpu ${
            isHover ? "scale-110" : null
          }`}>
          {item?.image && (
            <img
              alt={title}
              title={title}
              className="object-cover w-24 h-[136px]"
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
