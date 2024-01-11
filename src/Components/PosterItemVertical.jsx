import { useState } from "react";
import PropType from "prop-types";
import { useDispatch } from "react-redux";
import { posterItemType } from "../constants";
import { setMiniMeta } from "../features/selected/selectedSlice";

function PosterItemVertical({ item, type = posterItemType.filter }) {
  const dispatch = useDispatch();

  const [isHover, setIsHover] = useState(false);

  const handleClick = () => {
    console.log(item);
    if (type === posterItemType.general) {
      return;
    } else if (type === posterItemType.filter) {
      dispatch(setMiniMeta(item));
    }
  };
  return (
    <div
      role="button"
      className={`p-3 mr-4 max-w-md flex flex-row rounded-xl ${
        isHover ? "bg-black dark:bg-white bg-opacity-5" : "bg-transparent"
      }`}
      onPointerEnter={() => setIsHover(true)}
      onPointerLeave={() => setIsHover(false)}
      onClick={handleClick}>
      <div className={`pl-24 relative overflow-hidden rounded-xl`}>
        <div
          className={`absolute left-0 transition-transform duration-200 ease-in transform-gpu ${
            isHover ? "scale-110" : null
          }`}>
          <img
            title={
              item?.title?.userPreferred ||
              item?.title?.romaji ||
              item?.title?.native ||
              item?.title?.english
            }
            className="object-cover w-24"
            src={item?.image}
          />
        </div>
      </div>
      <div className="flex-1 py-2 px-4 text-neutral-900 dark:text-slate-100">
        <p className="px-6 font-nunito font-semibold w-full text-center pb-2 line-clamp-2 overflow-x-ellipsis">
          {item?.title?.english ||
            item?.title?.userPreferred ||
            item?.title?.romaji ||
            item?.title?.native}
        </p>
        <div className="text-neutral-800 dark:text-slate-300 text-sm">
          {item?.rating && (
            <div>
              <span>Rating : </span>
              <span>{item?.rating}</span>
            </div>
          )}
          {item?.type && (
            <div>
              <span>Type : </span>
              <span>{item?.type}</span>
            </div>
          )}
          {item?.type != "MOVIE" && item?.episodes && (
            <div>
              <span>Total episodes : </span>
              <span>{item?.episodes}</span>
            </div>
          )}
          {item?.status && (
            <div>
              <span>Status : </span>
              <span>{item?.status}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

PosterItemVertical.propTypes = {
  item: PropType.object.isRequired,
  type: PropType.string,
};

export default PosterItemVertical;
