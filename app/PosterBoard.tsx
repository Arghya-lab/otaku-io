"use client";

import Link from "next/link";
import usePosterItemCount from "@/hooks/usePosterItemCount";
import PosterItem from "@/components/PosterItem";
import { ChevronRight } from "lucide-react";
import { posterItemType } from "@/types/constants";
import { AnimeItemType } from "@/types/anime";
import { usePreference } from "./PreferenceProvider";
import { themes } from "@/theme";

function PosterBoard({
  name,
  content,
}: {
  name: string;
  content: AnimeItemType[];
}) {
  const posterItemCount = usePosterItemCount();

  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  return (
    <section className="mt-4 pb-8 px-2 xxs:px-4">
      {/* Header */}
      <div
        className="mb-1 px-3 xxs:px-4 flex items-center justify-between"
        style={{ color: theme.textColor }}>
        <p className="text-2xl capitalize">{name}</p>
        {/* See all btn */}
        <Link
          href={`/discover?sort=${JSON.stringify([
            name === "trending" ? "TRENDING_DESC" : "POPULARITY_DESC",
          ])}`}
          className="p-2 pl-4 rounded-[45px] flex flex-row gap-2 items-center opacity-65 bg-white bg-opacity-15 hover:bg-opacity-10 hover:opacity-100"
          style={{ color: theme.textColor }}>
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
