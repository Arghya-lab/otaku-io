import TopNavbar from "../Components/TopNavbar";
import SideNavbar from "../Components/SideNavbar";
import LibraryContentContainer from "../Components/LibraryContentContainer";

function LibraryPage() {
  return (
    <div className="relative h-100%">
      <TopNavbar />
      <SideNavbar />
      <LibraryContentContainer />
    </div>
  );
}

export default LibraryPage;
