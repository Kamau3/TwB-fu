'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function EnterpriseAssessmentPage() {
  const [showAuthPrompt, setShowAuthPrompt] = useState(true)
  const router = useRouter()

  const handleStartAssessment = async () => {
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      setShowAuthPrompt(true)
      return
    }
    
    // User is authenticated, proceed with assessment
    setShowAuthPrompt(false)
  }

  if (showAuthPrompt) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-card border border-border rounded-2xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-gold" />
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">Enterprise Assessment</h1>
            
            <p className="text-foreground/70 mb-8">
              Our comprehensive enterprise assessment requires authentication to ensure data security and provide personalized tracking of your organizational AI maturity journey.
            </p>

            <div className="bg-background/50 border border-border rounded-xl p-6 mb-8 text-left">
              <h3 className="font-semibold text-foreground mb-4">What You'll Get:</h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>✓ 150+ detailed questions across 8 dimensions</li>
                <li>✓ Personalized AI Genome profile</li>
                <li>✓ Detailed implementation roadmap</li>
                <li>✓ Industry benchmarking & trends</li>
                <li>✓ Certification pathway planning</li>
                <li>✓ Expert consultation access</li>
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
              <Link
                href="/assessments"
                className="w-full px-4 py-3 text-foreground/60 hover:text-foreground transition-all text-center"
              >
                Back to Assessments
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/assessments" className="inline-flex items-center gap-2 text-gold hover:text-gold/80 mb-8">
          <ChevronLeft className="w-5 h-5" />
          Back to Assessments
        </Link>

        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Enterprise Assessment</h1>
          <p className="text-foreground/70 mb-12 max-w-xl mx-auto">
            The comprehensive assessment for large organizations. 150+ detailed questions across all 8 AI maturity dimensions with expert-led analysis.
          </p>

          <div className="bg-background/50 border border-border rounded-xl p-8 mb-12">
            <p className="text-foreground/70 mb-6">
              Due to the complexity and depth of this assessment (approximately 2 hours), we recommend scheduling a dedicated session with our expert team.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">150+</div>
                <p className="text-sm text-foreground/60">In-depth questions</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">2 hrs</div>
                <p className="text-sm text-foreground/60">Recommended duration</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">8</div>
                <p className="text-sm text-foreground/60">Dimensions covered</p>
              </div>
            </div>

            <p className="text-foreground/70 text-sm">
              Our team will guide you through the process, answer questions, and provide immediate insights upon completion.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/254791472688?text=Hi%20TwB%21%20I%20want%20to%20schedule%20an%20Enterprise%20Assessment.%20Please%20guide%20me%20on%20the%20next%20steps."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gold text-background rounded-lg font-semibold hover:bg-gold/90 transition-all"
            >
              Schedule Assessment
            </a>
            <Link
              href="/assessments"
              className="px-8 py-3 border-2 border-gold text-gold rounded-lg font-semibold hover:bg-gold/10 transition-all"
            >
              View Other Assessments
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
