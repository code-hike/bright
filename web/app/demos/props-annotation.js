import { NewDemo } from "./new-demo"

const sourceCode = `
import { Code } from "bright"

// focus(2:3)
const myCode = \`
# title monthy.py
print("the bright side of life")
\`.trim()

// focus(1:11)
Code.extensions = {
  title: {
    // you can change props inside annotations
    // this one adds a title 
    beforeHighlight: (props, annotations) => {
      if (annotations.length > 0) {
        return { ...props, title: annotations[0].query }
      }
    },
  },
}

// focus(2)
export default function Page() {
  return <Code lang="py">{myCode}</Code>
}
`

const demoCode = `
# title monthy.py
print("the bright side of life")
`.trim()

const demoProps = {
  children: demoCode,
  lang: "py",
  extensions: {
    title: {
      beforeHighlight: (props, annotations) => {
        if (annotations.length > 0) {
          return { ...props, title: annotations[0].query }
        }
      },
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
