const withMDX = require("@next/mdx")({
  experimental: {
    mdxRs: true,
  },
  extension: /\.mdx?$/,
})

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  experimental: { appDir: true, mdxRs: true },
})

module.exports = nextConfig
