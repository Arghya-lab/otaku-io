"use client"

import { useState } from "react";
import { posterItemType } from "@/types/constants";
import { shade } from "@/utils/color";
import { useRouter } from "next/navigation";
import { usePreference } from "./PreferenceProvider";

function PosterItem({ item, type = posterItemType.general }) {
  const router = useRouter();
  const {isDub} = usePreference();

  const [isHover, setIsHover] = useState(false);

  const handleClick = () => {
    if (type === posterItemType.general) {
      if (item?.id) {
        const title =
          item?.title?.english ||
          item?.title?.romaji ||
          item?.title?.native ||
          item?.title?.userPreferred;
        router.push(`/detail/${item.id}/${title}?dub=${isDub}`)
      }
    } else if (type === posterItemType.filter) {
      // dispatch(setMiniMeta(item));
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
          className={`h-[calc(100%*1.464)] absolute top-0 -z-10 overflow-hidden transition-transform duration-200 ease-in transform-gpu ${
            isHover ? "scale-110" : null
          }`}>
          <img
            className="object-cover object-center h-full w-full"
            src={item?.image}
          />
        </div>
      </div>
      <div className="h-16 text-sm font-medium flex items-center overflow-visible">
        <p
          className="px-2 w-full line-clamp-2 text-center text-neutral-950 dark:text-white"
          style={
            isHover && item?.color
              ? { color: shade(item?.color, -2).toString() }
              : {}
          }>
          {item?.title?.english ||
            item?.title?.userPreferred ||
            item?.title?.romaji ||
            item?.title?.native}
        </p>
      </div>
    </div>
    // </div>
  );
}

export default PosterItem;
