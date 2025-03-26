import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import { QuickAddButton } from "@/components/quick-add-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GrowthTracker - Track Your Self-Development Journey",
  description:
    "Monitor your self-development journey, compete with a friend, and stay motivated to achieve your goals.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <QuickAddButton />
      </body>
    </html>
  )
}



import './globals.css'