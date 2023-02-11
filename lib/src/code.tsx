import { Theme, annotatedHighlight } from "@code-hike/lighter"
import { TitleBar } from "./title"
import { LinesComponent } from "./lines"
import { BrightProps, CodeProps } from "./types"

export async function BrightCode(props: CodeProps) {
  const brightProps = await highlight(props)
  return <WrapperRenderer {...brightProps}></WrapperRenderer>
}

async function highlight(props: CodeProps): Promise<BrightProps> {
  if (props.subProps) {
    const { subProps, ...rootProps } = props
    const newSubProps = await Promise.all(
      subProps.map((sub) => highlight({ ...rootProps, ...sub }))
    )
    return {
      ...newSubProps[0],
      ...rootProps,
      subProps: newSubProps,
    }
  }

  const { code, lang, theme, annotations } = props
  const { lines, ...colors } = await annotatedHighlight(
    code,
    lang,
    theme,
    annotations
  )

  const brightProps: BrightProps = {
    ...props,
    subProps: [],
    colors,
    lines,
    // TODO find largest line number (line numbers can be changed by extensions)
    lineCount: code.split(`\n`).length,
  }

  return brightProps
}

function WrapperRenderer(props: BrightProps) {
  const { theme, className, style, colors, scheme, title } = props
  const { foreground } = colors
  const themeName = getThemeName(theme)
  return (
    <div
      data-bright-theme={themeName}
      className={className}
      style={{
        color: foreground,
        borderRadius: "4px",
        overflow: "hidden",
        margin: "1em 0",
        colorScheme: colors.colorScheme,
        ...style,
      }}
    >
      <Style colors={colors} themeName={themeName} scheme={scheme} />
      {title && <TitleBar {...props} />}
      <Pre {...props} />
    </div>
  )
}

function Pre(props: BrightProps) {
  const { lines, codeClassName, colors } = props
  const { foreground, background } = colors
  return (
    <pre
      style={{
        margin: 0,
        color: foreground,
        background,
        padding: "1em 0",
        overflow: "auto",
      }}
    >
      <code
        className={codeClassName}
        style={{ display: "block", minWidth: "fit-content" }}
      >
        <LinesComponent lines={lines} brightProps={props} />
      </code>
    </pre>
  )
}

function Style({
  themeName,
  scheme,
  colors,
}: {
  themeName: string
  scheme: "dark" | "light" | undefined
  colors: { selectionBackground: string; lineNumberForeground: string }
}) {
  const codeSelector = `div[data-bright-theme="${themeName}"]`
  const css = `
  ${displayStyle(scheme, codeSelector)}
  ${codeSelector} ::selection {
    background-color: ${colors.selectionBackground};
  }
  ${codeSelector} .bright-ln { 
    color: ${colors.lineNumberForeground}; 
    margin-right: 1.5ch; 
    display: inline-block;
    text-align: right;
    user-select: none;
  }`
  return <style dangerouslySetInnerHTML={{ __html: css }} />
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
