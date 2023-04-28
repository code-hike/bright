import { Theme, annotatedHighlight } from "@code-hike/lighter"
import { TitleBar } from "./title"
import { LinesComponent } from "./lines"
import { BrightProps, CodeProps } from "./types"

export async function BrightCode(props: CodeProps) {
  const brightProps = await highlight(props)
  const { Root } = brightProps
  return <Root {...brightProps} />
}

async function highlight(props: CodeProps): Promise<BrightProps> {
  if (props.subProps) {
    const { subProps, ...rootProps } = props
    const newSubProps = await Promise.all(
      subProps.map((sub) => highlight({ ...rootProps, ...sub }))
    )
    return {
      ...rootProps,
      ...newSubProps[0],
      subProps: newSubProps,
    }
  }

  const { code, lang, theme, annotations } = props
  const { lines, colors } = await annotatedHighlight(
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

export function Root(props: BrightProps) {
  const { theme, className, style, colors, mode, title, Pre } = props
  const { foreground } = colors
  const themeName = getThemeName(theme)
  return (
    <div
      data-bright-theme={themeName}
      data-bright-mode={mode}
      className={className}
      style={{
        color: foreground,
        borderRadius: "4px",
        overflow: "hidden",
        margin: "1em 0",
        ["--selection-background" as any]: colors.selectionBackground,
        ["--line-number-color" as any]: colors.lineNumberForeground,
        ["--tab-border" as any]: colors.tabBorder,
        ["--tab-background" as any]: colors.activeTabBackground,
        ["--tab-color" as any]: colors.activeTabForeground,
        ["--inactive-tab-background" as any]: colors.inactiveTabBackground,
        ["--inactive-tab-color" as any]: colors.inactiveTabForeground,
        ["--tab-top-border" as any]: colors.activeTabTopBorder,
        ["--tab-bottom-border" as any]: colors.activeTabBorder,
        colorScheme: colors.colorScheme,
        ...style,
      }}
    >
      <Style
        mode={mode}
        lineNumbers={props.lineNumbers}
        lightThemeSelector={props.lightThemeSelector}
      />
      {title && <TitleBar {...props} />}
      <Pre {...props} />
    </div>
  )
}

export function Pre(brightProps: BrightProps) {
  const { lines, codeClassName, colors } = brightProps
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
        <LinesComponent lines={lines} brightProps={brightProps} />
      </code>
    </pre>
  )
}

function Style({
  mode,
  lineNumbers,
  lightThemeSelector,
}: {
  mode: "dark" | "light" | undefined
  lineNumbers?: boolean
  lightThemeSelector?: string
}) {
  const lineNumbersStyle = `[data-bright-theme] [data-bright-ln] { 
    color: var(--line-number-color); 
    margin-right: 1.5ch; 
    display: inline-block;
    text-align: right;
    user-select: none;
  }`

  const css = `${displayStyle(mode, lightThemeSelector)}
  [data-bright-theme] ::selection { background-color: var(--selection-background) }
  ${lineNumbers ? lineNumbersStyle : ""}
  `
  return <style dangerouslySetInnerHTML={{ __html: css }} />
}

function displayStyle(
  mode: "dark" | "light" | undefined,
  lightThemeSelector: string = '[data-theme="light"]'
) {
  if (!mode) return ""

  if (mode === "dark")
    return `[data-bright-mode="dark"] { display: block }
${lightThemeSelector} [data-bright-mode="dark"] { display: none }`

  if (mode === "light")
    return `[data-bright-mode="light"] { display: none }
${lightThemeSelector} [data-bright-mode="light"] { display: block }`

  return ""
}

function getThemeName(theme?: Theme) {
  if (!theme) return "default"
  if (typeof theme === "string") return theme
  return (theme as any).name
}
