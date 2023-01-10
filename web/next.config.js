const withMDX = require("@next/mdx")({
  experimental: {
    mdxRs: true,
  },
  extension: /\.mdx?$/,
})

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
  experimental: { appDir: true, mdxRs: true },
})

module.exports = nextConfig
