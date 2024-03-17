"use client";

import { Search, X } from "lucide-react";
import chroma from "chroma-js";
import useScroll from "../hooks/useScroll";
import { FormEvent, useState } from "react";
import MinMaximizeBtn from "./ui/MinMaximizeBtn";
import useWindowSize from "@/hooks/useWindowSize";
import { themes } from "@/theme";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

function TopNavbar() {
  const theme = themes[1];

  const { windowWidth } = useWindowSize();
  const scrolled = useScroll();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.length > 0) {
      router.push(`/search/${searchQuery}`);
    }
  };

  return (
    <div
      className="px-5 h-14 xxs:h-16 sticky -top-[0.5px] z-40 w-full flex items-center justify-between gap-2 backdrop-blur-lg bg-opacity-50"
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
      <Link href="/" className="w-9 h-9">
        <Image alt="logo" width={50} height={50} className="scale-125" src="/logo.png" />
      </Link>
      <form
        className="h-10 xxs:h-12 w-full xxs:w-2/3 max-w-2xl rounded-[45px] bg-white bg-opacity-10 hover:bg-opacity-15 shadow-sm flex items-center"
        onSubmit={handleSearch}>
        <input
          size={1}
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
          tabIndex={-1}
          type="text"
          placeholder="Search ..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          className="pl-7 h-full focus:outline-none bg-transparent w-[calc(100%-24px-24px-2.5rem)] font-medium text-neutral-900 dark:text-slate-100"
        />
        <div className="w-[24px] h-[24px] pl-1 pr-2 flex-1">
          {searchQuery.length > 0 && (
            <X
              role="button"
              size={24}
              className="opacity-90 text-neutral-800 dark:text-slate-300"
              onClick={() => {
                setSearchQuery("");
              }}
            />
          )}
        </div>
        <button type="submit" className="pr-4 pl-2 w-[24px] h-[24px] flex-1">
          <Search
            size={24}
            className="opacity-90 text-neutral-800 dark:text-slate-300"
          />
        </button>
      </form>
      {windowWidth > 425 && <MinMaximizeBtn />}
    </div>
  );
}

export default TopNavbar;
