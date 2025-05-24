import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const featuredItems = [
    {
      id: "chocolate-truffle-cake",
      name: "Chocolate Truffle Cake",
      price: "$32.99",
      image: "https://i.pinimg.com/736x/d0/a5/7c/d0a57c5ecfae1191f460e9e4df52e71d.jpg",
      description: "Rich chocolate layers with truffle filling",
      category: "Cakes",
      tags: ["Bestseller"],
    },
    {
      id: "butter-croissant",
      name: "Butter Croissant",
      price: "$3.99",
      image: "https://i.pinimg.com/736x/fb/5a/7b/fb5a7b4a04fe90e7ad03b98c79d6e836.jpg",
      description: "Flaky, buttery French classic",
      category: "Pastries",
      tags: ["Popular"],
    },
    {
      id: "cappuccino",
      name: "Cappuccino",
      price: "$4.50",
      image: "https://i.pinimg.com/736x/6a/86/c3/6a86c387495a30851e5843a582c7b6f2.jpg",
      description: "Espresso with steamed milk and foam",
      category: "Drinks",
      tags: ["Bestseller"],
    },
    {
      id: "chocolate-tart",
      name: "Chocolate Tart",
      price: "$6.99",
      image: "https://i.pinimg.com/736x/50/4a/b0/504ab02b8222fde6e2191758b3469018.jpg",
      description: "Rich chocolate ganache in buttery crust",
      category: "Desserts",
      tags: ["New"],
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1707328061555-3dd37ec29670?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Sweet Delights Bakery"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Sweet Delights</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Handcrafted with love, our bakery offers the finest cakes, pastries, and beverages in town
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-lg px-8">
              Explore Menu
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-black border-white hover:bg-white hover:text-pink-500 text-lg px-8"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Items</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular and delicious treats, handcrafted daily with the finest ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => (
            <Link key={item.id} href={`/menu/${item.id}`}>
              <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-105 cursor-pointer">
                <div className="relative h-48">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  {item.tags.length > 0 && <Badge className="absolute top-2 right-2 bg-pink-500">{item.tags[0]}</Badge>}
                  <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded">
                    {item.category}
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

        <div className="text-center mt-8">
          <Link href="/menu">
            <Button size="lg" variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-50">
              View Full Menu
            </Button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-[#FDF6F8]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=600" alt="Our bakery" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-6">
                For over 20 years, Sweet Delights has been serving the community with freshly baked goods made from the
                finest ingredients. Our passion for baking and commitment to quality has made us a beloved local
                institution.
              </p>
              <p className="text-muted-foreground mb-8">
                Every morning, our skilled bakers arrive before dawn to prepare fresh breads, pastries, and cakes. We
                believe in traditional methods combined with innovative flavors to create unforgettable experiences.
              </p>
              <Link href="/about">
                <Button className="bg-pink-500 hover:bg-pink-600">Learn More About Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Offer</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From daily fresh bakes to custom celebrations, we're here to make every moment sweeter
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Fresh Daily Bakes",
              description: "Artisan breads, pastries, and cakes baked fresh every morning",
              icon: "🥖",
            },
            {
              title: "Custom Cakes",
              description: "Personalized cakes for birthdays, weddings, and special occasions",
              icon: "🎂",
            },
            {
              title: "Coffee & Beverages",
              description: "Premium coffee, teas, and specialty drinks to complement our bakes",
              icon: "☕",
            },
          ].map((service, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#FDF6F8]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it - hear from our happy customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                text: "The best bakery in town! Their chocolate cake is absolutely divine.",
                rating: 5,
              },
              {
                name: "Mike Chen",
                text: "Fresh croissants every morning. I'm a regular customer now!",
                rating: 5,
              },
              {
                name: "Emily Davis",
                text: "They made the perfect wedding cake for us. Highly recommended!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                <p className="font-semibold">- {testimonial.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 container">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Visit Us Today</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Experience the magic of freshly baked goods. Visit our store or browse our menu online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/menu">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600">
                Browse Menu
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-50">
                Find Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
