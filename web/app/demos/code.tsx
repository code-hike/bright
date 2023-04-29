import { NewDemo } from "./new-demo"

const sourceCode = `
import { Code } from "bright"

export default function Page() {
  return (
    <Code lang="py">print("hello brightness")</Code>
  )
}
`.trim()

export default function Demo() {
  return (
    <NewDemo
      filename="app/page.js"
      sourceProps={{ children: sourceCode, lang: "jsx" }}
      demoProps={{
        lang: "py",
        code: `print("hello brightness")`,
      }}
    />
  )
}
