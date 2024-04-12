"use client";

import { Fragment } from "react";
import SimpleBar from "simplebar-react";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { shade } from "../../utils/color";
import { themes } from "@/theme";
import { usePreference } from "../providers/PreferenceProvider";
import chroma from "chroma-js";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Select({
  name,
  color,
  list,
  selected,
  onChange,
  isWatchPage = false,
}: {
  name?: string;
  color?: string;
  list: { value: string | number | undefined; name: string }[];
  selected: { value: string | number | undefined; name: string };
  onChange: (value: {
    value: string | number | undefined;
    name: string;
  }) => void;
  isWatchPage?: boolean;
}) {
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  return (
    <div>
      {name && (
        <div className="pl-4">
          <p style={{ color: theme.textColor, textTransform: "capitalize" }}>
            {name}
          </p>
        </div>
      )}
      <Listbox value={selected} onChange={onChange}>
        {({ open }) => (
          <div className="relative pt-1">
            <Listbox.Button
              className="relative min-w-44 max-w-52 py-1.5 pl-3 pr-10 text-left cursor-pointer rounded-[45px] text-gray-900 shadow-sm focus:outline-none focus:ring-2 bg-opacity-20"
              style={{
                backgroundColor: isWatchPage
                  ? chroma(theme.secondaryColor).alpha(0.2).toString()
                  : shade(color || theme.primaryColor, 0, 0.2).toString(),
              }}>
              <span
                className="ml-3 block truncate"
                style={{ color: !isWatchPage ? "#fff" : theme.textColor }}>
                {selected?.name}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronDown
                  strokeWidth={2.75}
                  className="h-5 w-5 opacity-70"
                  style={{ color: !isWatchPage ? "#fff" : theme.textColor }}
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Listbox.Options className="absolute z-10 mt-1 w-52 rounded-xl bg-[#141e30] py-1 text-base shadow-lg focus:outline-none">
                <SimpleBar className="max-h-56">
                  {list.map((person, id) => (
                    <Listbox.Option
                      key={id}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "bg-orange-500 text-slate-50"
                            : "text-slate-400",
                          "relative cursor-default select-none text-sm py-[6px] px-2"
                        )
                      }
                      value={person}>
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected
                                ? "font-semibold text-slate-300"
                                : "font-normal",
                              "ml-3 block truncate"
                            )}>
                            {person.name}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-orange-500",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}>
                              <Check className="h-5 w-5" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </SimpleBar>
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
}

export default Select;
