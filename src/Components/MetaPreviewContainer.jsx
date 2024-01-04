import SimpleBar from "simplebar-react";
import { useSelector } from "react-redux";
import Chip from "./Ui/Chip";
import ChipBtn from "./Ui/ChipBtn";

function MetaPreviewContainer() {
  const { detailInfo } = useSelector((state) => state.content);
  const color = "#e4a15d";

  return (
    <SimpleBar className="h-[587px] pr-2">
      {/* <div className="h-36 text-2xl">
              {detailInfo?.title?.english ||
                detailInfo?.title?.native ||
                detailInfo?.title?.romaji}
            </div> */}
      <img
        className="h-32 object-contain object-center"
        src="https://images.metahub.space/logo/medium/tt0388629/img"
      />
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
          <Chip name={"Imdb rating"} value={"7.4"} color={color} />
          <Chip name={"Runtime"} value={detailInfo?.duration} color={color} />
          <Chip name={"Rated"} value={"PG"} color={color} />
        </div>
        <div className="flex flex-wrap gap-3 mb-12">
          <Chip name={"totalSeasons"} value={"3"} color={color} />
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
            />
          ) : null}
          <Chip name={"season"} value={detailInfo?.season} color={color} />
        </div>

        {detailInfo?.genres && (
          <div>
            <p className="capitalize text-slate-50 opacity-50 font-medium text-lg">
              genres
            </p>
            <div className="flex flex-wrap items-center mt-2 mb-8 ml-4">
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
              {detailInfo?.studios.map((studio, id) => (
                <ChipBtn key={id} name={studio} color={color} />
              ))}
            </div>
          </div>
        )}
        {detailInfo?.description && (
          <div className="flex flex-wrap gap-3 mt-8">
            <p className="capitalize text-slate-50 opacity-50 font-medium text-lg">
              description
            </p>
            <p
              className="prose text-white font-nunito pl-4"
              // style={{ color: textColor(item - 1) }}
              dangerouslySetInnerHTML={{
                __html: `<p >${detailInfo?.description}</p>`,
              }}
            />
          </div>
        )}
        <div className="flex flex-wrap gap-3 my-8">
          <Chip name={"Type"} value={detailInfo?.type} color={color} />
          <Chip name={"Writer"} value={"Maity jong"} color={color} />
        </div>
      </div>
    </SimpleBar>
  );
}

export default MetaPreviewContainer;
