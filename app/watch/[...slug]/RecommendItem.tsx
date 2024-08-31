/* eslint-disable @next/next/no-img-element */
"use client";

import { usePreference } from "@/components/providers/PreferenceProvider";
import { themes } from "@/theme";
import getTitle from "@/utils/getTitle";
import { IAnimeResult } from "@consumet/extensions";
import chroma from "chroma-js";
import Link from "next/link";
import { useState } from "react";

function RecommendItem({ item }: { item: IAnimeResult }) {
  const { themeId, isDub } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  const [isHover, setIsHover] = useState(false);

  const title = getTitle(item.title);

  return (
    <Link
      href={`/info/${item.id}?title=${title}&dub=${isDub}`}
      style={{
        backgroundColor: chroma(theme.primaryColor)
          .darken(isHover ? 0.3 : 0.1)
          .toString(),
        borderColor: isHover
          ? chroma(theme.primaryColor).darken(1).toString()
          : chroma(theme.primaryColor).darken(0.5).toString(),
      }}
      className={`flex h-40 min-w-40 max-w-md flex-row rounded-xl border-2 p-3`}
      onPointerEnter={() => setIsHover(true)}
      onPointerLeave={() => setIsHover(false)}
    >
      <div className={`relative overflow-hidden rounded-lg pl-24`}>
        <div
          className={`absolute left-0 transform-gpu rounded-md transition-transform duration-200 ease-in ${
            isHover ? "scale-110" : null
          }`}
        >
          {item?.image && (
            <img
              alt={title}
              title={title}
              className="h-[136px] w-24 object-cover"
              src={item.image}
            />
          )}
        </div>
      </div>
      <div className="flex-1 px-4 py-2" style={{ color: theme.textColor }}>
        <p className="overflow-x-ellipsis line-clamp-2 w-full px-6 pb-2 text-center font-nunito font-semibold">
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
