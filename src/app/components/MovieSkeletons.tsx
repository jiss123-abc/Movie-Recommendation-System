import { Skeleton } from './ui/skeleton';

export function MovieCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg bg-zinc-900">
      <Skeleton className="aspect-[2/3] w-full" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-1">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
    </div>
  );
}

export function MovieGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function FeaturedMovieSkeleton() {
  return (
    <div className="h-[500px] overflow-hidden rounded-xl bg-zinc-900">
      <Skeleton className="h-full w-full" />
    </div>
  );
}
