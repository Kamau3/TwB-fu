"use client"

import { Target, Users, Lightbulb, HeartHandshake } from "lucide-react"

const reasons = [
  {
    icon: Target,
    title: "Results-Focused Approach",
    description: "We don't teach theory—we teach practical skills your team can use immediately. Every session includes hands-on exercises with real business scenarios."
  },
  {
    icon: Users,
    title: "Built for Kenyan Businesses",
    description: "We understand local market challenges, payment systems, and business culture. Our training is designed for how Kenyan organizations actually work."
  },
  {
    icon: Lightbulb,
    title: "Practical, Not Overwhelming",
    description: "No complex jargon or intimidating tech speak. We break down AI into simple, actionable steps that anyone on your team can follow."
  },
  {
    icon: HeartHandshake,
    title: "Partnership, Not Just Training",
    description: "We walk with you beyond the workshop. Ongoing support, follow-up sessions, and real help when you need it—we're invested in your success."
  }
]

export function WhyUs() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent via-card/50 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold mb-4">
            <span className="text-sm font-medium">Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Your Success is{" "}
            <span className="text-gold">Our Priority</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We&apos;re not just another AI company. We&apos;re your execution partner—focused on helping you achieve real, measurable outcomes.
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
