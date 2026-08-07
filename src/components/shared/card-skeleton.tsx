import { cn } from "@/lib/utils";

interface CardSkeletonProps {
  /** Match the media ratio of the card being stood in for, so nothing shifts. */
  mediaClassName?: string;
}

export function CardSkeleton({
  mediaClassName = "aspect-[4/3]",
}: CardSkeletonProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-md border border-border bg-card">
      <div className={cn("animate-pulse bg-border", mediaClassName)} />
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

export function CardSkeletonGrid({
  count = 6,
  mediaClassName,
}: CardSkeletonProps & { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length static placeholder list, order never changes
        <CardSkeleton key={index} mediaClassName={mediaClassName} />
      ))}
    </div>
  );
}
