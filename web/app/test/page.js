import { Code } from "bright"

Code.theme = "dracula"

export default function Page() {
  return (
    <div>
      <Code>console.log(1)</Code>
    </div>
  )
}
