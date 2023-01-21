import { Code } from "bright"
import { Fira_Code } from "@next/font/google"

const font = Fira_Code({ subsets: ["latin"] })

Code.theme = "min-light"
Code.codeClassName = font.className
Code.titleClassName = font.className
Code.replace = {
  APIKEY: "sk_test_CGGvfNiIPwLXiDwaOfZ3oX6Y",
}

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components) {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    pre: (props) => {
      return (
        <Code
          lineNumbers
          codeClassName={font.className}
          titleClassName={font.className}
          {...props}
        />
      )
    },
    ...components,
  }
}
