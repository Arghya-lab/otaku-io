import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import DiscoverPage from "./Pages/DiscoverPage";
import DetailViewPage from "./Pages/DetailViewPage";
import Test from "./Pages/Test";
import VideoPlayerPage from "./Pages/VideoPlayerPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/discover" element={<DiscoverPage />} />
      <Route path="/detail/:id/:title" element={<DetailViewPage />} />
      <Route path="/watch/:id/:name" element={<VideoPlayerPage />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
