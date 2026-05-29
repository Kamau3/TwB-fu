"use client"

import { useRef } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Users, ClipboardCheck, Cog, ArrowRight, Sparkles } from "lucide-react"

const services = [
  {
    icon: GraduationCap,
    title: "Corporate AI Training",
    description: "Custom training programs that give your team practical AI skills they can apply immediately. No fluff, just results.",
    features: ["Role-specific curriculum", "Hands-on exercises", "Real tool proficiency"],
    gradient: "from-gold/20 to-gold/5",
    iconBg: "bg-gold/20",
    href: "/services#training"
  },
  {
    icon: Users,
    title: "Team Workshops",
    description: "Intensive sessions that transform department workflows. Marketing, finance, HR, operations—every team benefits.",
    features: ["Department-focused", "Interactive learning", "Immediate application"],
    gradient: "from-purple/20 to-purple/5",
    iconBg: "bg-purple/20",
    href: "/services#workshops"
  },
  {
    icon: ClipboardCheck,
    title: "AI Readiness Audits",
    description: "Discover where AI can create the most impact in your business. Get a clear roadmap tailored to your needs.",
    features: ["Process analysis", "Opportunity mapping", "Actionable roadmap"],
    gradient: "from-green-500/20 to-green-500/5",
    iconBg: "bg-green-500/20",
    href: "/services#audits"
  },
  {
    icon: Cog,
    title: "Automation Implementation",
    description: "We build and deploy AI systems that handle repetitive tasks. Customer responses, data entry, reporting—automated.",
    features: ["Custom solutions", "Seamless integration", "Ongoing support"],
    gradient: "from-blue-500/20 to-blue-500/5",
    iconBg: "bg-blue-500/20",
    href: "/services#automation"
  }
]

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={sectionRef} className="relative py-24 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6">
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium text-foreground">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Transform How Your Team{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
              Works with AI
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From upskilling your workforce to automating operations, we provide practical 
            solutions that deliver measurable outcomes.
          </p>
        </div>

        {/* Services Grid - Bento style */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden bg-card border-border hover:border-gold/30 transition-all duration-500"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <CardContent className="relative p-8">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl ${service.iconBg} mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <service.icon className="h-8 w-8 text-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <Link 
                  href={service.href}
                  className="inline-flex items-center gap-2 text-gold font-medium group-hover:gap-3 transition-all"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-card border border-border">
            <p className="text-foreground">
              Not sure which service fits your needs?
            </p>
            <Button 
              className="bg-gold hover:bg-gold-light text-primary-foreground font-medium"
              asChild
            >
              <Link href="/contact">
                Get a Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
