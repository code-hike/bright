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
  const { children, lang, ...rest } = {
    ...Code,
    ...componentProps,
  }

  // parse code and lang maybe from markdown
  const { code: text, language } = parseChildren(children, lang)

  // split code and annotations
  let props = { ...rest, code: text, lang: language }

  const { theme } = props

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
  let newProps = await extractAnnotationsFromCode(props)
  newProps = runExtensionsBeforeHighlight(newProps)

  /* @ts-expect-error Server Component */
  return <BrightCode {...newProps} />
}

Code.theme = "dark-plus"
Code.extensions = {}
Object.assign(Code, components)

export { Code, tokensToContent, tokensToTokenList, linesToContent }

export type { BrightProps, BrightComponents }

async function extractAnnotationsFromCode(
  props: CodeProps
): Promise<CodeProps> {
  if (props.subProps) {
    const { subProps, ...rootProps } = props
    return {
      ...rootProps,
      subProps: await Promise.all(
        subProps.map((sub) =>
          extractAnnotationsFromCode({ ...rootProps, ...sub })
        )
      ),
    }
  }

  const { extensions, code, lang } = props

  const extensionNames = Object.keys(extensions)
  const { code: newCode, annotations } = await extractAnnotations(
    code,
    lang,
    extensionNames
  )

  const inputAnnotations = props.annotations || []

  const newProps = {
    ...props,
    code: newCode,
    annotations: inputAnnotations.concat(annotations),
  }
  return newProps
}

function runExtensionsBeforeHighlight(props: CodeProps): CodeProps {
  if (props.subProps) {
    const { subProps, ...rootProps } = props
    return {
      ...rootProps,
      subProps: subProps.map((sub) =>
        runExtensionsBeforeHighlight({ ...rootProps, ...sub })
      ),
    }
  }

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
  return newProps
}

function parseChildren(
  children: InputCodeProps["children"],
  lang: LanguageAlias
): { code: string; language: LanguageAlias } {
  if (typeof children === "object") {
    return {
      code: children.props?.children?.trim(),
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
