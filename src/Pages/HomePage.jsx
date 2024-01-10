import { useEffect } from "react";
import HomeContentContainer from "../Components/HomeContentContainer";
import SideNavbar from "../Components/SideNavbar";
import TopNavbar from "../Components/TopNavbar";
import { useDispatch } from "react-redux";
import { loadHomePage } from "../features/content/contentSlice";

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadHomePage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative h-100%">
      <TopNavbar />
      <SideNavbar />
      <HomeContentContainer />
    </div>
  );
}

export default HomePage;
