import { Metadata } from 'next'
import Link from 'next/link'
import { CERTIFICATION_LEVELS, WHATSAPP_URL } from '@/lib/constants'
import { ChevronRight, CheckCircle, Award } from 'lucide-react'
import { Navbar } from '@/components/sections/navbar'
import { Footer } from '@/components/sections/footer'
import { PageHero } from '@/components/sections/page-hero'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'AI Excellence Certification | TwB',
  description: '5 levels of AI certification from Foundational to Excellence. Get recognized for your AI maturity and organizational readiness.',
}

export default function CertificationPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        title="AI Excellence Certification"
        description="Achieve industry-recognized certification. Demonstrate your organization&apos;s AI maturity to stakeholders, partners, and markets."
      />

      {/* Certification Levels */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-12">5 Levels to Excellence</h2>
            
            <div className="space-y-6">
              {CERTIFICATION_LEVELS.map((level, index) => (
                <div key={level.level} className="group relative cursor-pointer">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/30 to-purple/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative bg-card border border-border rounded-xl p-8 hover:border-gold transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-gold/20">
                    <div className="grid md:grid-cols-12 gap-8 items-start">
                      {/* Level indicator */}
                      <div className="md:col-span-2">
                        <div className="inline-flex flex-col items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 border-2 border-gold group-hover:border-amber-300 group-hover:from-gold/50 group-hover:to-gold/30 transition-all duration-300 transform group-hover:scale-125">
                          <span className="text-3xl font-bold text-gold group-hover:text-amber-300 transition-colors duration-300">{level.level}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="md:col-span-10">
                        <h3 className="text-2xl font-bold text-foreground mb-2">{level.name}</h3>
                        <p className="text-foreground/70 mb-6">{level.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-gold" />
                              Requirements
                            </h4>
                            <ul className="space-y-2 text-sm text-foreground/60">
                              {level.level === 1 && (
                                <>
                                  <li>• Complete Free Assessment</li>
                                  <li>• Score minimum 40+ on AI Genome</li>
                                  <li>• Understanding of AI basics</li>
                                </>
                              )}
                              {level.level === 2 && (
                                <>
                                  <li>• Complete Professional Assessment</li>
                                  <li>• Score minimum 60+ on AI Genome</li>
                                  <li>• Implement 3+ AI initiatives</li>
                                  <li>• Basic governance framework</li>
                                </>
                              )}
                              {level.level === 3 && (
                                <>
                                  <li>• Score 75+ on AI Genome</li>
                                  <li>• Enterprise-wide AI strategy</li>
                                  <li>• Documented AI governance</li>
                                  <li>• Data management practices</li>
                                </>
                              )}
                              {level.level === 4 && (
                                <>
                                  <li>• Score 85+ on AI Genome</li>
                                  <li>• Advanced compliance framework</li>
                                  <li>• Measured ROI metrics</li>
                                  <li>• Risk management program</li>
                                </>
                              )}
                              {level.level === 5 && (
                                <>
                                  <li>• Score 95+ on AI Genome</li>
                                  <li>• Global benchmark excellence</li>
                                  <li>• Industry thought leadership</li>
                                  <li>• Continuous innovation culture</li>
                                </>
                              )}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                              <Award className="w-5 h-5 text-gold" />
                              Benefits
                            </h4>
                            <ul className="space-y-2 text-sm text-foreground/60">
                              <li>• Digital badge for your website</li>
                              <li>• Public verification credentials</li>
                              <li>• Industry recognition</li>
                              <li>• Benchmark comparison reports</li>
                              {level.level >= 3 && <li>• Strategic roadmap</li>}
                              {level.level >= 4 && <li>• Executive dashboard access</li>}
                              {level.level === 5 && <li>• Global leadership program</li>}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certification Process */}
          <div className="bg-card border border-border rounded-2xl p-12 mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Certification Process</h2>
            
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { step: 1, title: 'Assess', desc: 'Complete your AI readiness assessment' },
                { step: 2, title: 'Review', desc: 'Get your AI Genome profile results' },
                { step: 3, title: 'Evidence', desc: 'Submit implementation evidence' },
                { step: 4, title: 'Certify', desc: 'Receive your official badge' },
              ].map((item, index) => (
                <div key={item.step} className="group cursor-pointer relative">
                  {index < 3 && (
                    <div className="absolute left-1/2 top-10 w-4 h-0.5 bg-gradient-to-r from-gold to-transparent -translate-x-full group-hover:from-gold group-hover:to-gold transition-all duration-300" />
                  )}
                  
                  <div className="text-center p-4 rounded-lg hover:bg-gold/5 transition-all duration-300 transform group-hover:scale-105">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/20 border-2 border-gold text-gold font-bold mb-4 group-hover:bg-gold/40 group-hover:border-amber-300 group-hover:text-amber-300 group-hover:scale-125 transition-all duration-300">
                      {item.step}
                    </div>
                    <h4 className="font-semibold text-foreground mb-2 group-hover:text-gold transition-colors duration-300">{item.title}</h4>
                    <p className="text-sm text-foreground/60 group-hover:text-foreground/80 transition-colors duration-300">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <CTASection
            heading="Ready to Get Certified?"
            description="Start with our free assessment and begin your certification journey today."
          >
            <Link
              href="/assessments"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gold text-background rounded-lg font-semibold hover:bg-gold/90 transition-all"
            >
              Take Assessment
              <ChevronRight className="w-5 h-5" />
            </Link>
            <a
              href={WHATSAPP_URL('Hi TwB! I want to discuss AI certification for my organization.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-gold text-gold rounded-lg font-semibold hover:bg-gold/10 transition-all"
            >
              Talk to Expert
            </a>
          </CTASection>
        </div>
      </section>
      <Footer />
    </main>
  )
}
