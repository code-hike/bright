import { Code } from "./code"

const myCode = `
console.log(1)

// this too
console.log(2)
console.log(3)

// this too
console.log(2)
console.log(3)

// this too
console.log(2)
console.log(3)
`.trim()

export default function Page() {
  return (
    <main style={{ maxWidth: 600, margin: "auto" }}>
      <h1>Hello, Next.js!</h1>
      <Code lang="js" style={{ lineHeight: "1.2em", fontSize: 16 }} lineNumbers>
        {myCode}
      </Code>
      One line
      <Code lang="js" style={{ lineHeight: "1.2em", fontSize: 16 }} lineNumbers>
        console.log(2)
      </Code>
      No numbers
      <Code lang="js" style={{ lineHeight: "1.2em", fontSize: 16 }}>
        {myCode}
      </Code>
    </main>
  )
}
