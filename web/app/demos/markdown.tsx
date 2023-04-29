import { NewDemo } from "./new-demo"

const sourceCode = `
import { Code } from "bright"

// You need this file to use MDX in server components
// link[20:35] https://beta.nextjs.org/docs/guides/mdx
// Learn more from the Next.js docs

export function useMDXComponents(components) {
  return { ...components, pre: Code }
}
`.trim()

export default function Demo() {
  return (
    <>
      <div style={{ height: "1rem" }} />
      <NewDemo
        filename="mdx-components.js"
        sourceProps={{ children: sourceCode, lang: "jsx" }}
      />
    </>
  )
}
