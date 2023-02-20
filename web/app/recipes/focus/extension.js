/** @type {import("bright").Extension} */
export const focus = {
  name: "focus",
  MultilineAnnotation: ({ children }) => (
    <div style={{ filter: "contrast(0.1)" }}>{children}</div>
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

    const newAnnotations = props.annotations.filter(
      (a) => a.name !== "focus"
    )
    newAnnotations.push({
      name: "focus",
      ranges: newRanges,
    })
    return { ...props, annotations: newAnnotations }
  },
}
