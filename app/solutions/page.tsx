import { Metadata } from 'next'
import { SOLUTIONS_CATEGORIES, WHATSAPP_URL } from '@/lib/constants'
import { ChevronRight, Star, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solutions Registry | TwB',
  description: 'Curated registry of AI solutions and tools aligned with TwB certification standards.',
}

const SAMPLE_SOLUTIONS = [
  {
    id: 1,
    name: 'Enterprise AI Platform Pro',
    vendor: 'TechCorp AI',
    category: 'Enterprise AI Platforms',
    description: 'Comprehensive AI platform for enterprise operations',
    rating: 4.8,
    certified: true,
    tags: ['Automation', 'Analytics', 'Governance'],
  },
  {
    id: 2,
    name: 'DataFlow Intelligence',
    vendor: 'DataSystems Inc',
    category: 'Data & Analytics',
    description: 'Advanced data management and analytics solution',
    rating: 4.6,
    certified: true,
    tags: ['Data Quality', 'Analytics', 'Governance'],
  },
  {
    id: 3,
    name: 'AutomateFlow RPA',
    vendor: 'Process Labs',
    category: 'Automation & RPA',
    description: 'Robotic Process Automation for business workflows',
    rating: 4.7,
    certified: true,
    tags: ['Automation', 'Efficiency', 'ROI'],
  },
  {
    id: 4,
    name: 'ComplianceGuard AI',
    vendor: 'GovTech Solutions',
    category: 'Governance & Compliance',
    description: 'AI-powered governance and compliance management',
    rating: 4.5,
    certified: true,
    tags: ['Governance', 'Risk', 'Compliance'],
  },
]

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-purple/5" />
        
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Solutions Registry
          </h1>
          <p className="text-xl text-foreground/70 mb-8">
            Curated and certified AI solutions aligned with TwB standards. Find the right tools for your organization.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-semibold text-foreground mb-6">Browse by Category</h3>
          <div className="flex flex-wrap gap-3">
            {SOLUTIONS_CATEGORIES.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full bg-card border border-border hover:border-gold/50 text-foreground transition-all hover:bg-card/80"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {SAMPLE_SOLUTIONS.map((solution) => (
              <div key={solution.id} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-purple/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                
                <div className="relative bg-card border border-border rounded-2xl p-8 hover:border-gold/50 transition-all h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{solution.name}</h3>
                      <p className="text-sm text-foreground/60">{solution.vendor}</p>
                    </div>
                    {solution.certified && (
                      <div className="flex items-center gap-1 bg-gold/20 text-gold px-3 py-1 rounded-full text-xs font-semibold">
                        <Award className="w-3 h-3" />
                        Certified
                      </div>
                    )}
                  </div>

                  <p className="text-foreground/70 mb-6 flex-1">{solution.description}</p>

                  {/* Category badge */}
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">
                      {solution.category}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {solution.tags.map((tag) => (
                      <span key={tag} className="text-xs text-foreground/60 bg-background/50 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Rating and CTA */}
                  <div className="flex items-center justify-between pt-6 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(solution.rating)
                                ? 'text-gold fill-gold'
                                : 'text-foreground/20'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-foreground">{solution.rating}</span>
                    </div>
                    <button className="text-gold hover:text-gold/80 font-semibold text-sm transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Submit Solution CTA */}
          <div className="bg-gradient-to-r from-gold/10 to-purple/10 border border-gold/20 rounded-2xl p-12 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Have a Solution to Showcase?</h2>
            <p className="text-foreground/70 mb-8">Submit your AI solution for TwB certification and reach our global community.</p>
            <a
              href={WHATSAPP_URL('Hi TwB! I want to submit my AI solution to your registry.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-background rounded-lg font-semibold hover:bg-gold/90 transition-all"
            >
              Submit Your Solution
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
