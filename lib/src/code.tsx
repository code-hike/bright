import { highlight, Lang, Theme } from "@code-hike/lighter"

export async function Code({
  code,
  lang,
  style,
  className,
  lineNumbers,
  unstyled,
  theme,
  scheme,
}: {
  code: string
  lang: Lang
  style?: React.CSSProperties
  className?: string
  lineNumbers?: boolean
  unstyled?: boolean
  theme?: Theme
  scheme?: "dark" | "light"
}) {
  const {
    lines,
    foreground,
    background,
    colorScheme,
    selectionBackground,
    lineNumberForeground,
  } = await highlight(code, lang, theme)

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
  const codeSelector = `pre[data-bright-theme="${themeName}"]`
  const css = `
  ${displayStyle(scheme, codeSelector)}
  ${codeSelector} ::selection {
    background-color: ${selectionBackground};
  }
  ${codeSelector} .bright-ln { 
    color: ${lineNumberForeground}; 
    padding-right: 2ch; 
    display: inline-block;
    text-align: right;
    user-select: none;
  }`

  return (
    <pre
      className={className}
      data-bright-theme={themeName}
      style={{
        color: foreground,
        background,
        padding: "1em",
        borderRadius: "4px",
        colorScheme,
        ...style,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <code>{kids}</code>
    </pre>
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