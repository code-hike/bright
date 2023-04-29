import { fileIcons } from "../recipes/file-icons/extension"
import { focus } from "../recipes/focus/extension"
import { tabs } from "../recipes/tabs/extension"
import { NewDemo } from "./new-demo"

const sourceCode = `
import { Code } from "bright"
import { 
  tabs, 
  fileIcons, 
  focus 
} from "./my-extensions"

// focus(1:7)
// use extensions to customize anything
// color[1:4] rgb(255, 203, 107)
// color[6:15] rgb(199, 146, 234)
Code.extensions = [
  tabs, 
  fileIcons, 
  focus
]
// link[8:14] recipes
// see recipes for common use cases and inspiration

export function useMDXComponents(components) {
  return { ...components, pre: Code }
}
`.trim()

const demoProps = {
  extensions: [tabs, fileIcons, focus],
  // theme: "github-light",
  subProps: [
    {
      code: `function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit;
  // focus(1:2) 
  dolor = sit - amet(dolor);
  return dolor;
}

function consectetur(...adipiscing) {
  const elit = adipiscing[0];
  return sed.eiusmod(elit) ? elit : [elit];
}`,
      lang: "js",
      title: "shine.js",
    },
    {
      code: `def dolor_sit_amet(consectetur, adipiscing):
    if consectetur == "Lorem"
        print("Pellentesque habitant.")
    else:
        print("Suspendisse potenti.")

dolor_sit_amet("Lorem", "ipsum", "dolor")`,
      lang: "py",
      title: "shine.py",
    },
    {
      code: `{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}`,
      lang: "graphql",
      title: "shine.graphql",
    },
  ],
}

export default function Demo() {
  return (
    <>
      <div style={{ height: "1rem" }} />
      <NewDemo
        filename="mdx-components.js"
        sourceProps={{ children: sourceCode, lang: "jsx" }}
        demoProps={demoProps}
      />
    </>
  )
}
