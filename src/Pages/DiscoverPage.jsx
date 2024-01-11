import { useSelector } from "react-redux";
import SideNavbar from "../Components/SideNavbar";
import TopNavbar from "../Components/TopNavbar";
import DiscoverContentContainer from "../Components/DiscoverContentContainer";

function DiscoverPage() {
  const { detailInfo } = useSelector((state) => state.content);

  return (
    <div className="h-full relative">
      <TopNavbar color={detailInfo?.color} />
      <SideNavbar />
      <DiscoverContentContainer />
    </div>
  );
}

export default DiscoverPage;
