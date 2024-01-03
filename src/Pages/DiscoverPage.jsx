import SideNavbar from "../Components/SideNavbar"
import TopNavbar from "../Components/TopNavbar"
import DiscoverContentContainer from "../Components/DiscoverContentContainer"


function DiscoverPage() {
  return (
    <div
      className="h-screen w-screen overflow-hidden"
      style={{
        background: "linear-gradient(to right,  #141e30, #243b55)",
      }}>
      <TopNavbar />
      <div className="grid" style={{ gridTemplateColumns: "5rem 1fr" }}>
        <SideNavbar />
        <DiscoverContentContainer />
      </div>
    </div>
  )
}

export default DiscoverPage