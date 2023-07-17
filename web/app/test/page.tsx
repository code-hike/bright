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
        <Code lang="jsx">{code}</Code>
      </div>
      <div>
        <Code lang="jsx">{code}</Code>
      </div>
      <div data-theme="dark">
        <Code lang="jsx">{code}</Code>
      </div>
    </main>
  )
}

export const runtime = "edge"
