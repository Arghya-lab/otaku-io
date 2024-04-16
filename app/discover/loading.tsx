import Skeleton from "react-loading-skeleton";
import chroma from "chroma-js";
import { getUserTheme } from "@/app/layout";

async function loading() {
  const theme = await getUserTheme();

  return (
    <Skeleton
      containerClassName="flex-1"
      className="rounded-md h-[75vh] w-[90%] m-[5%] mt-0"
      baseColor={chroma(theme.primaryColor).darken(1).toString()}
      highlightColor={chroma(theme.primaryColor).darken(1.5).toString()}
    />
  );
}

export default loading;
