/* eslint-disable @next/next/no-img-element */
import User from "@/models/User";
import { AnimeImdbInfoType, DetailAnimeInfoType } from "@/types/anime";
import getTitle from "@/utils/getTitle";
import classNames from "classnames";
import htmlParse from "html-react-parser";
import { getServerSession } from "next-auth";
import BookmarkBtn from "./BookmarkBtn";
import Chip from "./Chip";
import ChipBtn from "./ChipBtn";

async function MetaPreviewContainer({
  detailInfo,
  imdbInfo,
}: {
  detailInfo: DetailAnimeInfoType;
  imdbInfo: AnimeImdbInfoType | undefined;
}) {
  const session = await getServerSession();
  const user = await User.findOne({ email: session?.user?.email });
  let bookmarks = user?.bookmarks || null;

  const title = getTitle(detailInfo.title);

  const color = detailInfo?.color || "#000";

  return (
    <>
      <div
        className={classNames(
          "flex flex-wrap items-center justify-between gap-4 md:max-w-[576px]",
          {
            "max-w-96": imdbInfo?.imdbID,
            "max-w-96 xxs:max-w-[324px] xs:max-w-[536px] sm:max-w-[696px] md:max-w-full":
              !imdbInfo?.imdbID,
          }
        )}
      >
        {imdbInfo?.imdbID ? (
          <img
            className="max-h-32 max-w-64 object-contain object-center md:max-h-48 md:max-w-80"
            alt={title}
            src={`https://images.metahub.space/logo/small/${imdbInfo.imdbID}/img`}
          />
        ) : (
          <div
            className={classNames("min-h-32 break-all font-nunito text-white", {
              "text-3xl font-bold xxs:text-4xl xxs:font-extrabold":
                title.length > 50,
              "text-4xl font-extrabold xxs:text-5xl":
                title.length > 30 && title.length <= 50,
              "text-6xl font-extrabold": title.length > 0 && title.length <= 30,
            })}
          >
            {title}
          </div>
        )}
        <BookmarkBtn userBookmarks={bookmarks} animeId={detailInfo.id} />
      </div>
      <div className="my-8">
        <div className="mb-4 flex flex-wrap gap-3">
          <Chip
            name={"popularity"}
            value={detailInfo?.popularity}
            color={color}
          />
          <Chip name={"rating"} value={detailInfo?.rating} color={color} />
        </div>
        <div className="mb-4 flex flex-wrap gap-3">
          <Chip
            name={"Imdb rating"}
            value={imdbInfo?.imdbRating}
            color={color}
          />
          <Chip name={"Runtime"} value={detailInfo?.duration} color={color} />
          <Chip name={"Rated"} value={imdbInfo?.Rated} color={color} />
        </div>
        <div className="mb-12 flex flex-wrap gap-3">
          <Chip
            name={"totalSeasons"}
            value={imdbInfo?.totalSeasons}
            color={color}
          />
          {detailInfo?.startDate?.year &&
          detailInfo?.startDate?.month &&
          detailInfo?.startDate?.day ? (
            <Chip
              name={"releaseDate"}
              value={`${detailInfo?.startDate?.year}-${detailInfo?.startDate?.month}-${detailInfo?.startDate?.day}`}
              color={color}
            />
          ) : (
            <Chip
              name={"releaseDate"}
              value={detailInfo?.releaseDate}
              color={color}
            />
          )}
          {detailInfo?.endDate?.year &&
          detailInfo?.endDate?.month &&
          detailInfo?.endDate?.day ? (
            <Chip
              name={"endDate"}
              value={`${detailInfo?.endDate?.year}-${detailInfo?.endDate?.month}-${detailInfo?.endDate?.day}`}
              color={color}
            />
          ) : null}
          <Chip name={"season"} value={detailInfo?.season} color={color} />
        </div>

        {detailInfo?.genres && (
          <div>
            <p className="text-lg font-medium capitalize text-slate-50 opacity-50">
              genres
            </p>
            <div className="mb-8 ml-4 mt-2 flex flex-wrap items-center gap-2">
              {detailInfo?.genres.map((genre, id) => (
                <ChipBtn key={id} name={genre} color={color} />
              ))}
            </div>
          </div>
        )}
        {detailInfo?.studios && (
          <div>
            <p className="text-lg font-medium capitalize text-slate-50 opacity-50">
              studios
            </p>
            <div className="mb-8 ml-4 mt-2 flex flex-wrap items-center">
              {detailInfo?.studios.map((studio: string, id: number) => (
                <Chip key={id} value={studio} color={color} />
              ))}
            </div>
          </div>
        )}
        {detailInfo?.description && (
          <div className="mt-8 flex flex-wrap gap-3">
            <p className="text-lg font-medium capitalize text-slate-50 opacity-50">
              description
            </p>
            <div
              className="prose pl-4 font-nunito text-white"
              // style={{ color: textColor(item - 1) }}
            >
              {htmlParse(`<p >${detailInfo?.description}</p>`)}
            </div>
          </div>
        )}
        <div className="my-8 flex flex-wrap gap-3">
          <Chip name={"Type"} value={detailInfo?.type} color={color} />
          {imdbInfo?.Writer !== "N/A" && (
            <Chip name={"Writer"} value={imdbInfo?.Writer} color={color} />
          )}
        </div>
      </div>
    </>
  );
}

export default MetaPreviewContainer;
