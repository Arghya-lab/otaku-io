import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Palette } from "lucide-react";
import Radio from "./Ui/Radio";
import ThemeSelectModal from "./ThemeSelectModal";
import { changeLanguagePref } from "../features/preference/preferenceSlice";

function GeneralSection() {
  const dispatch = useDispatch();
  const { preferenceId, isDubEnabled, theme } = useSelector(
    (state) => state.preference
  );

  const [isThemeSelectModalOpen, setIsThemeSelectModalOpen] = useState(false);

  const handleThemeSelectModalOpen = () => {
    setIsThemeSelectModalOpen(true);
  };
  const handleThemeSelectModalClose = () => {
    setIsThemeSelectModalOpen(false);
  };

  const handleChangeLanguage = () =>
    dispatch(
      changeLanguagePref({
        preferenceId,
        isDubEnabled: !isDubEnabled,
      })
    );

  return (
    <div className="flex flex-col gap-2 pb-16 pt-6 border-b border-zinc-500">
      <p className="text-xl text-black dark:text-white pb-6">General</p>
      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
          <p className="text-gray-950 dark:text-slate-100 text-sm">
            Dub as auto select language
          </p>
          <Radio
            color={theme.secondaryColor}
            enabled={isDubEnabled}
            setEnabled={handleChangeLanguage}
          />
        </div>
        <button
          className="hover:underline font-nunito w-min text-nowrap flex items-center gap-2"
          style={{ color: theme.secondaryColor }}
          onClick={handleThemeSelectModalOpen}>
            <Palette size={16} />
          Change theme
        </button>
      </div>
      {/* Modals */}
      <ThemeSelectModal
        isOpen={isThemeSelectModalOpen}
        handleClose={handleThemeSelectModalClose}
      />
    </div>
  );
}

export default GeneralSection;