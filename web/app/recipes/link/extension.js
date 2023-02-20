/** @type {import("bright").Extension} */
export const link = {
  name: "link",
  InlineAnnotation: ({ children, query }) => (
    <a href={query} style={{ textDecoration: "underline" }}>
      {children}
    </a>
  ),
}
