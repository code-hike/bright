import React from "react"
import { BrightProps } from "./types"

export function TitleBar(props: BrightProps) {
  const { activeTabForeground, editorGroupHeaderBackground } = props.colors
  const { TitleComponent } = props
  const elementProps = {
    className: props.titleClassName,
    style: {
      background: editorGroupHeaderBackground,
      color: activeTabForeground,
    },
    children: <Tab {...props} />,
  }
  return <TitleComponent {...elementProps} brightProps={props} />
}

export function Tab(props: BrightProps) {
  const { activeTabBackground, activeTabBorder, activeTabForeground } =
    props.colors

  const { TabComponent } = props

  const elementProps = {
    style: {
      background: activeTabBackground,
      color: activeTabForeground,
      borderBottom: `1px solid ${activeTabBorder}`,
      display: "inline-block",
      padding: "0.5em 1em",
      fontSize: "0.8em",
    },
    children: props.title,
  }
  return <TabComponent {...elementProps} brightProps={props} />
}

export function TabComponent({
  elementProps,
  brightProps,
}: {
  elementProps: React.HTMLAttributes<HTMLElement>
  brightProps: BrightProps
}) {
  return <TabRenderer {...elementProps} />
}

export function TabRenderer(props: React.HTMLAttributes<HTMLElement>) {
  return <code {...props} />
}
