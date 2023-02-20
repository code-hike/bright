"use client"

import * as Tabs from "@radix-ui/react-tabs"
import React from "react"

export function TabsRoot({ children, defaultValue }) {
  return (
    <Tabs.Root defaultValue={defaultValue}>
      {children}
    </Tabs.Root>
  )
}

export function TabsList({ titles, children }) {
  const tabs = React.Children.toArray(children)
  return (
    <Tabs.List style={{ display: "flex" }}>
      {titles.map((title, i) => (
        <Tabs.Trigger asChild key={title} value={title}>
          {tabs[i]}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
  )
}

export function TabsContent(props) {
  return <Tabs.Content {...props} />
}
