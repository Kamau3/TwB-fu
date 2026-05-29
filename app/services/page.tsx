import { Metadata } from "next"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Users, ClipboardCheck, Cog, MessageCircle, CheckCircle2 } from "lucide-react"
import { WHATSAPP_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Services | Tech with Brands AI",
  description: "Corporate AI training, team workshops, AI readiness audits, and automation implementation for Kenyan businesses.",
}

const services = [
  {
    id: "training",
    icon: GraduationCap,
    title: "Corporate AI Training",
    description: "Equip your entire workforce with AI skills they can apply immediately. Our training programs are designed for different skill levels and departments.",
    benefits: [
      "Customized curriculum for your industry",
      "Hands-on exercises with real tools",
      "Progress tracking and assessments",
      "Post-training support and resources",
      "Flexible scheduling (on-site or virtual)"
    ],
    ideal: "Organizations looking to upskill teams of 10+ employees across multiple departments."
  },
  {
    id: "workshops",
    icon: Users,
    title: "Team Workshops",
    description: "Intensive half-day or full-day sessions focused on specific AI applications. Perfect for teams that need targeted skills quickly.",
    benefits: [
      "Focused, hands-on learning experience",
      "Department-specific AI applications",
      "Immediate implementation strategies",
      "Take-home templates and resources",
      "Follow-up Q&A session included"
    ],
    ideal: "Teams of 5-20 people who need to solve specific challenges with AI tools."
  },
  {
    id: "audits",
    icon: ClipboardCheck,
    title: "AI Readiness Audits",
    description: "A comprehensive assessment of your business processes to identify where AI can save you time, reduce costs, and improve quality.",
    benefits: [
      "Deep analysis of current workflows",
      "Identification of automation opportunities",
      "ROI projections for AI implementation",
      "Prioritized action plan",
      "Executive-ready presentation"
    ],
    ideal: "Business leaders who want a clear picture of AI opportunities before committing to implementation."
  },
  {
    id: "automation",
    icon: Cog,
    title: "Automation Implementation",
    description: "We design, build, and deploy AI-powered systems that handle your repetitive tasks—so your team can focus on higher-value work.",
    benefits: [
      "Custom automation solutions",
      "Integration with existing tools",
      "Training on new systems",
      "Ongoing maintenance and support",
      "Performance monitoring and optimization"
    ],
    ideal: "Organizations ready to automate specific processes like customer support, data entry, or reporting."
  }
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold mb-6">
            <span className="text-sm font-medium">Our Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            AI Solutions That{" "}
            <span className="text-gold">Deliver Results</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            From training your team to automating your operations, we provide end-to-end AI solutions 
            designed for how Kenyan businesses actually work.
          </p>
        </div>
      </section>
      
      {/* Services Detail */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          {services.map((service, index) => (
            <Card key={index} id={service.id} className="bg-card border-border overflow-hidden scroll-mt-20">
              <div className="grid md:grid-cols-3 gap-0">
                <CardHeader className="md:col-span-2 p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-gold/10 text-gold">
                      <service.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-foreground mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3">What You Get:</h4>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardHeader>
                
                <CardContent className="bg-secondary/30 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Ideal For:</h4>
                    <p className="text-sm text-muted-foreground mb-6">{service.ideal}</p>
                  </div>
                  
                  <Button 
                    className="w-full bg-gold hover:bg-gold-light text-primary-foreground"
                    asChild
                  >
                    <a 
                      href={WHATSAPP_URL(`Hi! I'm interested in: ${service.title}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Inquire Now
                    </a>
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Not sure which service is right for you?
          </h2>
          <p className="text-muted-foreground mb-6">
            Let&apos;s have a conversation. We&apos;ll help you identify the best approach for your specific needs.
          </p>
          <Button 
            size="lg"
            className="bg-gold hover:bg-gold-light text-primary-foreground"
            asChild
          >
            <a 
              href={WHATSAPP_URL("Hi! I'd like to discuss which AI service is right for my business.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Let&apos;s Talk
            </a>
          </Button>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
