import { NewDemo } from "./new-demo"

const sourceCode = `# Hello

This is how you add the code's title in Markdown/MDX 

\`\`\`web/shine.js
let hello = "hello brightness"
console.log(hello, "my old friend")
\`\`\`
`

export default function Demo() {
  return (
    <>
      <div style={{ height: "1rem" }} />
      <NewDemo
        filename="app/page.mdx"
        sourceProps={{
          children: sourceCode,
          lang: "mdx",
          annotations: [
            { name: "focus", ranges: [{ fromLineNumber: 3, toLineNumber: 5 }] },
          ],
        }}
        demoProps={{
          title: "web/shine.js",
          lang: "js",
          code: `
let hello = "hello brightness"
console.log(hello, "my old friend")
`.trim(),
        }}
      />
    </>
  )
}
