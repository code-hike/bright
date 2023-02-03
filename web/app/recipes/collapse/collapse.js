"use client"

import React, { useState } from "react"
import { ChevronRightIcon, ChevronDownIcon } from "@radix-ui/react-icons"

export function CollapseAnnotation({ children, query, colors }) {
  const firstLine = React.Children.toArray(children)[0]
  const [isOpen, setIsOpen] = useState(query !== "close")
  const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon
  return (
    <div style={{ position: "relative" }}>
      <button
        style={{
          position: "absolute",
          background: "transparent",
          border: 0,
          margin: 0,
          padding: 0,
          left: "0.1ch",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon
          style={{
            color: colors.lineNumberForeground,
            verticalAlign: "middle",
            display: "inline-block",
          }}
        />
      </button>
      {isOpen ? children : <div>{firstLine}</div>}
    </div>
  )
}
