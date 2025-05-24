import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Gallery - Sweet Delights Bakery",
  description: "Browse our gallery of delicious creations and memorable moments at Sweet Delights Bakery.",
}

export default function GalleryPage() {
  const galleryImages = [
    {
      src: "https://i.pinimg.com/736x/1e/ed/d6/1eedd6f37f7a4eb7ebd158f36c47e6fa.jpg",
      alt: "Chocolate wedding cake",
      category: "Wedding Cakes",
      title: "Elegant Wedding Cake",
      description: "Three-tier chocolate cake with fresh flowers",
    },
    {
      src: "https://i.pinimg.com/736x/cd/d0/be/cdd0be19d9986a526c5837ed6883e910.jpg",
      alt: "Artisan bread display",
      category: "Breads",
      title: "Fresh Artisan Breads",
      description: "Daily selection of handcrafted breads",
    },
    {
      src: "https://i.pinimg.com/736x/d7/36/0b/d7360b7cf869f09a86b6ba65e65785d6.jpg",
      alt: "Pastry selection",
      category: "Pastries",
      title: "Morning Pastries",
      description: "Croissants, danishes, and more",
    },
    {
      src: "https://i.pinimg.com/736x/ff/e5/7d/ffe57de7135d8ac709f8390a862a2791.jpg",
      alt: "Birthday cake",
      category: "Birthday Cakes",
      title: "Custom Birthday Cake",
      description: "Personalized celebration cake",
    },
    {
      src: "https://i.pinimg.com/736x/2e/c6/71/2ec6716617d251d577be71c4cd95a401.jpg",
      alt: "Coffee and pastries",
      category: "Cafe",
      title: "Coffee & Pastries",
      description: "Perfect pairing for your morning",
    },
    {
      src: "https://i.pinimg.com/736x/c9/da/88/c9da88719ffba4dde424742a3b46a935.jpg",
      alt: "Dessert table",
      category: "Events",
      title: "Event Dessert Table",
      description: "Catering for special occasions",
    },
    {
      src: "https://i.pinimg.com/736x/87/4b/54/874b54b948865b0e969a63f4e50adae3.jpg",
      alt: "Bakery interior",
      category: "Our Space",
      title: "Cozy Bakery Interior",
      description: "Warm and welcoming atmosphere",
    },
    {
      src: "https://i.pinimg.com/736x/34/b7/d4/34b7d455d9fa0261ba8f52d8dab179fd.jpg",
      alt: "Baking process",
      category: "Behind the Scenes",
      title: "Artisan Baking",
      description: "Handcrafted with care",
    },
  ]

  const timelineEvents = [
    {
      year: "2003",
      title: "Sweet Delights Opens",
      description: "Maria and Giuseppe open their first bakery",
      image: "https://i.pinimg.com/736x/90/cd/0c/90cd0cffa9981dba3d780f7f6350d2a2.jpg",
    },
    {
      year: "2008",
      title: "Expansion",
      description: "Added cafe seating and expanded menu",
      image: "https://i.pinimg.com/736x/c6/ca/86/c6ca86a681b3484940b5ef7a2aa8233a.jpg",
    },
    {
      year: "2015",
      title: "Award Recognition",
      description: "First local business award for excellence",
      image: "https://i.pinimg.com/736x/42/da/97/42da971f04f9685c529f6c03daba8ec7.jpg",
    },
    {
      year: "2020",
      title: "Online Ordering",
      description: "Launched online ordering and delivery",
      image: "https://i.pinimg.com/736x/b8/fb/75/b8fb75b35d2c6db507c685b1e9465ab9.jpg",
    },
    {
      year: "2023",
      title: "20th Anniversary",
      description: "Celebrating two decades of sweet memories",
      image: "https://i.pinimg.com/736x/22/41/ab/2241ab233fe1b13b260f3d7234f658bd.jpg",
    },
  ]

  return (
    <div className="container py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Take a visual journey through our delicious creations and memorable moments at Sweet Delights Bakery.
        </p>
      </section>

      {/* Photo Gallery */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Creations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <Card key={index} className="overflow-hidden group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <h3 className="text-lg font-bold mb-2">{image.title}</h3>
                    <p className="text-sm">{image.description}</p>
                  </div>
                </div>
                <Badge className="absolute top-2 left-2 bg-pink-500">{image.category}</Badge>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
        <div className="space-y-8">
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="flex-1">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <Badge variant="outline" className="mb-2 text-pink-600 border-pink-600">
                  {event.year}
                </Badge>
                <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                <p className="text-muted-foreground">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Follow Us on Instagram</h2>
        <p className="text-center text-muted-foreground mb-8">
          Stay updated with our latest creations and behind-the-scenes moments
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
              <Image
                src={`/placeholder.svg?height=200&width=200&text=Instagram${i}`}
                alt={`Instagram post ${i}`}
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href="https://instagram.com/sweetdelightsbakery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
          >
            @sweetdelightsbakery
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  )
}
