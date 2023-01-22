import { CodeLine, demo, Demo } from "./demo"
import { SocialLinks } from "./icons"
import { WithBackground } from "./with-background"

export default async function Page() {
  return (
    <div>
      <div style={{ height: "5rem" }} />
      <Title />

      <div style={{ height: "4rem" }} />
      <Demo
        demo={demo({
          codeLine: (
            <CodeLine
              props={
                <>
                  <span style={{ color: "rgb(199, 146, 234)" }}>lang</span>
                  <span style={{}}>=</span>
                  <span style={{}}>"</span>
                  <span style={{ color: "rgb(195, 232, 141)" }}>py</span>
                  <span style={{}}>"</span>
                </>
              }
              children={
                <span style={{ color: "var(--text-color)" }}>
                  print("hello brightness")
                </span>
              }
            />
          ),
        })}
        code='print("hello brightness")'
      />
      <div style={{ height: "3rem" }} />
      <Details />

      <div style={{ height: "3rem" }} />
      <h2 style={{ textAlign: "center" }}>Line Numbers</h2>
      <div style={{ height: "1rem" }} />
      <Demo
        demo={demo({
          focus: true,
          middle: (
            <>
              <span>const myCode = `</span>
              <br />
              <span style={{ color: "var(--text-color)" }}>
                let hello = "hello brightness"
              </span>
              <br />
              <span style={{ color: "var(--text-color)" }}>
                console.log(hello, "my old friend")
              </span>
              <br />
              <span>`.trim()</span>
              <br />
              <br />
            </>
          ),
          codeLine: (
            <CodeLine
              mark
              children={<span style={{}}>{`{myCode}`}</span>}
              props={
                <>
                  <span style={{ color: "rgb(199, 146, 234)" }}>lang</span>
                  <span>="</span>
                  <span style={{ color: "rgb(195, 232, 141)" }}>js</span>
                  <span>" </span>
                  <span style={{ color: "rgb(199, 146, 234)" }}>
                    lineNumbers
                  </span>
                </>
              }
            />
          ),
        })}
        code={`let hello = "hello brightness"
console.log(hello, "my old friend")`}
        codeProps={{ lineNumbers: true, lang: "js" }}
      />

      <div style={{ height: "3rem" }} />
      <h2 style={{ textAlign: "center" }}>Global Props</h2>
      <div style={{ height: "1rem" }} />
      <Demo
        demo={demo({
          focus: true,
          middle: (
            <>
              <span>const myCode = `</span>
              <br />
              <span style={{ color: "var(--text-color)" }}>
                let hello = "hello brightness"
              </span>
              <br />
              <span style={{ color: "var(--text-color)" }}>
                console.log(hello, "my old friend")
              </span>
              <br />
              <span>`.trim()</span>
              <br />
              <br />
              <span style={{ color: "rgb(195, 232, 141)", filter: "unset" }}>
                // set any prop globally
              </span>
              <br />
              <span style={{ filter: "unset" }}>
                <span style={{ color: "rgb(255, 203, 107)" }}>Code</span>.
                <span style={{ color: "rgb(199, 146, 234)" }}>lineNumbers</span>{" "}
                = true
              </span>
              <br />
              <br />
            </>
          ),
          codeLine: (
            <CodeLine
              children={<span style={{}}>{`{myCode}`}</span>}
              props={
                <>
                  <span style={{ color: "rgb(199, 146, 234)" }}>lang</span>
                  <span>="</span>
                  <span style={{ color: "rgb(195, 232, 141)" }}>js</span>
                  <span>" </span>
                  <span style={{ color: "rgb(199, 146, 234)" }}>
                    lineNumbers
                  </span>
                </>
              }
            />
          ),
        })}
        code={`let hello = "hello brightness"
console.log(hello, "my old friend")`}
        codeProps={{ lineNumbers: true, lang: "js" }}
      />

      <div style={{ height: "3rem" }} />
      <h2 style={{ textAlign: "center" }}>Theme</h2>
      <div style={{ height: "1rem" }} />
      <Demo
        demo={demo({
          focus: true,
          middle: (
            <>
              <span>const myCode = `</span>
              <br />
              <span style={{ color: "var(--text-color)" }}>
                theFuture, bright = 10, 10
                <br />
                print(theFuture is bright)
              </span>
              <br />
              <span>`.trim()</span>
              <br />
              <br />
              <span style={{ color: "rgb(195, 232, 141)", filter: "unset" }}>
                // there are several themes built in
                <br />
                // typescript should autocomplete the options
              </span>
              <br />
              <span style={{ filter: "unset" }}>
                <span style={{ color: "rgb(255, 203, 107)" }}>Code</span>.
                <span style={{ color: "rgb(199, 146, 234)" }}>theme</span> = "
                <span style={{ color: "rgb(195, 232, 141)" }}>
                  github-light
                </span>
                "
              </span>
              <br />
              <br />
            </>
          ),
          codeLine: (
            <CodeLine
              props={
                <>
                  <span style={{ color: "rgb(199, 146, 234)" }}>lang</span>
                  <span>="</span>
                  <span style={{ color: "rgb(195, 232, 141)" }}>py</span>
                  <span>"</span>
                </>
              }
              children={<span style={{}}>{`{myCode}`}</span>}
            />
          ),
        })}
        code={`theFuture, bright = 10, 10
print(theFuture is bright)`}
        codeProps={{ lang: "py", theme: "github-light" }}
      />

      <div style={{ height: "3rem" }} />
      <h2 style={{ textAlign: "center" }}>Dark Mode</h2>

      <div style={{ height: "3rem" }} />
      <h2 style={{ textAlign: "center" }}>Custom Theme</h2>

      <div style={{ height: "3rem" }} />
      <h2 style={{ textAlign: "center" }}>Styles</h2>

      <div style={{ height: "3rem" }} />
      <h2 style={{ textAlign: "center" }}>Markdown / MDX</h2>

      <div style={{ height: "3rem" }} />
      <h2 style={{ textAlign: "center" }}>Annotations</h2>

      <div style={{ height: "3rem" }} />
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
      <div style={{ height: "2rem" }} />
      <SocialLinks />
    </WithBackground>
  )
}
