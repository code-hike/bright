import Demo from "./demo"

import rawDemo from "!!raw-loader!./demo.js"
import rawCollapse from "!!raw-loader!./collapse.js"
import rawExtension from "!!raw-loader!./extension.js"

import { Recipe } from "../recipe"

const data = {
  title: "Collapse",
  id: "collapse",
  Demo,
  source: {
    subProps: [
      { title: "app/page.js", code: rawDemo, lang: "jsx" },
      {
        title: "app/extension.js",
        code: rawExtension,
        lang: "jsx",
      },
      { title: "app/collapse.js", code: rawCollapse, lang: "jsx" },
    ],
  },
}

export default function Page() {
  return <Recipe {...data} />
}
