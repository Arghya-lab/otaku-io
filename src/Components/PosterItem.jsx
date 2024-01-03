import { useState } from "react";
import PropType from "prop-types";

function PosterItem({ name, image, color }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      role="button"
      className="p-3 w-[calc(100%/5)] flex flex-col"
      onPointerEnter={() => setIsHover(true)}
      onPointerLeave={() => setIsHover(false)}>
      <div
        className={`pt-64 relative overflow-hidden rounded-[0.75rem] ring-[3px] ${
          isHover ? "ring-slate-50" : "ring-transparent"
        }`}>
        <div
          className={`absolute top-0 transition-transform duration-200 ease-in transform-gpu ${
            isHover ? "scale-110" : null
          }`}>
          <img
          title={name}
            className="h-64 object-cover"
            src={image}
          />
        </div>
      </div>
      <div
        className="h-16 text-sm font-medium flex items-center"
        style={{ color: isHover ? color : "#FFFFFF" }}>
        <p className="px-2 w-full line-clamp-2 text-center ">{name}</p>
      </div>
    </div>
  );
}

PosterItem.propTypes = {
  name: PropType.string.isRequired,
  image: PropType.string.isRequired,
  color: PropType.string.isRequired,
};

export default PosterItem;
