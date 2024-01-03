import MetaMiniPreview from "./MetaMiniPreview";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import Select from "./Ui/Select";
import { formatList, genreList, sortList, statusList } from "../searchFilter";
import PosterItem from "./PosterItem";

function DiscoverContentContainer() {
  return (
    <div className="flex flex-row">
      <div className="flex-1 flex flex-col">
        {/* Selectable input container */}
        <div className="p-4 flex flex-row flex-wrap gap-4">
          <Select list={formatList} />
          <Select list={genreList} />
          <Select list={sortList} />
          <Select list={statusList} />
        </div>
        {/* Meta items container */}
        <SimpleBar className="h-[587px]">
          <div className="px-5 flex flex-row flex-wrap">
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
            <PosterItem />
          </div>
        </SimpleBar>
      </div>
      <MetaMiniPreview />
    </div>
  );
}

export default DiscoverContentContainer;
