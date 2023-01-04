import React from "react"
import { Theme, Lang } from "@code-hike/lighter"
import { Code as InnerCode } from "./code"

type DoubleTheme = {
  dark: Theme
  light: Theme
  selector?: (scheme: "dark" | "light") => string
}

type BrightTheme = Theme | DoubleTheme

type CodeProps = {
  lang: Lang
  children: string
  style?: React.CSSProperties
  className?: string
  lineNumbers?: boolean
  unstyled?: boolean
  theme?: BrightTheme
}

type CodeComponent = ((props: CodeProps) => Promise<JSX.Element>) & {
  theme?: BrightTheme
}

export const Code: CodeComponent = async ({
  children,
  lang,
  style,
  className,
  lineNumbers,
  unstyled,
  theme,
}) => {
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
          lineNumbers={lineNumbers}
          unstyled={unstyled}
          theme={darkTheme}
          scheme="dark"
        />
        {/* @ts-expect-error Server Component */}
        <InnerCode
          code={children}
          lang={lang || "js"}
          style={style}
          className={className}
          lineNumbers={lineNumbers}
          unstyled={unstyled}
          theme={lightTheme}
          scheme="light"
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
      lineNumbers={lineNumbers}
      unstyled={unstyled}
      theme={finalTheme}
    />
  )
}
