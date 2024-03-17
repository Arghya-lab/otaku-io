"use client";

import chroma from "chroma-js";
import { Cog, Compass, Home, LibraryBig, Settings } from "lucide-react";
import useWindowSize from "../hooks/useWindowSize";
import { themes } from "@/theme";
import Link from "next/link";
import { useState } from "react";

function SideNavbar({ pathName }: { pathName: string }) {
  const { windowWidth } = useWindowSize();
  const [hoverBtn, setHoverBtn] = useState<
    null | "Home" | "Discover" | "Library" | "Setting"
  >(null);
  const theme = themes[1];

  const selectedBtn =
    pathName === "/"
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
      className="xs:w-20 h-16 xs:h-auto fixed xs:top-[calc(4rem-0.5px)] left-0 right-0 xs:right-auto bottom-0 z-10 flex xs:flex-col items-center justify-around xs:justify-start"
      style={
        windowWidth < 640
          ? {
              backgroundColor: chroma(theme.primaryColor)
                .darken(0.25)
                .toString(),
            }
          : {}
      }>
      <Link
        href="/"
        onPointerEnter={() => setHoverBtn("Home")}
        onPointerLeave={() => setHoverBtn(null)}
        className={`side-nav-btn ${
          selectedBtn === "Home" ? "opacity-90" : "opacity-50"
        }`}>
        <Home
          size={30}
          strokeWidth={1.75}
          style={selectedBtn === "Home" ? { color: theme.secondaryColor } : {}}
        />
        <p
          className={`text-xs pt-1 opacity-0 ${
            hoverBtn === "Home" || windowWidth < 640 ? "opacity-100" : ""
          }`}>
          Home
        </p>
      </Link>
      <Link
        href="/discover"
        onPointerEnter={() => setHoverBtn("Discover")}
        onPointerLeave={() => setHoverBtn(null)}
        className={`side-nav-btn ${
          selectedBtn === "Discover" ? "opacity-90" : "opacity-50"
        }`}>
        <Compass
          size={30}
          strokeWidth={1.75}
          style={
            selectedBtn === "Discover" ? { color: theme.secondaryColor } : {}
          }
        />
        <p
          className={`text-xs pt-1 opacity-0 ${
            hoverBtn === "Discover" || windowWidth < 640 ? "opacity-100" : ""
          }`}>
          Discover
        </p>
      </Link>
      <Link
        href="/library"
        onPointerEnter={() => setHoverBtn("Library")}
        onPointerLeave={() => setHoverBtn(null)}
        className={`side-nav-btn ${
          selectedBtn === "Library" ? "opacity-90" : "opacity-50"
        }`}>
        <LibraryBig
          size={30}
          strokeWidth={1.75}
          style={
            selectedBtn === "Library" ? { color: theme.secondaryColor } : {}
          }
        />
        <p
          className={`text-xs pt-1 opacity-0 ${
            hoverBtn === "Library" || windowWidth < 640 ? "opacity-100" : ""
          }`}>
          Library
        </p>
      </Link>
      <Link
        href="/setting"
        onPointerEnter={() => setHoverBtn("Setting")}
        onPointerLeave={() => setHoverBtn(null)}
        className={`side-nav-btn ${
          selectedBtn === "Setting" ? "opacity-90" : "opacity-50"
        }`}>
        <Cog
          size={30}
          strokeWidth={1.75}
          style={
            selectedBtn === "Setting" ? { color: theme.secondaryColor } : {}
          }
        />
        <p
          className={`text-xs pt-1 opacity-0 ${
            hoverBtn === "Setting" || windowWidth < 640 ? "opacity-100" : ""
          }`}>
          Setting
        </p>
      </Link>
    </div>
  );
}

export default SideNavbar;
