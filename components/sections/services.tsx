"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Users, ClipboardCheck, Cog, ArrowRight } from "lucide-react"

const services = [
  {
    icon: GraduationCap,
    title: "Corporate AI Training",
    description: "Equip your team with AI skills they can use from day one. Hands-on sessions tailored to your industry and workflow.",
    href: "/services#training"
  },
  {
    icon: Users,
    title: "Team Workshops",
    description: "Intensive workshops that transform how your departments work. Marketing, finance, HR, operations—we cover it all.",
    href: "/services#workshops"
  },
  {
    icon: ClipboardCheck,
    title: "AI Readiness Audits",
    description: "Understand where AI can make the biggest impact in your business. Get a clear roadmap with actionable recommendations.",
    href: "/services#audits"
  },
  {
    icon: Cog,
    title: "Automation Implementation",
    description: "We build and deploy AI systems that handle your repetitive tasks. Customer responses, data entry, reporting—automated.",
    href: "/services#automation"
  }
]

export function Services() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 border border-purple/20 text-purple-light mb-4">
            <span className="text-sm font-medium">What We Do</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Transform How Your Team{" "}
            <span className="text-gold">Works with AI</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            From upskilling your workforce to automating operations, we provide practical AI solutions 
            that deliver measurable business outcomes.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-card border-border hover:border-gold/50 transition-all duration-300 group"
            >
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 rounded-lg bg-gold/10 text-gold group-hover:bg-gold/20 transition-colors">
                    <service.icon className="h-6 w-6" />
                  </div>
                </div>
                <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="ghost" 
                  className="text-gold hover:text-gold-light hover:bg-gold/10 p-0 h-auto font-medium"
                  asChild
                >
                  <Link href={service.href}>
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* CTA */}
        <div className="mt-12 text-center">
          <Button 
            size="lg"
            className="bg-gold hover:bg-gold-light text-primary-foreground"
            asChild
          >
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
