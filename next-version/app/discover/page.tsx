import SideNavbar from "@/components/SideNavbar";

function DiscoverPage() {
  // const { detailInfo } = useSelector((state) => state.content);

  return (
    <div className="h-full relative">
      <SideNavbar pathName="discover" />
      <main className="xs:pl-20 pt-24 flex flex-row">
        <h1>discover page</h1>
      </main>
    </div>
  );
}

export default DiscoverPage;
