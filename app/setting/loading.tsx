import { getUserTheme } from "@/app/layout";
import chroma from "chroma-js";
import Skeleton from "react-loading-skeleton";

async function loading() {
  const theme = await getUserTheme();

  return (
    <Skeleton
      className="m-[5%] my-4 h-[75vh] w-[90%] rounded-md"
      baseColor={chroma(theme.primaryColor).darken(1).toString()}
      highlightColor={chroma(theme.primaryColor).darken(1.5).toString()}
    />
  );
}

export default loading;
