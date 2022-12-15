import { babel } from "@rollup/plugin-babel"
import nodeResolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import { arraybuffer } from "./load-buffer"

export default {
  input: "src/code.server.js",
  output: {
    file: "dist/code.server.js",
    format: "esm",
  },
  external: ["react"],
  plugins: [
    nodeResolve(),
    babel({ presets: ["@babel/preset-react"] }),
    arraybuffer({ include: "**/*.wasm" }),
    commonjs(),
  ],
}
