"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Lock, Utensils } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // In a real app, you would validate credentials against a backend
    // For demo purposes, we'll use a simple check
    setTimeout(() => {
      if (email === "admin@sweetdelights.com" && password === "admin123") {
        // Set some kind of auth token or cookie in a real app
        localStorage.setItem("adminLoggedIn", "true")
        router.push("/admin/dashboard")
      } else {
        setError("Invalid email or password")
        setLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-pink-500" />
            <span className="text-xl font-bold">Sweet Delights</span>
          </Link>
          <Link href="/" className="text-sm font-medium hover:text-pink-500 transition-colors">
            Return to Website
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center">
                <Lock className="h-6 w-6 text-pink-500" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && <div className="p-3 text-sm bg-red-50 text-red-500 rounded-md">{error}</div>}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@sweetdelights.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-xs text-pink-500 hover:text-pink-600">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
              <div className="text-center text-sm text-muted-foreground mt-4">
                <p>Demo credentials:</p>
                <p>Email: admin@sweetdelights.com</p>
                <p>Password: admin123</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-[#2D1A1F] text-white py-4">
        <div className="container text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Sweet Delights Bakery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
