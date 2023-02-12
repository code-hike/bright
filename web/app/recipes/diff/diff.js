import { Code } from "bright"
import { diffLines } from "diff"

// TODO get colors from lighter (https://code.visualstudio.com/api/references/theme-color#diff-editor-colors)
const green = "#7f74"
const red = "#f774"

/** @type {import("bright").BrightProps["PreComponent"]} */
function Content({ brightProps }) {
  const { subProps } = brightProps
  const annotations = subProps[0].annotations.concat(subProps[1].annotations)

  const prevLines = subProps[0].lines
  const nextLines = subProps[1].lines

  let newLines = [...nextLines]
  prevLines.forEach((lineOrLineGroup) => {
    if (
      lineOrLineGroup.annotationName == "diff" &&
      lineOrLineGroup.annotationQuery.startsWith("removed")
    ) {
      const nextLineNumber = parseInt(
        lineOrLineGroup.annotationQuery.split(" ")[1]
      )
      const linesBefore = newLines.filter((nl) =>
        nl.lineNumber
          ? nl.lineNumber < nextLineNumber
          : nl.fromLineNumber < nextLineNumber
      )
      const linesAfter = newLines.filter((nl) =>
        nl.lineNumber
          ? nl.lineNumber >= nextLineNumber
          : nl.fromLineNumber >= nextLineNumber
      )
      newLines = [...linesBefore, lineOrLineGroup, ...linesAfter]
    }
  })

  // console.log(lines)
  const newProps = {
    ...brightProps,
    annotations,
    lines: newLines,
  }
  return <Code.PreComponent brightProps={newProps} />
}

/** @type {import("bright").BrightProps["extensions"]} */
const extensions = {
  diff: {
    MultilineAnnotation: ({ children, query }) => (
      <div style={{ background: query.startsWith("added") ? green : red }}>
        {children}
      </div>
    ),
    beforeRoot: (brightProps) => {
      const { subProps } = brightProps
      const [prev, next] = subProps
      const newProps = { ...brightProps }

      const diff = diffLines(prev.code, next.code)
      // console.log(diff)

      let prevLineNumber = 1
      let nextLineNumber = 1

      diff.forEach((d, i) => {
        if (d.added) {
          next.annotations.push({
            name: "diff",
            query: `added`,
            ranges: [
              {
                fromLineNumber: nextLineNumber,
                toLineNumber: nextLineNumber + d.count - 1,
              },
            ],
          })
          nextLineNumber += d.count
        } else if (d.removed) {
          prev.annotations.push({
            name: "diff",
            query: `removed ${nextLineNumber}`,
            ranges: [
              {
                fromLineNumber: prevLineNumber,
                toLineNumber: prevLineNumber + d.count - 1,
              },
            ],
          })
          prevLineNumber += d.count
        } else {
          prevLineNumber += d.count
          nextLineNumber += d.count
        }
      })

      return newProps
    },
  },
}

export function Diff({ children }) {
  console.log(children)
  return "Hi"
}
