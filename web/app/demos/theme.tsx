import { NewDemo } from "./new-demo"

const sourceCode = `
import { Code } from "bright"

const myCode = \`
theFuture, bright = 10, 10
print(theFuture is bright)
\`.trim()

// focus(1:3)
// there are several themes built in
// typescript should autocomplete the options
Code.theme = "github-light"

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
        demoProps={{
          lang: "py",
          theme: "github-light",
          code: `
theFuture, bright = 10, 10
print(theFuture is bright)
`.trim(),
        }}
      />
    </>
  )
}
