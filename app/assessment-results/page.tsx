import { Metadata } from 'next'
import Link from 'next/link'
import { AIGenomeRadar } from '@/components/ai-genome-radar'
import { WHATSAPP_URL, CERTIFICATION_LEVELS } from '@/lib/constants'
import { ChevronRight, Download, Share2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Your AI Genome Results | TwB',
  description: 'Your personalized AI Genome profile and certification pathway.',
}

export default function AssessmentResultsPage() {
  // Sample genome data - in real app would come from assessment responses
  const genomeScores = [
    { dimension: 'Capability', score: 72, category: 'Infrastructure' },
    { dimension: 'Governance', score: 58, category: 'Risk Management' },
    { dimension: 'Workforce', score: 65, category: 'Skills' },
    { dimension: 'Data', score: 78, category: 'Foundation' },
    { dimension: 'Automation', score: 68, category: 'Operations' },
    { dimension: 'Innovation', score: 62, category: 'Growth' },
    { dimension: 'ROI', score: 55, category: 'Value' },
    { dimension: 'Risk', score: 48, category: 'Safety' },
  ]

  const overallScore = Math.round(genomeScores.reduce((acc, s) => acc + s.score, 0) / genomeScores.length)
  
  // Determine certification level
  let currentLevel = 1
  if (overallScore >= 75) currentLevel = 3
  else if (overallScore >= 60) currentLevel = 2
  
  const nextLevel = Math.min(currentLevel + 1, 5)
  const nextLevelReq = currentLevel === 1 ? 60 : currentLevel === 2 ? 75 : currentLevel === 3 ? 85 : 95

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative pt-32 pb-12 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your AI Genome Profile
          </h1>
          <p className="text-xl text-foreground/70">
            Comprehensive assessment of your organization&apos;s AI maturity across 8 critical dimensions.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Radar Visualization */}
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
            <AIGenomeRadar 
              scores={genomeScores}
              title="Your AI Genome Radar"
            />
          </div>

          {/* Recommendations */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Immediate Actions */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Immediate Actions</h2>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-background/50 border border-amber-500/30">
                  <h4 className="font-semibold text-foreground mb-2">Strengthen Governance</h4>
                  <p className="text-sm text-foreground/70 mb-3">Your score: 58/100</p>
                  <ul className="text-sm text-foreground/60 space-y-1">
                    <li>• Develop AI ethics framework</li>
                    <li>• Establish governance board</li>
                    <li>• Document compliance procedures</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-background/50 border border-amber-500/30">
                  <h4 className="font-semibold text-foreground mb-2">Improve Risk Management</h4>
                  <p className="text-sm text-foreground/70 mb-3">Your score: 48/100</p>
                  <ul className="text-sm text-foreground/60 space-y-1">
                    <li>• Conduct risk assessment</li>
                    <li>• Implement monitoring systems</li>
                    <li>• Create incident response plan</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-background/50 border border-amber-500/30">
                  <h4 className="font-semibold text-foreground mb-2">Maximize ROI Realization</h4>
                  <p className="text-sm text-foreground/70 mb-3">Your score: 55/100</p>
                  <ul className="text-sm text-foreground/60 space-y-1">
                    <li>• Define success metrics</li>
                    <li>• Set up tracking systems</li>
                    <li>• Plan business case review</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Certification Pathway */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Your Certification Path</h2>
              
              <div className="space-y-3 mb-8">
                {CERTIFICATION_LEVELS.map((level) => (
                  <div
                    key={level.level}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      level.level === currentLevel
                        ? 'border-gold bg-gold/10'
                        : level.level < currentLevel
                        ? 'border-green-500/50 bg-green-500/5'
                        : 'border-border opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">Level {level.level}: {level.name}</h4>
                        <p className="text-xs text-foreground/60 mt-1">{level.description}</p>
                      </div>
                      {level.level < currentLevel && (
                        <div className="text-green-400 text-sm font-bold">✓ Achieved</div>
                      )}
                      {level.level === currentLevel && (
                        <div className="text-gold text-sm font-bold">Current</div>
                      )}
                    </div>
                    {level.level > currentLevel && (
                      <div className="text-xs text-foreground/50 mt-2">
                        Requires {nextLevelReq}/100 average score
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-background/50 border border-border/50 rounded-lg p-4">
                <p className="text-sm text-foreground/70 mb-4">
                  You&apos;re currently at <span className="font-bold text-gold">Level {currentLevel}</span>. 
                  To reach <span className="font-bold">Level {nextLevel}</span>, improve your score to <span className="font-bold text-gold">{nextLevelReq}</span>.
                </p>
                <Link
                  href="/academy"
                  className="inline-flex items-center gap-2 text-gold hover:text-gold/80 font-semibold text-sm"
                >
                  Browse academy courses for Level {nextLevel}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Industry Comparison */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">How You Compare</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <p className="text-foreground/60 text-sm mb-2">Your Score</p>
                <div className="text-4xl font-bold text-gold">{overallScore}</div>
              </div>
              <div>
                <p className="text-foreground/60 text-sm mb-2">Global Average</p>
                <div className="text-4xl font-bold text-foreground/70">68</div>
              </div>
              <div>
                <p className="text-foreground/60 text-sm mb-2">Your Industry Avg</p>
                <div className="text-4xl font-bold text-foreground/70">72</div>
              </div>
            </div>

            <p className="text-foreground/70">
              Your organization is performing {overallScore > 68 ? 'above' : 'near'} the global average, 
              {overallScore > 72 ? ' leading your industry' : ' with opportunity to match industry leaders'}. 
              Focus on the Immediate Actions above to accelerate your progression.
            </p>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-gold/10 to-purple/10 border border-gold/20 rounded-2xl p-12 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-6">Next Steps</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-left">
                <Download className="w-6 h-6 text-gold mb-3 mx-auto md:mx-0" />
                <h4 className="font-semibold text-foreground mb-2">Download Report</h4>
                <p className="text-sm text-foreground/70">Get your full assessment report with detailed recommendations.</p>
              </div>
              <div className="text-left">
                <Share2 className="w-6 h-6 text-gold mb-3 mx-auto md:mx-0" />
                <h4 className="font-semibold text-foreground mb-2">Share Results</h4>
                <p className="text-sm text-foreground/70">Share your genome profile with stakeholders and board members.</p>
              </div>
              <div className="text-left">
                <ChevronRight className="w-6 h-6 text-gold mb-3 mx-auto md:mx-0" />
                <h4 className="font-semibold text-foreground mb-2">Get Support</h4>
                <p className="text-sm text-foreground/70">Work with our experts on your certification journey.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WHATSAPP_URL('Hi TwB! I have my assessment results and want to discuss next steps.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gold text-background rounded-lg font-semibold hover:bg-gold/90 transition-all"
              >
                Talk to Expert
                <ChevronRight className="w-5 h-5" />
              </a>
              <Link
                href="/playbooks"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-gold text-gold rounded-lg font-semibold hover:bg-gold/10 transition-all"
              >
                View Playbooks
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
