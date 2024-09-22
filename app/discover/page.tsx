import Filter from "@/app/discover/Filter";
import InfiniteDiscoverScroll from "@/app/discover/InfiniteDiscoverScroll";

async function DiscoverPage() {
  return (
    <main className="flex flex-row pt-24 xs:pl-20">
      <Filter />
      <section className="min-h-svh min-w-full">
        <InfiniteDiscoverScroll />
      </section>
    </main>
  );
}

export default DiscoverPage;
