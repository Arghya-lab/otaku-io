import PropType from "prop-types";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { themeTypes } from "../themes";
import Tippy from "@tippyjs/react";
import { useDispatch } from "react-redux";
import { setTheme } from "../features/preference/preferenceSlice";

function ThemeSelectModal({ isOpen, handleClose }) {
  const dispatch = useDispatch();

  const handleChangeTheme = (theme) => {
    dispatch(setTheme(theme));
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-black dark:bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-100 dark:text-gray-900">
                  Select your theme
                </Dialog.Title>
                <div className="pt-4 flex flex-wrap ">
                  {themeTypes.map((theme) => (
                    <div
                      key={theme.id}
                      onClick={() => handleChangeTheme(theme)}>
                      <Tippy
                        content={
                          <div className="bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 rounded-xl px-2">
                            {theme.name}
                          </div>
                        }>
                        <div
                          className="w-12 h-12 rounded-full cursor-pointer border-2 m-2"
                          style={{
                            background: theme.bgImg,
                            borderColor: theme.secondaryColor,
                          }}
                        />
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

ThemeSelectModal.propTypes = {
  isOpen: PropType.bool.isRequired,
  handleClose: PropType.func.isRequired,
};

export default ThemeSelectModal;
