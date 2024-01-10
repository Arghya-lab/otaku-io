import PropType from "prop-types";
import { useEffect, useState, Fragment } from "react";
import { useSearchParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { FilterIcon } from "lucide-react";
import Select from "./Select";
import {
  formatList,
  genreList,
  sortList,
  statusList,
} from "../../searchFilter";
import { shade } from "../../utils/color";

function Filter({ color = "#141e30" }) {
  const [searchParams, setSearchParams] = useSearchParams();

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

  return (
    <div className="p-4 h-24 flex items-center gap-4">
      <Select
        name={"format"}
        list={formatList}
        selected={
          formatList[
            formatList.findIndex(
              (item) => item.value == searchParams.get("format")
            )
          ]
        }
        onChange={(data) => {
          if (data?.value) {
            searchParams.set("format", data.value);
            setSearchParams(searchParams);
          } else {
            searchParams.delete("format");
            setSearchParams(searchParams);
          }
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
                        selected={
                          formatList[
                            formatList.findIndex(
                              (item) => item.value == searchParams.get("format")
                            )
                          ]
                        }
                        onChange={(data) => {
                          if (data?.value) {
                            searchParams.set("format", data.value);
                            setSearchParams(searchParams);
                          } else {
                            searchParams.delete("format");
                            setSearchParams(searchParams);
                          }
                        }}
                      />
                      <Select
                        name={"genres"}
                        list={genreList}
                        selected={
                          searchParams.get("genres")
                            ? genreList[
                                genreList.findIndex(
                                  (item) =>
                                    item.value ==
                                    JSON.parse(searchParams.get("genres"))[0]
                                )
                              ]
                            : genreList[0]
                        }
                        onChange={(data) => {
                          if (data?.value) {
                            searchParams.set(
                              "genres",
                              JSON.stringify([data.value])
                            );
                            setSearchParams(searchParams);
                          } else {
                            searchParams.delete("genres");
                            setSearchParams(searchParams);
                          }
                        }}
                      />
                      <Select
                        name={"sort"}
                        list={sortList}
                        selected={
                          searchParams.get("sort")
                            ? sortList[
                                sortList.findIndex(
                                  (item) =>
                                    item.value ==
                                    JSON.parse(searchParams.get("sort"))[0]
                                )
                              ]
                            : sortList[0]
                        }
                        onChange={(data) => {
                          if (data?.value) {
                            searchParams.set(
                              "sort",
                              JSON.stringify([data.value])
                            );
                            setSearchParams(searchParams);
                          } else {
                            searchParams.delete("sort");
                            setSearchParams(searchParams);
                          }
                        }}
                      />
                      <Select
                        name={"status"}
                        list={statusList}
                        selected={
                          statusList[
                            statusList.findIndex(
                              (item) => item.value == searchParams.get("status")
                            )
                          ]
                        }
                        onChange={(data) => {
                          if (data?.value) {
                            searchParams.set("status", data.value);
                            setSearchParams(searchParams);
                          } else {
                            searchParams.delete("status");
                            setSearchParams(searchParams);
                          }
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
            selected={
              searchParams.get("genres")
                ? genreList[
                    genreList.findIndex(
                      (item) =>
                        item.value == JSON.parse(searchParams.get("genres"))[0]
                    )
                  ]
                : genreList[0]
            }
            onChange={(data) => {
              if (data?.value) {
                searchParams.set("genres", JSON.stringify([data.value]));
                setSearchParams(searchParams);
              } else {
                searchParams.delete("genres");
                setSearchParams(searchParams);
              }
            }}
          />
          <Select
            name={"sort"}
            list={sortList}
            selected={
              searchParams.get("sort")
                ? sortList[
                    sortList.findIndex(
                      (item) =>
                        item.value == JSON.parse(searchParams.get("sort"))[0]
                    )
                  ]
                : sortList[0]
            }
            onChange={(data) => {
              if (data?.value) {
                searchParams.set("sort", JSON.stringify([data.value]));
                setSearchParams(searchParams);
              } else {
                searchParams.delete("sort");
                setSearchParams(searchParams);
              }
            }}
          />
          <Select
            name={"status"}
            list={statusList}
            selected={
              statusList[
                statusList.findIndex(
                  (item) => item.value == searchParams.get("status")
                )
              ]
            }
            onChange={(data) => {
              if (data?.value) {
                searchParams.set("status", data.value);
                setSearchParams(searchParams);
              } else {
                searchParams.delete("status");
                setSearchParams(searchParams);
              }
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
