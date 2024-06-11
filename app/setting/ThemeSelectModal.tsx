"use client";

import {
  UpdateTypeEnum,
  usePreference,
} from "@/components/providers/PreferenceProvider";
import { themeType, themes } from "@/theme";
import { Dialog, Transition } from "@headlessui/react";
import Tippy from "@tippyjs/react";
import { Check } from "lucide-react";
import { Fragment } from "react";

function ThemeSelectModal({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  const { themeId, updatePreference } = usePreference();

  const handleChangeTheme = (theme: themeType) => {
    updatePreference(UpdateTypeEnum.CHANGE_THEME_ID, theme.id);
    handleClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-black p-6 text-left align-middle shadow-xl transition-all dark:bg-white">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-100 dark:text-gray-900"
                >
                  Select your theme
                </Dialog.Title>
                <div className="flex flex-wrap pt-4">
                  {themes.map((themeItem) => (
                    <div
                      key={themeItem.id}
                      onClick={() => handleChangeTheme(themeItem)}
                    >
                      <Tippy
                        hideOnClick={true}
                        content={
                          <div className="rounded-xl bg-white px-2 text-neutral-900 dark:bg-black dark:text-neutral-100">
                            {themeItem.name}
                          </div>
                        }
                      >
                        <div
                          className="m-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2"
                          style={{
                            background: themeItem.bgImg,
                            borderColor: themeItem.secondaryColor,
                          }}
                        >
                          {themeItem.id == themeId && (
                            <Check
                              className={
                                themeItem.type === "light"
                                  ? "text-neutral-700"
                                  : "text-slate-200"
                              }
                            />
                          )}
                        </div>
                      </Tippy>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ThemeSelectModal;
