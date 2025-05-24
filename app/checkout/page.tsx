"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, CreditCard, Utensils } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [orderComplete, setOrderComplete] = useState(false)

  // Mock cart items - in a real app, this would come from a cart context or state management
  const cartItems = [
    {
      id: 1,
      name: "Chocolate Truffle Cake",
      price: 32.99,
      quantity: 1,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 4,
      name: "Butter Croissant",
      price: 3.99,
      quantity: 2,
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = 5.0
  const total = subtotal + deliveryFee

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would process the payment and submit the order here
    setOrderComplete(true)
    window.scrollTo(0, 0)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-pink-500" />
            <span className="text-xl font-bold">Sweet Delights</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Home
            </Link>
            <Link href="/menu" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Menu
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-pink-500 transition-colors">
              About
            </Link>
            <Link href="/gallery" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Gallery
            </Link>
            <Link href="/order" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Order Online
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Contact
            </Link>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container">
          {orderComplete ? (
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-8 flex justify-center">
                <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
              <p className="text-muted-foreground mb-8">
                Your order has been received and is being processed. You will receive a confirmation email shortly.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Order Number:</span>
                    <span className="font-medium">#SD{Math.floor(Math.random() * 10000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Order Date:</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="font-medium">
                      {paymentMethod === "card"
                        ? "Credit Card"
                        : paymentMethod === "paypal"
                          ? "PayPal"
                          : "Cash on Delivery"}
                    </span>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <h3 className="font-medium">Items Ordered:</h3>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button className="bg-pink-500 hover:bg-pink-600" asChild>
                  <Link href="/">Return to Home</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/order">Order More</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="First Name" />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Last Name" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Email" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" placeholder="Phone Number" />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="Street Address" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="City" />
                        </div>
                        <div>
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input id="zipCode" placeholder="ZIP Code" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="deliveryInstructions">Delivery Instructions (Optional)</Label>
                        <textarea
                          id="deliveryInstructions"
                          placeholder="Special instructions for delivery"
                          className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                    <Tabs defaultValue="card" onValueChange={setPaymentMethod} className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="card">Credit Card</TabsTrigger>
                        <TabsTrigger value="paypal">PayPal</TabsTrigger>
                        <TabsTrigger value="cash">Cash on Delivery</TabsTrigger>
                      </TabsList>
                      <TabsContent value="card" className="space-y-4 mt-4">
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input id="cardName" placeholder="Name on Card" />
                        </div>
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input id="expiryDate" placeholder="MM/YY" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="saveCard" className="rounded border-gray-300" />
                          <Label htmlFor="saveCard">Save card for future purchases</Label>
                        </div>
                      </TabsContent>
                      <TabsContent value="paypal" className="mt-4">
                        <div className="bg-gray-50 p-6 rounded-lg text-center">
                          <p className="mb-4">You will be redirected to PayPal to complete your payment.</p>
                          <Button className="bg-[#0070ba] hover:bg-[#005ea6]">
                            <Image
                              src="/placeholder.svg?height=24&width=80&text=PayPal"
                              alt="PayPal"
                              width={80}
                              height={24}
                              className="mr-2"
                            />
                            Pay with PayPal
                          </Button>
                        </div>
                      </TabsContent>
                      <TabsContent value="cash" className="mt-4">
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <p>
                            Pay with cash upon delivery. Please have the exact amount ready as our delivery personnel
                            may not carry change.
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  <Button className="w-full bg-pink-500 hover:bg-pink-600" size="lg" onClick={handleSubmitOrder}>
                    Place Order
                  </Button>
                </div>
              </div>

              <div>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <div className="space-y-4 mb-6">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>
                                {item.quantity} x ${item.price.toFixed(2)}
                              </span>
                              <span>${(item.quantity * item.price).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>${deliveryFee.toFixed(2)}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg flex items-center">
                      <CreditCard className="h-5 w-5 text-muted-foreground mr-2" />
                      <span className="text-sm text-muted-foreground">All transactions are secure and encrypted.</span>
                    </div>
                  </CardContent>
                </Card>
                <div className="mt-6">
                  <Link href="/order" className="text-pink-500 hover:text-pink-600 text-sm flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 mr-1"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                    Return to cart
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-[#2D1A1F] text-white py-8">
        <div className="container">
          <div className="border-t border-[#4D3A40] pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Sweet Delights Bakery. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
