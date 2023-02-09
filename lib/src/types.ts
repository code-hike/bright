import {
  LanguageAlias,
  Theme,
  Lines,
  Tokens,
  Annotation,
} from "@code-hike/lighter"

type HTMLProps = React.HTMLAttributes<HTMLElement>

type BrightComponent<T> = (
  props: T & { brightProps: BrightProps }
) => JSX.Element

export type BrightComponents = {
  WrapperComponent: BrightComponent<HTMLProps>
  TitleComponent: BrightComponent<HTMLProps>
  TabComponent: BrightComponent<HTMLProps>
}

type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

// TODO move to lighter
export type ThemeColors = {
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

type Extension = {
  beforeHighlight?: (props: CodeProps, annotations: Annotation[]) => CodeProps
  InlineAnnotation?: InlineAnnotationComponent
  MultilineAnnotation?: MultilineAnnotationComponent
}

export type Extensions = Record<string, Extension>

export type DoubleTheme = {
  dark: Theme
  light: Theme
}
type MdCodeText = {
  type: "code"
  props: { className: string; children: string }
}
type CodeText = string | MdCodeText

export type InputCodeProps = Prettify<
  Omit<CodeProps, "scheme" | "code" | "theme"> & {
    theme: Theme | DoubleTheme
    children: CodeText
    lang?: LanguageAlias
  }
>

// beforeHighlight
export type CodeProps = Prettify<
  {
    theme: Theme
    lang: LanguageAlias
    code: string
    scheme?: "dark" | "light"

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
  } & BrightComponents
>

// afterHighlight
export type BrightProps = Prettify<
  CodeProps & {
    colors: Prettify<ThemeColors>
    lines: Lines
    lineCount: number
  }
>
