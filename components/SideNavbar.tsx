"use client";

import classNames from "classnames";
import { Cog, Compass, Home, LibraryBig } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { isDesktop } from "react-device-detect";

function SideNavbar({ pathName }: { pathName: string }) {
  const [hoverBtn, setHoverBtn] = useState<
    "Home" | "Discover" | "Library" | "Setting" | null
  >(null);

  return (
    <div className="fixed -bottom-[0.5px] left-0 right-0 z-10 flex h-16 items-center justify-around bg-background pb-2 xs:bottom-0 xs:right-auto xs:top-[calc(4rem-0.5px)] xs:h-auto xs:w-20 xs:flex-col xs:justify-start xs:bg-auto">
      <Link
        href="/home"
        onPointerEnter={() => setHoverBtn("Home")}
        onPointerLeave={() => setHoverBtn(null)}
        className={classNames("side-nav-btn opacity-50", {
          "side-nav-btn-hover": isDesktop,
          "opacity-90": pathName === "/home",
        })}
      >
        <Home
          size={30}
          strokeWidth={1.75}
          className={classNames({
            "text-primary": pathName === "/home",
          })}
        />
        <p
          className={classNames("pt-1 text-xs font-medium opacity-100", {
            "xs:opacity-0": hoverBtn !== "Home",
          })}
        >
          Home
        </p>
      </Link>
      <Link
        href="/discover"
        onPointerEnter={() => setHoverBtn("Discover")}
        onPointerLeave={() => setHoverBtn(null)}
        className={classNames("side-nav-btn opacity-50", {
          "side-nav-btn-hover": isDesktop,
          "opacity-90": pathName === "/discover",
        })}
      >
        <Compass
          size={30}
          strokeWidth={1.75}
          className={classNames({
            "text-primary": pathName === "/discover",
          })}
        />
        <p
          className={classNames("pt-1 text-xs font-medium opacity-100", {
            "xs:opacity-0": hoverBtn !== "Discover",
          })}
        >
          Discover
        </p>
      </Link>
      <Link
        href="/library"
        onPointerEnter={() => setHoverBtn("Library")}
        onPointerLeave={() => setHoverBtn(null)}
        className={classNames("side-nav-btn opacity-50", {
          "side-nav-btn-hover": isDesktop,
          "opacity-90": pathName === "/library",
        })}
      >
        <LibraryBig
          size={30}
          strokeWidth={1.75}
          className={classNames({
            "text-primary": pathName === "/library",
          })}
        />
        <p
          className={classNames("pt-1 text-xs font-medium opacity-100", {
            "xs:opacity-0": hoverBtn !== "Library",
          })}
        >
          Library
        </p>
      </Link>
      <Link
        href="/setting"
        onPointerEnter={() => setHoverBtn("Setting")}
        onPointerLeave={() => setHoverBtn(null)}
        className={classNames("side-nav-btn opacity-50", {
          "side-nav-btn-hover": isDesktop,
          "opacity-90": pathName === "/setting",
        })}
      >
        <Cog
          size={30}
          strokeWidth={1.75}
          className={classNames({
            "text-primary": pathName === "/setting",
          })}
        />
        <p
          className={classNames("pt-1 text-xs font-medium opacity-100", {
            "xs:opacity-0": hoverBtn !== "Setting",
          })}
        >
          Setting
        </p>
      </Link>
    </div>
  );
}

export default SideNavbar;
