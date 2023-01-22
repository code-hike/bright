import { Code } from "bright"
import { WithBackground } from "./with-background"

export function Demo({ demo, codeProps, code, preview }) {
  return (
    <>
      <WithBackground
        blur={12}
        opacity={0.9}
        style={{
          overflow: "hidden",
          borderRadius: "4px",
          border: "1px solid #444",
          background: "#2225",
        }}
        bg={{ color: "rgba(137, 221, 255, 0.2)", "--text-color": "#ccc2" }}
        fg={{ color: "rgb(137, 221, 255)", "--text-color": "#ccc" }}
      >
        <pre
          className="demo-pre"
          style={{
            fontSize: "1.15rem",
            lineHeight: "1.5rem",
            padding: "1rem",
            margin: "0",
          }}
        >
          {demo}
        </pre>
      </WithBackground>
      {preview || (
        <Code
          theme="material-darker"
          lang="py"
          style={{
            fontSize: "1.2rem",
            margin: "-2rem auto 0",
            position: "relative",
            border: "1px solid #444",
            width: "80%",
          }}
          {...codeProps}
        >
          {code}
        </Code>
      )}
    </>
  )
}

export function CodeLine({ props, children, mark }) {
  return (
    <span style={{ filter: mark ? "unset" : undefined }}>
      <span style={{ color: "rgb(240, 113, 120)" }}>{"    "}</span>
      <span style={{}}>&lt;</span>
      <span style={{ color: "rgb(255, 203, 107)" }}>Code</span>
      <span style={{}}> </span>
      {props}
      <span style={{}}>&gt;</span>
      {children}
      <span style={{}}>&lt;/</span>
      <span style={{ color: "rgb(255, 203, 107)" }}>Code</span>
      <span style={{}}>&gt;</span>
      <br />
    </span>
  )
}

export function demo({ middle, codeLine, focus }) {
  return (
    <code className={`${focus ? "focused" : ""}`}>
      <span>
        <span style={{ fontStyle: "italic" }}>import</span>
        <span style={{ color: "rgb(238, 255, 255)" }}> </span>
        <span style={{}}>{"{"}</span>
        <span style={{ color: "rgb(240, 113, 120)" }}> </span>
        <span style={{ color: "rgb(255, 203, 107)" }}>Code</span>
        <span style={{ color: "rgb(240, 113, 120)" }}> </span>
        <span style={{}}>{"}"}</span>
        <span style={{ color: "rgb(238, 255, 255)" }}> </span>
        <span style={{ fontStyle: "italic" }}>from</span>
        <span style={{ color: "rgb(238, 255, 255)" }}> </span>
        <span style={{}}>"</span>
        <span style={{ color: "rgb(195, 232, 141)" }}>bright</span>
        <span style={{}}>"</span>
        <br />
      </span>
      <span>
        <span style={{ color: "rgb(238, 255, 255)" }} />
        <br />
      </span>
      {middle}
      <span>
        <span style={{ fontStyle: "italic" }}>export</span>
        <span style={{ color: "rgb(238, 255, 255)" }}> </span>
        <span style={{ fontStyle: "italic" }}>default</span>
        <span style={{}}> </span>
        <span style={{}}>function</span>
        <span style={{}}> </span>
        <span style={{}}>Page</span>
        <span style={{}}>()</span>
        <span style={{}}> </span>
        <span style={{}}>{"{"}</span>
        <br />
      </span>
      <span>
        <span style={{}}>{"  "}</span>
        <span style={{ fontStyle: "italic" }}>return</span>
        <span style={{}}> (</span>
        <br />
      </span>
      {codeLine}
      <span>
        <span style={{}}>{"  "})</span>
        <br />
      </span>
      <span>
        <span style={{}}>{"}"}</span>
        <br />
      </span>
    </code>
  )
}
