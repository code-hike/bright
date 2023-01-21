export function WithBackground({
  children,
  bg,
  fg,
  style,
  blur = 50,
  opacity = 0.66,
}) {
  return (
    <div style={{ position: "relative", ...style }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          filter: `blur(${blur}px)`,
          zIndex: -1,
          opacity,
          userSelect: "none",
          pointerEvents: "none",
          ...bg,
        }}
      >
        {children}
      </div>
      <div style={fg}>{children}</div>
    </div>
  )
}
