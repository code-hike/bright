import CollapseAnnotationDemo from "./collapse/demo"
import LinkAnnotationDemo from "./link/demo"
import TitleBarDemo from "./title-bar/demo"
import FileIconsDemo from "./file-icons/demo"
import DiffDemo from "./diff/demo"
import TabsDemo from "./tabs/demo"
import FocusDemo from "./focus/demo"
import Link from "next/link"

const recipes = [
  {
    title: "Collapse",
    id: "collapse",
    Demo: CollapseAnnotationDemo,
  },
  {
    title: "Diff",
    id: "diff",
    Demo: DiffDemo,
  },
  {
    title: "File Icons",
    id: "file-icons",
    Demo: FileIconsDemo,
  },
  {
    title: "Focus",
    id: "focus",
    Demo: FocusDemo,
  },
  {
    title: "Link",
    id: "link",
    Demo: LinkAnnotationDemo,
  },
  {
    title: "Tabs",
    id: "tabs",
    Demo: TabsDemo,
  },
  {
    title: "Title Bar",
    id: "title-bar",
    Demo: TitleBarDemo,
  },
]

export default function Page() {
  return (
    <main>
      <h1>
        <Link href="/">Bright</Link> / Recipes
      </h1>
      {recipes.map(({ title, id, Demo }) => (
        <div key={id} id={id}>
          <div
            style={{
              display: "flex",
              flexFlow: "row",
              alignItems: "baseline",
            }}
          >
            <h2 style={{ marginBottom: 0 }}>{title}</h2>
            <Link
              href={`recipes/${id}`}
              style={{ marginLeft: "auto" }}
            >
              view source
            </Link>
          </div>
          <Demo />
        </div>
      ))}
    </main>
  )
}
