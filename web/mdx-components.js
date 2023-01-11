import { Code } from "bright"
import { Fira_Code } from "@next/font/google"

const font = Fira_Code({ subsets: ["latin"] })

Code.theme = "dark-plus"
Code.codeClassName = font.className
Code.replace = {
  APIKEY: "sk_test_CGGvfNiIPwLXiDwaOfZ3oX6Y",
}

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components) {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    pre: (props) => {
      // this doesn't work because <code/> doesn't inherit font-family
      return (
        <Code
          // codeClassName={font.className}
          {...props}
        />
      )
    },
    ...components,
  }
}
