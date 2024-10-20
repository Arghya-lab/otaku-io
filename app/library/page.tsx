import LoginLink from "@/components/LoginLink";
import User from "@/models/User";
import { getAnimesByIds } from "@/services/getAnimesByIds";
import { getServerSession } from "next-auth";
import InfiniteLibraryScroll from "./InfiniteLibraryScroll";

async function HistoryPage() {
  const session = await getServerSession();
  const userEmail = session?.user?.email;
  if (!userEmail) return <LoginLink />;

  const user = await User.findOne({ email: userEmail });
  if (!user)
    return (
      <p className="pt-8 text-center font-barlow text-lg capitalize text-accent">
        can&apos;t find your email in our database.
      </p>
    );

  const perPageResult = 20;
  const results = await getAnimesByIds(user.bookmarks.slice(0, perPageResult));
  const hasNextPage = user.bookmarks.length >= perPageResult;

  return (
    <InfiniteLibraryScroll
      initialData={results}
      hasNextPage={hasNextPage}
      perPage={perPageResult}
    />
  );
}

export default HistoryPage;
