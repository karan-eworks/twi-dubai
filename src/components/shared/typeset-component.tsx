import { cn } from "@/lib/utils"

interface TypeSetComponentProps {
  content: React.ReactNode
  className?: string
}

function TypeSetComponent({ content,className }: TypeSetComponentProps) {
  return (
    <div className={cn("typeset typeset-docs max-w-[45em]", className)}>
        {content}
    </div>
  )
}

export default TypeSetComponent