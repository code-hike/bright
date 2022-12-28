declare module "@code-hike/lighter" {
  export type Theme =
    | "dark-plus"
    | "dracula"
    | "github-dark"
    | "github-light"
    | "light-plus"
    | "material-darker"
    | "material-default"
    | "material-lighter"
    | "material-ocean"
    | "material-palenight"
    | "min-dark"
    | "min-light"
    | "monokai"
    | "nord"
    | "one-dark-pro"
    | "poimandres"
    | "slack-dark"
    | "slack-ochin"
    | "solarized-dark"
    | "solarized-light"

  type Token = { style: React.CSSProperties; content: string }
  function highlight(
    code: string,
    lang: string,
    theme: Theme
  ): Promise<{
    lines: Token[][]
    foreground: string
    background: string
    colorScheme: string
    selectionBackground: string
    lineNumberForeground: string
  }>

  export { highlight }
}
