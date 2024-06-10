import { useState, useEffect } from "react";

const usePosterItemCount = () => {
  const [posterItemCount, setPosterItemCount] = useState(1);

  useEffect(() => {
    const updatePosterItemCount = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 425) {
        setPosterItemCount(2);
      } else if (screenWidth < 640) {
        setPosterItemCount(3);
      } else if (screenWidth < 800) {
        setPosterItemCount(4);
      } else if (screenWidth < 1000) {
        setPosterItemCount(5);
      } else if (screenWidth < 1300) {
        setPosterItemCount(6);
      } else if (screenWidth < 1600) {
        setPosterItemCount(7);
      } else if (screenWidth < 1900) {
        setPosterItemCount(8);
      } else if (screenWidth < 2200) {
        setPosterItemCount(9);
      } else {
        setPosterItemCount(10);
      }
    };

    updatePosterItemCount(); // Initial update on mount
    window.addEventListener("resize", updatePosterItemCount); // Listen for window resize

    return () => {
      window.removeEventListener("resize", updatePosterItemCount); // Clean up on unmount
    };
  }, []);

  return posterItemCount;
};

export default usePosterItemCount;
