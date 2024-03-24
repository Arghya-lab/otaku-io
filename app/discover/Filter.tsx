"use client";

import { useState, Fragment } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { FilterIcon } from "lucide-react";
import chroma from "chroma-js";
import Select from "@/components/ui/Select";
import { usePreference } from "@/components/PreferenceProvider";
import {
  formatList,
  genreList,
  sortList,
  statusList,
} from "@/lib/searchFilter";
import useWindowSize from "@/hooks/useWindowSize";
import useScroll from "@/hooks/useScroll";
import { themes } from "@/theme";

function Filter() {
  const { themeId } = usePreference();
  const theme = themes[themeId];

  const searchParams = useSearchParams();
  const router = useRouter();

  const scrolled = useScroll();
  const { windowWidth } = useWindowSize();

  const [isModalOpen, setIsModalOpen] = useState(false);

  function updateQuery(name: string, value: (string | number)[] | undefined) {
    let formatQueryValue: string | null;
    let genresQueryValue: string | null;
    let sortQueryValue: string | null;
    let statusQueryValue: string | null;

    if (name === "format") {
      formatQueryValue = value ? value[0].toString() : null;
    } else {
      formatQueryValue = searchParams.get("format");
    }

    if (name === "genres") {
      genresQueryValue = value ? JSON.stringify(value) : null;
    } else {
      genresQueryValue = searchParams.get("genres");
    }

    if (name === "sort") {
      sortQueryValue = value ? JSON.stringify(value) : null;
    } else {
      sortQueryValue = searchParams.get("sort");
    }

    if (name === "status") {
      statusQueryValue = value ? value[0].toString() : null;
    } else {
      statusQueryValue = searchParams.get("status");
    }

    let queriesArray = [];
    if (formatQueryValue)
      queriesArray.push({ name: "format", value: formatQueryValue });
    if (genresQueryValue)
      queriesArray.push({ name: "genres", value: genresQueryValue });
    if (sortQueryValue)
      queriesArray.push({ name: "sort", value: sortQueryValue });
    if (statusQueryValue)
      queriesArray.push({ name: "status", value: statusQueryValue });

    const queries = queriesArray
      .map((data) => `${data.name}=${data.value}`)
      .join("&");

    router.push(`/discover${queries ? `?${queries}` : ""}`);
    router.refresh();
  }

  return (
    <div
      className="p-4 h-24 fixed top-[calc(3.5rem-0.5px)] xxs:top-[calc(4rem-0.5px)] w-full z-40 flex items-center gap-4 backdrop-blur-md bg-opacity-50"
      style={{
        backgroundColor: scrolled
          ? `${chroma(theme.primaryColor).darken().alpha(0.6)}`
          : "transparent",
      }}>
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
          updateQuery("format", data?.value ? [data.value] : undefined);
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
              style={{
                backgroundColor: chroma(theme.primaryColor)
                  .darken(1.75)
                  .alpha(0.7)
                  .toString(),
              }}
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
                      style={{ backgroundColor: theme.primaryColor }}>
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
                          updateQuery(
                            "format",
                            data?.value ? [data.value] : undefined
                          );
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
                                    JSON.parse(
                                      searchParams.get("genres") || ""
                                    )[0]
                                )
                              ]
                            : genreList[0]
                        }
                        onChange={(data) => {
                          updateQuery(
                            "genres",
                            data?.value ? [data.value] : undefined
                          );
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
                                    JSON.parse(
                                      searchParams.get("sort") || ""
                                    )[0]
                                )
                              ]
                            : sortList[0]
                        }
                        onChange={(data) => {
                          updateQuery(
                            "sort",
                            data?.value ? [data.value] : undefined
                          );
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
                          updateQuery(
                            "status",
                            data?.value ? [data.value] : undefined
                          );
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
                        item.value ==
                        JSON.parse(searchParams.get("genres") || "")[0]
                    )
                  ]
                : genreList[0]
            }
            onChange={(data) => {
              updateQuery("genres", data?.value ? [data.value] : undefined);
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
                        JSON.parse(searchParams.get("sort") || "")[0]
                    )
                  ]
                : sortList[0]
            }
            onChange={(data) => {
              updateQuery("sort", data?.value ? [data.value] : undefined);
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
              updateQuery("status", data?.value ? [data.value] : undefined);
            }}
          />
        </>
      )}
    </div>
  );
}

export default Filter;
