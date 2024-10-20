import HorizontalScrollComponent from "@/app/home/HorizontalScrollComponent";
import ContinueWatchingPosterItem from "@/components/ContinueWatchingPosterItem";
import { getUserWatching } from "@/services/getUserWatching";
import { ChevronRight } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

async function ContinueWatchingPosterBoard() {
  const session = await getServerSession();
  const userEmail = session?.user?.email;

  if (!userEmail) return null;

  const userWatchingRes = await getUserWatching(1, 5, userEmail);

  if (userWatchingRes && !!userWatchingRes.results.length) {
    return (
      <section className="mt-4 pb-8">
        <div className="mb-1 flex items-center justify-between px-3 xxs:px-4">
          <p className="text-2xl capitalize">continue watching</p>
          <Link
            href="/history"
            role="button"
            className="flex flex-row items-center gap-2 rounded-[45px] bg-muted p-2 pl-4 opacity-65 hover:bg-opacity-80 hover:opacity-100"
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
