import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import DiscoverPage from "./Pages/DiscoverPage";
import DetailViewPage from "./Pages/DetailViewPage";
import VideoPlayerPage from "./Pages/VideoPlayerPage";
import SettingPage from "./Pages/SettingPage";

function App() {
  const { theme } = useSelector((state) => state.preference);

  useEffect(() => {
    if (theme?.type === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="w-full relative">
      <div
        className="fixed -z-20 w-screen h-screen bg-cover bg-[#0f0d20]"
        style={{ background: theme.bgImg }}></div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/detail/:id/:title" element={<DetailViewPage />} />
        <Route path="/watch/:id/:name" element={<VideoPlayerPage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Routes>
    </div>
  );
}

export default App;
