import {
  LanguageAlias,
  Theme,
  Lines,
  Tokens,
  Annotation,
  ThemeColors,
} from "@code-hike/lighter"
import brightComponents from "./components"
import type { ReactNode } from "react"

type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type BrightComponents = Prettify<typeof brightComponents>

type InlineAnnotationProps = {
  children: React.ReactNode
  query?: string
  tokens: Tokens
  brightProps: BrightProps
}
type InlineAnnotationComponent = (props: InlineAnnotationProps) => JSX.Element

type MultilineAnnotationProps = {
  children: React.ReactNode
  query?: string
  lines: Lines
  brightProps: BrightProps
}
type MultilineAnnotationComponent = (
  props: MultilineAnnotationProps
) => JSX.Element

export type Extension = Prettify<
  {
    name: string
    beforeRoot?: (props: CodeProps, annotations: Annotation[]) => CodeProps
    beforeHighlight?: (
      props: CodeProps,
      annotations: Annotation[]
    ) => CodeProps | undefined
    InlineAnnotation?: InlineAnnotationComponent
    MultilineAnnotation?: MultilineAnnotationComponent
  } & Partial<BrightComponents>
>

export type Extensions = Extension[]

export type DoubleTheme = {
  lightSelector?: string
  dark: Theme
  light: Theme
}
type MdCodeText = {
  type: "code"
  props: { className?: string; children: string }
}

type MdMultiCodeText = {
  type: Function
  props: {
    children: MdCodeText[]
  }
}
export type CodeText = string | MdCodeText | MdMultiCodeText

export type InputCodeProps = Prettify<
  Omit<Partial<CodeProps>, "mode" | "code" | "theme"> & {
    theme?: Theme | DoubleTheme
    children?: ReactNode
    lang?: LanguageAlias
    code?: string
  }
>

// beforeHighlight
export type CodeProps = Prettify<
  {
    theme: Theme
    lang: LanguageAlias
    code: string
    mode?: "dark" | "light"
    lightThemeSelector?: string

    // atttributes
    style?: React.CSSProperties
    className?: string
    codeClassName?: string
    titleClassName?: string

    // settings
    lineNumbers?: boolean
    title?: string

    // extensions
    extensions: Extensions
    annotations: Annotation[]

    subProps?: Partial<Omit<CodeProps, "subProps">>[]
  } & BrightComponents
>

// afterHighlight
export type BrightProps = Prettify<
  Omit<CodeProps, "subProps"> & {
    colors: Prettify<ThemeColors>
    lines: Lines
    lineCount: number

    subProps?: Partial<Omit<BrightProps, "subProps">>[]
  }
>
