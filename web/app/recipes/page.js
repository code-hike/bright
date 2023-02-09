import CollapseAnnotationDemo from "./collapse/demo"
import LinkAnnotationDemo from "./link/demo"
import TitleBarDemo from "./title/demo"
import FileIconsDemo from "./file-icons/demo"
import Link from "next/link"

const recipes = [
  {
    title: "Collapse Annotation",
    id: "collapse",
    Demo: CollapseAnnotationDemo,
  },
  {
    title: "Link Annotation",
    id: "link",
    Demo: LinkAnnotationDemo,
  },
  {
    title: "Title Bar",
    id: "title",
    Demo: TitleBarDemo,
  },
  {
    title: "File Icons",
    id: "file-icons",
    Demo: FileIconsDemo,
  },
]

export default function Page() {
  return (
    <main>
      <h1>Recipes</h1>
      {recipes.map(({ title, id, Demo }) => (
        <div key={id} id={id}>
          <div
            style={{ display: "flex", flexFlow: "row", alignItems: "baseline" }}
          >
            <h2 style={{ marginBottom: 0 }}>{title}</h2>
            <Link href={`recipes/${id}`} style={{ marginLeft: "auto" }}>
              view source
            </Link>
          </div>
          <Demo />
        </div>
      ))}
    </main>
  )
}
