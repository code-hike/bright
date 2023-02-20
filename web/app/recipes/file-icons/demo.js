import { Code } from "bright"
import { fileIcons } from "./extension"

const myCode = `
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit;
  dolor = sit - amet(dolor);
  return dolor;
}
`.trim()

export default function Page() {
  return (
    <>
      <Code
        lang="js"
        title="ipsum.py"
        extensions={[fileIcons]}
      >
        {myCode}
      </Code>
      <Code
        lang="js"
        theme="github-light"
        title="lorem.js"
        extensions={[fileIcons]}
      >
        {myCode}
      </Code>
      <Code
        lang="js"
        title="package.json"
        extensions={[fileIcons]}
      >
        {myCode}
      </Code>
    </>
  )
}
