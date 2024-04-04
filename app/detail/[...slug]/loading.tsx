import { getUserTheme } from "@/app/layout";
import TopNavbar from "@/components/TopNavbar";
import Skeleton from "react-loading-skeleton";

async function loading() {
  const theme = await getUserTheme();

  return (
    <div className="w-full relative">
      <TopNavbar />
      <Skeleton
        className="rounded-md my-4 h-screen w-[90%] m-[5%]"
        baseColor={theme.type === "dark" ? "#111" : "#ddd"}
        highlightColor={theme.type === "dark" ? "#222" : "#bbb"}
      />
    </div>
  );
}

export default loading;
