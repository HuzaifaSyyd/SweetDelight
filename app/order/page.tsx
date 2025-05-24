"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MinusCircle, PlusCircle, ShoppingCart, Utensils, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function OrderPage() {
  const [cart, setCart] = useState<Array<{ id: number; name: string; price: number; quantity: number; image: string }>>(
    [],
  )

  const addToCart = (product: { id: number; name: string; price: number; image: string }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

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
            <Link href="/order" className="text-sm font-medium text-pink-500">
              Order Online
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center">
                      {cart.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[70vh]">
                    <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Your cart is empty</p>
                    <Button className="mt-4 bg-pink-500 hover:bg-pink-600" asChild>
                      <Link href="/menu">Continue Shopping</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="mt-8 flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto">
                      <ul className="space-y-4">
                        {cart.map((item) => (
                          <li key={item.id} className="flex items-center gap-4 py-4 border-b">
                            <div className="relative h-16 w-16 rounded-md overflow-hidden">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <MinusCircle className="h-4 w-4" />
                              </Button>
                              <span>{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <PlusCircle className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-4">
                        <span>Delivery</span>
                        <span>$5.00</span>
                      </div>
                      <div className="flex justify-between font-bold mb-6">
                        <span>Total</span>
                        <span>${(cartTotal + 5).toFixed(2)}</span>
                      </div>
                      <Button className="w-full bg-pink-500 hover:bg-pink-600" asChild>
                        <Link href="/checkout">Proceed to Checkout</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>
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
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-16 container">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Order Online</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our delicious selection and order for pickup or delivery. We prepare everything fresh for your
              order.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="cakes">Cakes</TabsTrigger>
              <TabsTrigger value="pastries">Pastries</TabsTrigger>
              <TabsTrigger value="drinks">Drinks</TabsTrigger>
              <TabsTrigger value="desserts">Desserts</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[
                  {
                    id: 1,
                    name: "Chocolate Truffle Cake",
                    price: 32.99,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Rich chocolate layers with truffle filling",
                    category: "Cakes",
                    tags: ["Bestseller"],
                  },
                  {
                    id: 2,
                    name: "Vanilla Bean Cake",
                    price: 28.99,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Light vanilla sponge with buttercream",
                    category: "Cakes",
                    tags: [],
                  },
                  {
                    id: 3,
                    name: "Red Velvet Cake",
                    price: 34.99,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Classic red velvet with cream cheese frosting",
                    category: "Cakes",
                    tags: ["Popular"],
                  },
                  {
                    id: 4,
                    name: "Butter Croissant",
                    price: 3.99,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Flaky, buttery French classic",
                    category: "Pastries",
                    tags: ["Bestseller"],
                  },
                  {
                    id: 5,
                    name: "Cinnamon Roll",
                    price: 4.5,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Swirled with cinnamon and topped with glaze",
                    category: "Pastries",
                    tags: ["Popular"],
                  },
                  {
                    id: 6,
                    name: "Cappuccino",
                    price: 4.5,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Espresso with steamed milk and foam",
                    category: "Drinks",
                    tags: ["Bestseller"],
                  },
                  {
                    id: 7,
                    name: "Vanilla Latte",
                    price: 5.25,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Espresso with vanilla and steamed milk",
                    category: "Drinks",
                    tags: [],
                  },
                  {
                    id: 8,
                    name: "Chocolate Tart",
                    price: 6.99,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Rich chocolate ganache in buttery crust",
                    category: "Desserts",
                    tags: ["Bestseller"],
                  },
                ].map((item) => (
                  <Card key={item.id} className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative h-48">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                      {item.tags.length > 0 && (
                        <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {item.tags[0]}
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded">
                        {item.category}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
                        <Button size="sm" className="bg-pink-500 hover:bg-pink-600" onClick={() => addToCart(item)}>
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cakes">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[
                  {
                    id: 1,
                    name: "Chocolate Truffle Cake",
                    price: 32.99,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Rich chocolate layers with truffle filling",
                    tags: ["Bestseller"],
                  },
                  {
                    id: 2,
                    name: "Vanilla Bean Cake",
                    price: 28.99,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Light vanilla sponge with buttercream",
                    tags: [],
                  },
                  {
                    id: 3,
                    name: "Red Velvet Cake",
                    price: 34.99,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Classic red velvet with cream cheese frosting",
                    tags: ["Popular"],
                  },
                  {
                    id: 9,
                    name: "Strawberry Shortcake",
                    price: 30.99,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Fresh strawberries with whipped cream",
                    tags: ["Seasonal"],
                  },
                ].map((item) => (
                  <Card key={item.id} className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative h-48">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                      {item.tags.length > 0 && (
                        <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {item.tags[0]}
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
                        <Button size="sm" className="bg-pink-500 hover:bg-pink-600" onClick={() => addToCart(item)}>
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pastries">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[
                  {
                    id: 4,
                    name: "Butter Croissant",
                    price: 3.99,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Flaky, buttery French classic",
                    tags: ["Bestseller"],
                  },
                  {
                    id: 5,
                    name: "Cinnamon Roll",
                    price: 4.5,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Swirled with cinnamon and topped with glaze",
                    tags: ["Popular"],
                  },
                  {
                    id: 10,
                    name: "Almond Danish",
                    price: 4.99,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Flaky pastry with almond filling",
                    tags: [],
                  },
                  {
                    id: 11,
                    name: "Chocolate Éclair",
                    price: 5.5,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Filled with custard and topped with chocolate",
                    tags: [],
                  },
                ].map((item) => (
                  <Card key={item.id} className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative h-48">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                      {item.tags.length > 0 && (
                        <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {item.tags[0]}
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
                        <Button size="sm" className="bg-pink-500 hover:bg-pink-600" onClick={() => addToCart(item)}>
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="drinks">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[
                  {
                    id: 6,
                    name: "Cappuccino",
                    price: 4.5,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Espresso with steamed milk and foam",
                    tags: ["Bestseller"],
                  },
                  {
                    id: 7,
                    name: "Vanilla Latte",
                    price: 5.25,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Espresso with vanilla and steamed milk",
                    tags: [],
                  },
                  {
                    id: 12,
                    name: "Chocolate Milkshake",
                    price: 6.5,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Rich chocolate ice cream blended to perfection",
                    tags: ["Popular"],
                  },
                  {
                    id: 13,
                    name: "Strawberry Smoothie",
                    price: 5.99,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Fresh strawberries blended with yogurt",
                    tags: ["Seasonal"],
                  },
                ].map((item) => (
                  <Card key={item.id} className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative h-48">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                      {item.tags.length > 0 && (
                        <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {item.tags[0]}
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
                        <Button size="sm" className="bg-pink-500 hover:bg-pink-600" onClick={() => addToCart(item)}>
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="desserts">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[
                  {
                    id: 8,
                    name: "Chocolate Tart",
                    price: 6.99,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Rich chocolate ganache in buttery crust",
                    tags: ["Bestseller"],
                  },
                  {
                    id: 14,
                    name: "Vanilla Pudding",
                    price: 5.5,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Creamy vanilla pudding with caramel",
                    tags: [],
                  },
                  {
                    id: 15,
                    name: "Chocolate Chip Cookie",
                    price: 2.99,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Classic cookie with chocolate chunks",
                    tags: ["Popular"],
                  },
                  {
                    id: 16,
                    name: "Lemon Tart",
                    price: 6.99,
                    image: "/placeholder.svg?height=300&width=300",
                    description: "Tangy lemon filling in sweet crust",
                    tags: [],
                  },
                ].map((item) => (
                  <Card key={item.id} className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative h-48">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                      {item.tags.length > 0 && (
                        <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {item.tags[0]}
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
                        <Button size="sm" className="bg-pink-500 hover:bg-pink-600" onClick={() => addToCart(item)}>
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="py-12 bg-[#FDF6F8]">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Order Information</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold mb-4">Delivery Information</h3>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="mb-4">We deliver to the following areas:</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center mt-0.5">
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
                          className="h-4 w-4 text-pink-500"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>Sweet City - $5 delivery fee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center mt-0.5">
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
                          className="h-4 w-4 text-pink-500"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>Neighboring areas (within 10 miles) - $8 delivery fee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center mt-0.5">
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
                          className="h-4 w-4 text-pink-500"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>Free delivery on orders over $50</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    Delivery times: 10am - 6pm daily. Please allow 1-2 hours for delivery.
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Pickup Information</h3>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="mb-4">You can pick up your order at our bakery:</p>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
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
                        className="h-5 w-5 text-pink-500 shrink-0 mt-0.5"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>123 Bakery Street, Sweet City, SC 12345</span>
                    </div>
                    <div className="flex items-center gap-3">
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
                        className="h-5 w-5 text-pink-500 shrink-0"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span>(555) 123-4567</span>
                    </div>
                  </div>
                  <p className="mb-4">Pickup hours:</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>7:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday - Sunday</span>
                      <span>8:00 AM - 8:00 PM</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Please allow 30-60 minutes for your order to be prepared for pickup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Special Requests</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Need a custom order or have dietary requirements? Let us know and we'll do our best to accommodate your
              needs.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder="Your phone number" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="request">Special Request</Label>
                <textarea
                  id="request"
                  placeholder="Describe your special request or dietary requirements"
                  className="min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <Button className="w-full bg-pink-500 hover:bg-pink-600">Submit Request</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#2D1A1F] text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Utensils className="h-6 w-6 text-pink-400" />
                <span className="text-xl font-bold">Sweet Delights</span>
              </div>
              <p className="text-gray-300 mb-4">
                Handcrafted with love, our bakery offers the finest cakes, pastries, and beverages in town.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-300 hover:text-pink-400">
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
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-pink-400">
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
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-pink-400">
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
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-pink-400">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/menu" className="text-gray-300 hover:text-pink-400">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-pink-400">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="text-gray-300 hover:text-pink-400">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/order" className="text-gray-300 hover:text-pink-400">
                    Order Online
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-pink-400">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
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
                    className="h-5 w-5 text-pink-400 shrink-0 mt-0.5"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-gray-300">123 Bakery Street, Sweet City, SC 12345</span>
                </li>
                <li className="flex items-center gap-3">
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
                    className="h-5 w-5 text-pink-400 shrink-0"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="text-gray-300">(555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
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
                    className="h-5 w-5 text-pink-400 shrink-0"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span className="text-gray-300">info@sweetdelights.com</span>
                </li>
              </ul>
              <div className="mt-4">
                <h4 className="font-medium mb-2">Hours:</h4>
                <p className="text-gray-300">Mon-Fri: 7am - 7pm</p>
                <p className="text-gray-300">Sat-Sun: 8am - 8pm</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Newsletter</h3>
              <p className="text-gray-300 mb-4">Subscribe to get special offers and event updates.</p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-2 bg-[#3D2A30] border border-[#4D3A40] rounded-md text-white placeholder:text-gray-400"
                />
                <Button className="w-full bg-pink-500 hover:bg-pink-600">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-[#4D3A40] mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Sweet Delights Bakery. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
