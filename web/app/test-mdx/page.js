import Content from "./mdx-demo.mdx"

export default function Page() {
  return <Content />
}

export const config = {
  unstable_runtimeJS: false,
}
