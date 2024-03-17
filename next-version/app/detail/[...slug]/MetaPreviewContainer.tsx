import htmlParse from "html-react-parser";
import axios from "axios";
import Chip from "./Chip";
import ChipBtn from "./ChipBtn";
import BookmarkBtn from "./BookmarkBtn";
import User from "@/models/User";
import { getServerSession } from "next-auth";

async function MetaPreviewContainer({
  detailInfo,
  imdbInfo,
}: {
  detailInfo: any;
  imdbInfo: any;
}) {
  const session = await getServerSession();
  const user = await User.findOne({ email: session?.user?.email });
  let bookmarks = user.bookmarks || null;

  return (
    <div>
      <div className="flex items-center">
        {imdbInfo?.imdbID ? (
          <img
            className="object-contain object-center"
            height={128}
            width={256}
            src={`https://images.metahub.space/logo/medium/${imdbInfo?.imdbID}/img`}
          />
        ) : (
          <div className="min-h-32 text-6xl font-extrabold font-nunito text-white">
            {detailInfo?.title?.english ||
              detailInfo?.title?.native ||
              detailInfo?.title?.romaji}
          </div>
        )}
        <BookmarkBtn userBookmarks={bookmarks} animeId={detailInfo.id} />
      </div>
      <div className="my-8">
        <div className="flex flex-wrap gap-3 mb-4">
          <Chip
            name={"popularity"}
            value={detailInfo?.popularity}
            color={detailInfo?.color}
          />
          <Chip
            name={"rating"}
            value={detailInfo?.rating}
            color={detailInfo?.color}
          />
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <Chip
            name={"Imdb rating"}
            value={imdbInfo?.imdbRating}
            color={detailInfo?.color}
          />
          <Chip
            name={"Runtime"}
            value={detailInfo?.duration}
            color={detailInfo?.color}
          />
          <Chip
            name={"Rated"}
            value={imdbInfo?.Rated}
            color={detailInfo?.color}
          />
        </div>
        <div className="flex flex-wrap gap-3 mb-12">
          <Chip
            name={"totalSeasons"}
            value={imdbInfo?.totalSeasons}
            color={detailInfo?.color}
          />
          {detailInfo?.startDate?.year &&
          detailInfo?.startDate?.month &&
          detailInfo?.startDate?.day ? (
            <Chip
              name={"releaseDate"}
              value={`${detailInfo?.startDate?.year}-${detailInfo?.startDate?.month}-${detailInfo?.startDate?.day}`}
              color={detailInfo?.color}
            />
          ) : (
            <Chip
              name={"releaseDate"}
              value={detailInfo?.releaseDate}
              color={detailInfo?.color}
            />
          )}
          {detailInfo?.endDate?.year &&
          detailInfo?.endDate?.month &&
          detailInfo?.endDate?.day ? (
            <Chip
              name={"endDate"}
              value={`${detailInfo?.endDate?.year}-${detailInfo?.endDate?.month}-${detailInfo?.endDate?.day}`}
              color={detailInfo?.color}
            />
          ) : null}
          <Chip
            name={"season"}
            value={detailInfo?.season}
            color={detailInfo?.color}
          />
        </div>

        {detailInfo?.genres && (
          <div>
            <p className="capitalize text-slate-50 opacity-50 font-medium text-lg">
              genres
            </p>
            <div className="flex flex-wrap gap-2 items-center mt-2 mb-8 ml-4">
              {detailInfo?.genres.map((genre: any, id: number) => (
                <ChipBtn key={id} name={genre} color={detailInfo?.color} />
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
                <Chip key={id} value={studio} color={detailInfo?.color} />
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
          <Chip
            name={"Type"}
            value={detailInfo?.type}
            color={detailInfo?.color}
          />
          {imdbInfo?.Writer !== "N/A" && (
            <Chip
              name={"Writer"}
              value={imdbInfo?.Writer}
              color={detailInfo?.color}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MetaPreviewContainer;
