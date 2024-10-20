/* eslint-disable @next/next/no-img-element */
"use client";

import { usePreference } from "@/components/providers/PreferenceProvider";
import getTitle from "@/utils/getTitle";
import { IAnimeInfo } from "@consumet/extensions";
import htmlParse from "html-react-parser";
import Link from "next/link";
import ShowMoreText from "react-show-more-text";

function AnimeInfo({ animeInfo }: { animeInfo: IAnimeInfo }) {
  const { isDub } = usePreference();
  const title = getTitle(animeInfo.title);

  console.log(animeInfo?.releaseDate);

  return (
    <div className="my-3 gap-2">
      <div className="flex h-fit w-full flex-col">
        <div className="flex w-full gap-3 rounded-lg px-2 pt-4 xxs:px-0 md:flex-row md:gap-5">
          <div className="relative mx-auto hidden aspect-[5/7] h-[280px] flex-shrink-0 overflow-hidden rounded-lg bg-card object-cover xxs:block sm:m-0">
            <img
              alt={title}
              loading="lazy"
              width="200"
              height="200"
              decoding="async"
              className="h-full w-full object-cover"
              src={animeInfo.image}
            />
          </div>
          <div className="flex flex-grow flex-col gap-3">
            <div className="relative flex flex-col justify-between gap-2">
              <div className="flex flex-row justify-between gap-1 text-lg font-medium">
                <Link
                  href={`/info/${animeInfo.id}?title=${title}&dub=${isDub}`}
                >
                  <span className="text-md mr-2 !line-clamp-2 w-full font-semibold !leading-snug tracking-wide text-primary opacity-90 hover:underline">
                    {title}
                  </span>
                </Link>
                <div className="relative ml-2 flex h-fit w-fit">
                  {/* <BookmarkBtn userBookmarks={bookmarks} animeId={animeInfo.id} /> */}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1 text-xs font-medium text-secondary-foreground sm:tracking-wider">
              <span className="w-fit rounded py-0">{animeInfo.type}</span>•
              <span className="">{animeInfo.status}</span>
              {animeInfo.releaseDate && (
                <span className="w-fit rounded px-1 py-0">
                  • {animeInfo.releaseDate}
                </span>
              )}
            </div>
            <div className="">
              <div className="flex flex-col gap-1.5 !text-xs font-medium !capitalize tracking-wide sm:text-sm sm:tracking-wider">
                {animeInfo?.popularity && (
                  <p>
                    <span className="">Popularity: </span>
                    <span className="text-secondary-foreground">
                      {animeInfo.popularity} users
                    </span>
                  </p>
                )}
                {animeInfo?.rating && (
                  <p>
                    <span className="">Rating: </span>
                    <span className="text-secondary-foreground">
                      {animeInfo.rating}
                    </span>
                  </p>
                )}
                {animeInfo?.malId && (
                  <p>
                    <span className="">Mal Id: </span>
                    <span className="text-secondary-foreground">
                      {animeInfo.malId}
                    </span>
                  </p>
                )}
                {animeInfo?.season && (
                  <p>
                    <span className="">Season: </span>
                    <span className="text-secondary-foreground">
                      {animeInfo.season}
                    </span>
                  </p>
                )}
                {animeInfo?.duration && (
                  <p>
                    <span className="">Runtime: </span>
                    <span className="text-secondary-foreground">
                      {animeInfo.duration} min
                    </span>
                  </p>
                )}
                {animeInfo?.releaseDate && (
                  <p>
                    <span className="">Release Date: </span>
                    <span className="text-secondary-foreground">
                      {animeInfo.releaseDate}
                    </span>
                  </p>
                )}
                {animeInfo?.endDate?.year &&
                  animeInfo?.endDate?.month &&
                  animeInfo?.endDate?.day && (
                    <p>
                      <span className="">End Date: </span>
                      <span className="text-secondary-foreground">{`${animeInfo?.endDate?.year}-${animeInfo?.endDate?.month}-${animeInfo?.endDate?.day}`}</span>
                    </p>
                  )}
                {animeInfo?.genres && (
                  <p>
                    <span className="">Genres: </span>
                    <span className="text-secondary-foreground">
                      {animeInfo.genres.join(", ")}
                    </span>
                  </p>
                )}
                {animeInfo?.studios && (
                  <p>
                    <span className="">Studios: </span>
                    <span className="text-secondary-foreground">
                      {animeInfo.studios.join(", ")}
                    </span>
                  </p>
                )}
                {animeInfo?.countryOfOrigin && (
                  <p>
                    <span className="">Country: </span>
                    <span className="text-secondary-foreground">
                      {animeInfo.countryOfOrigin}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <article className="prose my-3 rounded-md bg-card p-4 font-barlow">
          <ShowMoreText
            lines={3}
            more={
              <span className="cursor-pointer text-white">...see more</span>
            }
            less={
              <span className="cursor-pointer text-white">...see less</span>
            }
            className="content-css"
            anchorClass="show-more-less-clickable"
            expanded={false}
            truncatedEndingComponent={"... "}
          >
            {htmlParse(animeInfo?.description || "")}
          </ShowMoreText>
        </article>
      </div>
      {/* <div className="my-4 border-t" /> */}
    </div>
  );
}

export default AnimeInfo;
