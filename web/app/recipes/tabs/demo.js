import { Code } from "bright"
import { TabsRoot, TabsContent, TabsList } from "./tabs"

/** @type {import("bright").BrightProps["RootComponent"]} */
function Root({ brightProps, ...props }) {
  const { subProps, title } = brightProps
  const titles = subProps ? subProps.map((subProp) => subProp.title) : [title]
  return (
    <TabsRoot defaultValue={titles[0]}>
      <Code.RootComponent {...props} brightProps={brightProps} />
    </TabsRoot>
  )
}

/** @type {import("bright").BrightProps["TitleComponent"]} */
function Title({ brightProps, ...props }) {
  const { subProps, title } = brightProps
  const titles = subProps ? subProps.map((subProp) => subProp.title) : [title]
  return <TabsList titles={titles} />
}

/** @type {import("bright").BrightProps["PreComponent"]} */
function Content({ brightProps }) {
  const { subProps } = brightProps
  const propsList = subProps ? subProps : [brightProps]
  return (
    <>
      {propsList.map((props) => (
        <TabsContent key={props.title} value={props.title}>
          <Code.PreComponent brightProps={props} />
        </TabsContent>
      ))}
    </>
  )
}

export default function Page() {
  return (
    <Code
      theme="dracula"
      RootComponent={Root}
      TitleComponent={Title}
      PreComponent={Content}
      subProps={[
        { code: "console.log(1)", lang: "js", title: "foo.js" },
        { code: "print(2)", lang: "py", title: "bar.py" },
      ]}
    />
  )
}
