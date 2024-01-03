import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "./Ui/Select";
import PosterItem from "./PosterItem";
import SimpleBar from "simplebar-react";
import MetaMiniPreview from "./MetaMiniPreview";
import { formatList, genreList, sortList, statusList } from "../searchFilter";
import { posterItemType } from "../constants";
import { applyFilter } from "../features/content/contentSlice";
import { setMiniMeta } from "../features/selected/selectedSlice";

function DiscoverContentContainer() {
  const dispatch = useDispatch();

  const { selected } = useSelector((state) => state.filter);
  const { filterContent } = useSelector((state) => state.content);

  useEffect(() => {
    let params = {};
    for (const key in selected) {
      if (selected[key].value !== undefined) {
        if (key === "sort" || key === "genres") {
          params[key] = JSON.stringify([selected[key].value]);
        } else {
          params[key] = selected[key].value;
        }
      }
    }
    dispatch(applyFilter(params)).then((promiseResult) => {
      const filterFirstResult = promiseResult?.payload?.results[0];
      dispatch(setMiniMeta(filterFirstResult));
    });
  }, [selected, dispatch]);

  return (
    <div className="flex flex-row">
      <div className="flex-1 flex flex-col">
        {/* Selectable input container */}
        <div className="p-4 flex flex-row flex-wrap gap-4">
          <Select type={"format"} list={formatList} />
          <Select type={"genres"} list={genreList} />
          <Select type={"sort"} list={sortList} />
          <Select type={"status"} list={statusList} />
        </div>
        {/* Meta items container */}
        <SimpleBar className="h-[587px]">
          <div className="px-5 flex flex-row flex-wrap">
            {filterContent.map((item, id) => (
              <PosterItem key={id} item={item} type={posterItemType.filter} />
            ))}
          </div>
        </SimpleBar>
      </div>
      <MetaMiniPreview />
    </div>
  );
}

export default DiscoverContentContainer;
