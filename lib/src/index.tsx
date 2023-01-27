import React from "react"
import { Theme, LanguageAlias } from "@code-hike/lighter"
import { Code as InnerCode, CodeText } from "./code"

type DoubleTheme = {
  dark: Theme
  light: Theme
  selector?: (scheme: "dark" | "light") => string
}

type BrightTheme = Theme | DoubleTheme

type CodeProps = {
  lang: LanguageAlias
  children: CodeText
  style?: React.CSSProperties
  className?: string
  codeClassName?: string
  titleClassName?: string
  lineNumbers?: boolean
  unstyled?: boolean
  theme?: BrightTheme
  title?: string
}

type CodeComponent = ((props: CodeProps) => Promise<JSX.Element>) &
  Partial<CodeProps>

export const Code: CodeComponent = async (componentProps) => {
  const {
    children,
    lang,
    style,
    className,
    codeClassName,
    titleClassName,
    lineNumbers,
    unstyled,
    title,
    theme,
  } = { ...componentProps, ...Code }

  const finalTheme = theme || Code.theme
  if (finalTheme && (finalTheme as any).dark && (finalTheme as any).light) {
    const doubleTheme = finalTheme as DoubleTheme
    const darkTheme = doubleTheme.dark
    const lightTheme = doubleTheme.light
    return (
      <>
        {/* @ts-expect-error Server Component */}
        <InnerCode
          code={children}
          lang={lang || "js"}
          style={style}
          className={className}
          codeClassName={codeClassName}
          titleClassName={titleClassName}
          lineNumbers={lineNumbers}
          unstyled={unstyled}
          theme={darkTheme}
          scheme="dark"
          title={title}
        />
        {/* @ts-expect-error Server Component */}
        <InnerCode
          code={children}
          lang={lang || "js"}
          style={style}
          className={className}
          codeClassName={codeClassName}
          titleClassName={titleClassName}
          lineNumbers={lineNumbers}
          unstyled={unstyled}
          theme={lightTheme}
          scheme="light"
          title={title}
        />
      </>
    )
  }
  return (
    /* @ts-expect-error Server Component */
    <InnerCode
      code={children}
      lang={lang || "js"}
      style={style}
      className={className}
      codeClassName={codeClassName}
      titleClassName={titleClassName}
      lineNumbers={lineNumbers}
      unstyled={unstyled}
      theme={finalTheme}
      title={title}
    />
  )
}
