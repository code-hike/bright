import { NewDemo } from "./new-demo"

const sourceCode = `
import { Code } from "bright"

// focus(1:6)
// you can make your own theme
// or extend any VS Code theme
// link[9:42] https://themes.codehike.org/editor
// with https://themes.codehike.org/editor
import myTheme from "./my-theme.json"

Code.theme = myTheme

const myCode = \`
theFuture, bright = 10, 10
print(theFuture is bright)
\`.trim()

export default function Page() {
  return (
    <Code lang="py">{myCode}</Code>
  )
}
`.trim()

export default function Demo() {
  return (
    <>
      <div style={{ height: "1rem" }} />
      <NewDemo
        filename="app/page.js"
        sourceProps={{ children: sourceCode, lang: "jsx" }}
      />
    </>
  )
}
