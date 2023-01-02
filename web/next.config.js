const withMDX = require("@next/mdx")({
  experimental: {
    mdxRs: true,
  },
  extension: /\.mdx?$/,
})

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
  experimental: {
    appDir: true,
  },
})

module.exports = nextConfig
