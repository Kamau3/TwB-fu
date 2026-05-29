"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Users, ClipboardCheck, Cog, ArrowRight, MessageCircle } from "lucide-react"

const services = [
  {
    icon: GraduationCap,
    title: "Corporate AI Training",
    description: "Hands-on training for your team to use AI tools effectively. From ChatGPT to custom workflows—your staff will be productive from day one.",
    benefits: ["Increase team productivity by 40%", "Reduce manual work hours", "Upskill entire departments"],
    price: "From KES 45,000",
    cta: "Book Team Training"
  },
  {
    icon: Users,
    title: "Team Workshops",
    description: "Intensive half-day or full-day workshops tailored to your industry. Marketing, finance, HR, customer service—we cover it all.",
    benefits: ["Industry-specific AI applications", "Hands-on exercises", "Immediate implementation"],
    price: "From KES 75,000",
    cta: "Schedule Workshop"
  },
  {
    icon: ClipboardCheck,
    title: "AI Readiness Audits",
    description: "Comprehensive assessment of your business processes to identify where AI can save you time and money. Get a clear roadmap.",
    benefits: ["Identify automation opportunities", "ROI projections", "Implementation roadmap"],
    price: "From KES 35,000",
    cta: "Request Audit"
  },
  {
    icon: Cog,
    title: "Automation Implementation",
    description: "We build and deploy AI systems that run your repetitive tasks. Customer responses, data entry, report generation—automated.",
    benefits: ["Save 20+ hours weekly", "Reduce errors by 90%", "Scale without hiring"],
    price: "From KES 150,000",
    cta: "Get Started"
  }
]

export function Services() {
  const whatsappNumber = "254700000000"
  
  return (
    <section id="services" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 border border-purple/20 text-purple-light mb-4">
            <span className="text-sm font-medium">Our Services</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Everything You Need to{" "}
            <span className="text-gold">Adopt AI</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            From training your team to automating your operations, we provide end-to-end AI solutions for Kenyan businesses.
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
                  <div className="text-sm font-semibold text-gold">{service.price}</div>
                </div>
                <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-secondary hover:bg-gold/20 text-foreground border border-border hover:border-gold/50"
                  asChild
                >
                  <a 
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi! I'm interested in: ${service.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {service.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
