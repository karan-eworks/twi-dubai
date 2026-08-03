export function BlogCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[12px] border border-[var(--border)] bg-white">
      <div className="aspect-[16/10] animate-pulse bg-[var(--border)]" />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="h-3 w-24 animate-pulse rounded-full bg-[var(--border)]" />
        <div className="h-5 w-full animate-pulse rounded-full bg-[var(--border)]" />
        <div className="h-5 w-3/4 animate-pulse rounded-full bg-[var(--border)]" />
        <div className="mt-1 h-4 w-full animate-pulse rounded-full bg-[var(--border)]" />
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-[var(--border)]" />
      </div>
    </div>
  );
}

export function BlogCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length static placeholder list, order never changes
        <BlogCardSkeleton key={index} />
      ))}
    </div>
  );
}
