// import { addSeconds, format, formatDuration, secondsToMilliseconds } from "date-fns";

export const secToMinSec = (s:number) => {
  // const date = new Date(secondsToMilliseconds(s));
  // const updatedDate = addSeconds(date, s);
  // return format(date, 'm.s');
  return Math.floor(s/60)+"."+Math.floor(s%60)
  // return formatDuration({
  //   seconds: s,
  // });
};