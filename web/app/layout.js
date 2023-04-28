import "./global.css"
import { Inter } from "@next/font/google"

const inter = Inter({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
})

export const metadata = {
  title: "Bright - Syntax Highlighting React Server Component",
  description: "A server component for syntax highlighting.",
  keywords: "React Server Component, Syntax Highlighting, Code Hike",
  authors: [{ name: "Code Hike", url: "https://codehike.org/" }],
  colorScheme: "dark",
  twitter: {
    card: "summary_large_image",
    title: "Bright - Syntax Highlighting React Server Component",
    description: "A server component for syntax highlighting.",
    creator: "@codehike_",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body>{children}</body>
    </html>
  )
}
