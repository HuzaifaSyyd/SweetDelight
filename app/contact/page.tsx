import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export const metadata = {
  title: "Contact Us - Sweet Delights Bakery",
  description: "Get in touch with Sweet Delights Bakery. Visit us, call us, or send us a message.",
}

export default function ContactPage() {
  return (
    <div className="container py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We'd love to hear from you! Get in touch with us for orders, questions, or just to say hello.
        </p>
      </section>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-pink-500 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Visit Our Bakery</h3>
                  <p className="text-muted-foreground">
                    123 Bakery Street
                    <br />
                    Sweet City, SC 12345
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-pink-500 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Call Us</h3>
                  <p className="text-muted-foreground">(555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-pink-500 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Email Us</h3>
                  <p className="text-muted-foreground">info@sweetdelights.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-pink-500 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Opening Hours</h3>
                  <div className="text-muted-foreground space-y-1">
                    <p>Monday - Friday: 7:00 AM - 7:00 PM</p>
                    <p>Saturday - Sunday: 8:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <Card>
            <CardContent className="p-0">
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Interactive Map Coming Soon</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter your last name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Enter your phone number" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What is this regarding?" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Tell us how we can help you..." className="min-h-[120px]" />
              </div>

              <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              question: "Do you take custom cake orders?",
              answer:
                "Yes! We love creating custom cakes for special occasions. Please contact us at least 48 hours in advance for custom orders.",
            },
            {
              question: "Do you offer gluten-free options?",
              answer:
                "We have a variety of gluten-free breads, pastries, and cakes available daily. Please ask our staff for current options.",
            },
            {
              question: "Can I place orders online?",
              answer:
                "Yes, you can browse our menu and place orders online for pickup or delivery within our service area.",
            },
            {
              question: "Do you cater events?",
              answer:
                "We offer catering services for events of all sizes. Contact us to discuss your catering needs and we'll create a custom package for you.",
            },
          ].map((faq, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
