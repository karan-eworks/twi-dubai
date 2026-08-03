export function EventCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-md border border-border bg-card">
      <div className="aspect-[4/3] animate-pulse bg-border" />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="h-3 w-24 animate-pulse rounded-full bg-border" />
        <div className="h-5 w-full animate-pulse rounded-full bg-border" />
        <div className="h-5 w-3/4 animate-pulse rounded-full bg-border" />
        <div className="mt-1 h-4 w-full animate-pulse rounded-full bg-border" />
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-border" />
      </div>
    </div>
  );
}

export function EventCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length static placeholder list, order never changes
        <EventCardSkeleton key={index} />
      ))}
    </div>
  );
}
