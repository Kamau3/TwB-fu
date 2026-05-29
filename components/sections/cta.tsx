"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, Mail } from "lucide-react"

export function CTA() {
  const whatsappNumber = "254700000000"
  const whatsappMessage = encodeURIComponent("Hi! I want to learn more about AI training for my organization.")
  
  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl bg-gradient-to-br from-gold/20 via-card to-purple/20 border border-border p-8 md:p-12 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Ready to Transform Your Business with{" "}
              <span className="text-gold">AI</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
              Join 50+ Kenyan organizations already using AI to grow revenue, improve productivity, and stay ahead of the competition.
            </p>
            
            {/* Main CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
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
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
            
            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-muted-foreground">
              <a 
                href="tel:+254700000000" 
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Phone className="h-4 w-4" />
                +254 700 000 000
              </a>
              <a 
                href="mailto:hello@techwithbrands.ai" 
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Mail className="h-4 w-4" />
                hello@techwithbrands.ai
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
