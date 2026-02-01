"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { useCallback, useState } from "react"
import { Check, Copy } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { zTouch } from "react-syntax-highlighter/dist/esm/styles/prism"

type PrismStyle = Record<string, React.CSSProperties>

const DEFAULT_STYLE = zTouch as PrismStyle

const styleLoaders: Record<
  string,
  () => Promise<{ default: PrismStyle } | PrismStyle>
> = {
  zTouch: () =>
    import("react-syntax-highlighter/dist/esm/styles/prism").then((m) => ({
      default: m.zTouch as PrismStyle,
    })),
  oneDark: () =>
    import("react-syntax-highlighter/dist/esm/styles/prism").then((m) => ({
      default: m.oneDark as PrismStyle,
    })),
  dracula: () =>
    import("react-syntax-highlighter/dist/esm/styles/prism").then((m) => ({
      default: m.dracula as PrismStyle,
    })),
  github: () =>
    import("react-syntax-highlighter/dist/esm/styles/hljs").then((m) => ({
      default: m.github as PrismStyle,
    })),
  githubGist: () =>
    import("react-syntax-highlighter/dist/esm/styles/hljs").then((m) => ({
      default: m.githubGist as PrismStyle,
    })),
}

function CodeBlockWithCopy({
  code,
  children,
}: {
  code: string
  children: React.ReactNode
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    },
    [code],
  )

  return (
    <div className="relative">
      {children}
      <div className="absolute right-2 top-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleCopy}
          aria-label={copied ? "Copied!" : "Copy code"}
        >
          <span
            key={copied ? "check" : "copy"}
            className="icon-switch-animation inline-flex items-center justify-center"
          >
            {copied ? (
              <Check size={16} className="text-green-400" />
            ) : (
              <Copy size={16} />
            )}
          </span>
        </Button>
      </div>
    </div>
  )
}

export default function MarkdownRender({ content }: { content: string }) {
  const [styleCache, setStyleCache] = useState<Record<string, PrismStyle>>({
    zTouch: DEFAULT_STYLE,
  })

  const getStyle = useCallback(
    (themeKey: string): PrismStyle => {
      if (styleCache[themeKey]) return styleCache[themeKey]
      const loader = styleLoaders[themeKey]
      if (loader) {
        loader().then((m) => {
          const style = ("default" in m ? m.default : m) as PrismStyle
          setStyleCache((prev) =>
            prev[themeKey] ? prev : { ...prev, [themeKey]: style },
          )
        })
      }
      return DEFAULT_STYLE
    },
    [styleCache],
  )

  return (
    <ReactMarkdown
      components={{
        a({ href, children, ...props }) {
          return (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
              {children}
            </a>
          )
        },
        code({ className, children, ...props }) {
          // Match language and optional theme: language-cpp or language-cpp-[dracula]
          const match = /language-(\w+)(?:-\[(\w+)\])?/.exec(className || "")
          const language = match ? match[1] : ""
          const themeKey = match?.[2]
          const style = themeKey ? getStyle(themeKey) : DEFAULT_STYLE
          const isBlock = Boolean(language)
          const codeString = String(children).replace(/\n$/, "")
          return isBlock ? (
            <CodeBlockWithCopy code={codeString}>
              <SyntaxHighlighter
                // @ts-expect-error Prism theme type from react-syntax-highlighter is incompatible with SyntaxHighlighterProps
                style={style}
                language={language}
                PreTag="div"
                codeTagProps={{ className: "text-sm" }}
                customStyle={{
                  margin: 0,
                  padding: "0.5rem",
                }}
                showLineNumbers
                {...props}
              >
                {codeString}
              </SyntaxHighlighter>
            </CodeBlockWithCopy>
          ) : (
            <span className="code-block-wrapper">
              <code
                className="rounded border border-slate-700 bg-slate-800  font-mono text-sm text-purple-300"
                {...props}
              >
                {children}
              </code>
            </span>
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
