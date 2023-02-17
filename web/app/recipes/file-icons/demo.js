import { Code } from "bright"
import { themeIcons } from "seti-icons"

// colors from https://github.com/microsoft/vscode/blob/main/extensions/theme-seti/icons/vs-seti-icon-theme.json
const getDarkIcon = themeIcons({
  blue: "#519aba",
  grey: "#4d5a5e",
  "grey-light": "#6d8086",
  green: "#8dc149",
  orange: "#e37933",
  pink: "#f55385",
  purple: "#a074c4",
  red: "#cc3e44",
  white: "#d4d7d6",
  yellow: "#cbcb41",
  ignore: "#41535b",
})

const getLightIcon = themeIcons({
  blue: "#498ba7",
  grey: "#455155",
  "grey-light": "#627379",
  green: "#7fae42",
  orange: "#cc6d2e",
  pink: "#dd4b78",
  purple: "#9068b0",
  red: "#b8383d",
  white: "#bfc2c1",
  yellow: "#b7b73b",
  ignore: "#3b4b52",
})

const myCode = `
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit;
  dolor = sit - amet(dolor);
  return dolor;
}
`.trim()

/** @type {import("bright").BrightProps["TabContent"]} */
function MyTab(props) {
  const { title, colors } = props

  const { svg, color } =
    colors.colorScheme === "dark" ? getDarkIcon(title) : getLightIcon(title)
  const __html = svg.replace(/svg/, `svg fill='${color}'`)
  return (
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
  )
}

export default function Page() {
  return (
    <>
      <Code lang="js" theme="github-light" title="lorem.js" TabContent={MyTab}>
        {myCode}
      </Code>
      <Code lang="js" title="ipsum.py" TabContent={MyTab}>
        {myCode}
      </Code>
      <Code lang="js" title="package.json" TabContent={MyTab}>
        {myCode}
      </Code>
    </>
  )
}
