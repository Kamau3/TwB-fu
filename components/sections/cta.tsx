"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, ArrowRight } from "lucide-react"
import { WHATSAPP_URL, PHONE_NUMBER } from "@/lib/constants"
import Link from "next/link"

export function CTA() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-background to-purple/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_70%)]" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
          </span>
          <span className="text-sm font-medium">{"Let's Talk"}</span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
          Ready to Make Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
            Business AI-Ready?
          </span>
        </h2>

        {/* Description */}
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          {"Whether you're looking to train your team, automate processes, or just explore what AI can do for you—we're here to help. No pressure, just a conversation."}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button 
            size="lg"
            className="h-14 px-8 bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-primary-foreground font-semibold text-lg shadow-xl shadow-gold/25"
            asChild
          >
            <a 
              href={WHATSAPP_URL("Hi! I'd like to discuss AI solutions for my business.")}
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
            className="h-14 px-8 border-border font-semibold text-lg"
            asChild
          >
            <a href={`tel:${PHONE_NUMBER}`}>
              <Phone className="mr-2 h-5 w-5" />
              Call Us
            </a>
          </Button>
        </div>

        {/* Secondary link */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <span>Or</span>
          <Link href="/contact" className="text-gold hover:text-gold-light font-medium inline-flex items-center gap-1">
            send us a message
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
