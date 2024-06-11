import { getUserWatching } from "@/services/getUserWatching";
import { getUserTheme } from "../layout";
import InfiniteHistoryScroll from "./InfiniteHistoryScroll";

async function HistoryPage() {
  const theme = await getUserTheme();
  const perPageResult = 20;
  const userWatchingRes = await getUserWatching(1, perPageResult);

  if (!userWatchingRes) {
    return <p>you are not login</p>;
  }

  const { results, hasNextPage } = userWatchingRes;

  return (
    <>
      <h2
        className="py-3 pl-8 text-2xl capitalize"
        style={{ color: theme.textColor }}
      >
        continue watching
      </h2>
      <InfiniteHistoryScroll
        initialData={results}
        hasNextPage={hasNextPage}
        perPage={perPageResult}
      />
    </>
  );
}

export default HistoryPage;
