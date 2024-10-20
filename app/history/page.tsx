import LoginLink from "@/components/LoginLink";
import { getUserWatching } from "@/services/getUserWatching";
import { getServerSession } from "next-auth";
import InfiniteHistoryScroll from "./InfiniteHistoryScroll";

async function HistoryPage() {
  const perPageResult = 20;

  const session = await getServerSession();
  const userEmail = session?.user?.email;
  if (!userEmail) return <LoginLink />;

  const userWatchingRes = await getUserWatching(1, perPageResult, userEmail);
  if (!userWatchingRes) {
    return (
      <p className="pt-8 text-center font-barlow text-lg capitalize text-accent">
        Some thing went wrong
      </p>
    );
  }

  const { results, hasNextPage } = userWatchingRes;
  return (
    <InfiniteHistoryScroll
      initialData={results}
      hasNextPage={hasNextPage}
      perPage={perPageResult}
    />
  );
}

export default HistoryPage;
