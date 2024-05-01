import "client-only";

const isMobileDevice = () => {
  return /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)|Fennec|Windows Phone|Windows CE|Nintendo (3DS|WiiU)|Symbian|PalmOS/i.test(
    navigator.userAgent
  );
};
export default isMobileDevice;
