import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Sweet Delights Bakery - Handcrafted Cakes, Pastries & Coffee",
  description:
    "Handcrafted with love, our bakery offers the finest cakes, pastries, and beverages in town. Order online or visit us today!",
  keywords: "bakery, cakes, pastries, coffee, desserts, custom cakes, birthday cakes, event catering",
    generator: 'Whozaifa',
  icons: {
      icon: { url: '/favicon.jpg' }, // Or the path to your icon.png or other file
    },
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
