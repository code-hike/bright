import React, { Suspense } from "react";
import { toTokens } from "./bright";

Code.defaultTheme = "Dracula Soft";
Code.api = "https://bright.codehike.org/api";

async function highlight(code, lang, label) {
  const themeResponse = await fetch(`${Code.api}/theme?label=${label}`);
  const theme = await themeResponse.json();
  const lines = await toTokens(code, lang, theme);

  return {
    fg: theme.fg,
    bg: theme.bg,
    lines,
  };
}

function InnerCode({ children, lang, theme }) {
  const result = useData(`code-${children}-${lang}-${theme}`, () =>
    highlight(children, lang, theme)
  );

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

const cache = {};
function useData(key, fetcher) {
  if (!cache[key]) {
    let data;
    let error;
    let promise;
    cache[key] = () => {
      if (error !== undefined || data !== undefined) return { data, error };
      if (!promise) {
        promise = fetcher()
          .then((r) => (data = r))
          // Convert all errors to plain string for serialization
          .catch((e) => (error = e + ""));
      }
      throw promise;
    };
  }
  return cache[key]();
}
