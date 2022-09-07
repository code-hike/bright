import { Registry } from "vscode-textmate";
import grammars from "./all-grammars.js";
import vscodeOniguruma from "vscode-oniguruma";
import fs from "node:fs/promises";
import { resolve } from "import-meta-resolve";
import { parse } from "./parse.js";

const registered = new Map();
const names = new Map();
const extensions = new Map();

export async function createRegistry() {
  // console.log("creating registry");
  for (const grammar of grammars) {
    const scope = grammar.scopeName;
    // for (const d of grammar.extensions) extensions.set(d, scope);
    for (const d of grammar.names) names.set(d, scope);
    registered.set(scope, grammar);
  }

  const registry = new Registry({
    onigLib: createOniguruma(),
    async loadGrammar(scopeName) {
      return registered.get(scopeName);
    },
  });

  await Promise.all(
    [...registered.keys()].map((d) => {
      return registry.loadGrammar(d);
    })
  );

  return registry;
}

export function toTokens(code, lang, theme, registry) {
  registry.setTheme(theme);
  const scope = flagToScope(lang);

  const grammar = registry._syncRegistry._grammars[scope];
  if (!grammar) {
    throw new Error("No grammar for `" + lang);
  }
  return parse(code, grammar, registry.getColorMap());
}

function flagToScope(flag) {
  if (typeof flag !== "string") {
    throw new TypeError("Expected `string` for `flag`, got `" + flag + "`");
  }

  const normal = flag
    .toLowerCase()
    .replace(/^[ \t]+/, "")
    .replace(/\/*[ \t]*$/g, "");

  return (
    names.get(normal) || extensions.get(normal) || extensions.get("." + normal)
  );
}

async function createOniguruma() {
  const pkgUrl = await resolve("vscode-oniguruma", import.meta.url);
  const wasmBin = await fs.readFile(new URL("onig.wasm", pkgUrl));
  await vscodeOniguruma.loadWASM(wasmBin);
  return vscodeOniguruma;
}
