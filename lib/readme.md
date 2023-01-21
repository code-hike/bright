**work in progress**

> the future is bright

## Usage

```bash
npm install bright
```

Use it from a **server component**, for example in Next.js `app/page.js`:

```js
import { Code } from "bright"

export default function Page() {
  return <Code lang="py">print("hello brightness")</Code>
}
```

## Credits

- Thanks [LEI Zongmin](https://github.com/leizongmin) for providing the bright npm package name

---

```jsx
import { Code } from "bright"

const myCode = `
let hello = "hello brightness"
console.log(hello, "my old friend")
`.trim()

export default function Page() {
  return (
    <Code lang="js" lineNumbers>
      {myCode}
    </Code>
  )
}
```

---

```jsx
import { Code } from "bright"

const myCode = `
let hello = "hello brightness"
console.log(hello, "my old friend")
`.trim()

// you can set any prop globally
Code.lineNumbers = true

export default function Page() {
  return <Code lang="js">{myCode}</Code>
}
```

---

```jsx
import { Code } from "bright"

// there are some built in themes
// typescript should autocomplete this
Code.theme = "github-dark"

export default function Page() {
  return <Code lang="py">print("hello brightness")</Code>
}
```
