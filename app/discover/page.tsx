import Filter from "@/app/discover/Filter";
import InfiniteDiscoverScroll from "@/app/discover/InfiniteDiscoverScroll";
import SideNavbar from "@/components/SideNavbar";
import TopNavbar from "@/components/TopNavbar";

async function DiscoverPage() {
  return (
    <>
      <TopNavbar />
      <div className="h-full relative">
        <SideNavbar pathName="/discover" />
        <main className="xs:pl-20 pt-24 flex flex-row">
          <Filter />
          <section className="min-w-full min-h-svh">
            <InfiniteDiscoverScroll />
          </section>
        </main>
      </div>
    </>
  );
}

export default DiscoverPage;
