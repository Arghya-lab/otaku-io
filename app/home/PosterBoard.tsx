"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import PosterItem from "@/components/PosterItem";
import { AnimeItemType } from "@/types/anime";
import { usePreference } from "@/components/providers/PreferenceProvider";
import { themes } from "@/theme";
import HorizontalScrollComponent from "@/app/home/HorizontalScrollComponent";

function PosterBoard({
  name,
  content,
}: {
  name: string;
  content: AnimeItemType[];
}) {
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  return (
    <section className="mt-4 pb-8">
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
      <HorizontalScrollComponent
        childComponents={content.map((item, id) => (
          <PosterItem key={id} item={item} isHorizontalScroll={true} />
        ))}
      />
    </section>
  );
}

export default PosterBoard;
