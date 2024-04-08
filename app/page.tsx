import Carousel from "@/app/Carousel";
import PosterBoard from "@/app/PosterBoard";
import SideNavbar from "@/components/SideNavbar";
import TopNavbar from "@/components/TopNavbar";
import { getPopular, getTrending } from "@/services/getAnime";
import { getUserWatching } from "@/services/getUserWatching";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import HistoryPosterContainer from "@/app/HistoryPosterContainer";
import { getUserTheme } from "./layout";
import chroma from "chroma-js";

export default async function Home() {
  const theme = await getUserTheme();

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
              {userWatchingRes && !!userWatchingRes.results.length && (
                <div className="mt-4 pb-8 px-2 xxs:px-4">
                  {/* Header */}
                  <div
                    className="mb-1 px-3 xxs:px-4 flex items-center justify-between"
                    style={{ color: theme.textColor }}>
                    <p className="text-2xl capitalize font-nunito">
                      continue watching
                    </p>
                    {/* See all btn */}
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
