import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bakker aan de Deur - Vers brood thuisbezorgd",
  description: "Krijg elke dinsdag en vrijdag vers brood aan de deur bezorgd. Meld je interesse aan!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl">
      <body className={inter.className}>{children}</body>
    </html>
  )
} 