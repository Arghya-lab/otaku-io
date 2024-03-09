import SideNavbar from "@/components/SideNavbar";
import AccountSection from "./AccountSection";
import GeneralSection from "./GeneralSection";
import PlayerSection from "./PlayerSection";

function Setting() {
  return (
    <div className="h-full relative">
      <SideNavbar pathName="/setting" />
      <main className="xs:ml-20 mb-16 xs:mb-0 pt-8 xs:pt-8 pb-4 px-8 xs:px-12 h-full">
        <AccountSection />
        <GeneralSection />
        <PlayerSection />
        {/* shortcuts section */}
        <div className="flex flex-col gap-4 pb-16 pt-6">
          <p className="text-xl text-black dark:text-white pb-6">Shortcuts</p>
        </div>
      </main>
    </div>
  );
}

export default Setting;
