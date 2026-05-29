"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle, GraduationCap } from "lucide-react"

export function Hero() {
  const whatsappNumber = "254700000000" // Replace with actual WhatsApp number
  const whatsappMessage = encodeURIComponent("Hi! I'm interested in AI training for my team.")
  
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-purple/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold mb-8">
          <span className="text-sm font-medium">Trusted by 50+ Kenyan Organizations</span>
        </div>
        
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
          Train Your Team.{" "}
          <span className="text-gold">Deploy AI.</span>{" "}
          <span className="text-purple-light">Grow Faster.</span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 text-pretty leading-relaxed">
          Practical AI training, team workshops, and automation systems that help Kenyan businesses 
          increase revenue, improve productivity, and stay ahead of the competition.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button 
            size="lg" 
            className="bg-gold hover:bg-gold-light text-primary-foreground font-semibold px-8 py-6 text-lg"
            asChild
          >
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Book Training via WhatsApp
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-purple text-purple-light hover:bg-purple/10 font-semibold px-8 py-6 text-lg"
            asChild
          >
            <a href="#academy">
              <GraduationCap className="mr-2 h-5 w-5" />
              Join AI Academy
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 pt-8 border-t border-border">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gold">500+</div>
            <div className="text-sm text-muted-foreground">Professionals Trained</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gold">50+</div>
            <div className="text-sm text-muted-foreground">Organizations Served</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-light">40%</div>
            <div className="text-sm text-muted-foreground">Avg. Productivity Gain</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-light">3x</div>
            <div className="text-sm text-muted-foreground">Faster Operations</div>
          </div>
        </div>
      </div>
    </section>
  )
}
