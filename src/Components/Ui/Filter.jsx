import PropType from "prop-types";
import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { FilterIcon } from "lucide-react";
import Select from "./Select";
import {
  formatList,
  genreList,
  sortList,
  statusList,
} from "../../searchFilter";
import { changeFilter } from "../../features/filter/filterSlice";
import { applyFilter } from "../../features/content/contentSlice";
import { setMiniMeta } from "../../features/selected/selectedSlice";
import { shade } from "../../utils/color";

function Filter({ color = "#141e30" }) {
  const dispatch = useDispatch();
  const { selected } = useSelector((state) => state.filter);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    const updateWindowWidth = () => setWindowWidth(window.innerWidth);

    updateWindowWidth(); // Initial update on mount
    window.addEventListener("resize", updateWindowWidth); // Listen for window resize

    return () => {
      window.removeEventListener("resize", updateWindowWidth); // Clean up on unmount
    };
  }, []);

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
    <div className="p-4 h-24 flex items-center gap-4">
      <Select
        name={"format"}
        list={formatList}
        selected={selected["format"]}
        onChange={(data) => {
          dispatch(changeFilter({ type: "format", data }));
        }}
      />
      {windowWidth < 1000 ? (
        <>
          <div>
            <div className="pl-2">
              <p className="text-white capitalize">filter</p>
            </div>
            <div
              role="button"
              className="h-9 px-4 rounded-[45px] shadow-sm bg-white bg-opacity-20 flex items-center justify-center"
              style={{ backgroundColor: shade(color, 0, 0.15) }}
              onClick={() => setIsModalOpen(!isModalOpen)}>
              <FilterIcon size={18} color="#fff" fill="#fff" />
            </div>
          </div>
          <Transition appear show={isModalOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-30"
              onClose={() => setIsModalOpen(false)}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95">
                    <Dialog.Panel
                      className="w-5/6 max-w-64 transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all flex flex-col gap-4"
                      style={{ backgroundColor: color }}>
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
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

Filter.propTypes = {
  color: PropType.string,
};

export default Filter;
