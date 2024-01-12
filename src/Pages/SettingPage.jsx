import TopNavbar from "../Components/TopNavbar";
import SideNavbar from "../Components/SideNavbar";
import SettingContainer from "../Components/SettingContainer";

function SettingPage() {
  return (
    <div className="relative h-100%">
      <TopNavbar />
      <SideNavbar />
      <SettingContainer />
    </div>
  );
}

export default SettingPage;
