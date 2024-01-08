import PropType from "prop-types";
import { ChevronRight } from "lucide-react";
import PosterItem from "./PosterItem";
import { posterItemType } from "../constants";
import usePosterItemCount from "../hooks/usePosterItemCount";

function PosterBoard({ name, content }) {
   const posterItemCount = usePosterItemCount()

  return (
    <div className="mt-4 pb-8 px-2 xxs:px-4">
      {/* Header */}
      <div className="mb-1 px-3 xxs:px-4 flex items-center justify-between text-slate-100">
        <p className="text-2xl capitalize">{name}</p>
        {/* See all btn */}
        <div
          role="button"
          className="p-2 pl-4 rounded-[45px] flex flex-row gap-2 items-center opacity-60 hover:bg-slate-600 hover:opacity-100 hover:text-slate-100">
          <p className="text-[15px]">See All</p>
          <ChevronRight size={24} />
        </div>
      </div>
      {/* Poster container */}
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${posterItemCount}, 1fr)` }}>
        {content.slice(0, posterItemCount).map((item, id) => (
          <PosterItem key={id} item={item} type={posterItemType.general} />
        ))}
      </div>
    </div>
  );
}

PosterBoard.propTypes = {
  name: PropType.string.isRequired,
  content: PropType.array.isRequired,
};

export default PosterBoard;
