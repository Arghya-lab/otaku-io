import { Fragment, useState } from "react";
import PropType from "prop-types";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import SimpleBar from "simplebar-react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Select({ list }) {
  const [selected, setSelected] = useState(list[3]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className="relative mt-2">
          <Listbox.Button className="relative w-52 py-1.5 pl-3 pr-10 text-left cursor-pointer rounded-[45px] bg-slate-700 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <span className="ml-3 block truncate text-slate-200">
              {selected.name}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <ChevronDown
                strokeWidth={2.75}
                className="h-5 w-5 text-gray-300"
              />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Listbox.Options className="absolute z-10 mt-1 w-52 rounded-[0.75rem] bg-[#141e307d] py-1 text-base shadow-lg focus:outline-none">
              <SimpleBar className="max-h-56">
                {list.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-orange-500 text-white" : "text-slate-400",
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
  );
}

Select.propTypes = {
  list: PropType.array.isRequired,
};

export default Select;