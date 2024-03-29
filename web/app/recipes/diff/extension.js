import { Code } from "bright"
import { diffLines } from "diff"

/** @type {import("bright").Extension} */
export const diff = {
  name: "diff",
  MultilineAnnotation: ({
    children,
    query,
    brightProps,
  }) => {
    const { colors } = brightProps
    return (
      <div
        style={{
          background: query.startsWith("added")
            ? colors.diffInsertedLineBackground
            : colors.diffRemovedLineBackground,
        }}
      >
        {children}
      </div>
    )
  },
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
  Pre: Content,
}

/** @type {import("bright").BrightProps["Pre"]} */
function Content(brightProps) {
  const { subProps } = brightProps
  const annotations = subProps[0].annotations.concat(
    subProps[1].annotations
  )

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
      newLines = [
        ...linesBefore,
        lineOrLineGroup,
        ...linesAfter,
      ]
    }
  })

  // console.log(lines)
  const newProps = {
    ...brightProps,
    annotations,
    lines: newLines,
  }
  return <Code.Pre {...newProps} />
}
