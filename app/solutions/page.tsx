import { Metadata } from 'next'
import { SOLUTIONS_CATEGORIES, WHATSAPP_URL } from '@/lib/constants'
import { ChevronRight, Award, Star } from 'lucide-react'
import { Navbar } from '@/components/sections/navbar'
import { Footer } from '@/components/sections/footer'
import { PageHero } from '@/components/sections/page-hero'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'AI Solutions | TwB',
  description: 'Enterprise AI solutions: Multi-Agent Systems, Governance, AI Genome, and analytics for African businesses.',
}

const SAMPLE_SOLUTIONS = [
  {
    id: "multi-agent",
    name: "Multi-Agent System",
    vendor: "TwB Enterprise",
    category: "Agent Systems",
    description: "Deploy coordinated AI agents that handle complex workflows across your organization.",
    tags: ["automation", "workflow", "enterprise"],
    certified: true,
    rating: 4.8,
  },
  {
    id: "ai-governance",
    name: "AI Governance Framework",
    vendor: "TwB Enterprise",
    category: "Governance",
    description: "Establish policies and guardrails for responsible AI deployment in your organization.",
    tags: ["compliance", "ethics", "security"],
    certified: true,
    rating: 4.6,
  },
  {
    id: "genome-analytics",
    name: "AI Genome Analytics",
    vendor: "TwB Enterprise",
    category: "Analytics",
    description: "Measure and visualize your organization's AI maturity across 8 key dimensions.",
    tags: ["analytics", "benchmarking", "insights"],
    certified: false,
    rating: 4.7,
  },
]

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        title="AI Solutions"
        description="Enterprise-ready AI solutions designed for the unique challenges of African businesses."
      />

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
          <CTASection
            heading="Have a Solution to Showcase?"
            description="Submit your AI solution for TwB certification and reach our global community."
          >
            <a
              href={WHATSAPP_URL('Hi TwB! I want to submit my AI solution to your registry.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-background rounded-lg font-semibold hover:bg-gold/90 transition-all"
            >
              Submit Your Solution
              <ChevronRight className="w-5 h-5" />
            </a>
          </CTASection>
        </div>
      </section>
      <Footer />
    </main>
  )
}
