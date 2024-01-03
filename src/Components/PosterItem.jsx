import { useState } from "react";
import PropType from "prop-types";
import { posterItemType } from "../constants";
import { useDispatch } from "react-redux";
import { setMiniMeta } from "../features/selected/selectedSlice";

function PosterItem({ item, type }) {
  const dispatch = useDispatch();

  const [isHover, setIsHover] = useState(false);

  const handleClick = () => {
    if (type === posterItemType.general) {
      return;
    } else if (type === posterItemType.filter) {
      dispatch(setMiniMeta(item));
    }
  };

  return (
    <div
      role="button"
      className="p-3 w-[calc(100%/5)] flex flex-col"
      onPointerEnter={() => setIsHover(true)}
      onPointerLeave={() => setIsHover(false)}
      onClick={handleClick}>
      <div
        className={`pt-64 relative overflow-hidden rounded-[0.75rem] ring-[3px] ${
          isHover ? "ring-slate-50" : "ring-transparent"
        }`}>
        <div
          className={`absolute top-0 transition-transform duration-200 ease-in transform-gpu ${
            isHover ? "scale-110" : null
          }`}>
          <img
            title={item?.title?.english}
            className="h-64 object-cover"
            src={item?.image}
          />
        </div>
      </div>
      <div
        className="h-16 text-sm font-medium flex items-center"
        style={{ color: isHover ? item?.color || "00ffff" : "#FFFFFF" }}>
        <p className="px-2 w-full line-clamp-2 text-center">
          {item?.title?.userPreferred}
        </p>
      </div>
    </div>
  );
}

PosterItem.propTypes = {
  item: PropType.object.isRequired,
  type: PropType.string.isRequired,
};

export default PosterItem;
