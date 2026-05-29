"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle, Sparkles, Zap, TrendingUp } from "lucide-react"
import { LOGOS, WHATSAPP_URL } from "@/lib/constants"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-background to-background" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">AI Execution Partner</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
              Make Your Team{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">AI-Ready</span>{" "}
              for the Future
            </h1>
            
            {/* Value proposition */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 text-pretty leading-relaxed">
              We help Kenyan businesses unlock the power of AI through practical training, 
              hands-on workshops, and automation that delivers real results.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <Button 
                size="lg" 
                className="bg-gold hover:bg-gold-light text-primary-foreground font-semibold px-8 py-6 text-lg shadow-lg shadow-gold/20"
                asChild
              >
                <a 
                  href={WHATSAPP_URL("Hi! I'd like to discuss AI training for my team.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start a Conversation
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-border text-foreground hover:bg-secondary font-semibold px-8 py-6 text-lg"
                asChild
              >
                <Link href="/services">
                  Explore Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            {/* Value highlights */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-gold" />
                <span>Practical Training</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-gold" />
                <span>Real Results</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-gold" />
                <span>Kenya-Focused</span>
              </div>
            </div>
          </div>
          
          {/* Right Content - Logo showcase */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-purple/20 rounded-3xl blur-3xl" />
              
              {/* Logo card */}
              <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-12">
                <Image 
                  src={LOGOS.standard} 
                  alt="Tech with Brands" 
                  width={400} 
                  height={400}
                  className="w-80 h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
