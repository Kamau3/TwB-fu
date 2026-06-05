'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AIGenomeRadar } from '@/components/ai-genome-radar'
import { WHATSAPP_URL } from '@/lib/constants'
import { ChevronRight, Download, Share2, Lock, Sparkles, FileText, Award, Zap, TrendingUp } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { generateCertificateHTML } from '@/app/actions/generate-certificate'

export const dynamic = 'force-dynamic'

interface Insights {
  summary?: string
  strengths?: string[]
  improvements?: string[]
  roadmap?: string[]
  raw?: string
}

interface User {
  id: string
  email?: string
  user_metadata?: {
    full_name?: string
  }
}

export default function AssessmentResultsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showCertificate, setShowCertificate] = useState(false)
  const [certificateHTML, setCertificateHTML] = useState('')
  const [insights, setInsights] = useState<Insights | null>(null)
  const [insightsLoading, setInsightsLoading] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        if (user) {
          loadInsights()
        }
      } catch (error) {
        console.log('Auth check failed', error)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const loadInsights = async () => {
    setInsightsLoading(true)
    try {
      // Dummy insights for demo - in production would call API
      setInsights({
        summary: "Your organization demonstrates strong capabilities in data management and automation, with clear growth in cloud infrastructure. Priority focus areas include governance frameworks and risk management to support enterprise-scale AI deployment.",
        strengths: [
          "Strong data quality and infrastructure (78/100)",
          "Solid automation capabilities (68/100)",
          "Good cloud infrastructure maturity (72/100)"
        ],
        improvements: [
          "Establish comprehensive governance structures",
          "Develop risk mitigation and compliance frameworks",
          "Expand AI workforce training and reskilling programs"
        ],
        roadmap: [
          "Month 1: Establish AI governance committee and policies",
          "Month 2: Implement compliance framework and risk assessment",
          "Month 3: Launch AI literacy training program across organization"
        ]
      })
    } catch (error) {
      console.error('Failed to load insights:', error)
    } finally {
      setInsightsLoading(false)
    }
  }

  const generateCertificate = async () => {
    try {
      const userName = user?.user_metadata?.full_name || user?.email || 'Professional'
      
      // Determine certificate level
      let level = 'Professional'
      if (overallScore >= 85) level = 'Master'
      else if (overallScore >= 60) level = 'Intermediate'

      const html = await generateCertificateHTML({
        name: userName,
        title: level === 'Master' ? 'Advanced AI Leadership Certification' : 'Professional AI Readiness Certification',
        level,
        score: overallScore,
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        certificateId: `TwB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        insight: 'Strong commitment to AI excellence demonstrated through comprehensive assessment'
      })
      
      setCertificateHTML(html)
      setShowCertificate(true)
    } catch (error) {
      console.error('Failed to generate certificate:', error)
    }
  }

  const downloadCertificate = () => {
    const element = document.getElementById('certificate-iframe')
    if (element instanceof HTMLIFrameElement && element.contentDocument) {
      element.contentDocument.execCommand('print', false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-gold/30 border-t-gold animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Loading your results...</p>
        </div>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-card border border-border rounded-2xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-gold" />
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">Your AI Genome Profile</h1>
            
            <p className="text-foreground/70 mb-8">
              Sign in to access your personalized assessment results, AI-powered insights, downloadable certificate, and strategic recommendations.
            </p>

            <div className="bg-background/50 border border-border rounded-xl p-6 mb-8 text-left">
              <h3 className="font-semibold text-foreground mb-4">Premium Features:</h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>✓ AI Genome radar visualization</li>
                <li>✓ AI-powered strategic insights</li>
                <li>✓ Premium certificate (downloadable)</li>
                <li>✓ 90-day roadmap generation</li>
                <li>✓ Detailed action recommendations</li>
                <li>✓ Industry benchmarking</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/auth/sign-up"
                className="w-full px-4 py-3 bg-gold text-background rounded-lg font-semibold text-center hover:bg-gold/90 transition-all"
              >
                Create Account
              </Link>
              <Link
                href="/auth/login"
                className="w-full px-4 py-3 border-2 border-gold text-gold rounded-lg font-semibold text-center hover:bg-gold/10 transition-all"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

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

  const overallScore = Math.round(genomeScores.reduce((sum, d) => sum + d.score, 0) / genomeScores.length)

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-card/10 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/"
            className="text-gold hover:text-gold/80 transition-colors flex items-center gap-2 mb-6"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            Back to Home
          </Link>
          
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Your AI Genome Profile
          </h1>
          <p className="text-foreground/70 text-lg max-w-3xl">
            Comprehensive assessment results powered by AI. Your personalized roadmap to organizational AI excellence.
          </p>
        </div>

        {/* Score Display */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Overall Score */}
          <div className="bg-gradient-to-br from-gold/20 to-amber-500/20 border-2 border-gold rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <Award className="w-8 h-8 text-gold flex-shrink-0 mt-1" />
              <div>
                <div className="text-foreground/70 text-sm mb-2">Overall AI Readiness</div>
                <div className="text-5xl font-bold text-gold">{overallScore}</div>
                <div className="text-foreground/60 text-sm mt-2">out of 100</div>
              </div>
            </div>
          </div>

          {/* Top Strength */}
          <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-2 border-emerald-500/40 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-8 h-8 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <div className="text-foreground/70 text-sm mb-2">Strongest Dimension</div>
                <div className="text-2xl font-bold text-foreground">
                  {genomeScores.reduce((max, d) => d.score > max.score ? d : max).dimension}
                </div>
                <div className="text-foreground/60 text-sm mt-2">
                  {genomeScores.reduce((max, d) => d.score > max.score ? d : max).score}/100
                </div>
              </div>
            </div>
          </div>

          {/* Priority Area */}
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-2 border-orange-500/40 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <Zap className="w-8 h-8 text-orange-400 flex-shrink-0 mt-1" />
              <div>
                <div className="text-foreground/70 text-sm mb-2">Priority Improvement</div>
                <div className="text-2xl font-bold text-foreground">
                  {genomeScores.reduce((min, d) => d.score < min.score ? d : min).dimension}
                </div>
                <div className="text-foreground/60 text-sm mt-2">
                  {genomeScores.reduce((min, d) => d.score < min.score ? d : min).score}/100
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Radar & Key Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Radar */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-foreground mb-6">AI Genome Radar</h3>
              <AIGenomeRadar scores={genomeScores} />
            </div>

            {/* Download Certificate Button */}
            <button
              onClick={generateCertificate}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-gold to-amber-500 text-background rounded-lg font-semibold hover:shadow-lg hover:shadow-gold/25 transition-all"
            >
              <Award className="w-5 h-5" />
              Download Certificate
            </button>
          </div>

          {/* Right Column - Insights & Recommendations */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI-Powered Insights */}
            {insightsLoading ? (
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border-4 border-gold/30 border-t-gold animate-spin" />
                  <p className="text-foreground/60">Generating AI insights...</p>
                </div>
              </div>
            ) : insights ? (
              <div className="bg-card border border-gold/20 rounded-2xl p-8">
                <div className="flex items-start gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <h3 className="text-lg font-semibold text-foreground">AI-Powered Strategic Insights</h3>
                </div>

                {insights.summary && (
                  <div className="mb-6 pb-6 border-b border-border">
                    <h4 className="text-sm font-semibold text-gold mb-2">Executive Summary</h4>
                    <p className="text-foreground/70 leading-relaxed">{insights.summary}</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  {insights.strengths && insights.strengths.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-emerald-400 mb-3">Key Strengths</h4>
                      <ul className="space-y-2">
                        {insights.strengths.map((strength, i) => (
                          <li key={i} className="text-sm text-foreground/70 flex gap-2">
                            <span className="text-emerald-400">✓</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {insights.improvements && insights.improvements.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-orange-400 mb-3">Priority Improvements</h4>
                      <ul className="space-y-2">
                        {insights.improvements.map((improvement, i) => (
                          <li key={i} className="text-sm text-foreground/70 flex gap-2">
                            <span className="text-orange-400">▲</span>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {insights.roadmap && insights.roadmap.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="text-sm font-semibold text-blue-400 mb-3">90-Day Roadmap</h4>
                    <ol className="space-y-2">
                      {insights.roadmap.map((action, i) => (
                        <li key={i} className="text-sm text-foreground/70 flex gap-3">
                          <span className="font-bold text-blue-400">0{i + 1}</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            ) : null}

            {/* Dimension Breakdown */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gold" />
                Dimensional Analysis
              </h3>
              
              <div className="space-y-4">
                {genomeScores.map((genome) => (
                  <div key={genome.dimension}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-medium text-foreground">{genome.dimension}</div>
                        <div className="text-xs text-foreground/50">{genome.category}</div>
                      </div>
                      <div className="text-lg font-bold text-gold">{genome.score}</div>
                    </div>
                    <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          genome.score >= 75
                            ? 'bg-emerald-500'
                            : genome.score >= 60
                            ? 'bg-amber-500'
                            : 'bg-orange-500'
                        }`}
                        style={{ width: `${genome.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-gold/10 to-purple/10 border border-gold/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Ready to Accelerate Your AI Journey?</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-background border-2 border-gold text-gold rounded-lg font-semibold hover:bg-gold/10 transition-all"
                >
                  <Download className="w-5 h-5" />
                  Print Report
                </button>
                <a
                  href={WHATSAPP_URL('Hi TwB! I\'ve completed my professional assessment and would like to discuss the results and next steps.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-amber-500 text-background rounded-lg font-semibold hover:shadow-lg hover:shadow-gold/25 transition-all"
                >
                  <Share2 className="w-5 h-5" />
                  Expert Consultation
                </a>
              </div>

              <p className="text-foreground/70 text-sm">
                Schedule a personalized strategy session with our AI experts to create your custom implementation roadmap.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Your Certificate</h2>
              <button
                onClick={() => setShowCertificate(false)}
                className="text-foreground/60 hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <iframe
                id="certificate-iframe"
                srcDoc={certificateHTML}
                className="w-full h-96 border border-border rounded-lg"
              />
              
              <button
                onClick={downloadCertificate}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-gold to-amber-500 text-background rounded-lg font-semibold hover:shadow-lg hover:shadow-gold/25 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download/Print Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
