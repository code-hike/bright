import { NewDemo } from "./new-demo"
import { Code } from "bright"

const sourceCode = `
import { Code } from "bright"

const myCode = \`
theFuture, bright = 10, 10
print(theFuture is bright)
\`.trim()

// focus(1:7)
Code.theme = {
  dark: "github-dark",
  light: "github-light",
  // using a different CSS selector:
  // lightSelector: '[data-theme="light"]',
  // lightSelector: 'html.light',
}

// focus(4,6,7,9)
export default function Page() {
  return (
    <>
      <div data-theme="dark">
        <Code lang="py">{myCode}</Code>
      </div>
      <div data-theme="light">
        <Code lang="py">{myCode}</Code>
      </div>
    </>
  )
}
`.trim()

const preview = (
  <>
    <div>
      {/* @ts-expect-error Server Component */}
      <Code
        lang="py"
        theme={{
          dark: "github-dark",
          light: "github-light",
        }}
        style={{
          fontSize: "1.2rem",
          margin: "-2rem auto 0",
          position: "relative",
          border: "1px solid #444",
          width: "80%",
        }}
      >{`theFuture, bright = 10, 10
print(theFuture is bright)`}</Code>
    </div>
    <div data-theme="light">
      {/* @ts-expect-error Server Component */}
      <Code
        lang="py"
        theme={{
          dark: "github-dark",
          light: "github-light",
        }}
        style={{
          fontSize: "1.2rem",
          margin: "0.5rem auto 0",
          position: "relative",
          border: "1px solid #444",
          width: "80%",
        }}
      >{`theFuture, bright = 10, 10
print(theFuture is bright)`}</Code>
    </div>
  </>
)

export default function Demo() {
  return (
    <>
      <div style={{ height: "1rem" }} />
      <NewDemo
        filename="app/page.js"
        sourceProps={{ children: sourceCode, lang: "jsx" }}
        preview={preview}
      />
    </>
  )
}
