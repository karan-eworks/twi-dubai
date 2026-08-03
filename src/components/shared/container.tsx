import { cn } from "@/lib/utils";

interface ContainerProps  {
  className?: string;
  children: React.ReactNode;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full min-w-0 max-w-[105rem] px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}
