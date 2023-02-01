import { Code } from "bright"
import { Wrapper, Input } from "../../client-components"

Code.theme = "dracula"
Code.extensions = {
  input: {
    InlineAnnotation: ({ query, content }) => (
      <Input defaultValue={content} name={query} />
    ),
  },
  title: {
    beforeHighlight: (props, annotations) => {
      if (annotations.length > 0) {
        return { ...props, title: annotations[0].query }
      }
    },
  },
}
const code = `
<div
  style={{
    // input[13:19] color
    color: "#fafafa",
    // input[18:24] bg
    background: "#222222",
  }}
>
  Hello World
</div>`

export default function ClientDemo() {
  return (
    <Wrapper>
      <Code lang="jsx">{code}</Code>
    </Wrapper>
  )
}
