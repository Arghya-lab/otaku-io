import Skeleton from "react-loading-skeleton";

async function loading() {
  return (
    <Skeleton
      containerClassName="flex-1"
      className="m-[5%] mt-0 h-[75vh] w-[90%] rounded-md"
      // baseColor={chroma(theme.primaryColor).darken(1).toString()}
      // highlightColor={chroma(theme.primaryColor).darken(1.5).toString()}
    />
  );
}

export default loading;
