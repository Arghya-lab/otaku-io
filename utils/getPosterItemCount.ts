export default function getPosterItemCount() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 425) {
    return 2;
  } else if (screenWidth < 640) {
    return 3;
  } else if (screenWidth < 800) {
    return 4;
  } else if (screenWidth < 1000) {
    return 5;
  } else if (screenWidth < 1300) {
    return 6;
  } else if (screenWidth < 1600) {
    return 7;
  } else if (screenWidth < 1900) {
    return 8;
  } else if (screenWidth < 2200) {
    return 9;
  } else {
    return 10;
  }
}
