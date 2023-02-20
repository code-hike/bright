import { Code } from "bright"
import { link } from "./extension"

const myCode = `
// link[10:14] https://github.com/sponsors/code-hike
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit;
  dolor = sit - amet(dolor);
  return dolor;
}`.trim()

export default function Page() {
  return (
    <Code lang="js" extensions={[link]}>
      {myCode}
    </Code>
  )
}
