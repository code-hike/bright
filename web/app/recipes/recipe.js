import Link from "next/link"
import { Code } from "bright"

export function Recipe({ title, id, Demo, source }) {
  return (
    <main style={{ margin: "30px 0" }}>
      <Link href="/recipes">{`<- `}Back to recipes</Link>
      <h1>{title}</h1>
      <h2>Demo</h2>
      <Demo />
      <h2>Source</h2>
      {source.map((props, i) => (
        <Code key={i} lang="jsx" theme="material-ocean" {...props} />
      ))}
      <a
        href={`https://github.com/code-hike/bright/tree/main/web/app/recipes/${id}/demo.js`}
        style={{ textAlign: "center", display: "block" }}
      >
        Link to the demo on GitHub
      </a>
    </main>
  )
}
