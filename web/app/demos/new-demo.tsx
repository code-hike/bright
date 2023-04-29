import { Code, tokensToContent } from "bright"
import { WithBackground } from "../with-background"
import theme from "./theme.json"
import Link from "next/link"
import type { Extension } from "bright"

const extensions: Extension[] = [
  {
    name: "focus",
    MultilineAnnotation: ({ children }) => (
      <div style={{ filter: "contrast(0.3)" }}>{children}</div>
    ),
    beforeHighlight: (props, focusAnnotations) => {
      if (focusAnnotations.length === 0) return props

      const lineCount = props.code.split("\n").length

      const ranges = focusAnnotations.flatMap((a) => a.ranges)

      let newRanges = [{ fromLineNumber: 1, toLineNumber: lineCount }]

      for (const range of ranges) {
        if (!("fromLineNumber" in range)) continue

        const { fromLineNumber, toLineNumber } = range
        newRanges = newRanges.flatMap((r) => {
          if (
            r.fromLineNumber > toLineNumber ||
            r.toLineNumber < fromLineNumber
          )
            return [r]
          if (
            r.fromLineNumber >= fromLineNumber &&
            r.toLineNumber <= toLineNumber
          )
            return []
          if (
            r.fromLineNumber < fromLineNumber &&
            r.toLineNumber > toLineNumber
          )
            return [
              {
                fromLineNumber: r.fromLineNumber,
                toLineNumber: fromLineNumber - 1,
              },
              {
                fromLineNumber: toLineNumber + 1,
                toLineNumber: r.toLineNumber,
              },
            ]
          if (r.fromLineNumber < fromLineNumber)
            return [
              {
                fromLineNumber: r.fromLineNumber,
                toLineNumber: fromLineNumber - 1,
              },
            ]
          if (r.toLineNumber > toLineNumber)
            return [
              {
                fromLineNumber: toLineNumber + 1,
                toLineNumber: r.toLineNumber,
              },
            ]
        })
      }

      const newAnnotations = props.annotations.filter((a) => a.name !== "focus")
      newAnnotations.push({
        name: "focus",
        ranges: newRanges,
      })

      return { ...props, annotations: newAnnotations }
    },
  },
  {
    name: "link",
    InlineAnnotation: ({ children, query }) => (
      <Link href={query} style={{ textDecoration: "underline" }} scroll>
        {children}
      </Link>
    ),
  },
  {
    name: "color",
    InlineAnnotation: ({ query, tokens }) => (
      <span style={{ color: query }}>{tokensToContent(tokens)}</span>
    ),
  },
]

type CodeProps = Parameters<typeof Code>[0]

export function NewDemo({
  sourceProps = {},
  demoProps,
  preview,
  filename = "app/page.js",
}: {
  sourceProps?: Partial<CodeProps>
  demoProps?: Partial<CodeProps>
  preview?: any
  filename?: string
}) {
  const demoPreview = preview ? (
    preview
  ) : demoProps ? (
    /* @ts-expect-error Server Component */
    <Code
      theme="dracula"
      lang="py"
      style={{
        fontSize: "1.1rem",
        margin: "-2rem auto 0",
        position: "relative",
        border: "1px solid #444",
        width: "85%",
      }}
      {...demoProps}
    />
  ) : null
  return (
    <>
      <WithBackground
        blur={12}
        opacity={0.9}
        style={{
          overflow: "hidden",
          borderRadius: "4px",
          border: "1px solid #444",
          background: "#2226",
        }}
        bg={{ color: "rgba(137, 221, 255, 0.2)", "--text-color": "#ccc2" }}
        fg={{ color: "rgb(137, 221, 255)", "--text-color": "#ccc" }}
      >
        <code
          style={{
            color: "#888",
            fontSize: "1rem",
            textAlign: "center",
            display: "block",
            marginTop: "0.3rem",
          }}
        >
          {filename}
        </code>
        {/* @ts-expect-error Server Component */}
        <Code
          extensions={extensions}
          style={{ fontSize: "1.15rem", lineHeight: "1.5rem", margin: 0 }}
          theme={theme}
          {...sourceProps}
        />
      </WithBackground>
      {demoPreview}
    </>
  )
}
