"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight } from "lucide-react"
import { WHATSAPP_URL } from "@/lib/constants"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl bg-gradient-to-br from-gold/10 via-card to-purple/10 border border-border p-8 md:p-12 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Ready to Explore How AI Can{" "}
              <span className="text-gold">Help Your Business</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
              Let&apos;s have a conversation about your goals. No pressure, no jargon—just a 
              straightforward discussion about what&apos;s possible for your team.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-gold hover:bg-gold-light text-primary-foreground font-semibold px-8 py-6 text-lg shadow-lg shadow-gold/20"
                asChild
              >
                <a 
                  href={WHATSAPP_URL("Hi! I'd like to learn more about AI solutions for my business.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-border text-foreground hover:bg-secondary font-semibold px-8 py-6 text-lg"
                asChild
              >
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
