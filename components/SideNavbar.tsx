"use client";

import useWindowSize from "@/hooks/useWindowSize";
import { themes } from "@/theme";
import chroma from "chroma-js";
import { Cog, Compass, Home, LibraryBig } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePreference } from "./providers/PreferenceProvider";

function SideNavbar({ pathName }: { pathName: string }) {
  const { windowWidth } = useWindowSize();
  const [hoverBtn, setHoverBtn] = useState<
    null | "Home" | "Discover" | "Library" | "Setting"
  >(null);

  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  const selectedBtn =
    pathName === "/home"
      ? "Home"
      : pathName === "/discover"
        ? "Discover"
        : pathName === "/library"
          ? "Library"
          : pathName === "/setting"
            ? "Setting"
            : "";

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-10 flex h-16 items-center justify-around pb-2 xs:right-auto xs:top-[calc(4rem-0.5px)] xs:h-auto xs:w-20 xs:flex-col xs:justify-start"
      style={
        windowWidth < 640
          ? {
              backgroundColor: chroma(theme.primaryColor)
                .darken(0.25)
                .toString(),
            }
          : {}
      }
    >
      <Link
        href="/home"
        onPointerEnter={() => setHoverBtn("Home")}
        onPointerLeave={() => setHoverBtn(null)}
        className={`side-nav-btn ${
          selectedBtn === "Home" ? "opacity-90" : "opacity-50"
        }`}
        style={{ color: theme.textColor }}
      >
        <Home
          size={30}
          strokeWidth={1.75}
          style={selectedBtn === "Home" ? { color: theme.secondaryColor } : {}}
        />
        <p
          className={`pt-1 text-xs font-medium opacity-0 ${
            hoverBtn === "Home" || windowWidth < 640 ? "opacity-100" : ""
          }`}
        >
          Home
        </p>
      </Link>
      <Link
        href="/discover"
        onPointerEnter={() => setHoverBtn("Discover")}
        onPointerLeave={() => setHoverBtn(null)}
        className={`side-nav-btn ${
          selectedBtn === "Discover" ? "opacity-90" : "opacity-50"
        }`}
        style={{ color: theme.textColor }}
      >
        <Compass
          size={30}
          strokeWidth={1.75}
          style={
            selectedBtn === "Discover" ? { color: theme.secondaryColor } : {}
          }
        />
        <p
          className={`pt-1 text-xs font-medium opacity-0 ${
            hoverBtn === "Discover" || windowWidth < 640 ? "opacity-100" : ""
          }`}
        >
          Discover
        </p>
      </Link>
      <Link
        href="/library"
        onPointerEnter={() => setHoverBtn("Library")}
        onPointerLeave={() => setHoverBtn(null)}
        className={`side-nav-btn ${
          selectedBtn === "Library" ? "opacity-90" : "opacity-50"
        }`}
        style={{ color: theme.textColor }}
      >
        <LibraryBig
          size={30}
          strokeWidth={1.75}
          style={
            selectedBtn === "Library" ? { color: theme.secondaryColor } : {}
          }
        />
        <p
          className={`pt-1 text-xs font-medium opacity-0 ${
            hoverBtn === "Library" || windowWidth < 640 ? "opacity-100" : ""
          }`}
        >
          Library
        </p>
      </Link>
      <Link
        href="/setting"
        onPointerEnter={() => setHoverBtn("Setting")}
        onPointerLeave={() => setHoverBtn(null)}
        className={`side-nav-btn ${
          selectedBtn === "Setting" ? "opacity-90" : "opacity-50"
        }`}
        style={{ color: theme.textColor }}
      >
        <Cog
          size={30}
          strokeWidth={1.75}
          style={
            selectedBtn === "Setting" ? { color: theme.secondaryColor } : {}
          }
        />
        <p
          className={`pt-1 text-xs font-medium opacity-0 ${
            hoverBtn === "Setting" || windowWidth < 640 ? "opacity-100" : ""
          }`}
        >
          Setting
        </p>
      </Link>
    </div>
  );
}

export default SideNavbar;
