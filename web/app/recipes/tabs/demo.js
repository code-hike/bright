import { Code } from "bright"
import { Tabs } from "./tabs"

Code.TitleBarRenderer = ({ children, ...props }) => (
  <div {...props}>--- {children} ---</div>
)

function Title() {
  return <div>Hey</div>
}

function Codes() {}

export default function Page() {
  return (
    <Tabs>
      {{
        "foo.js": (
          <Code lang="js" title="foo">
            console.log(1)
          </Code>
        ),
        "bar.py": (
          <Code lang="py" title="bar">
            print(2)
          </Code>
        ),
      }}
    </Tabs>
  )
}
