import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import DiscoverPage from "./Pages/DiscoverPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/discover" element={<DiscoverPage />} />
    </Routes>
  );
}

export default App;
