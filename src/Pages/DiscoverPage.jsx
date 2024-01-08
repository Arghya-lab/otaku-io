import SideNavbar from "../Components/SideNavbar";
import TopNavbar from "../Components/TopNavbar";
import DiscoverContentContainer from "../Components/DiscoverContentContainer";

function DiscoverPage() {
  return (
    <div
      style={{
        background: "linear-gradient(to right,  #141e30, #243b55)",
      }}>
      <div className="h-screen relative">
        <TopNavbar />
        {/* <div className="flex flex-col-reverse xs:flex-row"> */}
        <SideNavbar />
        <DiscoverContentContainer />
      </div>
    </div>
  );
}

export default DiscoverPage;
