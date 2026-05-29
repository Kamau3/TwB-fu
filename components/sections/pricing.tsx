"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, MessageCircle, Star } from "lucide-react"

const plans = [
  {
    name: "Individual",
    description: "For professionals who want to master AI tools",
    price: "KES 4,999",
    period: "/month",
    features: [
      "AI Academy access",
      "Weekly live sessions",
      "Tool tutorials & templates",
      "Community access",
      "Certificate on completion"
    ],
    cta: "Start Learning",
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
      "Quarterly AI audit",
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
      "Custom automation builds",
      "Dedicated account manager",
      "Executive AI briefings",
      "Full AI readiness audit",
      "12-month transformation roadmap"
    ],
    cta: "Book a Call",
    popular: false
  }
]

export function Pricing() {
  const whatsappNumber = "254700000000"
  
  return (
    <section id="pricing" className="py-20 px-4 bg-gradient-to-b from-transparent via-gold/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold mb-4">
            <span className="text-sm font-medium">Pricing</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Invest in Your Team&apos;s{" "}
            <span className="text-gold">AI Future</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Flexible plans designed for Kenyan businesses. No hidden fees. Cancel anytime.
          </p>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`bg-card border-border relative ${
                plan.popular ? 'border-gold ring-2 ring-gold/20' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold text-primary-foreground text-sm font-medium">
                    <Star className="h-3 w-3 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-xl text-foreground">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-gold shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gold hover:bg-gold-light text-primary-foreground' 
                      : 'bg-secondary hover:bg-secondary/80 text-foreground border border-border'
                  }`}
                  asChild
                >
                  <a 
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi! I'm interested in the ${plan.name} plan.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {plan.cta}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Custom Quote */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Need a custom solution? We create tailored packages for NGOs, schools, and government institutions.
          </p>
          <Button 
            variant="outline" 
            className="border-purple text-purple-light hover:bg-purple/10"
            asChild
          >
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi! I need a custom AI training solution.")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Request Custom Quote
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
