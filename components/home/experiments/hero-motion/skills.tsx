import { Cat, FlaskConical, Skull, Terminal, Wrench } from "lucide-react"

const TAGS = [
  {
    icon: <Terminal size={18} />,
    text: "Coding Smart",
  },
  {
    icon: <FlaskConical size={18} />,
    text: "Elixir Specialist",
  },
  {
    icon: <Skull size={18} />,
    text: "Anti Cheat",
  },
  {
    icon: <Wrench size={18} />,
    text: "Reverse Engineer",
  },
  {
    icon: <Cat size={18} />,
    text: "Cat Person",
  },
]

export default function Skills() {
  return (
    <div className="absolute inset-x-0 bottom-8 mx-auto flex items-center justify-center p-4 text-slate-300 md:w-[560px]">
      {TAGS.map((tag) => (
        <div
          key={tag.text}
          className=" flex flex-1 shrink-0 flex-col items-center gap-2 text-center"
        >
          {tag.icon}
          <p className="w-[40px] text-xs ">{tag.text}</p>
        </div>
      ))}
    </div>
  )
}
