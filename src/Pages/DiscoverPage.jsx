import SideNavbar from "../Components/SideNavbar";
import TopNavbar from "../Components/TopNavbar";
import DiscoverContentContainer from "../Components/DiscoverContentContainer";

function DiscoverPage() {
  return (
    <div className="h-full relative">
      <TopNavbar />
      <SideNavbar />
      <DiscoverContentContainer />
    </div>
  );
}

export default DiscoverPage;
