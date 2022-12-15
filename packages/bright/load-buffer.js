import { readFileSync } from "fs"
import { createFilter } from "@rollup/pluginutils"

const template = (base64) => `
function base64ToBuffer(src) {
  var buf = null
  var isNode =
    typeof process !== "undefined" &&
    process.versions != null &&
    process.versions.node != null

  if (isNode) {
    buf = Buffer.from(src, "base64")
  } else {
    var raw = globalThis.atob(src)
    var rawLength = raw.length
    buf = new Uint8Array(new ArrayBuffer(rawLength))
    for (var i = 0; i < rawLength; i++) {
      buf[i] = raw.charCodeAt(i)
    }
  }
  return buf
}
export default base64ToBuffer("${base64}");
`

export function arraybuffer(options) {
  const { include, exclude } = options

  const filter = createFilter(include, exclude)

  return {
    name: "arraybuffer",

    transform(_, id) {
      if (!filter(id)) {
        return null
      }

      const base64 = readFileSync(id, { encoding: "base64" })
      return {
        code: template(base64),
        map: { mappings: "" },
      }
    },
  }
}
