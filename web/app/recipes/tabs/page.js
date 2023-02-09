import Demo from "./demo"

import rawDemo from "!!raw-loader!./demo.js"

import { Recipe } from "../recipe"

const data = {
  title: "Link Annotation",
  id: "link",
  Demo,
  source: [{ title: "app/page.js", children: rawDemo }],
}

export default function Page() {
  return <Recipe {...data} />
}
