import { useEffect, useState } from "react";
import screenfull from "screenfull";
import { Maximize, Minimize } from "lucide-react";

function MinMaximizeBtn() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement === document.documentElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const handleMaximizeClick = () => {
    const appElement = document.getElementsByTagName("body")[0];
    if (appElement) {
      screenfull.request(appElement);
    }
  };

  return (
    <div className="w-12 h-12 cursor-pointer flex justify-center items-center rounded-[10px] opacity-65 text-neutral-800 dark:text-slate-300 bg-white bg-opacity-0 hover:bg-opacity-10 hover:opacity-100 hover:text-neutral-900 dark:hover:text-slate-100">
      {isFullScreen ? (
        <Minimize
          size={24}
          strokeWidth={2.5}
          onClick={() => {
            screenfull.exit();
          }}
        />
      ) : (
        <Maximize
          size={24}
          strokeWidth={2.5}
          onClick={handleMaximizeClick}
        />
      )}
    </div>
  );
}

export default MinMaximizeBtn;