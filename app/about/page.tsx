import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "About Us - Sweet Delights Bakery",
  description: "Learn about our story, philosophy, and the passionate team behind Sweet Delights Bakery.",
}

export default function AboutPage() {
  return (
    <div className="container py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Sweet Delights</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          For over 20 years, we've been crafting exceptional baked goods with passion, tradition, and the finest
          ingredients.
        </p>
      </section>

      {/* Our Story */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image src="https://i.pinimg.com/736x/6b/ad/48/6bad4859c63872911d751a58f23f4e7b.jpg" alt="Our bakery story" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Sweet Delights began as a small family bakery in 2003, founded by Maria and Giuseppe Rossi with a simple
              dream: to bring authentic, handcrafted baked goods to our community. What started as a humble neighborhood
              bakery has grown into a beloved local institution.
            </p>
            <p className="text-muted-foreground mb-4">
              Our journey has been one of passion, dedication, and an unwavering commitment to quality. Every recipe we
              use has been perfected over generations, passed down through our family and refined with modern techniques
              while maintaining traditional flavors.
            </p>
            <p className="text-muted-foreground">
              Today, we continue to honor our heritage while embracing innovation, creating new favorites alongside our
              time-tested classics. Our bakery remains a place where tradition meets creativity, and every item is made
              with love and attention to detail.
            </p>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="mb-16 bg-[#FDF6F8] rounded-lg p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Philosophy</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We believe that great baking starts with great ingredients and is perfected through time-honored techniques.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Quality Ingredients",
              description: "We source only the finest ingredients, from organic flours to premium Belgian chocolate.",
              icon: "🌾",
            },
            {
              title: "Traditional Methods",
              description: "Our bakers use time-tested techniques passed down through generations of artisans.",
              icon: "👨‍🍳",
            },
            {
              title: "Fresh Daily",
              description: "Everything is baked fresh daily, ensuring you get the best taste and quality.",
              icon: "🌅",
            },
          ].map((item, index) => (
            <Card key={index} className="text-center p-6">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Meet the Bakers */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet the Bakers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our talented team of bakers brings passion, skill, and creativity to everything we make.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Maria Rossi",
              role: "Head Baker & Co-Founder",
              image: "/placeholder.svg?height=300&width=300",
              bio: "With over 25 years of experience, Maria leads our team with passion and expertise in traditional European baking.",
            },
            {
              name: "Giuseppe Rossi",
              role: "Pastry Chef & Co-Founder",
              image: "/placeholder.svg?height=300&width=300",
              bio: "Giuseppe specializes in artisan pastries and custom cakes, bringing creativity and precision to every creation.",
            },
            {
              name: "Sophie Chen",
              role: "Senior Baker",
              image: "/placeholder.svg?height=300&width=300",
              bio: "Sophie joined our team 5 years ago and has become our expert in gluten-free and vegan baking options.",
            },
          ].map((baker, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-64">
                <Image src={baker.image || "/placeholder.svg"} alt={baker.name} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-1">{baker.name}</h3>
                <p className="text-pink-600 font-medium mb-3">{baker.role}</p>
                <p className="text-muted-foreground text-sm">{baker.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These core values guide everything we do, from sourcing ingredients to serving our customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Quality",
              description: "Never compromising on the quality of our ingredients or craftsmanship.",
            },
            {
              title: "Community",
              description: "Supporting our local community and building lasting relationships.",
            },
            {
              title: "Sustainability",
              description: "Committed to environmentally responsible practices and local sourcing.",
            },
            {
              title: "Innovation",
              description: "Continuously improving while respecting traditional baking methods.",
            },
          ].map((value, index) => (
            <Card key={index} className="p-6 text-center">
              <h3 className="text-lg font-bold mb-3">{value.title}</h3>
              <p className="text-muted-foreground text-sm">{value.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-8">Awards & Recognition</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              year: "2023",
              award: "Best Local Bakery",
              organization: "City Food Awards",
            },
            {
              year: "2022",
              award: "Excellence in Baking",
              organization: "Regional Culinary Institute",
            },
            {
              year: "2021",
              award: "Community Choice Award",
              organization: "Local Business Association",
            },
          ].map((award, index) => (
            <Card key={index} className="p-6">
              <div className="text-2xl font-bold text-pink-600 mb-2">{award.year}</div>
              <h3 className="text-lg font-bold mb-1">{award.award}</h3>
              <p className="text-muted-foreground text-sm">{award.organization}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
