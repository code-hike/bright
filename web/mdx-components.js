import { Code } from "bright"
import { Fira_Code } from "@next/font/google"

const font = Fira_Code({ subsets: ["latin"] })

Code.theme = "dracula"
Code.codeClassName = font.className
Code.titleClassName = font.className
Code.replace = {
  APIKEY: "sk_test_CGGvfNiIPwLXiDwaOfZ3oX6Y",
}

Code.extensions = {
  mark: ({ children, query }) => (
    <mark style={{ background: query }}>{children}</mark>
  ),
  number: ({ children, content }) => (
    <input defaultValue={content} type="number" min={0} max={99} />
  ),
  // offset: {
  //   // change line numbers
  // },
  title: { beforeHighlight: (props, query) => ({ ...props, title: query }) },
  // twoSlash: {
  //   beforeHighlight: (props, query) => {
  //     const annotations = []
  //     const newCode = ""
  //     return {
  //       ...props,
  //       annotations: [...props.annotations, ...annotations],
  //       code: newCode,
  //     }
  //   },
  //   AnnotationComponent: ({ children, query }) => {},
  // },
}

export function useMDXComponents(components) {
  return { ...components, pre: Code }
}
