import PropType from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { posterItemType } from "../constants";
import { setMiniMeta } from "../features/selected/selectedSlice";
import { shade } from "../utils/color";

function PosterItem({ item, type = posterItemType.general }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isHover, setIsHover] = useState(false);

  const handleClick = () => {
    if (type === posterItemType.general) {
      if (item?.id) {
        const title =
          item?.title?.english ||
          item?.title?.romaji ||
          item?.title?.native ||
          item?.title?.userPreferred;
        navigate(`/detail/${item.id}/${title}`);
      }
    } else if (type === posterItemType.filter) {
      dispatch(setMiniMeta(item));
    }
  };

  return (
    <div
      role="button"
      className="p-1.5 xxs:p-3 xs:p-4 w-full"
      onPointerEnter={() => {
        setIsHover(true);
      }}
      onPointerLeave={() => {
        setIsHover(false);
      }}
      onClick={handleClick}>
      <div
        className={`pt-[calc(100%*1.464)] w-full relative overflow-hidden rounded-xl ring-[3px] ${
          isHover ? "ring-slate-50" : "ring-transparent"
        }`}>
        <div
          className={`h-[calc(100%*1.464)] absolute top-0 -z-10 overflow-hidden transition-transform duration-200 ease-in transform-gpu ${
            isHover ? "scale-110" : null
          }`}>
          <img
            className="object-cover object-center h-full w-full"
            src={item?.image}
          />
        </div>
      </div>
      <div
        className="h-16 text-sm font-medium flex items-center overflow-visible"
        style={{
          color: isHover ? shade(item?.color || "00ffff", -2) : "#FFFFFF",
        }}>
        <p className="px-2 w-full line-clamp-2 text-center">
          {item?.title?.english || item?.title?.userPreferred || item?.title?.romaji || item?.title?.native}
        </p>
      </div>
    </div>
    // </div>
  );
}

PosterItem.propTypes = {
  item: PropType.object.isRequired,
  type: PropType.string,
};

export default PosterItem;
