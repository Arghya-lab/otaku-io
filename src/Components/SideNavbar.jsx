import { useState } from "react";
import { Cog, Compass, Home, LibraryBig } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function SideNavbar() {
  const navigate = useNavigate();

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
      className="xs:w-20 h-20 xs:h-auto absolute xs:top-20 left-0 right-0 xs:right-auto bottom-0 z-10 flex xs:flex-col items-center justify-around xs:justify-start bg-transparent"
      >
      <div
        className={`side-nav-btn ${
          hoverBtn === "Home"
            ? "hover:bg-slate-800 hover:opacity-100 hover:text-slate-300"
            : null
        } ${selectedBtn === "Home" ? "opacity-90" : "opacity-50"}`}
        onPointerEnter={() => setHoverBtn("Home")}
        onPointerLeave={() => setHoverBtn(null)}
        onClick={() => handleBtnClick("Home")}>
        <Home
          size={30}
          strokeWidth={1.75}
          className={selectedBtn === "Home" ? "text-orange-500" : null}
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
            ? "hover:bg-slate-800 hover:opacity-100 hover:text-slate-300"
            : null
        } ${selectedBtn === "Discover" ? "opacity-90" : "opacity-50"}`}
        onPointerEnter={() => setHoverBtn("Discover")}
        onPointerLeave={() => setHoverBtn(null)}
        onClick={() => handleBtnClick("Discover")}>
        <Compass
          size={30}
          strokeWidth={1.75}
          className={selectedBtn === "Discover" ? "text-orange-500" : null}
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
            ? "hover:bg-slate-800 hover:opacity-100 hover:text-slate-300"
            : null
        } ${selectedBtn === "Library" ? "opacity-90" : "opacity-50"}`}
        onPointerEnter={() => setHoverBtn("Library")}
        onPointerLeave={() => setHoverBtn(null)}
        onClick={() => handleBtnClick("Library")}>
        <LibraryBig
          size={30}
          strokeWidth={1.75}
          className={selectedBtn === "Library" ? "text-orange-500" : null}
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
            ? "hover:bg-slate-800 hover:opacity-100 hover:text-slate-300"
            : null
        } ${selectedBtn === "Setting" ? "opacity-90" : "opacity-50"}`}
        onPointerEnter={() => setHoverBtn("Setting")}
        onPointerLeave={() => setHoverBtn(null)}
        onClick={() => handleBtnClick("Setting")}>
        <Cog
          size={30}
          strokeWidth={1.75}
          className={selectedBtn === "Setting" ? "text-orange-500" : null}
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
