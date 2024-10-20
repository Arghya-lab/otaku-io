import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="px-4 pb-16 xs:pb-0">
      <Skeleton className="my-4 h-[180px] w-full" />
      <Skeleton className="h-[160px] w-full" />
      <Skeleton className="my-8 h-[400px] w-full" />
      <Skeleton className="h-[400px] w-full" />
    </div>
  );
}

export default Loading;
