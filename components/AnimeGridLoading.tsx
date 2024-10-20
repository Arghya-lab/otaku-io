import { Skeleton } from "@/components/ui/skeleton";

async function AnimeGridLoading() {
  return (
    <div className="poster-grid px-4 pb-16 xs:pb-0">
      {Array.from({ length: 30 }, (_, id) => (
        <Skeleton className="aspect-[5/7] min-w-24 max-w-48" key={id} />
      ))}
    </div>
  );
}

export default AnimeGridLoading;
