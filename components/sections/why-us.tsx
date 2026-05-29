"use client"

import { TrendingUp, Users, Target, Wallet } from "lucide-react"

const reasons = [
  {
    icon: Target,
    title: "Results-Focused Training",
    description: "We don't teach theory—we teach practical skills your team can use immediately. Every session includes hands-on exercises with real business scenarios."
  },
  {
    icon: Users,
    title: "Local Support & Understanding",
    description: "We understand Kenyan businesses. From M-Pesa integrations to local market challenges, our training is built for how you actually work."
  },
  {
    icon: TrendingUp,
    title: "Measurable Business Outcomes",
    description: "Track your ROI. Our clients report 40% productivity gains, 3x faster customer response times, and significant cost savings within 90 days."
  },
  {
    icon: Wallet,
    title: "Affordable & Transparent",
    description: "No surprises. Clear KES pricing, flexible payment plans, and packages designed for every budget—from startups to enterprises."
  }
]

export function WhyUs() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold mb-4">
            <span className="text-sm font-medium">Why Tech with Brands AI</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Built for{" "}
            <span className="text-gold">Kenyan Businesses</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We&apos;ve trained 500+ professionals and helped 50+ organizations adopt AI. Here&apos;s why they chose us.
          </p>
        </div>
        
        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="flex gap-5 p-6 rounded-xl bg-card border border-border hover:border-gold/30 transition-colors"
            >
              <div className="shrink-0">
                <div className="p-3 rounded-lg bg-gold/10 text-gold">
                  <reason.icon className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{reason.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
