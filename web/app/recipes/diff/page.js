import Demo from "./demo"

import rawUsage from "!!raw-loader!./usage.mdx"
import rawDiff from "!!raw-loader!./diff.js"
import rawExtension from "!!raw-loader!./extension.js"

import { Recipe } from "../recipe"

const data = {
  title: "Diff",
  id: "diff",
  Demo,
  source: {
    subProps: [
      { title: "app/page.mdx", code: rawUsage, lang: "md" },
      { title: "app/diff.js", code: rawDiff, lang: "jsx" },
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
