import Skeleton from "react-loading-skeleton";

async function loading() {
  return (
    <div className="flex flex-row xs:pl-20">
      <Skeleton className="m-[5%] my-4 h-[75vh] w-[90%] rounded-md" />
    </div>
  );
}

export default loading;
