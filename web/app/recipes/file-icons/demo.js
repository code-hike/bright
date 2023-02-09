import { Code } from "bright"
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

const myCode = `
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit;
  dolor = sit - amet(dolor);
  return dolor;
}
`.trim()

/** @type {import("bright").BrightProps["TabComponent"]} */
function TabWithIcon({ brightProps, ...props }) {
  const { title } = brightProps

  const { svg, color } = getIcon(title)
  const __html = svg.replace(/svg/, `svg fill='${color}'`)

  return (
    <Code.TabComponent brightProps={brightProps} {...props}>
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
    </Code.TabComponent>
  )
}

export default function Page() {
  return (
    <>
      <Code
        lang="js"
        theme="github-light"
        title="lorem.js"
        TabComponent={TabWithIcon}
      >
        {myCode}
      </Code>
      <Code lang="js" title="ipsum.py" TabComponent={TabWithIcon}>
        {myCode}
      </Code>
      <Code lang="js" title="package.json" TabComponent={TabWithIcon}>
        {myCode}
      </Code>
    </>
  )
}
