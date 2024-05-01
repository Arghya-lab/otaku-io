"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import chroma from "chroma-js";
import { Search, X } from "lucide-react";
import MinMaximizeBtn from "@/components/ui/MinMaximizeBtn";
import useScroll from "@/hooks/useScroll";
import useWindowSize from "@/hooks/useWindowSize";
import { usePreference } from "./providers/PreferenceProvider";
import { themes } from "@/theme";
import { shade } from "@/utils/color";

function TopNavbar({ bgColor }: { bgColor?: string }) {
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

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
          ? `${
              bgColor
                ? shade(bgColor, -1, 0.1)
                : chroma(theme.primaryColor).darken().alpha(0.6)
            }`
          : "transparent",
      }}>
      {/* for detail view page & video viewing add back btn */}
      {/* <Box
        size={36}
        className="opacity-40 text-neutral-700 dark:text-slate-300"
      /> */}
      <Link href="/home" className="w-9 h-9">
        <Image
          alt="logo"
          width={50}
          height={50}
          className="scale-125"
          src={`/images/logo-${themeId % 14}.png`}
        />
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
          placeholder="Search anything..."
          value={searchQuery}
          onChange={(e) => {
            console.log("k");

            setSearchQuery(e.target.value);
          }}
          className="pl-7 h-full focus:outline-none bg-transparent w-[calc(100%-24px-24px-2.5rem)] font-medium"
          style={{ color: theme.textColor }}
        />
        <div className="w-[24px] h-[24px] pl-1 pr-2 flex-1">
          {searchQuery.length > 0 && (
            <X
              role="button"
              size={24}
              className="opacity-55 hover:opacity-75"
              style={{ color: theme.textColor }}
              onClick={() => {
                setSearchQuery("");
              }}
            />
          )}
        </div>
        <button type="submit" className="pr-4 pl-2 w-[24px] h-[24px] flex-1">
          <Search
            size={24}
            className="opacity-55 hover:opacity-75"
            style={{ color: theme.textColor }}
          />
        </button>
      </form>
      {windowWidth > 425 && <MinMaximizeBtn />}
    </div>
  );
}

export default TopNavbar;
