import React from "react"
import { Theme, LanguageAlias } from "@code-hike/lighter"
import { Code as InnerCode, CodeText, InnerCodeProps } from "./code"

type DoubleTheme = {
  dark: Theme
  light: Theme
}

type CodeProps = InnerCodeProps & {
  theme?: Theme | DoubleTheme
}

type CodeComponent = ((props: CodeProps) => Promise<JSX.Element>) &
  Partial<CodeProps>

const Code: CodeComponent = async (componentProps) => {
  const { theme, ...props } = { ...Code, ...componentProps }

  const finalTheme = theme || Code.theme
  if (finalTheme && (finalTheme as any).dark && (finalTheme as any).light) {
    const doubleTheme = finalTheme as DoubleTheme
    const darkTheme = doubleTheme.dark
    const lightTheme = doubleTheme.light
    return (
      <>
        {/* @ts-expect-error Server Component */}
        <InnerCode {...props} theme={darkTheme} scheme="dark" />
        {/* @ts-expect-error Server Component */}
        <InnerCode {...props} theme={lightTheme} scheme="light" />
      </>
    )
  }
  return (
    /* @ts-expect-error Server Component */
    <InnerCode {...props} theme={finalTheme} />
  )
}

Code.extensions = {}

export { Code }
