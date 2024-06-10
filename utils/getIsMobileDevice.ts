import "client-only";

const isMobileDevice = () => {
  if (typeof window !== "undefined" && typeof navigator !== "undefined") {
    return /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)|Fennec|Windows Phone|Windows CE|Nintendo (3DS|WiiU)|Symbian|PalmOS/i.test(
      navigator.userAgent
    );
  }
  return false; // Default to false when not in a browser environment
};

export default isMobileDevice;
