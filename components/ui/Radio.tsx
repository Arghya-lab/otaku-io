"use client";

import { usePreference } from "@/app/PreferenceProvider";
import { themes } from "@/theme";
import { shade } from "@/utils/color";
import { Switch } from "@headlessui/react";
import chroma from "chroma-js";

function Radio({
  color = "#fff",
  enabled,
  setEnabled,
  isWatchPage = false,
}: {
  color?: string;
  enabled: boolean;
  setEnabled: () => void;
  isWatchPage?: boolean;
}) {
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className="
          relative inline-flex h-[22px] w-[42px] shrink-0 cursor-pointer rounded-3xl border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      style={{
        backgroundColor: enabled
          ? !isWatchPage
            ? shade(color, 1, 0.2).toString()
            : chroma(theme.secondaryColor).alpha(0.25).toString()
          : !isWatchPage
          ? shade(color, -1, 0.2).toString()
          : chroma(theme.secondaryColor).alpha(0.15).toString(),
      }}>
      <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-[20px]" : "translate-x-0"}
            pointer-events-none inline-block h-[18px] w-[18px] transform rounded-3xl
            , shadow-lg ring-0 transition duration-200 ease-in-out`}
        style={{
          backgroundColor: enabled
            ? !isWatchPage
              ? shade(color, 0).toString()
              : chroma(theme.secondaryColor).alpha(0.75).toString()
            : !isWatchPage
            ? shade(color, 0.25).toString()
            : chroma(theme.secondaryColor).alpha(0.5).toString(),
        }}
      />
    </Switch>
  );
}

export default Radio;
