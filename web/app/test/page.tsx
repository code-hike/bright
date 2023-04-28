import React from "react"
import { Code } from "bright"

Code.theme = {
  dark: "min-dark",
  light: "min-light",
  lightSelector: ".light",
}
Code.extensions = []
const code = `
<div
  style={{
    color: "#fafafa",
    background: "#222222",
  }}
>
  Hello World
</div>`.trim()

export default function Page() {
  return (
    <main>
      <div className="light">
        {/* @ts-expect-error */}
        <Code lang="jsx">{code}</Code>
      </div>
      <div>
        {/* @ts-expect-error */}
        <Code lang="jsx">{code}</Code>
      </div>
      <div data-theme="dark">
        {/* @ts-expect-error */}
        <Code lang="jsx">{code}</Code>
      </div>
    </main>
  )
}
