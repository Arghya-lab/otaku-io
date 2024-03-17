import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    updateWindowSize(); // Initial update on mount
    window.addEventListener("resize", updateWindowSize); // Listen for window resize

    return () => {
      window.removeEventListener("resize", updateWindowSize); // Clean up on unmount
    };
  }, []);

  return { windowWidth, windowHeight };
};

export default useWindowSize;