"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle, Play, CheckCircle2 } from "lucide-react"
import { LOGOS, WHATSAPP_URL } from "@/lib/constants"

const transformations = [
  "Customer Service",
  "Marketing",
  "Sales",
  "Operations",
  "HR & Recruitment",
  "Finance"
]

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % transformations.length)
        setIsAnimating(false)
      }, 200)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,175,55,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_80%_50%,rgba(139,92,246,0.08),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Tagline badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-gold/20 to-purple/20 border border-gold/30 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
              </span>
              <span className="text-sm font-medium text-gold">Your AI Execution Partner</span>
            </div>

            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 leading-[1.1]">
              Transform Your{" "}
              <span className="relative inline-block">
                <span 
                  className={`text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold transition-all duration-200 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
                >
                  {transformations[currentIndex]}
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-gold to-gold-light rounded-full" />
              </span>
              <br />
              with AI
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Practical AI training, team workshops, and automation solutions 
              that deliver real business results for Kenyan companies.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <Button 
                size="lg" 
                className="h-14 px-8 bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-primary-foreground font-semibold text-lg shadow-xl shadow-gold/25 transition-all hover:shadow-gold/40 hover:scale-[1.02]"
                asChild
              >
                <a 
                  href={WHATSAPP_URL("Hi! I'm interested in AI training for my team.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start on WhatsApp
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="h-14 px-8 border-border text-foreground hover:bg-card font-semibold text-lg group"
                asChild
              >
                <Link href="/academy">
                  <Play className="mr-2 h-5 w-5 text-gold group-hover:scale-110 transition-transform" />
                  Explore Academy
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Kenyan Business Focus</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Hands-on Training</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Real Results</span>
              </div>
            </div>
          </div>

          {/* Right Content - Visual showcase */}
          <div className="hidden lg:block relative">
            {/* Main card */}
            <div className="relative">
              {/* Glow effects */}
              <div className="absolute -inset-4 bg-gradient-to-r from-gold/20 via-purple/10 to-gold/20 rounded-3xl blur-3xl opacity-60" />
              <div className="absolute -inset-px bg-gradient-to-r from-gold/50 via-transparent to-purple/50 rounded-3xl" />
              
              {/* Card content */}
              <div className="relative bg-card/90 backdrop-blur-xl rounded-3xl p-8 border border-border">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                  <Image 
                    src={LOGOS.standard} 
                    alt="Tech with Brands" 
                    width={280} 
                    height={280}
                    className="w-64 h-auto"
                    priority
                  />
                </div>

                {/* Stats preview */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background/50 rounded-xl p-4 border border-border">
                    <div className="text-3xl font-bold text-gold mb-1">AI</div>
                    <div className="text-sm text-muted-foreground">Training Programs</div>
                  </div>
                  <div className="bg-background/50 rounded-xl p-4 border border-border">
                    <div className="text-3xl font-bold text-purple-light mb-1">24/7</div>
                    <div className="text-sm text-muted-foreground">Support Available</div>
                  </div>
                  <div className="bg-background/50 rounded-xl p-4 border border-border">
                    <div className="text-3xl font-bold text-gold mb-1">KES</div>
                    <div className="text-sm text-muted-foreground">Local Pricing</div>
                  </div>
                  <div className="bg-background/50 rounded-xl p-4 border border-border">
                    <div className="text-3xl font-bold text-purple-light mb-1">PRO</div>
                    <div className="text-sm text-muted-foreground">Certified Team</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-gold/30 to-gold/10 rounded-2xl blur-xl animate-pulse" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-purple/30 to-purple/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
