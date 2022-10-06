import Head from "next/head"
import React, { useState } from "react"

export async function getStaticProps() {
  const { labels } = require("../data/themes.json")
  return {
    props: {
      labels: labels.map((x) => x.label),
    },
  }
}
export default function Page({ labels }) {
  const {
    code,
    lang,
    theme,
    changeCode,
    changeLang,
    changeTheme,
    preview,
    tokens,
    css,
  } = useThings()
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <Head>
        <title>Code to styled tokens</title>
      </Head>
      <h1 style={{ textAlign: "center" }}>Convert code to styled tokens</h1>
      <div style={{ display: "flex", gap: "2em", marginBottom: "2em" }}>
        <div
          style={{ display: "flex", flexFlow: "column", flex: 1, gap: "1em" }}
        >
          Choose the language:
          <input value={lang} onChange={(e) => changeLang(e.target.value)} />
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
          <select onChange={(e) => changeTheme(e.target.value)} value={theme}>
            {labels.map((label) => (
              <option key={label}>{label}</option>
            ))}
          </select>
          This is how it looks:
          {preview}
        </div>
      </div>
      <hr />
      <div style={{ display: "flex", gap: "2em", marginBottom: "2em" }}>
        <div
          style={{ display: "flex", flexFlow: "column", flex: 1, gap: "1em" }}
        >
          Here is your array, have fun:
          <textarea
            readOnly
            value={JSON.stringify(tokens, null, 1)}
            rows={10}
          ></textarea>
        </div>
        <div
          style={{ display: "flex", flexFlow: "column", flex: 1, gap: "1em" }}
        >
          Oh, you may want to style your {`<pre>`} to:
          <textarea readOnly rows={10} value={css}></textarea>
        </div>
      </div>
    </div>
  )
}

const defaultCode = `
let x = {
  foo: 2
}`.trim()

function useThings() {
  const [code, setCode] = useState(defaultCode)
  const [lang, setLang] = useState("js")
  const [theme, setTheme] = useState("GitHub Dark")
  const [result, setResult] = useState({ lines: [] })
  const [loading, setLoading] = useState(false)

  function reload(code, lang, theme) {
    setLoading(true)
    fetchTokens(code, lang, theme)
      .then((result) => {
        setLoading(false)
        setResult(result)
      })
      .catch((err) => {
        console.log("error", err)
        setLoading(false)
      })
  }

  React.useEffect(() => {
    reload(code, lang, theme)
  }, [])

  return {
    code,
    lang,
    theme,
    preview: <Code result={result} />,
    loading,
    changeCode: (code) => {
      setCode(code)
      reload(code, lang, theme)
    },
    changeLang: (lang) => {
      setLang(lang)
      reload(code, lang, theme)
    },
    changeTheme: (theme) => {
      setTheme(theme)
      reload(code, lang, theme)
    },
    tokens: result.lines,
    css: `pre {
  background: ${result.background};
  color: ${result.color};
}`,
  }
}

function Code({ result }) {
  return (
    <pre
      style={{
        background: result.background,
        color: result.color,
        flex: 1,
        margin: 0,
        padding: 8,
        maxHeight: 246,
        maxWidth: 434,
        boxSizing: "border-box",
        overflow: "auto",
      }}
    >
      <code>
        {result.lines.map((line, lix) => (
          <React.Fragment key={lix}>
            {line.map((token, tix) => (
              <span style={token.style} key={tix}>
                {token.content}
              </span>
            ))}
            <br />
          </React.Fragment>
        ))}
      </code>
    </pre>
  )
}

function fetchTokens(code, lang, theme) {
  return fetch(
    `/api/tokens?code=${encodeURIComponent(code)}&lang=${lang}&theme=${theme}`
  ).then((res) => {
    if (res.ok) {
      return res.json()
    }
    throw new Error("Error fetching tokens")
  })
}
