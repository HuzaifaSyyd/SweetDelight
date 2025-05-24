"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Utensils } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function MenuClientPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const menuItems = [
    {
      id: "chocolate-truffle-cake",
      name: "Chocolate Truffle Cake",
      price: "$32.99",
      image: "https://i.pinimg.com/736x/4a/2f/b6/4a2fb6f1bd7b8f05e93828ca836f55b4.jpg",
      description: "Rich chocolate layers with truffle filling",
      category: "cakes",
      tags: ["Bestseller"],
    },
    {
      id: "vanilla-bean-cake",
      name: "Vanilla Bean Cake",
      price: "$28.99",
      image: "https://i.pinimg.com/736x/61/ef/e3/61efe31a917a1d70b23bb8e94ed09901.jpg",
      description: "Light vanilla sponge with buttercream",
      category: "cakes",
      tags: [],
    },
    {
      id: "red-velvet-cake",
      name: "Red Velvet Cake",
      price: "$34.99",
      image: "https://i.pinimg.com/736x/25/c6/20/25c620e93456b923a6ad4e6de1ddfafb.jpg",
      description: "Classic red velvet with cream cheese frosting",
      category: "cakes",
      tags: ["Popular"],
    },
    {
      id: "strawberry-shortcake",
      name: "Strawberry Shortcake",
      price: "$30.99",
      image: "https://i.pinimg.com/736x/da/5a/67/da5a67076f9f0f3c8878e102ee9e882c.jpg",
      description: "Fresh strawberries with whipped cream",
      category: "cakes",
      tags: ["Seasonal"],
    },
    {
      id: "butter-croissant",
      name: "Butter Croissant",
      price: "$3.99",
      image: "https://i.pinimg.com/736x/48/bf/ae/48bfae6b4ef476f4f2e6698d5cb51844.jpg",
      description: "Flaky, buttery French classic",
      category: "pastries",
      tags: ["Bestseller"],
    },
    {
      id: "cinnamon-roll",
      name: "Cinnamon Roll",
      price: "$4.50",
      image: "https://i.pinimg.com/736x/36/8f/1c/368f1cc5121ef68890736f05a1f3e20d.jpg",
      description: "Swirled with cinnamon and topped with glaze",
      category: "pastries",
      tags: ["Popular"],
    },
    {
      id: "almond-danish",
      name: "Almond Danish",
      price: "$4.99",
      image: "https://i.pinimg.com/736x/9f/73/fa/9f73fab68477662a1ff6f3c47cedbc42.jpg",
      description: "Flaky pastry with almond filling",
      category: "pastries",
      tags: [],
    },
    {
      id: "chocolate-eclair",
      name: "Chocolate Éclair",
      price: "$5.50",
      image: "https://i.pinimg.com/736x/0b/aa/c3/0baac321a49b8ed2fc170691fdbf6201.jpg",
      description: "Filled with custard and topped with chocolate",
      category: "pastries",
      tags: [],
    },
    {
      id: "cappuccino",
      name: "Cappuccino",
      price: "$4.50",
      image: "https://i.pinimg.com/736x/6a/86/c3/6a86c387495a30851e5843a582c7b6f2.jpg",
      description: "Espresso with steamed milk and foam",
      category: "drinks",
      tags: ["Bestseller"],
    },
    {
      id: "vanilla-latte",
      name: "Vanilla Latte",
      price: "$5.25",
      image: "https://i.pinimg.com/736x/03/47/6e/03476e1a455fbad5eda2bc5679872a80.jpg",
      description: "Espresso with vanilla and steamed milk",
      category: "drinks",
      tags: [],
    },
    {
      id: "chocolate-milkshake",
      name: "Chocolate Milkshake",
      price: "$6.50",
      image: "https://i.pinimg.com/736x/ca/57/a0/ca57a06fff117a65d682652338581c26.jpg",
      description: "Rich chocolate ice cream blended to perfection",
      category: "drinks",
      tags: ["Popular"],
    },
    {
      id: "strawberry-smoothie",
      name: "Strawberry Smoothie",
      price: "$5.99",
      image: "https://i.pinimg.com/736x/ae/97/97/ae9797277171f0a9a3ccafc7d96e234b.jpg",
      description: "Fresh strawberries blended with yogurt",
      category: "drinks",
      tags: ["Seasonal"],
    },
    {
      id: "chocolate-tart",
      name: "Chocolate Tart",
      price: "$6.99",
      image: "https://i.pinimg.com/736x/e8/a3/4d/e8a34dcb92985334dc9fceb9b7f9140b.jpg",
      description: "Rich chocolate ganache in buttery crust",
      category: "desserts",
      tags: ["Bestseller"],
    },
    {
      id: "vanilla-pudding",
      name: "Vanilla Pudding",
      price: "$5.50",
      image: "https://i.pinimg.com/736x/08/db/ee/08dbee07064dd7570943aee23cf6cac0.jpg",
      description: "Creamy vanilla pudding with caramel",
      category: "desserts",
      tags: [],
    },
    {
      id: "chocolate-chip-cookie",
      name: "Chocolate Chip Cookie",
      price: "$2.99",
      image: "https://i.pinimg.com/736x/26/fa/2f/26fa2fda58995d96010d696a0bd0aac2.jpg",
      description: "Classic cookie with chocolate chunks",
      category: "desserts",
      tags: ["Popular"],
    },
    {
      id: "lemon-tart",
      name: "Lemon Tart",
      price: "$6.99",
      image: "https://i.pinimg.com/736x/c9/a7/c2/c9a7c2db18d525701d7bd2ca8f52f80d.jpg",
      description: "Tangy lemon filling in sweet crust",
      category: "desserts",
      tags: [],
    },
  ]

  const filterItems = (category: string) => {
    if (category === "all") return menuItems
    return menuItems.filter((item) => item.category === category)
  }

  const MenuGrid = ({ items }: { items: typeof menuItems }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <Link key={item.id} href={`/menu/${item.id}`}>
          <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-105 cursor-pointer">
            <div className="relative h-48">
              <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              {item.tags.length > 0 && <Badge className="absolute top-2 right-2 bg-pink-500">{item.tags[0]}</Badge>}
              <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded">
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-1">{item.name}</h3>
              <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg text-pink-600">{item.price}</span>
                <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )

  return (
    <main className="flex-1">
      <section className="py-12 md:py-16 container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our delicious selection of handcrafted treats. Everything is made fresh daily with the finest
            ingredients.
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
            <MenuGrid items={filterItems("all")} />
          </TabsContent>

          <TabsContent value="cakes">
            <MenuGrid items={filterItems("cakes")} />
          </TabsContent>

          <TabsContent value="pastries">
            <MenuGrid items={filterItems("pastries")} />
          </TabsContent>

          <TabsContent value="drinks">
            <MenuGrid items={filterItems("drinks")} />
          </TabsContent>

          <TabsContent value="desserts">
            <MenuGrid items={filterItems("desserts")} />
          </TabsContent>
        </Tabs>
      </section>

      <section className="py-12 bg-[#FDF6F8]">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Dietary Options Available</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We cater to various dietary needs. Look for these tags on our menu items or ask our staff for assistance.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Gluten-Free",
                description: "Made without gluten-containing ingredients",
                icon: "🌾",
              },
              {
                name: "Vegan",
                description: "Contains no animal products",
                icon: "🌱",
              },
              {
                name: "Nut-Free",
                description: "Made without nuts or nut products",
                icon: "🥜",
              },
              {
                name: "Low Sugar",
                description: "Contains reduced sugar content",
                icon: "🍯",
              },
            ].map((item, index) => (
              <Card key={index} className="p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Custom Orders</h2>
            <p className="text-muted-foreground mb-6">
              Need something special? We offer custom cakes and desserts for any occasion. Contact us to discuss your
              requirements.
            </p>
            <ul className="space-y-4 mb-8">
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
                <span>Birthday cakes with personalized messages</span>
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
                <span>Wedding cakes and dessert tables</span>
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
                <span>Corporate event catering</span>
              </li>
            </ul>
            <Button className="bg-pink-500 hover:bg-pink-600">Request Custom Order</Button>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image src="https://i.pinimg.com/736x/b4/72/cb/b472cbfa98784a1de60df6d90a372ef0.jpg" alt="Custom cake design" fill className="object-cover" />
          </div>
        </div>
      </section>

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
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-[#3D2A30] border-[#4D3A40] text-white placeholder:text-gray-400"
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
    </main>
  )
}
