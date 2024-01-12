import { useSelector } from "react-redux";
import { Search } from "lucide-react";
import chroma from "chroma-js";
import UserBtn from "./Ui/UserBtn";
import MinMaximizeBtn from "./Ui/MinMaximizeBtn";
import useWindowSize from "../hooks/useWindowSize";
import useScroll from "../hooks/useScroll";

function TopNavbar() {
  const { theme } = useSelector((state) => state.preference);

  const { windowWidth } = useWindowSize();
  const scrolled = useScroll();

  return (
    <div
      className="px-5 h-16 sticky -top-[0.5px] z-40 w-full flex items-center justify-between gap-2 backdrop-blur bg-opacity-50"
      style={{
        backgroundColor: scrolled
          ? `${chroma(theme.primaryColor).darken().alpha(0.6)}`
          : "transparent",
      }}>
      {/* for detail view page & video viewing add back btn */}
      {/* <Box
        size={36}
        className="opacity-40 text-neutral-700 dark:text-slate-300"
      /> */}
      <div className="w-9 h-9">
        <img className="scale-150" src="/logo.png" />
      </div>
      <div className="h-12 w-full xxs:w-2/3 max-w-2xl rounded-[45px] bg-white bg-opacity-10 hover:bg-opacity-15 shadow-sm flex flex-row items-center">
        <input
          size="1"
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
          tabIndex="-1"
          type="text"
          placeholder="Search or paste link"
          className="pl-7 h-full focus:outline-none bg-transparent w-[calc(100%-24px-2.5rem)] font-medium text-neutral-900 dark:text-slate-100"
        />
        <div className="px-5 w-[24px] h-[24px] cursor-pointer">
          <Search
            size={24}
            className="opacity-90 text-neutral-800 dark:text-slate-300"
          />
        </div>
      </div>
      {windowWidth > 425 && (
        <div className="flex gap-1">
          <UserBtn />
          <MinMaximizeBtn />
        </div>
      )}
    </div>
  );
}

export default TopNavbar;
