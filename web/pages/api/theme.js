import { NextResponse } from "next/server"
import { fetchTheme } from "../../src/theme-fetcher.js"

// api/theme?label=Material%20Theme
export default async (req) => {
  const url = new URL(req.url)
  const label = url.searchParams.get("label")
  console.log("fetching theme", label)
  const theme = await fetchTheme(label)
  const res = NextResponse.json(theme)
  res.headers.set("Cache-Control", "s-maxage=1, stale-while-revalidate")
  return res
}

export const config = {
  runtime: "experimental-edge",
}
