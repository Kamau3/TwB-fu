'use client'

import Link from 'next/link'
import Image from 'next/image'
import { LOGOS, COMPANY, WHATSAPP_URL, AI_GENOME_DIMENSIONS } from '@/lib/constants'
import { ChevronRight, Award, TrendingUp, Sparkles, Radar } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen bg-background overflow-hidden flex flex-col">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-purple/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-20 z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-gold/10 border border-gold/30 backdrop-blur-sm">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
          </div>
          <span className="text-sm font-semibold text-gold">{COMPANY.tagline}</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-foreground text-center mb-6 leading-tight max-w-4xl">
          Know Your <span className="text-gold">AI Potential</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-foreground/70 text-center max-w-2xl mb-8 leading-relaxed">
          <span className="font-semibold text-gold">{COMPANY.mission}</span>
          <br />
          Get your organization certified on the global standard for AI excellence.
        </p>

        {/* Description */}
        <p className="text-lg text-foreground/60 text-center max-w-2xl mb-12">
          Assess your AI readiness across 8 critical dimensions. Get a personalized genome profile. Achieve certification. Reach global benchmark excellence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/assessments"
            className="group px-8 py-4 bg-gradient-to-r from-gold to-amber-500 text-background rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-gold/40 transition-all hover:scale-[1.02]"
          >
            Take Free Assessment
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href={WHATSAPP_URL('Hi TwB! I want to discuss AI certification for my organization.')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-gold text-gold rounded-lg font-semibold hover:bg-gold/10 transition-all"
          >
            Schedule Consultation
          </a>
        </div>

        {/* AI Genome Preview - 8 dimensions radar */}
        <div className="w-full max-w-5xl mb-16">
          <div className="relative group">
            {/* Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-gold/20 via-purple/20 to-gold/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Card */}
            <div className="relative bg-card/80 backdrop-blur-xl border border-gold/20 rounded-2xl p-8 md:p-12">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">AI Genome Assessment</h3>
                  <p className="text-foreground/60">8 dimensions of AI maturity</p>
                </div>
                <Radar className="w-8 h-8 text-gold flex-shrink-0" />
              </div>

              {/* Dimensions Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {AI_GENOME_DIMENSIONS.slice(0, 8).map((dimension) => (
                  <div key={dimension.id} className="group/dim cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg bg-background/50 border border-border p-4 hover:border-gold/50 transition-all hover:bg-background/80">
                      <div className="text-2xl font-bold text-gold mb-2">
                        {dimension.name.charAt(0)}
                      </div>
                      <h4 className="font-semibold text-foreground text-sm mb-1">{dimension.name}</h4>
                      <p className="text-xs text-foreground/50 line-clamp-2">{dimension.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/50">
                <div className="text-center">
                  <Award className="w-6 h-6 text-gold mx-auto mb-3" />
                  <h4 className="font-semibold text-foreground mb-1">5 Certification Levels</h4>
                  <p className="text-sm text-foreground/60">Clear pathway from Foundational to Excellence</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-6 h-6 text-gold mx-auto mb-3" />
                  <h4 className="font-semibold text-foreground mb-1">Industry Benchmarks</h4>
                  <p className="text-sm text-foreground/60">Compare against global and local standards</p>
                </div>
                <div className="text-center">
                  <Sparkles className="w-6 h-6 text-gold mx-auto mb-3" />
                  <h4 className="font-semibold text-foreground mb-1">Personalized Roadmap</h4>
                  <p className="text-sm text-foreground/60">Actionable recommendations for your organization</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2 text-foreground/70">
            <div className="w-2 h-2 bg-gold rounded-full" />
            <span>Global Standard</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/70">
            <div className="w-2 h-2 bg-gold rounded-full" />
            <span>Evidence-Based Assessment</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/70">
            <div className="w-2 h-2 bg-gold rounded-full" />
            <span>Industry Leaders</span>
          </div>
        </div>
      </div>
    </section>
  )
}
