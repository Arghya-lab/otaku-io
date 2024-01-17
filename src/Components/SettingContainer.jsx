import { useState } from "react";
import { useSelector } from "react-redux";
import Radio from "./Ui/Radio";
import ThemeSelectModal from "./ThemeSelectModal";
import AccountSection from "./accountSection";

function SettingContainer() {
  const { isEnabledDub, theme } = useSelector((state) => state.preference);

  const [isThemeSelectModalOpen, setIsThemeSelectModalOpen] = useState(false);

  const handleThemeSelectModalOpen = () => {
    setIsThemeSelectModalOpen(true);
  };
  const handleThemeSelectModalClose = () => {
    setIsThemeSelectModalOpen(false);
  };

  return (
    <div className="xs:pl-20 pb-16 xs:pb-0 flex h-full">
      <div className="flex-1 pt-8 xs:pt-8 pb-4 px-8 xs:px-12 h-full">
        {/* account section */}
        <div className="flex flex-col gap-2 pb-16 pt-6 border-b border-zinc-500">
          <p className="text-xl text-black dark:text-white pb-6">Account</p>
          <AccountSection />
        </div>
        {/* general section */}
        <div className="flex flex-col gap-2 pb-16 pt-6 border-b border-zinc-500">
          <p className="text-xl text-black dark:text-white pb-6">General</p>
          <div className="flex gap-4">
            <p className="text-gray-950 dark:text-slate-100 text-sm">
              Dub as auto select language
            </p>
            <Radio
              color={theme.secondaryColor}
              enabled={isEnabledDub}
              setEnabled={() => {
                console.log("dub enabled");
              }}
            />
          </div>
          <span
            className="hover:underline cursor-pointer font-nunito w-min text-nowrap"
            style={{ color: theme.secondaryColor }}
            onClick={handleThemeSelectModalOpen}>
            Change theme
          </span>
        </div>
        {/* player section */}
        <div className="flex flex-col gap-2 pb-16 pt-6 border-b border-zinc-500">
          <p className="text-xl text-black dark:text-white pb-6">Player</p>
        </div>
        {/* shortcuts section */}
        <div className="flex flex-col gap-4 pb-16 pt-6">
          <p className="text-xl text-black dark:text-white pb-6">Shortcuts</p>
        </div>
      </div>
      {/* Modals */}
      <ThemeSelectModal
        isOpen={isThemeSelectModalOpen}
        handleClose={handleThemeSelectModalClose}
      />
    </div>
  );
}

export default SettingContainer;
