import Skeleton from "react-loading-skeleton";
import chroma from "chroma-js";
import { getUserTheme } from "@/app/layout";
import TopNavbar from "@/components/TopNavbar";

async function loading() {
  const theme = await getUserTheme();

  return (
    <div className="w-full relative h-full">
      <TopNavbar />
      <Skeleton
        className="rounded-md my-4 h-[75vh] w-[90%] m-[5%]"
        baseColor={chroma(theme.primaryColor).darken(1).toString()}
        highlightColor={chroma(theme.primaryColor).darken(1.5).toString()}
      />
    </div>
  );
}

export default loading;
