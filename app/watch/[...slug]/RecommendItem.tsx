/* eslint-disable @next/next/no-img-element */
"use client";
import { usePreference } from "@/components/providers/PreferenceProvider";
import getTitle from "@/utils/getTitle";
import { IAnimeResult } from "@consumet/extensions";
import classNames from "classnames";
import Link from "next/link";

function RecommendItem({ item }: { item: IAnimeResult }) {
  const { isDub } = usePreference();
  const title = getTitle(item.title);

  return (
    <Link
      href={`/info/${item.id}?title=${title}&dub=${isDub}`}
      className={classNames(
        `group flex h-40 min-w-40 max-w-md flex-row rounded-xl border-2 border-transparent bg-popover p-3 hover:border-border hover:bg-muted`
      )}
    >
      <div className={`relative overflow-hidden rounded-lg pl-24`}>
        <div
          className={`absolute left-0 transform-gpu rounded-md transition-transform duration-200 ease-in group-hover:scale-110`}
        >
          {item?.image && (
            <img
              alt={title}
              title={title}
              className="h-[136px] w-24 object-cover"
              src={item.image}
              loading="lazy"
            />
          )}
        </div>
      </div>
      <div className="flex-1 px-4 py-2">
        <p className="overflow-x-ellipsis line-clamp-2 w-full px-6 pb-2 text-center font-barlow font-semibold">
          {title}
        </p>
        <div className="text-sm opacity-85">
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
