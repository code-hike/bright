import { highlight, LanguageAlias, Theme } from "@code-hike/lighter"

// children when it comes from the Markdown pre element
type MdCodeText = {
  type: "code"
  props: { className: string; children: string }
}
export type CodeText = string | MdCodeText

export async function Code({
  code,
  lang,
  style,
  className,
  titleClassName,
  codeClassName,
  lineNumbers,
  unstyled,
  title,
  theme,
  scheme,
}: {
  code: CodeText
  lang: LanguageAlias
  style?: React.CSSProperties
  className?: string
  codeClassName?: string
  titleClassName?: string
  lineNumbers?: boolean
  unstyled?: boolean
  title?: string
  theme?: Theme
  scheme?: "dark" | "light"
}) {
  let language = lang
  let text: string
  if (typeof code === "object") {
    text = code.props?.children
    language = code.props?.className.replace("language-", "") as LanguageAlias
  } else {
    text = code
  }

  let filename = title
  if (text.startsWith("// filename ")) {
    // get first line
    const [firstLine, ...rest] = text.split("\n")
    // remove filename
    text = rest.join("\n")
    // get filename
    filename = firstLine.replace("// filename ", "")
  }

  const {
    lines,
    foreground,
    background,
    colorScheme,
    selectionBackground,
    lineNumberForeground,
    activeTabBackground,
    activeTabBorder,
    activeTabForeground,
    editorGroupHeaderBackground,
  } = await highlight(text.trim(), language, theme)

  const lineCount = lines.length
  const digits = lineCount.toString().length

  const kids = lines.map((tokens, i) => {
    return (
      <span key={i}>
        {lineNumbers && (
          <span className="bright-ln" style={{ width: `${digits}ch` }}>
            {i + 1}
          </span>
        )}
        {tokens.map((t, j) => (
          <span key={j} style={t.style}>
            {t.content}
          </span>
        ))}
        <br />
      </span>
    )
  })

  const themeName = getThemeName(theme)
  const codeSelector = `div[data-bright-theme="${themeName}"]`
  const css = `
  ${displayStyle(scheme, codeSelector)}
  ${codeSelector} ::selection {
    background-color: ${selectionBackground};
  }
  ${codeSelector} .bright-ln { 
    color: ${lineNumberForeground}; 
    margin-right: 1.5ch; 
    display: inline-block;
    text-align: right;
    user-select: none;
  }`

  return (
    <div
      data-bright-theme={themeName}
      className={className}
      style={{
        color: foreground,
        borderRadius: "4px",
        overflow: "hidden",
        margin: "1em 0",
        colorScheme,
        ...style,
      }}
    >
      {filename && (
        <div
          className={titleClassName}
          style={{
            background: editorGroupHeaderBackground,
            color: activeTabForeground,
          }}
        >
          <span
            style={{
              background: activeTabBackground,
              color: activeTabForeground,
              borderBottom: `1px solid ${activeTabBorder}`,
              display: "inline-block",
              padding: "0.5em 1em",
              fontSize: "0.8em",
            }}
          >
            {filename}
          </span>
        </div>
      )}
      <pre
        style={{
          margin: 0,
          color: foreground,
          background,
          padding: "1em",
          overflow: "auto",
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <code className={codeClassName}>{kids}</code>
      </pre>
    </div>
  )
}

function displayStyle(
  scheme: "dark" | "light" | undefined,
  codeSelector: string
) {
  if (scheme === "dark") {
    return `${codeSelector} {
      display: block;
    }
    [data-theme="light"] ${codeSelector}  {
      display: none;
    }`
  }
  if (scheme === "light") {
    return `${codeSelector} {
      display: none;
    }
    [data-theme="light"] ${codeSelector} {
      display: block;
    }`
  }
  return ""
}
function getThemeName(theme?: Theme) {
  if (!theme) return "default"
  if (typeof theme === "string") return theme
  return (theme as any).name
}
