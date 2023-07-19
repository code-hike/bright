import {
  extractAnnotations,
  LANG_NAMES,
  LanguageAlias,
} from "@code-hike/lighter"
import components from "./components"
import { BrightCode } from "./code"
import {
  CodeProps,
  DoubleTheme,
  InputCodeProps,
  BrightComponents,
  BrightProps,
  Extension,
  CodeText,
} from "./types"
import { linesToContent } from "./lines"
import { tokensToContent, tokensToTokenList } from "./tokens"
import React, { FunctionComponent } from "react"
import "server-only"

type CodeComponent = ((props: InputCodeProps) => Promise<JSX.Element>) &
  Partial<InputCodeProps> &
  FunctionComponent<InputCodeProps> // this is a lie, until we have typescript 5.1

const Code = (async (componentProps) => {
  // merge props and global props
  const { children, lang, ...rest } = {
    ...Code,
    ...componentProps,
    // TODO concat extensions and annotations
  }

  // parse code, lang, subProps maybe from markdown
  const propsFromChildren = parseChildren(children as CodeText, lang, rest.code)

  // split code and annotations
  let props = { ...rest, ...propsFromChildren }

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
      <AnnotatedCode
        {...props}
        theme={darkTheme}
        mode="dark"
        lightThemeSelector={doubleTheme.lightSelector}
      />
      {/* @ts-expect-error Server Component */}
      <AnnotatedCode
        {...props}
        theme={lightTheme}
        mode="light"
        lightThemeSelector={doubleTheme.lightSelector}
      />
    </>
  )
}) as CodeComponent

async function AnnotatedCode(props: CodeProps) {
  let newProps = await extractAnnotationsFromCode(props)
  newProps = runExtensionsBeforeHighlight(newProps)

  /* @ts-expect-error Server Component */
  return <BrightCode {...newProps} />
}

Code.theme = "dark-plus"
Code.extensions = []
Object.assign(Code, components)

export { Code, tokensToContent, tokensToTokenList, linesToContent }

export type { BrightProps, BrightComponents, Extension }

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

  const extensionNames = extensions.map((e) => {
    if (!e || !e.name) {
      throw new Error("Extension must have a name")
    }
    return e.name
  })
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
  let newProps = props
  const { extensions, annotations = [] } = props

  extensions.forEach((extension) => {
    const { Pre, Root, TitleBarContent, Tab, TabContent } = extension
    newProps = {
      ...newProps,
      Pre: Pre || newProps.Pre,
      Root: Root || newProps.Root,
      TitleBarContent: TitleBarContent || newProps.TitleBarContent,
      Tab: Tab || newProps.Tab,
      TabContent: TabContent || newProps.TabContent,
    }
  })

  if (props.subProps) {
    extensions.forEach((extension) => {
      const { name } = extension
      if (
        "beforeRoot" in extension &&
        typeof extension.beforeRoot === "function"
      ) {
        const extensionAnnotations = annotations.filter(
          (annotation) => annotation.name === name
        )
        newProps =
          extension.beforeRoot(newProps, extensionAnnotations) || newProps
      }
    })

    const { subProps, ...rootProps } = newProps
    return {
      ...rootProps,
      subProps: (subProps || []).map((sub) =>
        runExtensionsBeforeHighlight({ ...rootProps, ...sub })
      ),
    }
  }

  extensions.forEach((extension) => {
    const { name } = extension
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

function trimTrailingNewlines(code: string | null): string | undefined {
  return code?.replace(/\n+$/, "") ?? undefined
}

function parseChildren(
  children: CodeText,
  lang?: LanguageAlias,
  code?: string
): Partial<BrightProps> {
  if (typeof children === "object" && children?.type === "code") {
    return {
      code: trimTrailingNewlines(children.props?.children),
      ...getLanguageAndTitle(children.props?.className),
    }
  } else if (typeof children === "object") {
    const subProps = React.Children.toArray(children as any).map((c: any) => {
      const codeProps = c.props?.children?.props
      return {
        code: trimTrailingNewlines(codeProps.children),
        ...getLanguageAndTitle(codeProps.className),
      }
    })
    return {
      subProps,
    }
  } else {
    let newLang = lang || "text"
    if (!LANG_NAMES.includes(newLang)) {
      console.warn(`Bright warning: Unknown language ${JSON.stringify(lang)}`)
      newLang = "text"
    }
    return {
      code: (children as string) || code || "",
      lang: newLang,
    }
  }
}

function getLanguageAndTitle(className: string | undefined) {
  if (!className) {
    return { lang: "text" }
  }
  const metastring = className.replace("language-", "")
  const lang = metastring.split(".").pop()!

  if (!LANG_NAMES.includes(lang)) {
    console.warn(
      `Bright warning: Unknown language ${JSON.stringify(
        lang
      )} in ${JSON.stringify(metastring)}`
    )

    return { lang: "text" }
  }

  if (lang !== metastring) {
    return { lang, title: metastring }
  }
  return { lang }
}
