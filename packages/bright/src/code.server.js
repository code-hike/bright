import React, { Suspense } from "react";
import { createRegistry, toTokens } from "./highlighter.js";

Code.defaultTheme = "Dracula Soft";
Code.api = "https://bright.codehike.org/api";

const themePromises = {};
const themeCache = {};
let registryPromise = null;
let registry = null;

function highlight(code, lang, label) {
  const promises = [];
  if (!registryPromise) {
    registryPromise = createRegistry()
      .then((r) => (registry = { data: r }))
      .catch((e) => (registry = { error: e + "" }));
  }
  if (!registry) {
    promises.push(registryPromise);
  }
  if (!themePromises[label]) {
    themePromises[label] = fetch(`${Code.api}/theme?label=${label}`)
      .then((r) => {
        // console.log("fetched", `${Code.api}/theme?label=${label}`);
        return r.json();
      })
      .then(
        (theme) =>
          (themeCache[label] = {
            data: theme,
            error: theme ? undefined : `Theme ${label} not found`,
          })
      )
      .catch((e) => (themeCache[label] = { error: e + "" }));
  }
  if (!themeCache[label]) {
    promises.push(themePromises[label]);
  }

  if (promises.length) {
    throw Promise.all(promises);
  }

  const error = registry.error || themeCache[label].error;
  if (error) {
    return { error };
  }

  const theme = themeCache[label].data;

  const lines = toTokens(code, lang, theme, registry.data);
  return {
    data: {
      fg: theme.fg,
      bg: theme.bg,
      lines,
    },
  };
}

function InnerCode({ children, lang, theme }) {
  const result = highlight(children, lang, theme);

  if (result.error) {
    return <pre>{result.error}</pre>;
  }

  const { lines, fg, bg } = result.data;

  return (
    <pre style={{ background: bg, color: fg }}>
      <code>
        {lines.map((line, lineIndex) => (
          <span key={lineIndex}>
            {line.map((token, tokenIndex) => (
              <span style={token.style} key={tokenIndex}>
                {token.content}
              </span>
            ))}
            <br />
          </span>
        ))}
      </code>
    </pre>
  );
}
function Code(props) {
  return (
    <Suspense fallback={"Loading..."}>
      <InnerCode {...props} theme={props.theme || Code.defaultTheme} />
    </Suspense>
  );
}

export { Code };
