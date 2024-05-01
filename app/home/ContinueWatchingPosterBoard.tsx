import Link from "next/link";
import chroma from "chroma-js";
import { ChevronRight } from "lucide-react";
import { getUserWatching } from "@/services/getUserWatching";
import { getUserTheme } from "../layout";
import HorizontalScrollComponent from "@/app/home/HorizontalScrollComponent";
import ContinueWatchingPosterItem from "@/components/ContinueWatchingPosterItem";

async function ContinueWatchingPosterBoard() {
  const theme = await getUserTheme();

  const userWatchingRes = await getUserWatching(1, 5);

  if (userWatchingRes && !!userWatchingRes.results.length) {
    return (
      <section className="mt-4 pb-8">
        <div
          className="mb-1 px-3 xxs:px-4 flex items-center justify-between"
          style={{ color: theme.textColor }}>
          <p className="text-2xl capitalize font-nunito">continue watching</p>
          <Link
            href="/history"
            role="button"
            className="p-2 pl-4 rounded-[45px] flex flex-row gap-2 items-center opacity-65 hover:bg-opacity-10 hover:opacity-100"
            style={{
              color: theme.textColor,
              backgroundColor: chroma(theme.primaryColor)
                .alpha(0.15)
                .toString(),
            }}>
            <p className="text-[15px]">See All</p>
            <ChevronRight size={24} />
          </Link>
        </div>
        {/* Poster container */}
        <HorizontalScrollComponent
          childComponents={userWatchingRes.results.map((item, id) => (
            <ContinueWatchingPosterItem
              key={id}
              WatchingAnime={item}
              isHorizontalScroll={true}
            />
          ))}
        />
      </section>
    );
  }

  return null;
}

export default ContinueWatchingPosterBoard;
