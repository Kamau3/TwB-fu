import { Metadata } from 'next'
import { INDUSTRIES, WHATSAPP_URL } from '@/lib/constants'
import { ChevronRight, TrendingUp, BarChart3 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Benchmarks & Reports | TwB',
  description: 'Industry benchmarks, trends, and analysis of AI adoption across organizations globally.',
}

export default function BenchmarksPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-purple/5" />
        
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            AI Benchmarks & Insights
          </h1>
          <p className="text-xl text-foreground/70 mb-8">
            Compare your AI maturity against industry leaders. Access global trends and actionable insights.
          </p>
        </div>
      </section>

      {/* Industry Benchmarks */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12">Industry Benchmarks</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {INDUSTRIES.map((industry) => (
              <div key={industry} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-purple/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                
                <div className="relative bg-card border border-border rounded-2xl p-8 hover:border-gold/50 transition-all">
                  <div className="flex items-start justify-between mb-6">
                    <h3 className="text-xl font-bold text-foreground">{industry}</h3>
                    <BarChart3 className="w-6 h-6 text-gold flex-shrink-0" />
                  </div>

                  {/* Benchmark scores */}
                  <div className="space-y-4 mb-8">
                    {[
                      { label: 'Capability', score: 68 },
                      { label: 'Governance', score: 52 },
                      { label: 'Workforce', score: 61 },
                      { label: 'Data', score: 65 },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-semibold text-foreground">{item.label}</span>
                          <span className="text-sm text-gold font-bold">{item.score}/100</span>
                        </div>
                        <div className="w-full h-2 bg-background/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-gold to-amber-500 rounded-full transition-all"
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full px-6 py-3 bg-gold text-background rounded-lg font-semibold hover:bg-gold/90 transition-all flex items-center justify-center gap-2 group/btn">
                    View Full Report
                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Key Insights */}
          <div className="bg-card border border-border rounded-2xl p-12 mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Global AI Trends</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg bg-background/50 border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-gold" />
                  <h4 className="font-semibold text-foreground">AI Adoption Rate</h4>
                </div>
                <p className="text-3xl font-bold text-gold mb-2">73%</p>
                <p className="text-sm text-foreground/60">Organizations have deployed at least one AI solution</p>
              </div>

              <div className="p-6 rounded-lg bg-background/50 border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-gold" />
                  <h4 className="font-semibold text-foreground">Average AI Maturity</h4>
                </div>
                <p className="text-3xl font-bold text-gold mb-2">Level 2</p>
                <p className="text-sm text-foreground/60">Most organizations at operational stage</p>
              </div>

              <div className="p-6 rounded-lg bg-background/50 border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-gold" />
                  <h4 className="font-semibold text-foreground">ROI Achievement</h4>
                </div>
                <p className="text-3xl font-bold text-gold mb-2">42%</p>
                <p className="text-sm text-foreground/60">Average measured financial returns</p>
              </div>
            </div>
          </div>

          {/* Dimension Analysis */}
          <div className="bg-card border border-border rounded-2xl p-12 mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">AI Genome Dimension Analysis</h2>
            
            <div className="space-y-6">
              {[
                { name: 'Capability', global: 72, regional: 65, desc: 'Strongest area with good infrastructure adoption' },
                { name: 'Governance', global: 58, regional: 52, desc: 'Significant gap in compliance and ethics frameworks' },
                { name: 'Workforce', global: 61, regional: 54, desc: 'Skills shortage is a primary constraint' },
                { name: 'Data', global: 67, regional: 59, desc: 'Data quality improvements showing positive trend' },
              ].map((dim) => (
                <div key={dim.name} className="p-6 rounded-lg bg-background/50 border border-border/50">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-foreground text-lg">{dim.name}</h4>
                    <span className="text-sm text-foreground/60">{dim.desc}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="text-foreground/70">Global Average</span>
                        <span className="font-semibold text-gold">{dim.global}</span>
                      </div>
                      <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold/60 rounded-full"
                          style={{ width: `${dim.global}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="text-foreground/70">Regional Average</span>
                        <span className="font-semibold text-gold">{dim.regional}</span>
                      </div>
                      <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold/40 rounded-full"
                          style={{ width: `${dim.regional}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Download Reports */}
          <div className="bg-gradient-to-r from-gold/10 to-purple/10 border border-gold/20 rounded-2xl p-12 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Download Detailed Reports</h2>
            <p className="text-foreground/70 mb-8">Get comprehensive benchmark data and strategic insights for your industry.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gold text-background rounded-lg font-semibold hover:bg-gold/90 transition-all">
                Download Global Report
                <ChevronRight className="w-5 h-5" />
              </button>
              <a
                href={WHATSAPP_URL('Hi TwB! I want the regional AI benchmark report for my industry.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-gold text-gold rounded-lg font-semibold hover:bg-gold/10 transition-all"
              >
                Request Industry Report
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
