import { Code } from "bright"

const myCode = `
// link[10:14] https://github.com/sponsors/code-hike
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit;
  dolor = sit - amet(dolor);
  return dolor;
}
`.trim()

/** @type {import("bright").BrightProps["extensions"]} */
const extensions = {
  link: {
    InlineAnnotation: ({ children, query }) => (
      <a href={query} style={{ textDecoration: "underline" }}>
        {children}
      </a>
    ),
  },
}

export default function Page() {
  return (
    <Code lang="js" extensions={extensions} theme="dracula">
      {myCode}
    </Code>
  )
}
