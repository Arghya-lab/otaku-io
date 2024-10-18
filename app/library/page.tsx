"use server";

import User from "@/models/User";
import { getAnimesByIds } from "@/services/getAnimesByIds";
import { LogIn } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import InfiniteLibraryScroll from "./InfiniteLibraryScroll";

async function HistoryPage() {
  const session = await getServerSession();
  const userEmail = session?.user?.email;

  if (!userEmail) return null;

  const user = await User.findOne({ email: userEmail });

  if (!user) {
    return (
      <>
        <p className="pt-8 text-center font-poppins text-lg">
          You are not login
        </p>
        <div className="text-primary flex items-center justify-center gap-2">
          <LogIn size={16} />
          <Link
            href="/api/auth/signin?callbackUrl=/library"
            className="font-barlow hover:underline"
          >
            click here to login
          </Link>
        </div>
      </>
    );
  }

  const perPageResult = 20;
  const results = await getAnimesByIds(user.bookmarks.slice(0, perPageResult));
  const hasNextPage = user.bookmarks.length >= perPageResult;

  return (
    <>
      <h2 className="py-3 pl-8 text-2xl capitalize xs:pl-28">library</h2>
      <main className="flex flex-row xs:pl-20">
        {/* Meta items container */}
        <InfiniteLibraryScroll
          initialData={results}
          hasNextPage={hasNextPage}
          perPage={perPageResult}
        />
      </main>
    </>
  );
}

export default HistoryPage;
