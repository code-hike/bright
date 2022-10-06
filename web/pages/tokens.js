import Head from "next/head"
import { useState } from "react"

export async function getStaticProps() {
  const { labels } = require("../data/themes.json")
  return {
    props: {
      labels: labels.map((x) => x.label),
    },
  }
}
export default function Page({ labels }) {
  const { code, changeCode, preview, tokens, css } = useThings()
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <Head>
        <title>Code to styled tokens</title>
      </Head>
      <h1>Convert code to styled tokens</h1>
      <div style={{ display: "flex", gap: "2em", marginBottom: "2em" }}>
        <div
          style={{ display: "flex", flexFlow: "column", flex: 1, gap: "1em" }}
        >
          Choose the language:
          <input value="js" />
          Paste your code here:
          <textarea
            rows={16}
            value={code}
            onChange={(e) => changeCode(e.target.value)}
          />
        </div>
        <div
          style={{ display: "flex", flexFlow: "column", flex: 1, gap: "1em" }}
        >
          Pick a theme:
          <select>
            {labels.map((label) => (
              <option key={label}>{label}</option>
            ))}
          </select>
          This is how it looks:
          {preview}
        </div>
      </div>
      <hr />
      Here is your array, have fun:
      <textarea readonly value={JSON.stringify(tokens, null, 1)}></textarea>
      Oh, you may want to style your {`<pre>`} to:
      <textarea readonly>{css}</textarea>
    </div>
  )
}

const defaultCode = `
let x = {
  foo: 2
}`.trim()

function useThings() {
  const [code, setCode] = useState(defaultCode)

  return {
    code: code,
    lang: "js",
    theme: "default",
    preview: (
      <pre
        style={{
          background: "#222",
          color: "#fafafa",
          flex: 1,
          margin: 0,
          padding: 8,
          maxHeight: 246,
          maxWidth: 434,
          boxSizing: "border-box",
          overflow: "auto",
        }}
      >
        <code>{code}</code>
      </pre>
    ),
    loading: false,
    changeCode: setCode,
    changeLang: () => {},
    chamgeTheme: () => {},
    tokens: [],
    css: "pre {}",
  }
}
