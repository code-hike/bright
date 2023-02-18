import { Code } from "bright"

/** @type {import("bright").BrightProps["TitleBarContent"]} */
function Title(props) {
  const { title, colors } = props
  const { foreground, background } = colors

  const circle = {
    borderRadius: "100%",
    height: "0.8em",
    width: "0.8em",
    background: foreground,
    opacity: 0.2,
  }

  return (
    <div
      style={{
        background,
        color: foreground,
        padding: "3px 0",
        fontSize: "0.9em",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div style={{ gap: 4, display: "flex", marginLeft: 8 }}>
        <div style={circle} />
        <div style={circle} />
        <div style={circle} />
      </div>
      <span style={{ opacity: 0.8 }}>{title}</span>
      <div style={{ width: 45 }} />
    </div>
  )
}

const myCode = `
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit;
  dolor = sit - amet(dolor);
  return dolor;
}
`.trim()

export default function Page() {
  return (
    <Code lang="js" title="Lorem Ipsum" TitleBarContent={Title} theme="dracula">
      {myCode}
    </Code>
  )
}
