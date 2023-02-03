import {
  LanguageAlias,
  Theme,
  annotatedHighlight,
  Lines,
  Line,
  LineGroup,
  Tokens,
  Annotation,
  Token,
} from "@code-hike/lighter"
import React from "react"
import { TitleBar } from "./components"

// TODO move to lighter
type ThemeColors = {
  background: string
  foreground: string
  lineNumberForeground: string
  selectionBackground: string
  editorBackground: string
  editorGroupHeaderBackground: string
  activeTabBackground: string
  activeTabForeground: string
  tabBorder: string
  activeTabBorder: string
  colorScheme: "dark" | "light"
}

type InlineAnnotationProps = {
  children: React.ReactNode
  tokens: Token[]
  query?: string
  content?: string
  colors: ThemeColors
}
type InlineAnnotationComponent = (props: InlineAnnotationProps) => JSX.Element

type MultilineAnnotationProps = {
  children: React.ReactNode
  query?: string
  content?: string
  colors: ThemeColors
}
type MultilineAnnotationComponent = (
  props: MultilineAnnotationProps
) => JSX.Element

type Extension = {
  beforeHighlight?: (
    props: FinalCodeProps,
    annotations: Annotation[]
  ) => FinalCodeProps
  InlineAnnotation?: InlineAnnotationComponent
  MultilineAnnotation?: MultilineAnnotationComponent
}
type Extensions = Record<string, Extension>

export type FinalCodeProps = {
  code: string
  lang: LanguageAlias
  style?: React.CSSProperties
  className?: string
  codeClassName?: string
  titleClassName?: string
  lineNumbers?: boolean
  title?: string
  theme?: Theme
  scheme?: "dark" | "light"
  extensions: Extensions
  annotations: Annotation[]
}

export async function FinalCode(props: FinalCodeProps) {
  const {
    code,
    lang,
    extensions,
    style,
    className,
    titleClassName,
    codeClassName,
    lineNumbers,
    title,
    theme,
    scheme,
    annotations,
  } = props

  let filename = title

  const { lines, ...colors } = await annotatedHighlight(
    code,
    lang || "js",
    theme,
    annotations
  )

  const { foreground, background } = colors

  const lineCount = code.split(`\n`).length
  // TODO find largest line number (line numbers can be changed by extensions)
  const digits = lineNumbers ? lineCount.toString().length : 0

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
      {filename && (
        <TitleBar
          colors={colors}
          title={filename}
          titleClassName={titleClassName}
        />
      )}
      <pre
        style={{
          margin: 0,
          color: foreground,
          background,
          padding: "1em 0",
          overflow: "auto",
        }}
      >
        <Style colors={colors} themeName={themeName} scheme={scheme} />
        <code
          className={codeClassName}
          style={{ display: "block", minWidth: "fit-content" }}
        >
          <LinesComponent
            lines={lines}
            digits={digits}
            extensions={extensions}
            colors={colors}
          />
        </code>
      </pre>
    </div>
  )
}

function LinesComponent({
  lines,
  digits,
  extensions,
  colors,
}: {
  lines: Lines
  digits: number
  extensions: Extensions
  colors: ThemeColors
}) {
  return (
    <>
      {lines.map((line, i) => {
        if ("lineNumber" in line) {
          return (
            <LineComponent
              key={i}
              line={line}
              digits={digits}
              extensions={extensions}
              colors={colors}
            />
          )
        } else if (extensions[line.annotationName]?.MultilineAnnotation) {
          const extension = extensions[line.annotationName]
          const Wrapper = extension.MultilineAnnotation!
          return (
            <Wrapper
              key={i}
              colors={colors}
              query={line.annotationQuery}
              content={getLinesContent(line.lines)}
            >
              <LinesComponent
                lines={line.lines}
                digits={digits}
                extensions={extensions}
                colors={colors}
              />
            </Wrapper>
          )
        } else {
          return (
            <LinesComponent
              key={i}
              lines={line.lines}
              digits={digits}
              extensions={extensions}
              colors={colors}
            />
          )
        }
      })}
    </>
  )
}

function LineComponent({
  line,
  digits,
  extensions,
  colors,
}: {
  line: Line
  digits: number
  extensions: Extensions
  colors: ThemeColors
}) {
  return (
    <div style={{ padding: "0 1em" }}>
      <span>
        {digits > 0 && (
          <span className="bright-ln" style={{ width: `${digits}ch` }}>
            {line.lineNumber}
          </span>
        )}
        <TokensComponent
          tokens={line.tokens}
          extensions={extensions}
          colors={colors}
        />
        <br />
      </span>
    </div>
  )
}

function TokensComponent({
  tokens,
  extensions,
  colors,
}: {
  tokens: Tokens
  extensions: Extensions
  colors: ThemeColors
}) {
  return (
    <>
      {tokens.map((token, i) => {
        if ("content" in token) {
          return (
            <span key={i} style={token.style}>
              {token.content}
            </span>
          )
        } else if (extensions[token.annotationName]?.InlineAnnotation) {
          const extension = extensions[token.annotationName]
          const Wrapper = extension?.InlineAnnotation!
          // console.log("Wrapper", token.tokens)
          return (
            <Wrapper
              key={i}
              query={token.annotationQuery}
              tokens={getTokens(token.tokens)}
              content={getContent(token.tokens)}
              colors={colors}
            >
              <TokensComponent
                tokens={token.tokens}
                extensions={extensions}
                colors={colors}
              />
            </Wrapper>
          )
        } else {
          return (
            <TokensComponent
              key={i}
              tokens={token.tokens}
              extensions={extensions}
              colors={colors}
            />
          )
        }
      })}
    </>
  )
}

function getTokens(tokens: Tokens): Token[] {
  return tokens
    .map((token) => {
      if ("content" in token) {
        return token
      } else {
        return getTokens(token.tokens)
      }
    })
    .flat()
}

function getContent(tokens: Tokens): string {
  return tokens
    .map((token) => {
      if ("content" in token) {
        return token.content
      } else {
        return getContent(token.tokens)
      }
    })
    .join("")
}

function getLinesContent(lines: Lines): string {
  return lines
    .map((line) => {
      if ("lineNumber" in line) {
        return getContent(line.tokens)
      } else {
        return getLinesContent(line.lines)
      }
    })
    .join("\n")
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
