import { Registry } from "vscode-textmate"
import vscodeOniguruma from "vscode-oniguruma"
import { tokenize } from "./tokenizer.js"
import wasmBin from "vscode-oniguruma/release/onig.wasm"

const registered = new Map()
const names = new Map()

export function newRegistry() {
  return new Registry({
    onigLib: createOniguruma(),
    loadGrammar: async (scopeName) => registered.get(scopeName),
  })
}

export async function loadGrammars(registry, grammars) {
  grammars.forEach((grammar) => {
    grammar.names.forEach((name) => names.set(name, grammar.scopeName))
    registered.set(grammar.scopeName, grammar)
  })
  await Promise.all([...registered.keys()].map((d) => registry.loadGrammar(d)))
  return grammars
}

export function toTokens(code, lang, theme, registry) {
  registry.setTheme(theme)
  const scope = names.get(lang)
  const grammar = registry._syncRegistry._grammars[scope]
  if (!grammar) {
    throw new Error("No grammar for `" + lang)
  }
  return tokenize(code, grammar, registry.getColorMap())
}

async function createOniguruma() {
  await vscodeOniguruma.loadWASM(wasmBin)
  return vscodeOniguruma
}
