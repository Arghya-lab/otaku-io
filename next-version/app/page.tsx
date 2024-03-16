import Carousel from "@/app/Carousel";
import PosterBoard from "@/app/PosterBoard";
import SideNavbar from "@/components/SideNavbar";
import TopNavbar from "@/components/TopNavbar";
import { getPopular, getTrending } from "@/services/getAnime";
import { getUserWatching } from "@/services/getUserWatching";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import HistoryPosterContainer from "@/app/HistoryPosterContainer";

export default async function Home() {
  const [userWatchingRes, { results: trending }, { results: popular }] =
    await Promise.all([getUserWatching(), getTrending(), getPopular()]);

  return (
    <>
      <TopNavbar />
      <SideNavbar pathName="/" />
      <main className="xs:pl-20 pb-16 xs:pb-0">
        {
          trending.length > 0 && popular.length > 0 ? (
            <>
              <Carousel trending={trending} />
              {/* continue watching segment */}
              {userWatchingRes && (
                <div className="mt-4 pb-8 px-2 xxs:px-4">
                  {/* Header */}
                  <div className="mb-1 px-3 xxs:px-4 flex items-center justify-between text-neutral-900 dark:text-slate-100">
                    <p className="text-2xl capitalize">continue watching</p>
                    {/* See all btn */}
                    <Link
                      href="/history"
                      role="button"
                      className="p-2 pl-4 rounded-[45px] flex flex-row gap-2 items-center opacity-65 text-neutral-800 dark:text-slate-300 bg-white bg-opacity-15 hover:bg-opacity-10 hover:opacity-100 hover:text-neutral-900 dark:hover:text-slate-100">
                      <p className="text-[15px]">See All</p>
                      <ChevronRight size={24} />
                    </Link>
                  </div>
                  {/* Poster container */}
                  <HistoryPosterContainer
                    watchingAnimes={userWatchingRes.results}
                  />
                </div>
              )}
              <PosterBoard name={"trending"} content={trending} />
              <PosterBoard name={"popular"} content={popular} />
            </>
          ) : null
          // ?\add retry option here
        }
      </main>
    </>
  );
}
