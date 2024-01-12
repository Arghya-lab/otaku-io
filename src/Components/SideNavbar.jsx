import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import chroma from "chroma-js";
import { Cog, Compass, Home, LibraryBig } from "lucide-react";
import useWindowSize from "../hooks/useWindowSize";

function SideNavbar() {
  const navigate = useNavigate();
  const { windowWidth } = useWindowSize();
  const { theme } = useSelector((state) => state.preference);

  const pathName = useLocation().pathname;
  const initialSelectedBtn =
    pathName === "/"
      ? "Home"
      : pathName === "/discover"
      ? "Discover"
      : pathName === "/library"
      ? "Library"
      : pathName === "/setting"
      ? "Setting"
      : "";
  const [selectedBtn, setSelectedBtn] = useState(initialSelectedBtn);
  const [hoverBtn, setHoverBtn] = useState(null);

  const handleBtnClick = (name) => {
    setSelectedBtn(name);
    if (name === "Home") {
      navigate("/");
    } else {
      navigate(`/${name.toLowerCase()}`);
    }
  };
  return (
    <div
      className="xs:w-20 h-16 xs:h-auto fixed xs:top-[calc(4rem-0.5px)] left-0 right-0 xs:right-auto bottom-0 z-10 flex xs:flex-col items-center justify-around xs:justify-start"
      style={
        windowWidth < 640
          ? { backgroundColor: chroma(theme.primaryColor).darken(0.25) }
          : null
      }>
      <div
        className={`side-nav-btn ${
          hoverBtn === "Home"
            ? "bg-white bg-opacity-10 opacity-100 text-neutral-900 dark:text-slate-100"
            : null
        } ${selectedBtn === "Home" ? "opacity-90" : "opacity-50"}`}
        onPointerEnter={() => setHoverBtn("Home")}
        onPointerLeave={() => setHoverBtn(null)}
        onClick={() => handleBtnClick("Home")}>
        <Home
          size={30}
          strokeWidth={1.75}
          style={
            selectedBtn === "Home" ? { color: theme.secondaryColor } : null
          }
        />
        <p
          className={`text-xs pt-1 opacity-0 ${
            hoverBtn === "Home" || window.innerWidth < 640
              ? "opacity-100"
              : null
          }`}>
          Home
        </p>
      </div>
      <div
        className={`side-nav-btn ${
          hoverBtn === "Discover"
            ? "bg-white bg-opacity-10 opacity-100 text-neutral-900 dark:text-slate-100"
            : null
        } ${selectedBtn === "Discover" ? "opacity-90" : "opacity-50"}`}
        onPointerEnter={() => setHoverBtn("Discover")}
        onPointerLeave={() => setHoverBtn(null)}
        onClick={() => handleBtnClick("Discover")}>
        <Compass
          size={30}
          strokeWidth={1.75}
          style={
            selectedBtn === "Discover" ? { color: theme.secondaryColor } : null
          }
        />
        <p
          className={`text-xs pt-1 opacity-0 ${
            hoverBtn === "Discover" || window.innerWidth < 640
              ? "opacity-100"
              : null
          }`}>
          Discover
        </p>
      </div>
      <div
        className={`side-nav-btn ${
          hoverBtn === "Library"
            ? "bg-white bg-opacity-10 opacity-100 text-neutral-900 dark:text-slate-100"
            : null
        } ${selectedBtn === "Library" ? "opacity-90" : "opacity-50"}`}
        onPointerEnter={() => setHoverBtn("Library")}
        onPointerLeave={() => setHoverBtn(null)}
        onClick={() => handleBtnClick("Library")}>
        <LibraryBig
          size={30}
          strokeWidth={1.75}
          style={
            selectedBtn === "Library" ? { color: theme.secondaryColor } : null
          }
        />
        <p
          className={`text-xs pt-1 opacity-0 ${
            hoverBtn === "Library" || window.innerWidth < 640
              ? "opacity-100"
              : null
          }`}>
          Library
        </p>
      </div>
      <div
        className={`side-nav-btn ${
          hoverBtn === "Setting"
            ? "bg-white bg-opacity-10 opacity-100 text-neutral-900 dark:text-slate-100"
            : null
        } ${selectedBtn === "Setting" ? "opacity-90" : "opacity-50"}`}
        onPointerEnter={() => setHoverBtn("Setting")}
        onPointerLeave={() => setHoverBtn(null)}
        onClick={() => handleBtnClick("Setting")}>
        <Cog
          size={30}
          strokeWidth={1.75}
          style={
            selectedBtn === "Setting" ? { color: theme.secondaryColor } : null
          }
        />
        <p
          className={`text-xs pt-1 opacity-0 ${
            hoverBtn === "Setting" || window.innerWidth < 640
              ? "opacity-100"
              : null
          }`}>
          Setting
        </p>
      </div>
    </div>
  );
}

export default SideNavbar;
