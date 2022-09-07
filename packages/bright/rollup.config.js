import { babel } from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

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
    nodeResolve(),
    babel({ presets: ["@babel/preset-react"] }),
    commonjs(),
  ],
};
