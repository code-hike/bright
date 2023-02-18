import { Code } from "bright"
import { TabsRoot, TabsContent, TabsList } from "./tabs"

/** @type {import("bright").BrightProps["TitleBarContent"]} */
function TitleBarComponent(brightProps) {
  const { subProps, title, Tab } = brightProps
  const titles = subProps?.length
    ? subProps.map((subProp) => subProp.title)
    : [title]
  const childProps = subProps?.length ? subProps : [brightProps]
  return (
    <TabsList titles={titles}>
      {titles.map((title, i) => (
        <Tab key={title} {...childProps[i]} />
      ))}
    </TabsList>
  )
}

/** @type {import("bright").BrightProps["Root"]} */
function Root(brightProps) {
  const { subProps, title } = brightProps

  const titles = subProps?.length
    ? subProps.map((subProp) => subProp.title)
    : [title]

  return (
    <TabsRoot defaultValue={titles[0]}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
[data-bright-tab][data-state="inactive"]{ 
  --tab-background: var(--inactive-tab-background);
  --tab-color: var(--inactive-tab-color);; 
  --tab-bottom-border: transparent;
  --tab-top-border: transparent;
}`,
        }}
      />
      <Code.Root {...brightProps} />
    </TabsRoot>
  )
}

/** @type {import("bright").BrightProps["Pre"]} */
function Content(brightProps) {
  const { subProps } = brightProps
  const propsList = subProps?.length ? subProps : [brightProps]
  return (
    <>
      {propsList.map((props) => (
        <TabsContent key={props.title} value={props.title}>
          <Code.Pre {...props} />
        </TabsContent>
      ))}
    </>
  )
}

const tabs = {
  name: "tabs",
  Root,
  TitleBarContent: TitleBarComponent,
  Pre: Content,
}

export default function Page() {
  const props = {
    extensions: [tabs],
    subProps: [
      { code: "console.log(1)", lang: "js", title: "foo.js" },
      { code: "print(2)", lang: "py", title: "bar.py" },
      { code: "print(3)", lang: "py", title: "readme.graphql" },
    ],
  }
  return (
    <>
      <Code {...props} theme="dark-plus" />
      <Code {...props} theme="dracula" />
      <Code {...props} theme="github-dark" />
      Github Light
      <Code {...props} theme="github-light" />
      <Code {...props} theme="light-plus" />
      <Code {...props} theme="material-darker" />
      <Code {...props} theme="material-default" />
      <Code {...props} theme="material-lighter" />
      <Code
        title="foo.js"
        extensions={[tabs]}
        lang="js"
        code="console.log(1)"
        theme="material-lighter"
      />
    </>
  )
}
