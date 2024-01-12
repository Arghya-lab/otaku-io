import { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Radio from "./Ui/Radio";
import ThemeSelectModal from "./ThemeSelectModal";

const sectionNames = Object.freeze({
  ACCOUNT_SECTION: "account",
  GENERAL_SECTION: "general",
  PLAYER_SECTION: "player",
  SHORTCUTS_SECTION: "shortcuts",
});
function SettingContainer() {
  const sectionsContainerRef = useRef(null);
  const accountSectionRef = useRef(null);
  const generalSectionRef = useRef(null);
  const playerSectionRef = useRef(null);
  const shortcutsSectionRef = useRef(null);

  const { isEnabledDub, theme } = useSelector((state) => state.preference);

  const sections = useMemo(
    () => [
      { ref: accountSectionRef, name: sectionNames.ACCOUNT_SECTION },
      { ref: generalSectionRef, name: sectionNames.GENERAL_SECTION },
      { ref: playerSectionRef, name: sectionNames.PLAYER_SECTION },
      { ref: shortcutsSectionRef, name: sectionNames.SHORTCUTS_SECTION },
    ],
    []
  );
  const [selectedSection, setSelectedSection] = useState(
    sectionNames.ACCOUNT_SECTION
  );

  const [isThemeSelectModalOpen, setIsThemeSelectModalOpen] = useState(false);

  const handleThemeSelectModalOpen = () => {
    setIsThemeSelectModalOpen(true);
  };
  const handleThemeSelectModalClose = () => {
    setIsThemeSelectModalOpen(false);
  };

  return (
    <div className="xs:pl-20 pb-16 xs:pb-0 flex">
      <div className="w-56 flex flex-col gap-3 mt-8 mb-4 mx-4">
        <div
          role="button"
          className={`font-medium px-8 py-3 rounded-[45px] text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 bg-white bg-opacity-15 hover:bg-opacity-20 ${
            selectedSection === sectionNames.ACCOUNT_SECTION
              ? "text-neutral-950 dark:text-neutral-50 bg-opacity-30"
              : null
          }`}>
          Account
        </div>
        <div
          role="button"
          className={`font-medium px-8 py-3 rounded-[45px] text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 bg-white bg-opacity-15 hover:bg-opacity-20 ${
            selectedSection === sectionNames.GENERAL_SECTION
              ? "text-neutral-950 dark:text-neutral-50 bg-opacity-30"
              : null
          }`}>
          General
        </div>
        <div
          role="button"
          className={`font-medium px-8 py-3 rounded-[45px] text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 bg-white bg-opacity-15 hover:bg-opacity-20 ${
            selectedSection === sectionNames.PLAYER_SECTION
              ? "text-neutral-950 dark:text-neutral-50 bg-opacity-30"
              : null
          }`}>
          Player
        </div>
        <div
          role="button"
          className={`font-medium px-8 py-3 rounded-[45px] text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 bg-white bg-opacity-15 hover:bg-opacity-20 ${
            selectedSection === sectionNames.SHORTCUTS_SECTION
              ? "text-neutral-950 dark:text-neutral-50 bg-opacity-30"
              : null
          }`}>
          Shortcuts
        </div>
      </div>
      <div ref={sectionsContainerRef} className="flex-1 pt-8 pb-4 px-12">
        {/* account section */}
        <div
          ref={accountSectionRef}
          className="flex flex-col gap-4 pt-2 pb-16 border-t border-zinc-500">
          <p className="text-xl text-black dark:text-white ">Account</p>
        </div>
        {/* general section */}
        <div
          ref={generalSectionRef}
          className="flex flex-col gap-4 pt-2 pb-16 border-t border-zinc-500">
          <p className="text-xl text-black dark:text-white ">General</p>
          <div className="flex gap-4">
            <p>Dub as auto select language</p>
            <Radio color={theme.secondaryColor}
              enabled={isEnabledDub}
              setEnabled={()=>{console.log("dub enabled")}} />
          </div>
          <p
            className="hover:underline cursor-pointer font-nunito"
            style={{ color: theme.secondaryColor }}
            onClick={handleThemeSelectModalOpen}>
            Change theme
          </p>
        </div>
        {/* player section */}
        <div
          ref={playerSectionRef}
          className="flex flex-col gap-4 pt-2 pb-16 border-t border-zinc-500">
          <p className="text-xl text-black dark:text-white ">Player</p>
        </div>
        {/* shortcuts section */}
        <div
          ref={shortcutsSectionRef}
          className="flex flex-col gap-4 pt-2 pb-16 border-t border-zinc-500">
          <p className="text-xl text-black dark:text-white ">Shortcuts</p>
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
