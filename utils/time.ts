// import { addSeconds, format, formatDuration, secondsToMilliseconds } from "date-fns";

export const secToMinSec = (s: number) => {
  return (
    convertToTwoDigits(Math.floor(s / 60)) +
    "." +
    convertToTwoDigits(Math.floor(s % 60))
  );
};

function convertToTwoDigits(number: number) {
  // Convert number to string
  let numberString = number.toString();

  // Check if length is less than 2
  if (numberString.length < 2) {
    // Prepend '0' to the string
    numberString = "0" + numberString;
  }

  return numberString;
}
