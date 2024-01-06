import { useState } from "react";
import { Cog, Compass, Home, LibraryBig } from "lucide-react";

function SideNavbar() {
  const [hoverBtn, setHoverBtn] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("Home");

  const handleBtnClick = (name) => {
    setSelectedBtn(name);
  };
  return (
    <div className="w-20 flex flex-col items-center justify-start">
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
            hoverBtn === "Home" ? "opacity-100" : null
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
            hoverBtn === "Discover" ? "opacity-100" : null
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
            hoverBtn === "Library" ? "opacity-100" : null
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
            hoverBtn === "Setting" ? "opacity-100" : null
          }`}>
          Setting
        </p>
      </div>
    </div>
  );
}

export default SideNavbar;
