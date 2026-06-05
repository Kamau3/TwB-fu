import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { PageHero } from "@/components/sections/page-hero"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, Eye, Heart, Users, ArrowRight, MessageCircle } from "lucide-react"
import { LOGOS, WHATSAPP_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "About Us | Tech with Brands AI",
  description: "Learn about Tech with Brands - your AI execution partner helping Kenyan businesses train teams and automate operations.",
}

const values = [
  {
    icon: Target,
    title: "Practical Over Theoretical",
    description: "We focus on skills you can use immediately, not abstract concepts. Every training session ends with something you can apply the next day."
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Clear communication, honest pricing, and realistic expectations. We tell you what AI can and can't do for your business."
  },
  {
    icon: Heart,
    title: "Partnership",
    description: "We're not vendors—we're partners in your success. We invest in understanding your business and stay with you beyond the training."
  },
  {
    icon: Users,
    title: "Accessibility",
    description: "AI shouldn't be intimidating or exclusive. We make it approachable for everyone, regardless of technical background."
  }
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <PageHero
        label="About Us"
        title="Your AI"
        highlight="Execution Partner"
        description="We help Kenyan businesses harness the power of AI—not through complex technology, but through practical training and solutions that deliver real results."
      />
      
      {/* Mission */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                AI is transforming how businesses operate worldwide, but many Kenyan organizations 
                are being left behind—not because they lack ambition, but because they lack 
                practical guidance on where to start.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We exist to bridge that gap. Our mission is to make AI accessible, practical, and 
                results-driven for businesses across Kenya. We believe every organization, regardless 
                of size or industry, should be able to leverage AI to grow revenue, improve 
                productivity, and compete in the modern economy.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We don&apos;t just teach AI—we walk with you through implementation. From the first 
                training session to the automation that transforms your operations, we&apos;re your 
                partner every step of the way.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-purple/20 rounded-3xl blur-3xl" />
                <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8">
                  <Image 
                    src={LOGOS.standard} 
                    alt="Tech with Brands" 
                    width={300} 
                    height={300}
                    className="w-64 h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent via-card/50 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              What We{" "}
              <span className="text-gold">Stand For</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our values guide everything we do—from how we design our training to how we support our clients.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-6 flex gap-4">
                  <div className="shrink-0">
                    <div className="p-3 rounded-lg bg-gold/10 text-gold">
                      <value.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Let&apos;s Start a Conversation
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            We&apos;d love to learn about your business and explore how we can help. 
            No pressure, no sales pitch—just a straightforward conversation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              className="bg-gold hover:bg-gold-light text-primary-foreground"
              asChild
            >
              <a 
                href={WHATSAPP_URL("Hi! I'd like to learn more about Tech with Brands.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </a>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-secondary"
              asChild
            >
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
