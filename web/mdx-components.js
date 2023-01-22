import { Code } from "bright"
import { Fira_Code } from "@next/font/google"

const font = Fira_Code({ subsets: ["latin"] })

Code.theme = "min-light"
Code.codeClassName = font.className
Code.titleClassName = font.className
Code.replace = {
  APIKEY: "sk_test_CGGvfNiIPwLXiDwaOfZ3oX6Y",
}

export function useMDXComponents(components) {
  return { ...components, pre: Code }
}
