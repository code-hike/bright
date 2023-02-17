import { Code } from "bright"
import { WithBackground } from "../with-background"
import theme from "./theme"

Code.extensions = [
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
]

export function NewDemo({
  sourceProps,
  demoProps,
  preview,
  filename = "app/page.js",
}) {
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
        <Code
          style={{ fontSize: "1.15rem", lineHeight: "1.5rem", margin: 0 }}
          theme={theme}
          {...sourceProps}
        />
      </WithBackground>
      {preview || (
        <Code
          theme="dracula"
          lang="py"
          style={{
            fontSize: "1.2rem",
            margin: "-2rem auto 0",
            position: "relative",
            border: "1px solid #444",
            width: "85%",
          }}
          {...demoProps}
        ></Code>
      )}
    </>
  )
}
