import { Line, Lines, Tokens } from "@code-hike/lighter"
import { TokensRenderer, tokensToContent } from "./tokens"
import { BrightProps } from "./types"

export function LinesComponent({
  lines,
  brightProps,
}: {
  lines: Lines
  brightProps: BrightProps
}) {
  const { extensions } = brightProps
  return (
    <>
      {lines.map((line, i) => {
        if ("lineNumber" in line) {
          return <LineComponent key={i} line={line} brightProps={brightProps} />
        } else if (extensions[line.annotationName]?.MultilineAnnotation) {
          const extension = extensions[line.annotationName]
          const Wrapper = extension.MultilineAnnotation!
          return (
            <Wrapper
              key={i}
              query={line.annotationQuery}
              lines={line.lines}
              brightProps={brightProps}
            >
              <LinesComponent lines={line.lines} brightProps={brightProps} />
            </Wrapper>
          )
        } else {
          return (
            <LinesComponent
              key={i}
              lines={line.lines}
              brightProps={brightProps}
            />
          )
        }
      })}
    </>
  )
}

function LineComponent({
  line,
  brightProps,
}: {
  line: Line
  brightProps: BrightProps
}) {
  const digits = brightProps.lineNumbers
    ? brightProps.lineCount.toString().length
    : 0
  return (
    <div style={{ padding: "0 1em" }}>
      <span>
        {digits > 0 && (
          <span
            data-bright-ln={line.lineNumber}
            style={{ width: `${digits}ch` }}
          >
            {line.lineNumber}
          </span>
        )}
        <TokensRenderer tokens={line.tokens} brightProps={brightProps} />
        <br />
      </span>
    </div>
  )
}

export function linesToContent(lines: Lines): string {
  return lines
    .map((line) => {
      if ("lineNumber" in line) {
        return tokensToContent(line.tokens)
      } else {
        return linesToContent(line.lines)
      }
    })
    .join("\n")
}
