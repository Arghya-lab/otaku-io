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
import { changeFilter } from "../features/filter/filterSlice";

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
          <Select
            name={"format"}
            list={formatList}
            selected={selected["format"]}
            onChange={(data) => {
              dispatch(changeFilter({ type: "format", data }));
            }}
          />
          <Select
            name={"genres"}
            list={genreList}
            selected={selected["genres"]}
            onChange={(data) => {
              dispatch(changeFilter({ type: "genres", data }));
            }}
          />
          <Select
            name={"sort"}
            list={sortList}
            selected={selected["sort"]}
            onChange={(data) => {
              dispatch(changeFilter({ type: "sort", data }));
            }}
          />
          <Select
            name={"status"}
            list={statusList}
            selected={selected["status"]}
            onChange={(data) => {
              dispatch(changeFilter({ type: "status", data }));
            }}
          />
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
