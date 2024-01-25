import { useEffect, useState } from "react";
import PropType from "prop-types";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import PosterItem from "./PosterItem";
import animeApi from "../Api/animeApi";

function BookmarkedPosterItem({ id }) {
  const { theme } = useSelector((state) => state.preference);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await animeApi.getAnimeById(id);
      setData(data?.results[0]);
    })();
  }, [id]);

  if (!data) {
    return (
      <Skeleton
        className="h-48 w-36 rounded-xl"
        baseColor={theme.type === "dark" ? "#111" : "#ddd"}
        highlightColor={theme.type === "dark" ? "#222" : "#bbb"}
      />
    );
  } else {
    return <PosterItem item={data} />;
  }
}

BookmarkedPosterItem.propTypes = {
  id: PropType.string.isRequired,
};

export default BookmarkedPosterItem;
