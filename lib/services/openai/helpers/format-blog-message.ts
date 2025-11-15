interface formatBlogMessageProps {
  text: string
  ton?: "technical" | "funny" | "neutral"
}
export const formatBlogMessage = ({
  text,
  ton = "technical",
}: formatBlogMessageProps) => {
  return JSON.stringify({
    text,
    ton,
  })
}
