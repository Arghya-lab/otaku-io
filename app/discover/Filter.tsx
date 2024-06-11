"use client";

import { usePreference } from "@/components/providers/PreferenceProvider";
import Select from "@/components/ui/Select";
import useScroll from "@/hooks/useScroll";
import useWindowSize from "@/hooks/useWindowSize";
import {
  formatList,
  genreList,
  sortList,
  statusList,
} from "@/lib/searchFilter";
import { themes } from "@/theme";
import { shade } from "@/utils/color";
import { Dialog, Transition } from "@headlessui/react";
import chroma from "chroma-js";
import { FilterIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useState } from "react";

function Filter() {
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

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
  }

  return (
    <div
      className="fixed top-[calc(3.5rem-0.5px)] z-40 flex h-24 w-full items-center gap-4 bg-opacity-50 p-4 backdrop-blur-md xxs:top-[calc(4rem-0.5px)]"
      style={{
        backgroundColor: scrolled
          ? `${chroma(theme.primaryColor).darken().alpha(0.6)}`
          : "transparent",
      }}
    >
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
              <p className="capitalize" style={{ color: theme.textColor }}>
                filter
              </p>
            </div>
            <div
              role="button"
              className="flex h-9 items-center justify-center rounded-[45px] px-4 shadow-lg"
              style={{
                backgroundColor: shade(theme.primaryColor, 0, 0.2).hex(),
                color: "#fff",
              }}
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              <FilterIcon size={18} color="#fff" fill="#fff" />
            </div>
          </div>
          <Transition appear show={isModalOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-30"
              onClose={() => setIsModalOpen(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
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
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel
                      className="flex w-5/6 max-w-64 transform flex-col gap-4 overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
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
