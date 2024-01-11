import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import DiscoverPage from "./Pages/DiscoverPage";
import DetailViewPage from "./Pages/DetailViewPage";
import VideoPlayerPage from "./Pages/VideoPlayerPage";
import Test from "./Pages/Test";
import { useSelector } from "react-redux";
import { useEffect } from "react";

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
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
