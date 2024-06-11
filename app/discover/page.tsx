import Filter from "@/app/discover/Filter";
import InfiniteDiscoverScroll from "@/app/discover/InfiniteDiscoverScroll";
import SideNavbar from "@/components/SideNavbar";
import TopNavbar from "@/components/TopNavbar";

async function DiscoverPage() {
  return (
    <>
      <TopNavbar />
      <div className="relative h-full">
        <SideNavbar pathName="/discover" />
        <main className="flex flex-row pt-24 xs:pl-20">
          <Filter />
          <section className="min-h-svh min-w-full">
            <InfiniteDiscoverScroll />
          </section>
        </main>
      </div>
    </>
  );
}

export default DiscoverPage;
