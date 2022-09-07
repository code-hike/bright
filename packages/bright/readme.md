**work in progress**

> the future is bright

## Usage

```
yarn add @code-hike/bright
```

Use it in your **server components**:

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
      <Code lang="js">{code}</Code>
    </div>
  );
}
```

Use any theme listed [here](https://bright.codehike.org/):

```jsx
<Code lang="js" theme="Monokai Pro">
  {code}
</Code>
```

Set the theme globally instead of using the `theme` prop:

```jsx
import { Code } from "@code-hike/bright";

Code.defaultTheme = "Slack Theme Ochin";

<Code lang="js">{code}</Code>;
```

## Credits

- Thanks [LEI Zongmin](https://github.com/leizongmin) for providing the `bright` npm package name

- Thanks [Shiki](https://github.com/shiki/shiki) and [starry-night](https://github.com/wooorm/starry-night) for the textmate grammars and how to use them with Oniguruma
