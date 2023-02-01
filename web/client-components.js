"use client"

import { createContext, useContext, useLayoutEffect, useState } from "react"

const MyContext = createContext({ state: [{}] })

export function Wrapper({ children }) {
  const state = useState({ color: "#222222", bg: "#222222" })
  return (
    <MyContext.Provider value={{ state }}>
      <div style={{ display: "flex" }}>
        {children}
        <Demo />
      </div>
    </MyContext.Provider>
  )
}

export function Demo() {
  const { state } = useContext(MyContext)
  const [values] = state
  const { color, bg } = values
  return (
    <div
      style={{
        color,
        background: bg,
        margin: "1em",
        padding: "1em",
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Hello World
    </div>
  )
}

export function Input({ defaultValue, name }) {
  const { state } = useContext(MyContext)
  const [values, setValues] = state

  useLayoutEffect(() => {
    setValues((values) => ({ ...values, [name]: defaultValue }))
  }, [])

  return (
    <>
      <span style={{ color: "rgb(241, 250, 140)" }}>{values[name]}</span>
      <input
        value={values[name]}
        onChange={(e) =>
          setValues((values) => ({ ...values, [name]: e.target.value }))
        }
        type="color"
        style={{ padding: 0, height: "1.5em" }}
      />
    </>
  )
}
