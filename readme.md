**work in progress**

> the future is bright

## Usage

```
yarn add @code-hike/bright
```

Use it in you **server components**:

```jsx
// my-component.server.js
import { Code } from "@code-hike/bright";

const code = `
console.log("hello");
`.trim();

export default function MyComponent() {
  return (
    <div>
      <h1>Hey</h1>
      <Code lang="js" theme="Monokai Pro">
        {code}
      </Code>
    </div>
  );
}
```
