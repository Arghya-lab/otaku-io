import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import DiscoverPage from "./Pages/DiscoverPage";
import LibraryPage from "./Pages/LibraryPage";
import SearchResPage from "./Pages/SearchResPage";
import DetailViewPage from "./Pages/DetailViewPage";
import VideoPlayerPage from "./Pages/VideoPlayerPage";
import SettingPage from "./Pages/SettingPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import { getUser } from "./features/auth/authSlice";
import ContinueWatchingPage from "./Pages/continueWatchingPage";

function App() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.preference);

  useEffect(() => {
    dispatch(getUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/search/:query" element={<SearchResPage />} />
        <Route path="/detail/:id/:title" element={<DetailViewPage />} />
        <Route path="/watch/:id/:epNo/:name" element={<VideoPlayerPage />} />
        <Route path="/continueWatching" element={<ContinueWatchingPage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Routes>
    </div>
  );
}

export default App;
