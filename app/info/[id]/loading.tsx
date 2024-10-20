import { Skeleton } from "@/components/ui/skeleton";

async function loading() {
  return (
    <>
      <div className="mt-8 w-full px-4 pt-4 xxs:px-8 xs:px-16 sm:pr-48 md:pr-80 lg:pr-[416px]">
        <Skeleton className="h-32 w-96 xxs:w-[324px] xs:w-[536px] sm:w-[696px] md:h-48 md:w-full" />
        <Skeleton className="my-4 h-28 w-96" />
        <Skeleton className="mt-4 h-24 w-full" />
      </div>
      <div className="h-40 w-full px-4 pt-4 xxs:px-8 xs:px-16">
        <Skeleton className="h-full w-full" />
      </div>
    </>
  );
}

export default loading;
