// code from: https://github.com/wooorm/starry-night

// Source: <https://github.com/microsoft/vscode-textmate/blob/9157c7f/src/metadata.ts#L33-L35>
const FONT_STYLE_MASK = 0b0000_0000_0000_0000_0111_1000_0000_0000;
const FOREGROUND_MASK = 0b0000_0000_1111_1111_1000_0000_0000_0000;
const BACKGROUND_MASK = 0b1111_1111_0000_0000_0000_0000_0000_0000;

// Source: <https://github.com/microsoft/vscode-textmate/blob/9157c7f/src/metadata.ts#L37-L42>
const FONT_STYLE_OFFSET = 11;
const FOREGROUND_OFFSET = 15;
const BACKGROUND_OFFSET = 24;

export function parse(value, grammar, colors) {
  const search = /\r?\n|\r/g;
  /** @type {StackElement|null} */
  let stack = null;
  let start = 0;

  const lines = [];

  while (start < value.length) {
    const match = search.exec(value);
    const end = match ? match.index : value.length;
    const line = [];
    lines.push(line);

    if (start !== end) {
      const { tokens, ruleStack } = grammar.tokenizeLine2(
        value.slice(start, end),
        stack
      );
      let index = 0;

      while (index < tokens.length) {
        const tokenStart = start + tokens[index++];
        const metadata = tokens[index++];
        const tokenEnd = index < tokens.length ? start + tokens[index] : end;
        // Source: <https://github.com/microsoft/vscode-textmate/blob/9157c7f/src/metadata.ts#L71-L93>
        const fg = (metadata & FOREGROUND_MASK) >>> FOREGROUND_OFFSET;
        const bg = (metadata & BACKGROUND_MASK) >>> BACKGROUND_OFFSET;
        const fs = (metadata & FONT_STYLE_MASK) >>> FONT_STYLE_OFFSET;

        const style = {
          color: colors[fg],
          // backgroundColor: colors[bg],
          ...fontStyle(fs),
        };
        line.push({ content: value.slice(tokenStart, tokenEnd), style });
      }

      stack = ruleStack;
    }

    start = end;

    if (match) {
      start += match[0].length;
    }
  }

  return lines;
}

const FontStyle = {
  NotSet: -1,
  None: 0,
  Italic: 1,
  Bold: 2,
  Underline: 4,
};

function fontStyle(fs) {
  const style = {};
  if (fs & FontStyle.Italic) {
    style["fontStyle"] = "italic";
  }
  if (fs & FontStyle.Bold) {
    style["fontWeight"] = "bold";
  }
  if (fs & FontStyle.Underline) {
    style["textDecoration"] = "underline";
  }
  return style;
}
