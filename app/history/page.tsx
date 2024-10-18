import { getUserWatching } from "@/services/getUserWatching";
import { getServerSession } from "next-auth";
import InfiniteHistoryScroll from "./InfiniteHistoryScroll";

async function HistoryPage() {
  const perPageResult = 20;

  const session = await getServerSession();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return <p>you are not login</p>;
  }
  const userWatchingRes = await getUserWatching(1, perPageResult, userEmail);

  if (!userWatchingRes) {
    return <p>Some thing went wrong</p>;
  }

  const { results, hasNextPage } = userWatchingRes;

  return (
    <>
      <h2 className="py-3 pl-3 text-2xl capitalize">continue watching</h2>
      <InfiniteHistoryScroll
        initialData={results}
        hasNextPage={hasNextPage}
        perPage={perPageResult}
      />
    </>
  );
}

export default HistoryPage;
