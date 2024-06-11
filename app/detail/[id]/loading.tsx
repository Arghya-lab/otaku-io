import { getUserTheme } from "@/app/layout";
import TopNavbar from "@/components/TopNavbar";
import chroma from "chroma-js";
import Skeleton from "react-loading-skeleton";

async function loading() {
  const theme = await getUserTheme();

  return (
    <div className="relative h-full w-full">
      <TopNavbar />
      <Skeleton
        className="m-[5%] my-4 h-[75vh] w-[90%] rounded-md"
        baseColor={chroma(theme.primaryColor).darken(1).toString()}
        highlightColor={chroma(theme.primaryColor).darken(1.5).toString()}
      />
    </div>
  );
}

export default loading;
