import { createRegistry } from "./highlighter"

const promises = {}
const cache = {}

async function fetchTheme(api, themeLabel) {
  const r = await fetch(`${api}/theme?label=${themeLabel}`)
  const json = await r.json()
  if (!json) {
    throw new Error(`Theme ${themeLabel} not found`)
  }
  return json
}

function getTheme(api, themeLabel) {
  const key = `theme-${themeLabel}`
  if (cache[key]) {
    return cache[key]
  }
  if (!promises[key]) {
    promises[key] = fetchTheme(api, themeLabel)
      .then((theme) => {
        cache[key] = { data: theme }
      })
      .catch((e) => {
        cache[key] = { error: e + "" }
      })
  }
  return { promise: promises[key] }
}

function getRegistry() {
  const key = "registry"
  if (cache[key]) {
    return cache[key]
  }
  if (!promises[key]) {
    promises[key] = createRegistry()
      .then((r) => {
        cache[key] = { data: r }
      })
      .catch((e) => {
        cache[key] = { error: e + "" }
      })
  }
  return { promise: promises[key] }
}

export function load(api, lang, themeLabel) {
  const promises = []
  const theme = getTheme(api, themeLabel)
  if (theme.error) {
    throw theme.error
  }
  if (theme.promise) {
    promises.push(theme.promise)
  }

  const registry = getRegistry()
  if (registry.promise) {
    promises.push(registry.promise)
  }
  if (registry.error) {
    throw registry.error
  }
  if (promises.length) {
    throw Promise.all(promises)
  }

  return { theme: theme.data, registry: registry.data }
}
