import { Box, Search } from "lucide-react";
import UserBtn from "./Ui/UserBtn";
import MinMaximizeBtn from "./Ui/MinMaximizeBtn";
import useWindowSize from "../hooks/useWindowSize";

function TopNavbar() {
  const { windowWidth } = useWindowSize();

  return (
    <div className="px-5 h-20 absolute top-0 left-0 right-0 flex items-center justify-between gap-2 bg-transparent" >
      {/* for detail view page & video viewing add back btn */}
      <Box size={36} className="opacity-40 text-slate-300" />
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
          className="pl-7 h-full focus:outline-none bg-transparent w-[calc(100%-24px-2.5rem)] text-slate-100"
        />
        <div className="px-5 w-[24px] h-[24px] cursor-pointer">
          <Search size={24} className="opacity-90 text-slate-300" />
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
