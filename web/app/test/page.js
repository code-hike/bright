import { Code } from "bright"

Code.theme = {
  light: "min-light",
  dark: "dracula",
  selector: (scheme) => `[data-theme="${scheme}"]`,
}

export default function Page() {
  return (
    <>
      <div data-theme="dark">
        <Code lineNumbers>console.log(12)</Code>
      </div>
      <div>
        <Code lineNumbers>console.log(12)</Code>
      </div>
      <div data-theme="light">
        <Code lineNumbers>console.log(12)</Code>
      </div>
      <div data-theme="foo">
        <Code lineNumbers>console.log(12)</Code>
      </div>
    </>
  )
}
