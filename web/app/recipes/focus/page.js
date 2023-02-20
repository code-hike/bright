import Demo from "./demo"

import rawDemo from "!!raw-loader!./demo.js"
import rawExtension from "!!raw-loader!./extension.js"

import { Recipe } from "../recipe"

const data = {
  title: "Focus",
  id: "focus",
  Demo,
  source: {
    subProps: [
      { title: "app/page.js", code: rawDemo, lang: "jsx" },
      {
        title: "app/extension.js",
        code: rawExtension,
        lang: "jsx",
      },
    ],
  },
}

export default function Page() {
  return <Recipe {...data} />
}
