"use client";

import useScroll from "@/hooks/useScroll";
import { themes } from "@/theme";
import { shade } from "@/utils/color";
import chroma from "chroma-js";
import classNames from "classnames";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { usePreference } from "./providers/PreferenceProvider";

function TopNavbar({ bgColor }: { bgColor?: string }) {
  const pathname = usePathname();
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

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
      className={classNames(
        "sticky -top-[0.5px] z-[100] flex h-14 w-full items-center justify-center bg-opacity-50 px-5 pl-16 backdrop-blur-lg xxs:h-16",
        {
          "border-b-[1px]": scrolled && pathname !== "/discover",
        }
      )}
      style={{
        backgroundColor: scrolled
          ? `${
              bgColor
                ? shade(bgColor, -1, 0.1)
                : chroma(theme.primaryColor).darken().alpha(0.6)
            }`
          : "transparent",
        borderColor: scrolled
          ? `${
              bgColor ? shade(bgColor, 1) : chroma(theme.primaryColor).darken(1)
            }`
          : "transparent",
      }}
    >
      <Link href="/home" className="absolute left-5 h-9 w-9">
        <Image
          alt="logo"
          width={50}
          height={50}
          className="scale-110"
          src={`/images/logo-${themeId % 14}.png`}
        />
      </Link>
      <form
        className="flex h-9 w-full max-w-2xl items-center rounded-[45px] bg-white bg-opacity-10 shadow-sm hover:bg-opacity-15 xxs:h-12 xs:w-2/3"
        onSubmit={handleSearch}
      >
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
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-full w-[calc(100%-24px-24px-2.5rem)] bg-transparent pl-7 font-medium focus:outline-none"
          style={{ color: theme.textColor }}
        />
        <div className="h-[24px] w-[24px] flex-1 pl-1 pr-2">
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
        <button type="submit" className="h-[24px] w-[24px] flex-1 pl-2 pr-4">
          <Search
            size={24}
            className="opacity-55 hover:opacity-75"
            style={{ color: theme.textColor }}
          />
        </button>
      </form>
      {/* {windowWidth > 425 && <MinMaximizeBtn />} */}
    </div>
  );
}

export default TopNavbar;
