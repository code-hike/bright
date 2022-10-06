import React, { Suspense } from "react"
import { toTokens } from "./highlighter.js"
import { load } from "./loader.js"

Code.defaultTheme = "Dracula Soft"
Code.api = "https://bright.codehike.org/api"

function highlight(code, lang, themeLabel) {
  const { theme, registry } = load(Code.api, lang, themeLabel)

  const lines = toTokens(code, lang, theme, registry)
  return {
    color: theme.fg,
    background: theme.bg,
    lines,
  }
}

function InnerCode({ children, lang, theme }) {
  const { lines, color, background } = highlight(children, lang, theme)

  return (
    <pre style={{ color, background }}>
      <code>
        {lines.map((line, lineIndex) => (
          <span key={lineIndex}>
            {line.map((token, tokenIndex) => (
              <span style={token.style} key={tokenIndex}>
                {token.content}
              </span>
            ))}
            <br />
          </span>
        ))}
      </code>
    </pre>
  )
}
function Code(props) {
  return (
    <Suspense fallback={"Loading..."}>
      <InnerCode {...props} theme={props.theme || Code.defaultTheme} />
    </Suspense>
  )
}

export { Code, highlight }
