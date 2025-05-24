"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Utensils, ShoppingCart, Menu, X, Mail, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState<Array<{ id: string; name: string; price: number; quantity: number }>>([])
  const [joinUsOpen, setJoinUsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const handleJoinUs = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Join Us form submitted:", formData)
    setJoinUsOpen(false)
    setFormData({ name: "", email: "", phone: "" })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-pink-500" />
          <span className="text-xl font-bold">Sweet Delights</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-pink-500",
                pathname === item.href ? "text-pink-500" : "text-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Dialog open={joinUsOpen} onOpenChange={setJoinUsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-50">
                Join Us
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Join Sweet Delights Community</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleJoinUs} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
                  Join Our Community
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-pink-500 p-0 text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
              </SheetHeader>
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[70vh]">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                </div>
              ) : (
                <div className="mt-8">
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t">
                    <div className="flex justify-between font-bold mb-4">
                      <span>
                        Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                      </span>
                    </div>
                    <Button className="w-full bg-pink-500 hover:bg-pink-600">Checkout</Button>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-80">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Utensils className="h-6 w-6 text-pink-500" />
                <span className="text-xl font-bold">Sweet Delights</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Navigation Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-lg border transition-colors",
                    pathname === item.href
                      ? "bg-pink-50 border-pink-200 text-pink-600"
                      : "hover:bg-gray-50 border-gray-200",
                  )}
                >
                  <div className="text-2xl mb-2">
                    {item.name === "Home" && "🏠"}
                    {item.name === "Menu" && "📋"}
                    {item.name === "About" && "ℹ️"}
                    {item.name === "Gallery" && "🖼️"}
                    {item.name === "Contact" && "📞"}
                  </div>
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="space-y-4">
              <Dialog open={joinUsOpen} onOpenChange={setJoinUsOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full border-pink-500 text-pink-500 hover:bg-pink-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Join Us
                  </Button>
                </DialogTrigger>
              </Dialog>

              <Button variant="ghost" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart
                {cartItemCount > 0 && <Badge className="ml-auto bg-pink-500">{cartItemCount}</Badge>}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
