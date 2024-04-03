"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import axios, { AxiosError } from "axios";
import { Bookmark } from "lucide-react";

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
      const { data } = await axios.patch("/api/bookmark/toggle", {
        animeId,
      });
      setBookmarks(data);
    } catch (error) {
      const axiosErr = error as AxiosError;
      console.log(axiosErr.message);
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
