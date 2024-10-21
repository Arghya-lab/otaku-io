"use client";

import Select from "@/components/ui/Select";
import useScroll from "@/hooks/useScroll";
import {
  formatList,
  genresList,
  sortList,
  statusList,
} from "@/lib/searchFilter";
import { FormatEnum, GenreEnum, SortEnum, StatusEnum } from "@/types/discover";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import classNames from "classnames";
import { FilterIcon } from "lucide-react";
import { parseAsArrayOf, parseAsStringEnum, useQueryState } from "nuqs";
import { Fragment, useState } from "react";

function Filter() {
  const scrolled = useScroll();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [format, setFormat] = useQueryState(
    "format",
    parseAsStringEnum<FormatEnum>(
      Object.values(
        formatList.map((format) => format.value).filter((format) => !!format)
      )
    )
  );
  const [genres, setGenres] = useQueryState(
    "genres",
    parseAsArrayOf(
      parseAsStringEnum<GenreEnum>(
        Object.values(
          genresList.map((genre) => genre.value).filter((genre) => !!genre)
        )
      ),
      ","
    )
  );
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsArrayOf(
      parseAsStringEnum<SortEnum>(
        Object.values(
          sortList.map((sort) => sort.value).filter((sort) => !!sort)
        )
      ),
      ","
    )
  );
  const [status, setStatus] = useQueryState(
    "status",
    parseAsStringEnum<StatusEnum>(
      Object.values(
        statusList.map((status) => status.value).filter((status) => !!status)
      )
    )
  );

  const MoreFilters = (
    <>
      <Select
        name={"genres"}
        list={genresList}
        selected={
          genres
            ? genresList[
                genresList.findIndex((item) => item.value == genres[0])
              ]
            : genresList[0]
        }
        onChange={(data) => {
          setGenres(data.value ? ([data.value] as GenreEnum[]) : null);
        }}
      />
      <Select
        name={"sort"}
        list={sortList}
        selected={
          sort
            ? sortList[sortList.findIndex((item) => item.value == sort[0])]
            : sortList[0]
        }
        onChange={(data) => {
          setSort(data.value ? ([data.value] as SortEnum[]) : null);
        }}
      />
      <Select
        name={"status"}
        list={statusList}
        selected={
          statusList[statusList.findIndex((item) => item.value == status)]
        }
        onChange={(data) => {
          setStatus(data.value as StatusEnum | null);
        }}
      />
    </>
  );

  return (
    <div
      className={classNames(
        "fixed top-[calc(3.5rem-0.5px)] z-40 flex h-24 w-full items-center gap-4 bg-transparent bg-opacity-50 p-4 backdrop-blur-md xxs:top-[calc(4rem-0.5px)]",
        {
          "bg-background bg-opacity-60": scrolled,
        }
      )}
    >
      <Select
        name={"format"}
        list={formatList}
        selected={
          formatList[formatList.findIndex((item) => item.value == format)]
        }
        onChange={(data) => {
          setFormat(data.value as FormatEnum | null);
        }}
      />
      <div className="md:hidden">
        <div>
          <div className="pl-2">
            <p className="capitalize">filter</p>
          </div>
          <div
            role="button"
            className="flex h-9 items-center justify-center rounded-[45px] bg-muted bg-opacity-20 px-4 shadow-lg"
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
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPanel className="flex w-5/6 max-w-64 transform flex-col gap-4 overflow-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all">
                    {MoreFilters}
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
      <div className="hidden md:flex md:items-center md:gap-4">
        {MoreFilters}
      </div>
    </div>
  );
}

export default Filter;
