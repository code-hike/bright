import {
  LanguageAlias,
  Theme,
  Lines,
  Tokens,
  Annotation,
  ThemeColors,
} from "@code-hike/lighter"

type HTMLProps = React.HTMLAttributes<HTMLElement>

type BrightComponent<T> = (
  props: T & { brightProps: BrightProps }
) => JSX.Element

export type BrightComponents = {
  RootComponent: BrightComponent<HTMLProps>
  PreComponent: BrightComponent<{}>
  TitleComponent: BrightComponent<HTMLProps>
  TabComponent: BrightComponent<HTMLProps>
}

type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

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
  beforeRoot?: (props: CodeProps, annotations: Annotation[]) => CodeProps
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
