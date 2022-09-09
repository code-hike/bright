import { Registry } from "vscode-textmate"
import grammars from "./all-grammars.js"
import vscodeOniguruma from "vscode-oniguruma"
import fs from "node:fs/promises"
import { resolve } from "import-meta-resolve"
import { tokenize } from "./tokenizer.js"

const registered = new Map()
const names = new Map()

export async function createRegistry() {
  const registry = newRegistry()
  await loadGrammars(registry, grammars)
  return registry
}

function newRegistry() {
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
  const pkgUrl = await resolve("vscode-oniguruma", import.meta.url)
  const wasmBin = await fs.readFile(new URL("onig.wasm", pkgUrl))
  await vscodeOniguruma.loadWASM(wasmBin)
  return vscodeOniguruma
}
