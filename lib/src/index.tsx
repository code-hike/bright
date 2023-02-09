import { extractAnnotations, LanguageAlias } from "@code-hike/lighter"
import components from "./components"
import { BrightCode } from "./code"
import {
  CodeProps,
  DoubleTheme,
  InputCodeProps,
  BrightComponents,
  BrightProps,
} from "./types"
import { linesToContent } from "./lines"
import { tokensToContent, tokensToTokenList } from "./tokens"

type CodeComponent = ((props: InputCodeProps) => Promise<JSX.Element>) &
  Partial<InputCodeProps>

const Code: CodeComponent = async (componentProps) => {
  // merge props and global props
  const { theme, children, lang, extensions, ...rest } = {
    ...Code,
    ...componentProps,
  }

  // parse code and lang maybe from markdown
  const { code: text, language } = parseChildren(children, lang)

  // split code and annotations
  const extensionNames = Object.keys(extensions)
  const { code, annotations } = await extractAnnotations(
    text,
    language,
    extensionNames
  )

  const inputAnnotations = rest.annotations || []

  const props = {
    ...rest,
    code,
    lang: language,
    extensions,
    annotations: inputAnnotations.concat(annotations),
  }

  const isDouble =
    (theme && (theme as any).dark && (theme as any).light) || false
  if (!isDouble) {
    /* @ts-expect-error Server Component */
    return <AnnotatedCode {...props} theme={theme} />
  }

  // handle double themes
  const doubleTheme = theme as DoubleTheme
  const darkTheme = doubleTheme.dark
  const lightTheme = doubleTheme.light
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <AnnotatedCode {...props} theme={darkTheme} scheme="dark" />
      {/* @ts-expect-error Server Component */}
      <AnnotatedCode {...props} theme={lightTheme} scheme="light" />
    </>
  )
}

async function AnnotatedCode(props: CodeProps) {
  // run beforeHighlight for each extension
  const { annotations, extensions } = props
  const extensionNames = Object.keys(extensions)
  let newProps = props
  extensionNames.forEach((name) => {
    const extension = extensions[name]
    if (
      "beforeHighlight" in extension &&
      typeof extension.beforeHighlight === "function"
    ) {
      const extensionAnnotations = annotations.filter(
        (annotation) => annotation.name === name
      )
      newProps =
        extension.beforeHighlight(newProps, extensionAnnotations) || newProps
    }
  })

  /* @ts-expect-error Server Component */
  return <BrightCode {...newProps} />
}

Code.theme = "dark-plus"
Code.extensions = {}
Object.assign(Code, components)

export { Code, tokensToContent, tokensToTokenList, linesToContent }

export type { BrightProps, BrightComponents }

function parseChildren(
  children: InputCodeProps["children"],
  lang: LanguageAlias
): { code: string; language: LanguageAlias } {
  if (typeof children === "object") {
    return {
      code: children.props?.children,
      language: children.props?.className.replace(
        "language-",
        ""
      ) as LanguageAlias,
    }
  } else {
    return {
      code: children,
      language: lang,
    }
  }
}
