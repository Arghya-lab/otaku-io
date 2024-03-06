import SideNavbar from "@/components/SideNavbar";
import AccountSection from "./AccountSection";
import GeneralSection from "./GeneralSection";
import PlayerSection from "./PlayerSection";

function Setting() {
  return (
    <div className="h-full relative">
      <SideNavbar pathName="setting" />
      <main className="pl-28 xs:pl-32 pr-8 xs:pr-12 pt-32 pb-4">
        <AccountSection />
        {/* <GeneralSection />
        <PlayerSection /> */}
        {/* shortcuts section */}
        <div className="flex flex-col gap-4 pb-16 pt-6">
          <p className="text-xl text-black dark:text-white pb-6">Shortcuts</p>
        </div>
      </main>
    </div>
  );
}

export default Setting;
