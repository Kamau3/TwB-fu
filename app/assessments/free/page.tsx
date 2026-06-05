'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'

const SAMPLE_QUESTIONS = [
  {
    id: 1,
    category: 'Capability',
    question: 'Does your organization have a clear AI strategy document?',
    options: ['No strategy', 'In development', 'Documented strategy', 'Fully implemented & monitored'],
    weight: 2
  },
  {
    id: 2,
    category: 'Governance',
    question: 'How are AI ethics and responsible AI principles addressed in your organization?',
    options: ['Not addressed', 'Ad-hoc approach', 'Formal framework', 'Comprehensive governance'],
    weight: 2
  },
  {
    id: 3,
    category: 'Workforce',
    question: 'What level of AI skills do your employees currently possess?',
    options: ['Minimal awareness', 'Basic understanding', 'Strong technical skills', 'Expert level'],
    weight: 2
  },
  {
    id: 4,
    category: 'Data',
    question: 'How is your data quality and accessibility for AI projects?',
    options: ['Poor quality', 'Inconsistent', 'Good quality', 'Enterprise-grade'],
    weight: 2
  },
  {
    id: 5,
    category: 'Automation',
    question: 'How many business processes have been automated with AI?',
    options: ['None', '1-3 processes', '4-10 processes', '10+ processes'],
    weight: 1
  },
]

export default function FreeAssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [completed, setCompleted] = useState(false)

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = {
      ...answers,
      [SAMPLE_QUESTIONS[currentQuestion].id]: optionIndex
    }
    setAnswers(newAnswers)

    if (currentQuestion < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setCompleted(true)
    }
  }

  const progress = ((Object.keys(answers).length) / SAMPLE_QUESTIONS.length) * 100

  if (completed) {
    const score = Object.entries(answers).reduce((acc, [id, optionIndex]) => {
      const question = SAMPLE_QUESTIONS.find(q => q.id === parseInt(id))
      return acc + (optionIndex * (question?.weight || 1))
    }, 0)

    const maxScore = SAMPLE_QUESTIONS.reduce((acc, q) => acc + (3 * q.weight), 0)
    const percentage = Math.round((score / maxScore) * 100)

    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-20">
          <div className="bg-card border border-border rounded-2xl p-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-6" />
            
            <h1 className="text-4xl font-bold text-foreground mb-4">Assessment Complete!</h1>
            
            <div className="bg-background/50 border border-border rounded-xl p-8 mb-8">
              <p className="text-foreground/70 mb-3">Your AI Readiness Score</p>
              <div className="text-6xl font-bold text-gold mb-3">{percentage}%</div>
              
              <div className="w-full h-4 bg-border rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-gold to-amber-500 transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p className="text-foreground/60">
                {percentage >= 75 && "Excellent! Your organization has strong AI readiness."}
                {percentage >= 50 && percentage < 75 && "Good progress. There are opportunities to strengthen AI capabilities."}
                {percentage < 50 && "There's significant opportunity to improve AI maturity."}
              </p>
            </div>

            <p className="text-foreground/70 mb-8">
              Upgrade to our Professional Assessment to get a detailed AI Genome profile with personalized recommendations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/assessments/professional"
                className="px-8 py-3 bg-gold text-background rounded-lg font-semibold hover:bg-gold/90 transition-all flex items-center justify-center gap-2"
              >
                Upgrade to Professional
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/"
                className="px-8 py-3 border-2 border-gold text-gold rounded-lg font-semibold hover:bg-gold/10 transition-all"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const question = SAMPLE_QUESTIONS[currentQuestion]

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <Link href="/assessments" className="inline-flex items-center gap-2 text-gold hover:text-gold/80 mb-8">
          <ChevronLeft className="w-5 h-5" />
          Back to Assessments
        </Link>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-foreground">
              Question {currentQuestion + 1} of {SAMPLE_QUESTIONS.length}
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

        {/* Question Card */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-gold text-sm font-semibold mb-4">
              {question.category}
            </span>
            <h3 className="text-2xl font-bold text-foreground">{question.question}</h3>
          </div>

          {/* Options */}
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

        {/* Navigation */}
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
