import { SocialLinks } from "./icons"
import { WithBackground } from "./with-background"
import CodeDemo from "./demos/code"
import TitleDemo from "./demos/title"
import LineNumbersDemo from "./demos/line-numbers"
import GlobalPropsDemo from "./demos/global-props"
import ThemeDemo from "./demos/theme"
import DarkModeDemo from "./demos/dark-mode"
import CustomThemeDemo from "./demos/custom-theme"
import MarkdownDemo from "./demos/markdown"
import TitlesInMarkdownDemo from "./demos/titles-in-markdown"
import ExtensionsDemo from "./demos/customization"

export default async function Page() {
  return (
    <main>
      <div style={{ height: "5rem" }} />
      <Title />
      <div style={{ height: "4rem" }} />
      <CodeDemo />
      <div style={{ height: "3rem" }} />
      <Details />
      <div style={{ height: "3rem" }} />
      <CodeHike />
      <div style={{ height: "3rem" }} />
      <h2 style={{ textAlign: "center" }}>Title</h2>
      <TitleDemo />
      <div style={{ height: "3rem" }} />
      <h2 style={{ textAlign: "center" }}>Line Numbers</h2>
      <LineNumbersDemo />
      <div style={{ height: "3rem" }} />
      <h2 style={{ textAlign: "center" }}>Global Props</h2>
      <GlobalPropsDemo />
      <div style={{ height: "3rem" }} />
      <h2 style={{ textAlign: "center" }}>Theme</h2>
      <ThemeDemo />
      <div style={{ height: "3rem" }} />
      <h2 style={{ textAlign: "center" }}>Dark Mode</h2>
      <DarkModeDemo />
      <div style={{ height: "3rem" }} />
      <h2 style={{ textAlign: "center" }}>Custom Theme</h2>
      <CustomThemeDemo />
      <div style={{ height: "3rem" }} />
      <h2 style={{ textAlign: "center" }}>Markdown / MDX</h2>
      <MarkdownDemo />
      <div style={{ height: "3rem" }} />
      <h2 style={{ textAlign: "center" }}>Titles in Markdown</h2>
      <TitlesInMarkdownDemo />
      <div style={{ height: "3rem" }} />
      <h2 style={{ textAlign: "center" }}>Customization</h2>
      <ExtensionsDemo />
      <div style={{ height: "50vh" }} />
    </main>
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

function CodeHike() {
  return (
    <a href="https://codehike.org" target="_blank" rel="noreferrer noopener">
      <WithBackground
        fg={{ color: "#ccc" }}
        bg={{ color: "#fb7fec99" }}
        blur={20}
        style={{
          fontSize: "1.45em",
          fontWeight: "600",
          lineHeight: "1.5em",
          width: "100%",
          margin: "0 auto",
          border: "1px solid #fb7fec88",
          padding: "1rem",
          borderRadius: "0.5rem",
          textAlign: "center",
        }}
      >
        If you want to build{" "}
        <span style={{ color: "rgb(255, 203, 107)" }}>
          rich content websites
        </span>{" "}
        <br />
        with more than just syntax highlighting:
        <br />
        <span style={{ color: "#fb7fec" }}>
          try <span style={{ textDecoration: "underline" }}>Code Hike</span>
        </span>
      </WithBackground>
    </a>
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
        <li>
          <span style={{ color: "rgb(137, 221, 255)" }}>Super flexible.</span>
          <span>Extend it as much as you want.</span>
        </li>
      </ul>
      <div style={{ height: "2rem" }} />
      <SocialLinks />
    </WithBackground>
  )
}
