import { useEffect, useState } from "react";
import PropType from "prop-types";
import PosterItem from "./PosterItem";
import animeApi from "../Api/animeApi";

function BookmarkedPosterItem({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await animeApi.getAnimeById(id);
      setData(data?.results[0]);
    })();
  }, [id]);

  if (!data) {
    return <div className="w-30 h-40" />;
  } else {
    return <PosterItem item={data} />;
  }
}

BookmarkedPosterItem.propTypes = {
  id: PropType.string.isRequired,
};

export default BookmarkedPosterItem;
