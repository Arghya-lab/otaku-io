"use client";

import { usePreference } from "@/components/providers/PreferenceProvider";
import { themes } from "@/theme";
import { Maximize, Minimize } from "lucide-react";
import { useState } from "react";
import screenfull from "screenfull";

function MinMaximizeBtn() {
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleMaximizeClick = () => {
    const appElement = document.getElementById("App");
    if (appElement) {
      screenfull.request(appElement);
      setIsFullScreen(true);
    }
  };

  return (
    <div
      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-[10px] bg-white bg-opacity-0 opacity-55 hover:bg-opacity-20 hover:opacity-75"
      style={{ color: theme.textColor }}
    >
      {isFullScreen ? (
        <Minimize
          size={24}
          strokeWidth={2.5}
          onClick={() => {
            screenfull.exit();
            setIsFullScreen(false);
          }}
        />
      ) : (
        <Maximize size={24} strokeWidth={2.5} onClick={handleMaximizeClick} />
      )}
    </div>
  );
}

export default MinMaximizeBtn;
