"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "After the training, our customer service team responds 3x faster. We're handling more inquiries with the same staff and our clients love the quick turnaround.",
    author: "Sarah Mwangi",
    role: "Operations Manager",
    company: "Horizon Insurance",
    result: "3x faster response time"
  },
  {
    quote: "The AI audit showed us exactly where we were wasting time. We've automated our reporting and saved over 15 hours every week. The ROI was visible within the first month.",
    author: "James Ochieng",
    role: "CEO",
    company: "Nairobi Logistics",
    result: "15+ hours saved weekly"
  },
  {
    quote: "We were skeptical about AI training, but the team made it so practical. Our marketing department now creates content twice as fast without sacrificing quality.",
    author: "Grace Wambui",
    role: "Marketing Director",
    company: "Safari Tours Kenya",
    result: "2x content output"
  },
  {
    quote: "The corporate workshop transformed how our finance team works. What used to take days now takes hours. It's not magic—it's just better tools and better training.",
    author: "David Kamau",
    role: "Finance Director",
    company: "KenTech Solutions",
    result: "80% time reduction"
  }
]

export function Testimonials() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent via-purple/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 border border-purple/20 text-purple-light mb-4">
            <span className="text-sm font-medium">Success Stories</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Real Results from{" "}
            <span className="text-gold">Real Businesses</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Don&apos;t take our word for it. Here&apos;s what Kenyan businesses are achieving with our training.
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="pt-6">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-foreground mb-6 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                
                {/* Result Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gold/10 text-gold text-sm font-medium mb-4">
                  {testimonial.result}
                </div>
                
                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gold to-purple flex items-center justify-center text-primary-foreground font-semibold">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
