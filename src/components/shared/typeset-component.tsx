interface TypeSetComponentProps {
  content: React.ReactNode
}

function TypeSetComponent({ content }: TypeSetComponentProps) {
  return (
    <div className="typeset typeset-docs max-w-[37em]">
        {content}
    </div>
  )
}

export default TypeSetComponent