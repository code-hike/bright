import { Code } from "bright"
import { WithBackground } from "./with-background"

export function Demo({ demo, codeProps, code }) {
  return (
    <>
      <WithBackground
        blur={12}
        opacity={0.9}
        style={{
          overflow: "hidden",
          borderRadius: "4px",
          border: "1px solid #222",
          background: "#2225",
        }}
        bg={{ color: "rgba(137, 221, 255, 0.2)", "--text-color": "#ccc2" }}
        fg={{ color: "rgb(137, 221, 255)", "--text-color": "#ccc" }}
      >
        <pre
          style={{
            fontSize: "1.4em",
            lineHeight: "1.4em",
            padding: "1em",
            margin: "0",
          }}
        >
          {demo}
        </pre>
      </WithBackground>
      <Code
        theme="material-darker"
        lang="py"
        style={{
          fontSize: "1.4em",
          margin: "-1.5em auto 0",
          position: "relative",
          border: "1px solid #222",
          width: "450px",
        }}
        {...codeProps}
      >
        {code}
      </Code>
    </>
  )
}
