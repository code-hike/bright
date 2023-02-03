import { Code } from "bright"

// here we wrap the columns 12 to 17
// inside a <mark> element
const myCode = `
print("It's gonna be")
# mark(1:2) rgba(126, 233, 253, 0.25)
print("a bright")
print("sunshiny")
print("day")
`.trim()

Code.extensions = {
  mark: {
    MultilineAnnotation: ({ children, query }) => (
      <div style={{ background: query }}>{children}</div>
    ),
  },
}

export default function Page() {
  return <Code lang="py">{myCode}</Code>
}
