import { Code } from "bright"
import Demo from "./demo"

import rawDemo from "!!raw-loader!./demo.js"
import rawCollapse from "!!raw-loader!./collapse.js"

export default function Page() {
  return (
    <main>
      <h1>Collapse Annotation</h1>
      <h2>Demo</h2>
      <Demo />
      <h2>Source</h2>
      <Code lang="jsx" theme="material-ocean" title="app/page.js">
        {rawDemo}
      </Code>
      <Code lang="jsx" theme="material-ocean" title="app/collapse.js">
        {rawCollapse}
      </Code>
    </main>
  )
}
