import { useEffect } from "react";
import HomeContentContainer from "../Components/HomeContentContainer";
import SideNavbar from "../Components/SideNavbar";
import TopNavbar from "../Components/TopNavbar";
import { useDispatch } from "react-redux";
import { loadHomePage } from "../features/content/contextSlice";


function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadHomePage())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div
      className="h-screen w-screen"
      style={{
        background: "linear-gradient(to right,  #141e30, #243b55)",
      }}>
      <TopNavbar />
      <div className="grid" style={{ gridTemplateColumns: "5rem 1fr" }}>
        <SideNavbar />
        <HomeContentContainer />
      </div>
    </div>
  );
}

export default HomePage;
