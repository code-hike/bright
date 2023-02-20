import Link from "next/link"
import { Code } from "bright"
import { tabs } from "./tabs/extension"

export function Recipe({ title, id, Demo, source }) {
  return (
    <main style={{ margin: "30px 0 50vh" }}>
      <h1>
        <Link href="/">Bright</Link> /{" "}
        <Link href="/recipes">Recipes</Link> / {title}
      </h1>
      <h2>Demo</h2>
      <Demo />
      <h2>Source</h2>
      <Code
        lang="jsx"
        theme="material-ocean"
        {...source}
        extensions={[tabs]}
      />
      <a
        href={`https://github.com/code-hike/bright/tree/main/web/app/recipes/${id}/demo.js`}
        style={{ textAlign: "center", display: "block" }}
      >
        Link to the demo on GitHub
      </a>
    </main>
  )
}
