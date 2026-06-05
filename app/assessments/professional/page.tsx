'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const PROFESSIONAL_QUESTIONS = [
  {
    id: 1,
    category: 'Capability',
    question: 'What is your current cloud infrastructure maturity level?',
    options: ['On-premise only', 'Hybrid setup', 'Full cloud deployment', 'Cloud-native architecture'],
    weight: 2
  },
  {
    id: 2,
    category: 'Governance',
    question: 'Do you have a dedicated AI governance committee?',
    options: ['No formal structure', 'Ad-hoc oversight', 'Dedicated team', 'Cross-functional governance body'],
    weight: 2
  },
  {
    id: 3,
    category: 'Workforce',
    question: 'What is your AI training budget as % of HR budget?',
    options: ['0%', '<1%', '1-3%', '>3%'],
    weight: 2
  },
  {
    id: 4,
    category: 'Data',
    question: 'What percentage of your data is clean and labeled?',
    options: ['<25%', '25-50%', '50-75%', '>75%'],
    weight: 2
  },
  {
    id: 5,
    category: 'Automation',
    question: 'What ROI have you achieved from AI automation?',
    options: ['No ROI yet', '<50% ROI', '50-200% ROI', '>200% ROI'],
    weight: 2
  },
]

export default function ProfessionalAssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [completed, setCompleted] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const router = useRouter()

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = {
      ...answers,
      [PROFESSIONAL_QUESTIONS[currentQuestion].id]: optionIndex
    }
    setAnswers(newAnswers)

    if (currentQuestion < PROFESSIONAL_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setCompleted(true)
    }
  }

  const handleDownloadResults = async () => {
    // Check if user is authenticated
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    // If authenticated, proceed with download
    downloadResults()
  }

  const downloadResults = () => {
    const score = Object.entries(answers).reduce((acc, [id, optionIndex]) => {
      const question = PROFESSIONAL_QUESTIONS.find(q => q.id === parseInt(id))
      return acc + (optionIndex * (question?.weight || 1))
    }, 0)

    const maxScore = PROFESSIONAL_QUESTIONS.reduce((acc, q) => acc + (3 * q.weight), 0)
    const percentage = Math.round((score / maxScore) * 100)

    const content = `
Professional AI Assessment Results
Date: ${new Date().toLocaleDateString()}
Score: ${percentage}%

Your Results:
${Object.entries(answers).map(([id, optionIndex]) => {
  const question = PROFESSIONAL_QUESTIONS.find(q => q.id === parseInt(id))
  return `${question?.category} - ${question?.question}\nAnswer: ${question?.options[optionIndex]}\n`
}).join('\n')}
`
    
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content))
    element.setAttribute('download', 'assessment-results.txt')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const progress = ((Object.keys(answers).length) / PROFESSIONAL_QUESTIONS.length) * 100

  if (completed) {
    const score = Object.entries(answers).reduce((acc, [id, optionIndex]) => {
      const question = PROFESSIONAL_QUESTIONS.find(q => q.id === parseInt(id))
      return acc + (optionIndex * (question?.weight || 1))
    }, 0)

    const maxScore = PROFESSIONAL_QUESTIONS.reduce((acc, q) => acc + (3 * q.weight), 0)
    const percentage = Math.round((score / maxScore) * 100)

    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-20">
          {/* Login Prompt Modal */}
          {showLoginPrompt && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full">
                <h3 className="text-2xl font-bold text-foreground mb-4">Save & Print Your Results</h3>
                <p className="text-foreground/70 mb-8">
                  Create an account to save your assessment results, get personalized recommendations, and access your AI Genome profile.
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/auth/sign-up"
                    className="w-full px-4 py-3 bg-gold text-background rounded-lg font-semibold text-center hover:bg-gold/90 transition-all"
                  >
                    Sign Up Free
                  </Link>
                  <Link
                    href="/auth/login"
                    className="w-full px-4 py-3 border-2 border-gold text-gold rounded-lg font-semibold text-center hover:bg-gold/10 transition-all"
                  >
                    Already Have an Account?
                  </Link>
                  <button
                    onClick={() => setShowLoginPrompt(false)}
                    className="w-full px-4 py-3 text-foreground/60 hover:text-foreground transition-all"
                  >
                    Continue Without Saving
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-card border border-border rounded-2xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-gold">{percentage}%</span>
            </div>
            
            <h1 className="text-4xl font-bold text-foreground mb-4">Professional Assessment Complete</h1>
            
            <div className="bg-background/50 border border-border rounded-xl p-8 mb-8">
              <p className="text-foreground/70 mb-3">Your AI Readiness Score</p>
              
              <div className="w-full h-4 bg-border rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-gold to-amber-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p className="text-foreground/60 mb-6">
                {percentage >= 75 && "Excellent! Your organization demonstrates strong AI capabilities and governance."}
                {percentage >= 50 && percentage < 75 && "Good foundation. Focus on strengthening governance and data quality for next-level maturity."}
                {percentage < 50 && "Significant opportunity ahead. Prioritize building AI strategy and workforce capabilities."}
              </p>
            </div>

            <div className="mb-8 text-left max-w-md mx-auto">
              <h3 className="font-semibold text-foreground mb-4">What&apos;s Next?</h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>✓ Review personalized recommendations for your organization</li>
                <li>✓ Explore industry playbooks aligned with your readiness level</li>
                <li>✓ Access certification pathway and learning resources</li>
                <li>✓ Compare against industry benchmarks</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleDownloadResults}
                className="px-8 py-3 bg-gold text-background rounded-lg font-semibold hover:bg-gold/90 transition-all"
              >
                {showLoginPrompt ? 'Sign In to Save' : 'Download Results'}
              </button>
              <Link
                href="/assessment-results"
                className="px-8 py-3 border-2 border-gold text-gold rounded-lg font-semibold hover:bg-gold/10 transition-all"
              >
                View Full Genome Profile
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const question = PROFESSIONAL_QUESTIONS[currentQuestion]

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link href="/assessments" className="inline-flex items-center gap-2 text-gold hover:text-gold/80 mb-8">
          <ChevronLeft className="w-5 h-5" />
          Back to Assessments
        </Link>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-foreground">
              Question {currentQuestion + 1} of {PROFESSIONAL_QUESTIONS.length}
            </h2>
            <span className="text-sm text-foreground/60">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold to-amber-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-gold text-sm font-semibold mb-4">
              {question.category}
            </span>
            <h3 className="text-2xl font-bold text-foreground">{question.question}</h3>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all font-semibold ${
                  answers[question.id] === index
                    ? 'border-gold bg-gold/10 text-foreground'
                    : 'border-border hover:border-gold/50 bg-background/50 text-foreground/70 hover:text-foreground'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-3 text-gold disabled:text-foreground/30 font-semibold hover:gap-3 transition-all disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          {answers[question.id] !== undefined && (
            <span className="text-sm text-gold font-semibold">Answer selected</span>
          )}

          <button
            onClick={() => handleAnswer(answers[question.id] ?? 0)}
            disabled={answers[question.id] === undefined}
            className="flex items-center gap-2 px-6 py-3 bg-gold text-background rounded-lg font-semibold hover:bg-gold/90 transition-all disabled:bg-foreground/30 disabled:cursor-not-allowed hover:gap-3"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </main>
  )
}
