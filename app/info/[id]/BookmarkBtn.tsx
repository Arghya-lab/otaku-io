"use client";

import { ApiSuccessType } from "@/types/apiResponse";
import axios, { isAxiosError } from "axios";
import { Bookmark } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

function BookmarkBtn({
  userBookmarks,
  animeId,
}: {
  userBookmarks: string[] | null;
  animeId: string;
}) {
  const { data: session } = useSession();

  const [bookmarks, setBookmarks] = useState(userBookmarks);

  if (!session || !userBookmarks) {
    return null;
  }

  const handleToggleBookmark = async () => {
    try {
      const { data }: { data: ApiSuccessType<string[]> } = await axios.patch(
        "/api/bookmark/toggle",
        {
          animeId,
        }
      );
      setBookmarks(data.data);
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.message);
      }
    }
  };

  if (!bookmarks) return null;

  return (
    <div role="button" onClick={handleToggleBookmark}>
      {bookmarks.includes(animeId) ? (
        <Bookmark size={36} color="#fff" fill="#fff" />
      ) : (
        <Bookmark size={36} color="#fff" />
      )}
    </div>
  );
}

export default BookmarkBtn;
