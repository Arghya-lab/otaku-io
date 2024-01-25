import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadWatching } from "../features/content/contentSlice";

const useUserWatching = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { watching, isWatchingLoaded } = useSelector((state) => state.content);

  useEffect(() => {
    if (userData?.$id && !isWatchingLoaded) {
      dispatch(loadWatching(userData.$id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.$id]);

  return { watching, isWatchingLoaded };
};

export default useUserWatching;
