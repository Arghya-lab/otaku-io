import { getServerSession } from "next-auth";
import Image from "next/image";
import htmlParse from "html-react-parser";
import Chip from "./Chip";
import ChipBtn from "./ChipBtn";
import BookmarkBtn from "./BookmarkBtn";
import User from "@/models/User";
import { AnimeImdbInfoType, DetailAnimeInfoType } from "@/types/anime";

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

  const title =
    typeof detailInfo.title === "string"
      ? detailInfo.title
      : detailInfo.title?.english ||
        detailInfo.title?.native ||
        detailInfo.title?.romaji ||
        detailInfo.title?.userPreferred ||
        "";

  const color = detailInfo?.color || "#000";

  return (
    <>
      <div className="flex items-center">
        {imdbInfo?.imdbID ? (
          <Image
            className="object-contain object-center h-auto w-auto"
            height={128}
            width={256}
            alt={title}
            src={`https://images.metahub.space/logo/medium/${imdbInfo.imdbID}/img`}
          />
        ) : (
          <div className="min-h-32 text-6xl font-extrabold font-nunito text-white">
            {title}
          </div>
        )}
        <BookmarkBtn userBookmarks={bookmarks} animeId={detailInfo.id} />
      </div>
      <div className="my-8">
        <div className="flex flex-wrap gap-3 mb-4">
          <Chip
            name={"popularity"}
            value={detailInfo?.popularity}
            color={color}
          />
          <Chip name={"rating"} value={detailInfo?.rating} color={color} />
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <Chip
            name={"Imdb rating"}
            value={imdbInfo?.imdbRating}
            color={color}
          />
          <Chip name={"Runtime"} value={detailInfo?.duration} color={color} />
          <Chip name={"Rated"} value={imdbInfo?.Rated} color={color} />
        </div>
        <div className="flex flex-wrap gap-3 mb-12">
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
            <p className="capitalize text-slate-50 opacity-50 font-medium text-lg">
              genres
            </p>
            <div className="flex flex-wrap gap-2 items-center mt-2 mb-8 ml-4">
              {detailInfo?.genres.map((genre, id) => (
                <ChipBtn key={id} name={genre} color={color} />
              ))}
            </div>
          </div>
        )}
        {detailInfo?.studios && (
          <div>
            <p className="capitalize text-slate-50 opacity-50 font-medium text-lg">
              studios
            </p>
            <div className="flex flex-wrap items-center mt-2 mb-8 ml-4">
              {detailInfo?.studios.map((studio: string, id: number) => (
                <Chip key={id} value={studio} color={color} />
              ))}
            </div>
          </div>
        )}
        {detailInfo?.description && (
          <div className="flex flex-wrap gap-3 mt-8">
            <p className="capitalize text-slate-50 opacity-50 font-medium text-lg">
              description
            </p>
            <div
              className="prose text-white font-nunito pl-4"
              // style={{ color: textColor(item - 1) }}
            >
              {htmlParse(`<p >${detailInfo?.description}</p>`)}
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-3 my-8">
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
