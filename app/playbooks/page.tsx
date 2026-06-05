import { Metadata } from 'next'
import Link from 'next/link'
import { INDUSTRIES, WHATSAPP_URL } from '@/lib/constants'
import { ChevronRight, BookOpen, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Industry AI Playbooks | TwB',
  description: 'Industry-specific playbooks with implementation strategies, templates, and workflows for AI integration.',
}

export default function PlaybooksPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-purple/5" />
        
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Industry AI Playbooks
          </h1>
          <p className="text-xl text-foreground/70 mb-8">
            Proven implementation strategies, workflows, and templates tailored to your industry.
          </p>
        </div>
      </section>

      {/* Playbooks Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {INDUSTRIES.map((industry) => (
              <div key={industry} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-purple/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                
                <div className="relative bg-card border border-border rounded-2xl p-8 hover:border-gold/50 transition-all h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{industry}</h3>
                      <p className="text-foreground/60">Industry-specific AI strategies</p>
                    </div>
                    <BookOpen className="w-6 h-6 text-gold flex-shrink-0" />
                  </div>

                  <p className="text-foreground/70 flex-1 mb-6">
                    Get implementation-ready playbooks with best practices, case studies, and workflows specific to {industry.toLowerCase()}.
                  </p>

                  <div className="space-y-2 mb-8 text-sm text-foreground/60">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-gold" />
                      <span>Implementation steps</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-gold" />
                      <span>Workflow templates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-gold" />
                      <span>Success metrics</span>
                    </div>
                  </div>

                  <button className="w-full px-6 py-3 bg-gold text-background rounded-lg font-semibold hover:bg-gold/90 transition-all flex items-center justify-center gap-2 group/btn">
                    View Playbook
                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* What's Inside */}
          <div className="bg-card border border-border rounded-2xl p-12 mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">What&apos;s in Each Playbook</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">Implementation Guide</h4>
                <p className="text-foreground/70">Step-by-step instructions for implementing AI solutions in your industry, aligned with your AI readiness level.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">Workflow Templates</h4>
                <p className="text-foreground/70">Ready-to-use templates for process automation, governance, training programs, and change management.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">Success Metrics</h4>
                <p className="text-foreground/70">KPIs and benchmarks to measure AI impact, ROI, and progress toward your certification goals.</p>
              </div>
            </div>
          </div>

          {/* Premium Playbooks */}
          <div className="bg-gradient-to-r from-gold/10 to-purple/10 border border-gold/20 rounded-2xl p-12 mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">Need a Custom Playbook?</h2>
            <p className="text-foreground/70 mb-8">Our experts can create industry and organization-specific playbooks with your strategic goals and AI roadmap.</p>
            <a
              href={WHATSAPP_URL('Hi TwB! I want a custom AI playbook for my industry.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-background rounded-lg font-semibold hover:bg-gold/90 transition-all"
            >
              Request Custom Playbook
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
