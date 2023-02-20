import Usage from "./usage.mdx"

export default function Page() {
  return <Usage />
}

// export default function Page() {
//   const props = {
//     extensions: [tabs],
//     subProps: [
//       { code: "console.log(1)", lang: "js", title: "foo.js" },
//       { code: "print(2)", lang: "py", title: "bar.py" },
//       { code: "print(3)", lang: "py", title: "readme.graphql" },
//     ],
//   }
//   return (
//     <>
//       <Code {...props} theme="dark-plus" />
//       <Code {...props} theme="dracula" />
//       <Code {...props} theme="github-dark" />
//       Github Light
//       <Code {...props} theme="github-light" />
//       <Code {...props} theme="light-plus" />
//       <Code {...props} theme="material-darker" />
//       <Code {...props} theme="material-default" />
//       <Code {...props} theme="material-lighter" />
//       <Code
//         title="foo.js"
//         extensions={[tabs]}
//         lang="js"
//         code="console.log(1)"
//         theme="material-lighter"
//       />
//     </>
//   )
// }
