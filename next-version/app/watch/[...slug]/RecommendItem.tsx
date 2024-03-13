import Link from "next/link";
import { useState } from "react";

function RecommendItem({ item }: { item: any }) {
  const [isHover, setIsHover] = useState(false);

  const title =
    item?.title?.english ||
    item?.title?.romaji ||
    item?.title?.native ||
    item?.title?.userPreferred;

  return (
    <Link
      href={`/detail/${item.id}/${title}`}
      className={`p-3 mr-4 max-w-md min-w-40 flex flex-row rounded-xl ${
        isHover ? "bg-black  bg-opacity-15" : "bg-transparent"
      }`}
      onPointerEnter={() => setIsHover(true)}
      onPointerLeave={() => setIsHover(false)}>
      <div className={`pl-24 relative overflow-hidden`}>
        <div
          className={`absolute left-0 transition-transform duration-200 ease-in transform-gpu ${
            isHover ? "scale-110" : null
          }`}>
          <img
            title={
              item?.title?.userPreferred ||
              item?.title?.romaji ||
              item?.title?.native ||
              item?.title?.english
            }
            className="object-cover w-24 rounded-lg"
            src={item?.image}
          />
        </div>
      </div>
      <div className="flex-1 py-2 px-4 text-neutral-900 dark:text-slate-100">
        <p className="px-6 font-nunito font-semibold w-full text-center pb-2 line-clamp-2 overflow-x-ellipsis">
          {item?.title?.english ||
            item?.title?.userPreferred ||
            item?.title?.romaji ||
            item?.title?.native}
        </p>
        <div className="text-neutral-800 dark:text-slate-300 text-sm">
          {item?.rating && (
            <div>
              <span>Rating : </span>
              <span>{item?.rating}</span>
            </div>
          )}
          {item?.type && (
            <div>
              <span>Type : </span>
              <span>{item?.type}</span>
            </div>
          )}
          {item?.type != "MOVIE" && item?.episodes && (
            <div>
              <span>Total episodes : </span>
              <span>{item?.episodes}</span>
            </div>
          )}
          {item?.status && (
            <div>
              <span>Status : </span>
              <span>{item?.status}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default RecommendItem;
