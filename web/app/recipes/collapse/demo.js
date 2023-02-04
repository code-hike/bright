import { Code } from "bright"
import { CollapseAnnotation } from "./collapse"

const myCode = `
// collapse(1:5) close
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit;
  dolor = sit - amet(dolor);
  return dolor;
}

// collapse(1:4) 
function consectetur(...adipiscing) {
  const elit = adipiscing[0];
  return sed.eiusmod(elit) ? elit : [elit];
}
`.trim()

const extensions = {
  collapse: {
    MultilineAnnotation: CollapseAnnotation,
  },
}

export default function Page() {
  return (
    <Code lang="js" lineNumbers extensions={extensions} theme="dracula">
      {myCode}
    </Code>
  )
}
