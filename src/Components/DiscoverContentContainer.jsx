import { useSelector } from "react-redux";
import PosterItem from "./PosterItem";
import SimpleBar from "simplebar-react";
// import MetaMiniPreview from "./MetaMiniPreview";
// import { posterItemType } from "../constants";
import usePosterItemCount from "../hooks/usePosterItemCount";
import Filter from "./Ui/Filter";

function DiscoverContentContainer() {
  const posterItemCount = usePosterItemCount();

  const { filterContent } = useSelector((state) => state.content);

  return (
    <div className="absolute top-20 bottom-20 xs:bottom-0 left-0 xs:left-20 right-0 z-20 flex flex-row">
      <div className="flex-1">
        {/* Selectable input container */}
        <Filter />
        {/* Meta items container */}
        <SimpleBar className="h-[calc(100vh-5rem-6rem-5rem)] xs:h-[calc(100vh-5rem-6rem)] grid">
          <div
            className="px-2 xxs:px-4 grid"
            style={{ gridTemplateColumns: `repeat( ${posterItemCount}, 1fr)` }}>
            {filterContent.map((item, id) => (
              <PosterItem key={id} item={item}
              // type={posterItemType.filter}
            />
            ))}
          </div>
        </SimpleBar>
      </div>
      {/* {windowWidth>1000 && (
      <MetaMiniPreview />)} */}
    </div>
  );
}

export default DiscoverContentContainer;
