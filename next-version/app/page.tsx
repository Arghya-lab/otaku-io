import Carousel from "@/app/Carousel";
import PosterBoard from "@/app/PosterBoard";
import SideNavbar from "@/components/SideNavbar";
import { getPopular, getTrending } from "@/services/getAnime";

export default async function Home() {
  const { results: trending } = await getTrending();
  const { results: popular } = await getPopular();

  return (
    <>
      <SideNavbar pathName="/" />
      <main className="xs:pl-20 pb-16 xs:pb-0">
        {
          trending.length > 0 && popular.length > 0 ? (
            <>
              <Carousel trending={trending} />
              {/* <ContinueWatchingBoard /> */}
              <PosterBoard name={"trending"} content={trending} />
              <PosterBoard name={"popular"} content={popular} />
              {/* <div className="flex pt-4 pb-16">
              <p className="text-neutral-900 dark:text-slate-100 text-lg font-nunito">
                Didn&apos;t like any of the above?
              </p>
              <button
                onClick={handleRandomBtnClick}
                className="hover:underline pl-1"
                style={{ color: theme.secondaryColor }}>
                Show me a random anime!
              </button>
            </div> */}
            </>
          ) : null
          // ?\add retry option here
        }
      </main>
    </>
  );
}
