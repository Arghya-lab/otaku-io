import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import htmlParse from "html-react-parser";
import Skeleton from "react-loading-skeleton";
import { Bookmark } from "lucide-react";
import Chip from "./Ui/Chip";
import ChipBtn from "./Ui/ChipBtn";
import { toggleBookMark } from "../features/preference/preferenceSlice";

function MetaPreviewContainer() {
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  const { status, userData } = useSelector((state) => state.auth);
  const { detailInfo, imdbInfo, detailInfoLoaded, imdbInfoLoaded } =
    useSelector((state) => state.content);
  const { bookmarks, theme } = useSelector((state) => state.preference);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoaded(detailInfoLoaded && imdbInfoLoaded);
  }, [detailInfoLoaded, imdbInfoLoaded]);

  const handleToggleBookmark = () => {
    if (status) {
      (async () => {
        dispatch(toggleBookMark({ userId: userData.$id, animeId: id }));
      })();
    }
  };

  if (!isLoaded) {
    return (
      <>
        <Skeleton
          className="h-48 w-64 rounded-xl"
          baseColor={theme.type === "dark" ? "#111" : "#ddd"}
          highlightColor={theme.type === "dark" ? "#222" : "#bbb"}
        />
        <Skeleton
          className="h-48 mt-3 rounded-xl"
          baseColor={theme.type === "dark" ? "#111" : "#ddd"}
          highlightColor={theme.type === "dark" ? "#222" : "#bbb"}
        />
        <Skeleton
          className="h-36 w-80 my-3 rounded-xl"
          baseColor={theme.type === "dark" ? "#111" : "#ddd"}
          highlightColor={theme.type === "dark" ? "#222" : "#bbb"}
        />
        <Skeleton
          className="h-80 rounded-xl"
          baseColor={theme.type === "dark" ? "#111" : "#ddd"}
          highlightColor={theme.type === "dark" ? "#222" : "#bbb"}
        />
      </>
    );
  }

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
        <div role="button" className="pl-20" onClick={handleToggleBookmark}>
          {bookmarks.includes(id) ? (
            <Bookmark size={36} color="#fff" fill="#fff" />
          ) : (
            <Bookmark size={36} color="#fff" />
          )}
        </div>
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
              {detailInfo?.genres.map((genre, id) => (
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
              {detailInfo?.studios.map((studio, id) => (
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
          <Chip
            name={"Writer"}
            value={imdbInfo?.Writer}
            color={detailInfo?.color}
          />
        </div>
      </div>
    </div>
  );
}

export default MetaPreviewContainer;
