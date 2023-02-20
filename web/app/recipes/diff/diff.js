import React from "react"
import { Code } from "bright"
import { diff } from "./extension"

export function Diff({ children }) {
  return (
    <Code
      lineNumbers
      extensions={[diff]}
      children={children}
    />
  )
}
