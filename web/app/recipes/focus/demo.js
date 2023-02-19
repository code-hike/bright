import { Code } from "bright"
import { focus } from "./extension"

const myCode = `
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit;
  // focus(1:2) 
  dolor = sit - amet(dolor);
  return dolor;
}
`.trim()

export default function Page() {
  return (
    <Code lang="js" extensions={[focus]}>
      {myCode}
    </Code>
  )
}
