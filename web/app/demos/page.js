import { Code } from "bright"

// focus(1:2)
// here we wrap the columns 12 to 17
// inside a <mark> element
// focus(2:3)
const myCode = `
# myMark[12:17] rgba(241, 250, 140, 0.25)
print("the bright side of life")
`.trim()

// focus(1:16)
Code.extensions = [
  {
    name: "myMark",
    InlineAnnotation: ({ children, query }) => (
      <mark
        style={{
          background: query,
          borderRadius: "0.25rem",
          padding: "0.2rem 0.15rem 0.1rem",
          margin: "0 -0.15rem",
        }}
      >
        {children}
      </mark>
    ),
  },
]

// focus(3)
export default function Page() {
  return <Code lang="py">{myCode}</Code>
}
