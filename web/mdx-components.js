import { Code } from "bright"

Code.theme = "dracula"

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components) {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    pre: (props) => {
      console.log(props)
      return <Code {...props} />
    },
    ...components,
  }
}
