/* eslint-disable @next/next/no-img-element */
import { IAnimeInfo } from "@consumet/extensions";
import Link from "next/link";

function RelatedAnime({ animeInfo }: { animeInfo: IAnimeInfo }) {
  return (
    <div className="flex-col rounded-lg lg:flex">
      <div className="mb-3 flex items-center gap-2 leading-tight">
        <h2 className="px-2 pb-4 pt-8 text-2xl capitalize xs:px-6 md:px-0 md:pt-0">
          Related Anime
        </h2>
      </div>
      <div className="flex w-full flex-col">
        {animeInfo.relations &&
          animeInfo.relations.map((relatedAnime) => (
            <Link
              key={relatedAnime.id}
              href={"/anime/info/131573"}
              // href={`/info/${relatedAnime.id}?title=${relatedAnime.title}&dub=${isDub}`}
            >
              <div className="mb-3 flex h-[5.4rem] gap-2 overflow-hidden rounded-lg bg-popover pr-1 transition-all duration-300 ease-out hover:scale-[0.975] hover:bg-muted md:gap-3">
                <div className="aspect-[1/1.35] rounded-lg">
                  <img
                    alt="image"
                    loading="lazy"
                    width="70"
                    height="90"
                    decoding="async"
                    data-nimg="1"
                    className="PlayAnimeCard_playcardimg__pN6Il"
                    src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx131573-rpl82vDEDRm6.jpg"
                  />
                </div>
                <div className="flex h-full flex-grow flex-col justify-center">
                  <p className="PlayAnimeCard_playcardrelation__jkHgc">
                    PREQUEL
                  </p>
                  <p className="line-clamp-1 text-base font-semibold opacity-90">
                    JUJUTSU KAISEN 0
                  </p>
                  <p className="PlayAnimeCard_playepnum__r_ylK">
                    MOVIE <span>.</span>
                    <svg
                      viewBox="0 0 32 32"
                      className="mr-1 h-[18px] w-[18px]"
                      fill="none"
                      aria-hidden="true"
                      focusable="false"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.6661 6.66699C4.29791 6.66699 3.99943 6.96547 3.99943 7.33366V24.667C3.99943 25.0352 4.29791 25.3337 4.6661 25.3337H27.3328C27.701 25.3337 27.9994 25.0352 27.9994 24.667V7.33366C27.9994 6.96547 27.701 6.66699 27.3328 6.66699H4.6661ZM8.66667 21.3333C8.29848 21.3333 8 21.0349 8 20.6667V11.3333C8 10.9651 8.29848 10.6667 8.66667 10.6667H14C14.3682 10.6667 14.6667 10.9651 14.6667 11.3333V12.6667C14.6667 13.0349 14.3682 13.3333 14 13.3333H10.8C10.7264 13.3333 10.6667 13.393 10.6667 13.4667V18.5333C10.6667 18.607 10.7264 18.6667 10.8 18.6667H14C14.3682 18.6667 14.6667 18.9651 14.6667 19.3333V20.6667C14.6667 21.0349 14.3682 21.3333 14 21.3333H8.66667ZM18 21.3333C17.6318 21.3333 17.3333 21.0349 17.3333 20.6667V11.3333C17.3333 10.9651 17.6318 10.6667 18 10.6667H23.3333C23.7015 10.6667 24 10.9651 24 11.3333V12.6667C24 13.0349 23.7015 13.3333 23.3333 13.3333H20.1333C20.0597 13.3333 20 13.393 20 13.4667V18.5333C20 18.607 20.0597 18.6667 20.1333 18.6667H23.3333C23.7015 18.6667 24 18.9651 24 19.3333V20.6667C24 21.0349 23.7015 21.3333 23.3333 21.3333H18Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    1<span>.</span> FINISHED
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default RelatedAnime;
