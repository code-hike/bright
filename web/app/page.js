import { Code } from "bright"

export default async function Page() {
  return (
    <div>
      <div style={{ height: "5rem" }} />
      <Title />
      <div style={{ height: "4rem" }} />
      <IntroDemo />
      <div style={{ height: "5rem" }} />
      <Details />
      <div style={{ height: "3rem" }} />
      <h2 style={{ textAlign: "center" }}>Line Numbers</h2>
      <div style={{ height: "1rem" }} />
      <WithBackground
        blur={24}
        opacity={0.9}
        style={{
          overflow: "hidden",
          borderRadius: "4px",
          border: "1px solid #222",
          background: "#2222",
        }}
        bg={{ color: "rgba(137, 221, 255, 0.2)", "--text-color": "#ccc2" }}
        fg={{
          color: "rgba(137, 221, 255, 0.8)",
          "--text-color": "#ccc",
        }}
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
        lang="js"
        style={{
          fontSize: "1.4em",
          margin: "-1.6em auto 0",
          position: "relative",
          border: "1px solid #222",
          width: "450px",
        }}
        lineNumbers
      >{`let hello = "hello brightness"
console.log(hello, "my old friend")`}</Code>
      <div style={{ height: "3rem" }} />
    </div>
  )
}

function WithBackground({
  children,
  bg,
  fg,
  style,
  blur = 50,
  opacity = 0.66,
}) {
  return (
    <div style={{ position: "relative", ...style }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          filter: `blur(${blur}px)`,
          zIndex: -1,
          opacity,
          userSelect: "none",
          pointerEvents: "none",
          ...bg,
        }}
      >
        {children}
      </div>
      <div style={fg}>{children}</div>
    </div>
  )
}

function Title() {
  return (
    <WithBackground
      style={{
        fontSize: "2.8em",
        fontWeight: 800,
        color: "#ddd8",
        textAlign: "center",
        lineHeight: "1.5em",
      }}
      fg={{ color: "#ddd" }}
      blur={30}
    >
      React server component
      <br /> for{" "}
      <span style={{ color: "rgb(255, 203, 107)" }}>syntax highlighting</span>
    </WithBackground>
  )
}

function IntroDemo() {
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
          margin: "-1.6em auto 0",
          position: "relative",
          border: "1px solid #222",
          width: "450px",
        }}
      >
        print("hello brightness")
      </Code>
    </>
  )
}

function Details() {
  return (
    <WithBackground fg={{ color: "#ccc" }} bg={{ color: "#ccc2" }} blur={20}>
      <ul
        style={{
          fontSize: "1.45em",
          fontWeight: "600",
          width: "max-content",
          margin: "0 auto",
        }}
      >
        <li>
          <span>Runs on the server. </span>
          <span style={{ color: "rgb(195, 232, 141)" }}>
            No impact on bundle-size.
          </span>
        </li>
        <li>
          <span style={{ color: "rgb(255, 203, 107)" }}>No extra configs.</span>
          <span> Install it, import it, and use it.</span>
        </li>
        <li>
          <span>VS Code's syntax highlighting. </span>
          <span style={{ color: "#fb7fec" }}>All the themes.</span>
        </li>
      </ul>
    </WithBackground>
  )
}

const demo = (
  <code>
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
    <span>
      <span style={{ color: "rgb(240, 113, 120)" }}>{"    "}</span>
      <span style={{}}>&lt;</span>
      <span style={{ color: "rgb(255, 203, 107)" }}>Code</span>
      <span style={{}}> </span>
      <span style={{ color: "rgb(199, 146, 234)" }}>lang</span>
      <span style={{}}>=</span>
      <span style={{}}>"</span>
      <span style={{ color: "rgb(195, 232, 141)" }}>py</span>
      <span style={{}}>"</span>
      <span style={{}}>&gt;</span>
      <span style={{ color: "var(--text-color)" }}>
        print("hello brightness")
      </span>
      <span style={{}}>&lt;/</span>
      <span style={{ color: "rgb(255, 203, 107)" }}>Code</span>
      <span style={{}}>&gt;</span>
      <br />
    </span>
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
