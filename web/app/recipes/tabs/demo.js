import { Code } from "bright"
import { Tabs } from "./tabs"

export default function Page() {
  return (
    <Code
      theme="dracula"
      childProps={[
        { code: "console.log(1)", lang: "js" },
        { code: "print(2)", lang: "py" },
      ]}
    />
  )
}
