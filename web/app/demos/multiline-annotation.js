import { NewDemo } from "./new-demo"

const sourceCode = `
import { Code } from "bright"

// focus(1:6)
const myCode = \`
print("It's gonna be")
# mark(1:2) rgba(126, 233, 253, 0.25)
print("a bright")
print("sunshiny")
print("day")
\`.trim()

// focus(1:9)
Code.extensions = {
  mark: {
    MultilineAnnotation: ({ children, query }) => (
      <div style={{ background: query }}>
        {children}
      </div>
    ),
  },
}

// focus(2)
export default function Page() {
  return <Code lang="py">{myCode}</Code>
}
`

const demoCode = `print("It's gonna be a")
# mark(1:2) rgba(126, 233, 253, 0.25)
print("bright")
print("sunshiny")
print("day")`

const demoProps = {
  children: demoCode,
  lang: "py",
  extensions: {
    mark: {
      MultilineAnnotation: ({ children, query }) => (
        <div style={{ background: query }}>{children}</div>
      ),
    },
  },
}

export default function Demo() {
  return (
    <>
      <div style={{ height: "1rem" }} />
      <NewDemo
        sourceProps={{
          children: sourceCode,
          lang: "jsx",
        }}
        demoProps={demoProps}
      />
    </>
  )
}
