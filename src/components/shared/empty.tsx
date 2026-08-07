import { SearchX } from "lucide-react";
import type { ReactNode } from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface EmptyOutlineProps {
  title: string;
  description?: string;
  /** Optional escape route, e.g. a "clear filters" button. */
  action?: ReactNode;
}

export function EmptyOutline({
  title,
  description,
  action,
}: EmptyOutlineProps) {
  return (
    <Empty className="border border-dashed border-border py-16">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchX aria-hidden="true" />
        </EmptyMedia>

        <EmptyTitle className="font-heading text-2xl font-normal leading-tight">
          {title}
        </EmptyTitle>

        {description ? (
          <EmptyDescription>{description}</EmptyDescription>
        ) : null}
      </EmptyHeader>

      {action ? <EmptyContent>{action}</EmptyContent> : null}
    </Empty>
  );
}
