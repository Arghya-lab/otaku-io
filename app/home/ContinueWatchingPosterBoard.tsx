import HorizontalScrollComponent from "@/app/home/HorizontalScrollComponent";
import ContinueWatchingPosterItem from "@/components/ContinueWatchingPosterItem";
import { getUserWatching } from "@/services/getUserWatching";
import chroma from "chroma-js";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getUserTheme } from "../layout";

async function ContinueWatchingPosterBoard() {
  const theme = await getUserTheme();

  const userWatchingRes = await getUserWatching(1, 5);

  if (userWatchingRes && !!userWatchingRes.results.length) {
    return (
      <section className="mt-4 pb-8">
        <div
          className="mb-1 flex items-center justify-between px-3 xxs:px-4"
          style={{ color: theme.textColor }}
        >
          <p className="font-nunito text-2xl capitalize">continue watching</p>
          <Link
            href="/history"
            role="button"
            className="flex flex-row items-center gap-2 rounded-[45px] p-2 pl-4 opacity-65 hover:bg-opacity-10 hover:opacity-100"
            style={{
              color: theme.textColor,
              backgroundColor: chroma(theme.primaryColor)
                .alpha(0.15)
                .toString(),
            }}
          >
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
