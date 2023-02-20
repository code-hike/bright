import Demo from "./demo"

import rawDemo from "!!raw-loader!./usage.mdx"
import rawTabs from "!!raw-loader!./tabs.js"
import rawExtension from "!!raw-loader!./extension.js"
import rawClient from "!!raw-loader!./client.js"

import { Recipe } from "../recipe"

const data = {
  title: "Tabs",
  id: "tabs",
  Demo,
  source: {
    subProps: [
      { title: "app/page.mdx", code: rawDemo, lang: "md" },
      { title: "app/tabs.js", code: rawTabs, lang: "jsx" },
      {
        title: "app/extension.js",
        code: rawExtension,
        lang: "jsx",
      },
      {
        title: "app/client.js",
        code: rawClient,
        lang: "jsx",
      },
    ],
  },
}

export default function Page() {
  return <Recipe {...data} />
}
