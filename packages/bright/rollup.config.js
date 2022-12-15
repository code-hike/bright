import { babel } from "@rollup/plugin-babel"
import nodeResolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import { string } from "rollup-plugin-string"

export default {
  input: "src/code.server.js",
  output: {
    file: "dist/code.server.js",
    format: "esm",
  },
  external: [
    "react",
    "node:fs/promises",
    "import-meta-resolve",
    "vscode-oniguruma",
  ],
  plugins: [
    string({ include: "**/*.wasm" }),
    nodeResolve(),
    babel({ presets: ["@babel/preset-react"] }),
    commonjs(),
  ],
}
