"use client";

import { ChevronRight } from "lucide-react";
import { posterItemType } from "@/types/constants";
import usePosterItemCount from "@/hooks/usePosterItemCount";
import Link from "next/link";
import PosterItem from "@/components/PosterItem";

function PosterBoard({ name, content }) {
  const posterItemCount = usePosterItemCount();

  return (
    <section className="mt-4 pb-8 px-2 xxs:px-4">
      {/* Header */}
      <div className="mb-1 px-3 xxs:px-4 flex items-center justify-between text-neutral-900 dark:text-slate-100">
        <p className="text-2xl capitalize">{name}</p>
        {/* See all btn */}
        <Link
          href={`/discover?sort=${JSON.stringify([
            name === "trending" ? "TRENDING_DESC" : "POPULARITY_DESC",
          ])}`}
          className="p-2 pl-4 rounded-[45px] flex flex-row gap-2 items-center opacity-65 text-neutral-800 dark:text-slate-300 bg-white bg-opacity-15 hover:bg-opacity-10 hover:opacity-100 hover:text-neutral-900 dark:hover:text-slate-100">
          <p className="text-[15px]">See All</p>
          <ChevronRight size={24} />
        </Link>
      </div>
      {/* Poster container */}
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${posterItemCount}, 1fr)` }}>
        {content.slice(0, posterItemCount).map((item, id) => (
          <PosterItem key={id} item={item} type={posterItemType.general} />
        ))}
      </div>
    </section>
  );
}

export default PosterBoard;
