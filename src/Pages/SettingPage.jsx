import TopNavbar from "../Components/TopNavbar";
import SideNavbar from "../Components/SideNavbar";
import AccountSection from "../Components/AccountSection";
import GeneralSection from "../Components/GeneralSection";
import PlayerSection from "../Components/PlayerSection";

function SettingPage() {
  return (
    <div className="relative h-100%">
      <TopNavbar />
      <SideNavbar />
      <div className="xs:pl-20 pb-16 xs:pb-0 flex h-full">
        <div className="flex-1 pt-8 xs:pt-8 pb-4 px-8 xs:px-12 h-full">
          <AccountSection />
          <GeneralSection />
          <PlayerSection />
          {/* shortcuts section */}
          <div className="flex flex-col gap-4 pb-16 pt-6">
            <p className="text-xl text-black dark:text-white pb-6">Shortcuts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
