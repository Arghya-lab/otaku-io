import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import DiscoverPage from "./Pages/DiscoverPage";
import DetailViewPage from "./Pages/DetailViewPage";
import VideoPlayerPage from "./Pages/VideoPlayerPage";
import Test from "./Pages/Test";

function App() {
  return (
    <div
      style={{
        background: "linear-gradient(to right,  #141e30, #243b55)",
      }}>
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
