import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Feeda - The Future of Social Media",
  description:
    "Experience social media reimagined. Connect, share, and discover in a clean, privacy-focused environment designed for the next generation.",
  keywords: "social media, app, privacy, modern, future, connect, share",
  authors: [{ name: "Feeda Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1e3a8a",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Feeda - The Future of Social Media",
    description: "Experience social media reimagined. Join the waitlist for early access.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Feeda App Icon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Feeda - The Future of Social Media",
    description: "Experience social media reimagined. Join the waitlist for early access.",
    images: ["/icon.png"],
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
