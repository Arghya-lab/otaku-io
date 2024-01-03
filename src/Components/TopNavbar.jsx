import { Box, Search, UserRound } from "lucide-react";

function TopNavbar() {
  return (
    <div className="w-screen p-5 flex items-center justify-between">
      <Box size={36} className="opacity-40 text-slate-300" />
      <div className="h-12 min-w-[480px] max-w-2xl rounded-[45px] bg-slate-700 shadow-sm flex flex-row items-center">
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
      <div className="w-12 h-12 cursor-pointer flex justify-center items-center rounded-[10px] opacity-65 text-slate-300  hover:bg-slate-600 hover:opacity-100 hover:text-slate-100">
        <UserRound size={24} strokeWidth={2.5} />
      </div>
    </div>
  );
}

export default TopNavbar;
