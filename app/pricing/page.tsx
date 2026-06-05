import { Metadata } from "next"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, MessageCircle, Star } from "lucide-react"
import { WHATSAPP_URL } from "@/lib/constants"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Pricing | Tech with Brands AI",
  description: "Transparent pricing for AI training, workshops, and automation services. Flexible plans for individuals, teams, and enterprises.",
}

const academyPlans = [
  {
    name: "Individual",
    description: "For professionals who want to master AI tools",
    price: "KES 4,999",
    period: "/month",
    features: [
      "AI Academy full access",
      "Weekly live sessions",
      "On-demand video library",
      "Community access",
      "Certificate on completion"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Business",
    description: "For teams ready to implement AI across departments",
    price: "KES 25,000",
    period: "/month",
    features: [
      "Up to 10 team members",
      "Custom training modules",
      "Monthly team workshops",
      "Priority WhatsApp support",
      "Quarterly progress reviews",
      "Implementation guidance"
    ],
    cta: "Contact Us",
    popular: true
  },
  {
    name: "Corporate",
    description: "For organizations transforming with AI at scale",
    price: "KES 75,000",
    period: "/month",
    features: [
      "Unlimited team members",
      "On-site training sessions",
      "Custom curriculum development",
      "Dedicated account manager",
      "Executive AI briefings",
      "Full AI readiness audit",
      "12-month transformation roadmap"
    ],
    cta: "Book a Call",
    popular: false
  }
]

const servicePricing = [
  {
    service: "AI Readiness Audit",
    price: "From KES 35,000",
    description: "Comprehensive assessment of your AI opportunities"
  },
  {
    service: "Team Workshop (Half-day)",
    price: "From KES 45,000",
    description: "Intensive 4-hour hands-on workshop"
  },
  {
    service: "Team Workshop (Full-day)",
    price: "From KES 75,000",
    description: "Full-day immersive training experience"
  },
  {
    service: "Corporate Training Program",
    price: "From KES 150,000",
    description: "Multi-week training for larger teams"
  },
  {
    service: "Automation Implementation",
    price: "Custom Quote",
    description: "Based on scope and complexity of automation needs"
  }
]

const faqs = [
  {
    question: "Do I need technical skills to join the Academy?",
    answer: "Not at all. Our programs are designed for beginners. We start with the basics and build up progressively. If you can use a smartphone, you can learn AI tools."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept M-Pesa, bank transfers, and card payments. For business and corporate plans, we can arrange monthly invoicing."
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer: "Yes. We offer a 14-day money-back guarantee on Academy subscriptions. If you're not happy with the content, we'll refund your payment—no questions asked."
  },
  {
    question: "How do team/corporate plans work?",
    answer: "Once you sign up, you'll get admin access to add team members. Each member gets their own login and can track their individual progress."
  },
  {
    question: "Do you offer discounts for NGOs or educational institutions?",
    answer: "Yes, we have special pricing for non-profits, schools, and government institutions. Reach out to us on WhatsApp to discuss your needs."
  },
  {
    question: "What's included in the on-site training?",
    answer: "On-site training includes a trainer at your location, customized materials, hands-on exercises, and post-training support. We handle everything—you just provide the venue and participants."
  }
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold mb-6">
            <span className="text-sm font-medium">Pricing</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Clear, Transparent{" "}
            <span className="text-gold">Pricing</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            No hidden fees, no surprises. Choose the plan that fits your needs and budget.
          </p>
        </div>
      </section>
      
      {/* Academy Plans */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            AI Academy{" "}
            <span className="text-gold">Subscriptions</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Monthly subscriptions with full access to training content, live sessions, and community.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {academyPlans.map((plan, index) => (
              <div key={index} className="group relative">
                {/* Glow effect */}
                {plan.popular && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold/40 to-gold/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}
                
                <Card 
                  className={`bg-card border-border relative transform transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2 group-hover:shadow-xl ${
                    plan.popular 
                      ? 'border-gold ring-2 ring-gold/20 group-hover:ring-gold/50 group-hover:shadow-gold/30' 
                      : 'group-hover:border-gold/50 group-hover:shadow-gold/20'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold text-primary-foreground text-sm font-medium animate-pulse">
                        <Star className="h-3 w-3 fill-current" />
                        Most Popular
                      </div>
                    </div>
                  )}
                  <CardHeader className="text-center pt-8">
                    <CardTitle className="text-xl text-foreground group-hover:text-gold transition-colors duration-300">{plan.name}</CardTitle>
                    <CardDescription className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                      {plan.description}
                    </CardDescription>
                    <div className="pt-4">
                      <span className="text-4xl font-bold text-foreground group-hover:text-gold transition-colors duration-300">{plan.price}</span>
                      <span className="text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                          <Check className="h-4 w-4 text-gold shrink-0 group-hover:scale-125 transition-transform duration-300" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full transform transition-all duration-300 group-hover:shadow-lg ${
                        plan.popular 
                          ? 'bg-gold hover:bg-gold-light text-primary-foreground group-hover:shadow-gold/50' 
                          : 'bg-secondary hover:bg-secondary/80 text-foreground border border-border group-hover:border-gold group-hover:shadow-gold/20'
                      }`}
                      asChild
                    >
                      <a 
                        href={WHATSAPP_URL(`Hi! I'm interested in the ${plan.name} Academy plan.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {plan.cta}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Service Pricing */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent via-card/50 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            Service{" "}
            <span className="text-gold">Pricing</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            One-time services and custom engagements. All prices are starting points—final quotes depend on your specific needs.
          </p>
          
          <div className="space-y-4">
            {servicePricing.map((item, index) => (
              <div key={index} className="group cursor-pointer">
                <Card className="bg-card border-border hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10 transform hover:scale-[1.01] hover:-translate-y-0.5">
                  <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-gold transition-colors duration-300">{item.service}</h3>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">{item.description}</p>
                    </div>
                    <div className="text-lg font-bold text-gold whitespace-nowrap group-hover:text-amber-300 transition-colors duration-300 group-hover:scale-110">{item.price}</div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              size="lg"
              className="bg-gold hover:bg-gold-light text-primary-foreground"
              asChild
            >
              <a 
                href={WHATSAPP_URL("Hi! I'd like to get a quote for your services.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Get a Custom Quote
              </a>
            </Button>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            Frequently Asked{" "}
            <span className="text-gold">Questions</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Got questions? We&apos;ve got answers.
          </p>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-foreground hover:text-gold text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
