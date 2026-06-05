import { Metadata } from 'next'
import Link from 'next/link'
import { ASSESSMENT_TYPES, WHATSAPP_URL } from '@/lib/constants'
import { ChevronRight, Clock, CheckCircle, Brain } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Readiness Assessments | TwB',
  description: 'Assess your organization\'s AI maturity across 8 critical dimensions. Free, Professional, and Enterprise assessments available.',
}

export default function AssessmentsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-purple/5" />
        
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            AI Readiness Assessments
          </h1>
          <p className="text-xl text-foreground/70 mb-8">
            Understand where your organization stands on the AI maturity journey. Get clear insights across 8 critical dimensions.
          </p>
        </div>
      </section>

      {/* Assessment Options */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {ASSESSMENT_TYPES.map((assessment) => (
              <div key={assessment.type} className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-purple/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                
                {/* Card */}
                <div className="relative bg-card border border-border rounded-2xl p-8 hover:border-gold/50 transition-all h-full flex flex-col">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{assessment.name}</h3>
                  
                  <div className="space-y-3 mb-8 flex-1">
                    <div className="flex items-center gap-3 text-foreground/70">
                      <Clock className="w-5 h-5 text-gold" />
                      <span>{assessment.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground/70">
                      <Brain className="w-5 h-5 text-gold" />
                      <span>{assessment.questions} questions</span>
                    </div>
                    <div className="text-3xl font-bold text-gold mt-6">{assessment.price}</div>
                  </div>

                  <p className="text-sm text-foreground/60 mb-6">
                    {assessment.type === 'free' && 'Perfect for a quick understanding of your AI readiness baseline.'}
                    {assessment.type === 'professional' && 'Comprehensive assessment with detailed AI Genome profile and recommendations.'}
                    {assessment.type === 'enterprise' && 'Full organizational assessment with certification pathway and implementation roadmap.'}
                  </p>

                  <Link
                    href={`/assessments/${assessment.type}`}
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-gold text-background rounded-lg font-semibold hover:bg-gold/90 transition-all gap-2 group/btn"
                  >
                    Start Assessment
                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* AI Genome Explanation */}
          <div className="bg-card border border-border rounded-2xl p-12 mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">Your AI Genome Report</h2>
            <p className="text-foreground/70 mb-8">
              Every assessment generates a personalized AI Genome profile measuring your organization across 8 critical dimensions:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { name: 'Capability', desc: 'Technical infrastructure and system readiness' },
                { name: 'Governance', desc: 'Policies, compliance, and ethical frameworks' },
                { name: 'Workforce', desc: 'Skills, training, and organizational readiness' },
                { name: 'Data', desc: 'Quality, management, and accessibility' },
                { name: 'Automation', desc: 'Process optimization and efficiency gains' },
                { name: 'Innovation', desc: 'Competitive advantage and differentiation' },
                { name: 'ROI', desc: 'Financial impact and value realization' },
                { name: 'Risk', desc: 'Security, liability, and mitigation' },
              ].map((dim) => (
                <div key={dim.name} className="flex gap-4 p-4 rounded-lg bg-background/50 border border-border/50">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">{dim.name}</h4>
                    <p className="text-sm text-foreground/60">{dim.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-gold/10 to-purple/10 border border-gold/20 rounded-2xl p-12 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Questions about assessments?</h2>
            <p className="text-foreground/70 mb-8">Our team is ready to help you choose the right assessment for your organization.</p>
            <a
              href={WHATSAPP_URL('Hi TwB! I want to learn more about your AI assessments.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-background rounded-lg font-semibold hover:bg-gold/90 transition-all"
            >
              Contact Us on WhatsApp
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
