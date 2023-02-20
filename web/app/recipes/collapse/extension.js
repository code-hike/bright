import { CollapseAnnotation } from "./collapse"

/** @type {import("bright").Extension} */
export const collapse = {
  name: "collapse",
  MultilineAnnotation: ({ children, query, brightProps }) => (
    <CollapseAnnotation
      children={children}
      query={query}
      color={brightProps.colors.lineNumberForeground}
    />
  ),
}
