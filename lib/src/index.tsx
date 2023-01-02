import React from "react"
import { highlight, Theme, Lang } from "@code-hike/lighter"

type CodeProps = {
  lang: Lang
  children: string
  style?: React.CSSProperties
  className?: string
  lineNumbers?: boolean
  unstyled?: boolean
  theme?: Theme
}

type CodeComponent = ((props: CodeProps) => Promise<JSX.Element>) & {
  theme?: Theme
}

export const Code: CodeComponent = async ({
  children,
  lang,
  style,
  className,
  lineNumbers,
  unstyled,
  theme,
}) => {
  const {
    lines,
    foreground,
    background,
    colorScheme,
    selectionBackground,
    lineNumberForeground,
  } = await highlight(children, lang || "js", theme || Code.theme)

  const lineCount = lines.length
  const digits = lineCount.toString().length

  const kids = lines.map((tokens, i) => {
    return (
      <span key={i}>
        {lineNumbers && (
          <span className="bright-ln" style={{ width: `${digits}ch` }}>
            {i + 1}
          </span>
        )}
        {tokens.map((t, j) => (
          <span key={j} style={t.style}>
            {t.content}
          </span>
        ))}
        <br />
      </span>
    )
  })

  return (
    <pre
      className={className}
      style={{
        color: foreground,
        background,
        // border: "1px solid " + background,
        padding: "1em",
        borderRadius: "4px",
        colorScheme,
        ...style,
      }}
    >
      <style>{`
      code ::selection {
        background-color: ${selectionBackground}
      }
      .bright-ln { 
        color: ${lineNumberForeground}; 
        padding-right: 2ch; 
        display: inline-block;
        text-align: right;
        user-select: none;
      }`}</style>
      <code>{kids}</code>
    </pre>
  )
}
