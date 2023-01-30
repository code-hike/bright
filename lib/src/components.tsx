type TitleBarProps = {
  colors: {
    activeTabBackground: string
    activeTabBorder: string
    activeTabForeground: string
    editorGroupHeaderBackground: string
  }
  title: string
  titleClassName?: string
}
export function TitleBar({ colors, title, titleClassName }: TitleBarProps) {
  const {
    activeTabBackground,
    activeTabBorder,
    activeTabForeground,
    editorGroupHeaderBackground,
  } = colors
  return (
    <div
      className={titleClassName}
      style={{
        background: editorGroupHeaderBackground,
        color: activeTabForeground,
      }}
    >
      <code
        style={{
          background: activeTabBackground,
          color: activeTabForeground,
          borderBottom: `1px solid ${activeTabBorder}`,
          display: "inline-block",
          padding: "0.5em 1em",
          fontSize: "0.8em",
        }}
      >
        {title}
      </code>
    </div>
  )
}
