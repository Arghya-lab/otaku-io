"use client";

import {
  UpdateTypeEnum,
  usePreference,
} from "@/components/providers/PreferenceProvider";
import Radio from "@/components/ui/Radio";
import { themes } from "@/theme";
import { Palette } from "lucide-react";
import { useState } from "react";
import ThemeSelectModal from "./ThemeSelectModal";

function GeneralSection() {
  const { themeId, isDub, updatePreference } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  const [isThemeSelectModalOpen, setIsThemeSelectModalOpen] = useState(false);

  const handleThemeSelectModalOpen = () => {
    setIsThemeSelectModalOpen(true);
  };
  const handleThemeSelectModalClose = () => {
    setIsThemeSelectModalOpen(false);
  };

  const handleChangeLanguage = () => {
    updatePreference(UpdateTypeEnum.TOGGLE_IS_DUB);
  };

  return (
    <section className="flex flex-col gap-2 border-b border-zinc-500 pb-16 pt-6">
      <h3 className="pb-6 text-xl" style={{ color: theme.textColor }}>
        General
      </h3>
      <div className="flex flex-col gap-2 xs:pl-12">
        <div className="flex gap-4">
          <p className="text-sm">Dub as auto select language</p>
          <Radio
            color={theme.secondaryColor}
            enabled={isDub}
            setEnabled={handleChangeLanguage}
          />
        </div>
        <button
          className="flex w-min items-center gap-2 text-nowrap font-nunito hover:underline"
          style={{ color: theme.secondaryColor }}
          onClick={handleThemeSelectModalOpen}
        >
          <Palette size={16} />
          Change theme
        </button>
      </div>
      {/* Modals */}
      <ThemeSelectModal
        isOpen={isThemeSelectModalOpen}
        handleClose={handleThemeSelectModalClose}
      />
    </section>
  );
}

export default GeneralSection;
