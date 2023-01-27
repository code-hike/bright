import { Code } from "bright"
import { Fira_Code } from "@next/font/google"

const font = Fira_Code({ subsets: ["latin"] })

Code.theme = "monokai"
Code.codeClassName = font.className
Code.titleClassName = font.className
Code.replace = {
  APIKEY: "sk_test_CGGvfNiIPwLXiDwaOfZ3oX6Y",
}

Code.extensions = {
  mark: ({ children }) => <mark style={{ bacground: "red" }}>{children}</mark>,
  collapse: ({ children }) => <details>{children}</details>,
  // title: {
  //   beforeHighlight: (props, query) => ({ ...props, title: query.title }),
  // },
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
