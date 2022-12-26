import "./global.css"
import { Inter } from "@next/font/google"

const inter = Inter({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body>{children}</body>
    </html>
  )
}
