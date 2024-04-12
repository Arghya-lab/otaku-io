"use client";

import { useState } from "react";
import { Palette } from "lucide-react";
import Radio from "@/components/ui/Radio";
import ThemeSelectModal from "./ThemeSelectModal";
import { themes } from "@/theme";
import {
  UpdateTypeEnum,
  usePreference,
} from "@/components/providers/PreferenceProvider";

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
    <section className="flex flex-col gap-2 pb-16 pt-6 border-b border-zinc-500">
      <h3 className="text-xl pb-6" style={{ color: theme.textColor }}>
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
    </section>
  );
}

export default GeneralSection;
