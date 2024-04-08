"use client";

import { useState } from "react";
import screenfull from "screenfull";
import { Maximize, Minimize } from "lucide-react";
import { usePreference } from "@/app/PreferenceProvider";
import { themes } from "@/theme";

function MinMaximizeBtn() {
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleMaximizeClick = () => {
    const appElement = document.getElementsByTagName("body")[0];
    if (appElement) {
      screenfull.request(appElement);
      setIsFullScreen(true);
    }
  };

  return (
    <div
      className="w-12 h-12 cursor-pointer flex justify-center items-center rounded-[10px] opacity-55 hover:opacity-75 bg-white bg-opacity-0 hover:bg-opacity-20"
      style={{ color: theme.textColor }}>
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
