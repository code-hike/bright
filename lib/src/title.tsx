import React from "react"
import { BrightProps } from "./types"

export function TitleBar(props: BrightProps) {
  const { activeTabForeground, editorGroupHeaderBackground, tabsBorder } =
    props.colors
  const { TitleBarContent } = props
  const elementProps = {
    className: props.titleClassName,
    style: {
      background: editorGroupHeaderBackground,
      color: activeTabForeground,
      position: "relative" as const,
      display: "flex",
    },
  }
  return (
    <div {...elementProps}>
      <TitleBarContent {...props} />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          pointerEvents: "none",
          background: tabsBorder,
          height: 1,
          zIndex: 9,
        }}
      />
    </div>
  )
}

export function TitleBarContent(props: BrightProps) {
  return <Tab {...props} />
}

export function Tab(props: BrightProps) {
  const { TabContent } = props

  return (
    <div
      data-bright-tab={props.title}
      style={{
        cursor: "pointer",
        background: "var(--tab-background)",
        color: "var(--tab-color)",
        display: "inline-block",
        padding: "0.5em 1em",
        position: "relative" as const,
        // fontSize: "0.8em",
        fontFamily:
          "Segoe WPC,Segoe UI,-apple-system,BlinkMacSystemFont,sans-serif",
        fontSize: "13px",

        borderRight: "1px solid var(--tab-border)",
      }}
    >
      <TabContent {...props} />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: 1,
          zIndex: 10,
          background: "var(--tab-top-border)",
          width: "100%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 1,
          zIndex: 10,
          background: "var(--tab-bottom-border)",
          width: "100%",
        }}
      />
    </div>
  )
}

export function TabContent(props: BrightProps) {
  return <>{props.title}</>
}
