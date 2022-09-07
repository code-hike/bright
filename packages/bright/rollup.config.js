import { babel } from "@rollup/plugin-babel";

export default {
  input: "src/code.server.js",
  output: {
    file: "dist/code.server.js",
    format: "esm",
  },
  plugins: [babel({ presets: ["@babel/preset-react"] })],
};
