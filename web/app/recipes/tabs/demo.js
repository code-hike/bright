import { Code } from "bright"
import { TabsRoot, TabsContent, TabsList } from "./tabs"

import { themeIcons } from "seti-icons"
const getIcon = themeIcons({
  blue: "#268bd2",
  grey: "#657b83",
  "grey-light": "#839496",
  green: "#859900",
  orange: "#cb4b16",
  pink: "#d33682",
  purple: "#6c71c4",
  red: "#dc322f",
  white: "#fdf6e3",
  yellow: "#b58900",
  ignore: "#586e75",
})

/** @type {import("bright").BrightProps["TabComponent"]} */
function TabWithIcon({ brightProps, ...props }) {
  const { title } = brightProps

  const { svg, color } = getIcon(title)
  const __html = svg.replace(/svg/, `svg fill='${color}'`)

  return (
    <code {...props}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "1.5em",
          marginLeft: -8,
        }}
      >
        <span
          dangerouslySetInnerHTML={{ __html }}
          style={{
            display: "inline-block",
            height: "2em",
            width: "2em",
            margin: "-0.5em 0",
          }}
        />
        {title}
      </div>
    </code>
  )
}

/** @type {import("bright").BrightProps["RootComponent"]} */
function Root({ brightProps, ...props }) {
  const { subProps, title } = brightProps
  const titles = subProps ? subProps.map((subProp) => subProp.title) : [title]
  return (
    <TabsRoot defaultValue={titles[0]}>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '.my-tab[data-state="inactive"]{ background: rgb(38, 38, 38) !important}',
        }}
      />
      <Code.RootComponent {...props} brightProps={brightProps} />
    </TabsRoot>
  )
}

/** @type {import("bright").BrightProps["TitleComponent"]} */
function Title({ brightProps, ...props }) {
  const { subProps, title } = brightProps
  const titles = subProps ? subProps.map((subProp) => subProp.title) : [title]

  // todo reuse
  const { activeTabBackground, activeTabBorder, activeTabForeground } =
    brightProps.colors

  // todo more colors https://github.com/code-hike/codehike/blob/71d5ea2d5a354a65d99e22a4d6fe35eb6b29526d/packages/mdx/src/mini-editor/editor-frame.tsx#L175
  const inactiveTabBackground = "red"
  const inactiveTabForeground = "blue"
  const tabBorder = "green"

  const elementProps = {
    className: "my-tab",
    style: {
      background: activeTabBackground,
      color: activeTabForeground,
      borderBottom: `1px solid ${activeTabBorder}`,
      display: "inline-block",
      padding: "0.5em 1em",
      fontSize: "0.8em",
    },
  }

  const childProps = subProps ? subProps : [brightProps]

  return (
    <Code.TitleComponent {...props} brightProps={brightProps}>
      <TabsList titles={titles}>
        {titles.map((title, i) => (
          <TabWithIcon
            key={title}
            {...elementProps}
            children={title}
            brightProps={childProps[i]}
          />
        ))}
      </TabsList>
    </Code.TitleComponent>
  )
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
