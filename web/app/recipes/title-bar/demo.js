import { Code } from "bright"
import { titleBar } from "./extension"

const myCode = `
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit;
  dolor = sit - amet(dolor);
  return dolor;
}
`.trim()

export default function Page() {
  return (
    <Code
      lang="js"
      title="Lorem Ipsum"
      extensions={[titleBar]}
    >
      {myCode}
    </Code>
  )
}
