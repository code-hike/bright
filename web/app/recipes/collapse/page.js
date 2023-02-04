import Demo from "./demo"

import rawDemo from "!!raw-loader!./demo.js"
import rawCollapse from "!!raw-loader!./collapse.js"

import { Recipe } from "../recipe"

const data = {
  title: "Collapse Annotation",
  id: "collapse",
  Demo,
  source: [
    { title: "app/page.js", children: rawDemo },
    { title: "app/collapse.js", children: rawCollapse },
  ],
}

export default function Page() {
  return <Recipe {...data} />
}
