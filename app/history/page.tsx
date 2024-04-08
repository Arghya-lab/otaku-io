import SideNavbar from "@/components/SideNavbar";
import TopNavbar from "@/components/TopNavbar";
import InfiniteHistoryScroll from "./InfiniteHistoryScroll";
import { getUserWatching } from "@/services/getUserWatching";
import { getUserTheme } from "../layout";

async function HistoryPage() {
  const theme = await getUserTheme();
  const userWatchingRes = await getUserWatching();

  if (!userWatchingRes) {
    return <p>you are not login</p>;
  }

  const { results, hasNextPage } = userWatchingRes;

  return (
    <>
      <TopNavbar />
      <div className="h-full relative">
        <SideNavbar pathName="/history" />
        <h2
          className="py-3 pl-8 xs:pl-28 text-2xl capitalize"
          style={{ color: theme.textColor }}>
          continue watching
        </h2>
        <main className="xs:pl-20 flex flex-row">
          {/* Meta items container */}
          <InfiniteHistoryScroll
            initialData={results}
            hasNextPage={hasNextPage}
          />
        </main>
      </div>
    </>
  );
}

export default HistoryPage;
