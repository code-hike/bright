import CollapseAnnotationDemo from "./collapse/demo"
import Link from "next/link"

export default function Page() {
  return (
    <main>
      <h1>Recipes</h1>
      <h2>
        <Link href="recipes/collapse">Collapse Annotation</Link>
      </h2>
      <CollapseAnnotationDemo />
    </main>
  )
}
