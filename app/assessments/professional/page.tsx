'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Lock, Sparkles, Download, Share2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { WHATSAPP_URL } from '@/lib/constants'
import { createClient } from '@/lib/supabase/client'

export const dynamic = 'force-dynamic'

// Enhanced corporate-grade assessment questions - 40 questions across 8 dimensions
const PROFESSIONAL_QUESTIONS = [
  // Capability (5 questions)
  {
    id: 1,
    dimension: 'Capability',
    category: 'Infrastructure',
    question: 'What is your organization\'s current cloud infrastructure maturity level?',
    options: [
      'On-premise servers only',
      'Hybrid cloud (on-prem + cloud)',
      'Full cloud migration (single provider)',
      'Multi-cloud, containerized architecture'
    ],
    weight: 2,
    explanation: 'Cloud-native infrastructure is essential for AI deployment at scale'
  },
  {
    id: 2,
    dimension: 'Capability',
    category: 'ML Operations',
    question: 'Do you have established MLOps (Machine Learning Operations) practices?',
    options: [
      'No formal ML pipeline',
      'Ad-hoc model development and deployment',
      'Documented pipeline with versioning',
      'Automated CI/CD with monitoring and governance'
    ],
    weight: 2,
    explanation: 'MLOps maturity directly impacts model reliability and performance'
  },
  {
    id: 3,
    dimension: 'Capability',
    category: 'Computational Resources',
    question: 'What computational infrastructure do you have for AI workloads?',
    options: [
      'CPU-only infrastructure',
      'Some GPU availability (training)',
      'Dedicated GPU/TPU resources with autoscaling',
      'Enterprise-grade distributed computing infrastructure'
    ],
    weight: 2,
    explanation: 'Proper infrastructure is critical for training and inference performance'
  },
  {
    id: 4,
    dimension: 'Capability',
    category: 'Model Management',
    question: 'How do you manage and version your AI/ML models?',
    options: [
      'Manual tracking or file system',
      'Basic versioning system (Git-based)',
      'Model registry with metadata tracking',
      'Enterprise model management platform with lineage'
    ],
    weight: 2,
    explanation: 'Model governance ensures reproducibility and compliance'
  },
  {
    id: 5,
    dimension: 'Capability',
    category: 'Integration',
    question: 'How integrated are AI solutions within your core business systems?',
    options: [
      'Standalone proof-of-concepts only',
      'Experimental integration with some systems',
      'Integrated with 2-3 critical systems',
      'Embedded across enterprise architecture with APIs'
    ],
    weight: 2,
    explanation: 'Deep integration multiplies ROI and competitive advantage'
  },

  // Governance (5 questions)
  {
    id: 6,
    dimension: 'Governance',
    category: 'Oversight Structure',
    question: 'Do you have dedicated AI/ML governance and oversight structures?',
    options: [
      'No formal governance',
      'Informal oversight by IT/technical teams',
      'AI governance committee with documented policies',
      'Cross-functional governance body with board-level oversight'
    ],
    weight: 2,
    explanation: 'Governance ensures accountability, compliance, and strategic alignment'
  },
  {
    id: 7,
    dimension: 'Governance',
    category: 'Risk & Ethics',
    question: 'How mature is your AI ethics and bias mitigation framework?',
    options: [
      'No formal ethics framework',
      'Awareness of potential risks',
      'Documented ethics policies and bias testing',
      'Comprehensive governance with regular audits and third-party review'
    ],
    weight: 2,
    explanation: 'Ethical AI is essential for stakeholder trust and regulatory compliance'
  },
  {
    id: 8,
    dimension: 'Governance',
    category: 'Regulatory Compliance',
    question: 'What is your compliance status with AI/data regulations (GDPR, AI Act, etc.)?',
    options: [
      'Not addressed or unaware of requirements',
      'Initial compliance planning underway',
      'Documented compliance procedures in place',
      'Comprehensive compliance framework with regular audits'
    ],
    weight: 2,
    explanation: 'Regulatory compliance prevents legal and financial risks'
  },
  {
    id: 9,
    dimension: 'Governance',
    category: 'Data Privacy',
    question: 'How do you handle data privacy and security for AI systems?',
    options: [
      'Basic data security measures only',
      'Privacy-aware processes in development',
      'GDPR/privacy compliance with data minimization',
      'Privacy-by-design with encryption, anonymization, and audits'
    ],
    weight: 2,
    explanation: 'Data privacy is both a legal requirement and customer expectation'
  },
  {
    id: 10,
    dimension: 'Governance',
    category: 'Transparency',
    question: 'Do you have explainability practices for AI decision-making?',
    options: [
      'No explainability practices',
      'Basic documentation of model logic',
      'Interpretable models with explanations available',
      'Advanced explainability (SHAP, LIME) with stakeholder-facing reporting'
    ],
    weight: 2,
    explanation: 'Explainability builds confidence and enables better decision-making'
  },

  // Workforce (5 questions)
  {
    id: 11,
    dimension: 'Workforce',
    category: 'Skills Assessment',
    question: 'What is your organization\'s current AI/ML skill level distribution?',
    options: [
      'Very limited AI expertise',
      'Small pockets of expertise',
      'Broad foundational knowledge with specialized teams',
      'Industry-leading expertise across organization'
    ],
    weight: 2,
    explanation: 'Skilled workforce is critical for successful AI implementation'
  },
  {
    id: 12,
    dimension: 'Workforce',
    category: 'Training Investment',
    question: 'What percentage of your HR/Training budget is allocated to AI upskilling?',
    options: [
      'Less than 0.5%',
      '0.5% - 2%',
      '2% - 5%',
      'More than 5%'
    ],
    weight: 2,
    explanation: 'Training investment directly correlates with AI maturity'
  },
  {
    id: 13,
    dimension: 'Workforce',
    category: 'Hiring & Retention',
    question: 'How effectively are you recruiting and retaining AI talent?',
    options: [
      'Significant difficulty hiring',
      'Can hire but retention is challenging',
      'Competitive recruitment with good retention',
      'Industry-leading talent attraction and retention'
    ],
    weight: 2,
    explanation: 'Retention of skilled AI professionals is critical for continuity'
  },
  {
    id: 14,
    dimension: 'Workforce',
    category: 'Cross-functional Training',
    question: 'Are non-technical roles trained on AI literacy and application?',
    options: [
      'No formal training for non-technical staff',
      'Limited ad-hoc awareness sessions',
      'Structured AI literacy program for all employees',
      'Comprehensive training with role-specific AI competencies'
    ],
    weight: 2,
    explanation: 'Organizational AI literacy multiplies adoption and impact'
  },
  {
    id: 15,
    dimension: 'Workforce',
    category: 'Change Management',
    question: 'How well is your organization managing AI-driven workplace changes?',
    options: [
      'Reactive, minimal change management',
      'Basic communication and training provided',
      'Structured change management program',
      'Proactive reskilling with clear career pathways'
    ],
    weight: 2,
    explanation: 'Effective change management ensures worker engagement and adoption'
  },

  // Data (5 questions)
  {
    id: 16,
    dimension: 'Data',
    category: 'Data Quality',
    question: 'What percentage of your business-critical data is clean and properly labeled?',
    options: [
      'Less than 25%',
      '25% - 50%',
      '50% - 75%',
      'More than 75%'
    ],
    weight: 2,
    explanation: 'Data quality is the foundation of AI model reliability'
  },
  {
    id: 17,
    dimension: 'Data',
    category: 'Data Infrastructure',
    question: 'What is your data infrastructure maturity?',
    options: [
      'Data silos with limited accessibility',
      'Partial data integration and centralization',
      'Enterprise data warehouse with governance',
      'Modern data lake/lakehouse with real-time processing'
    ],
    weight: 2,
    explanation: 'Robust data infrastructure enables faster AI deployment'
  },
  {
    id: 18,
    dimension: 'Data',
    category: 'Data Governance',
    question: 'How mature is your data governance and cataloging?',
    options: [
      'Minimal data governance',
      'Basic documentation and ownership assignment',
      'Formal data governance with cataloging',
      'Advanced governance with lineage, quality metrics, and automation'
    ],
    weight: 2,
    explanation: 'Data governance ensures consistency, quality, and compliance'
  },
  {
    id: 19,
    dimension: 'Data',
    category: 'Data Privacy',
    question: 'How do you handle sensitive data for AI training?',
    options: [
      'Limited consideration for data sensitivity',
      'Basic anonymization attempts',
      'Structured privacy-preserving techniques (differential privacy)',
      'Advanced privacy techniques (federated learning, homomorphic encryption)'
    ],
    weight: 2,
    explanation: 'Privacy-preserving techniques protect stakeholder data'
  },
  {
    id: 20,
    dimension: 'Data',
    category: 'Data Availability',
    question: 'Is sufficient historical and real-time data available for AI?',
    options: [
      'Limited historical data',
      'Adequate historical data but limited real-time',
      'Good data availability with some gaps',
      'Rich datasets with robust real-time data pipelines'
    ],
    weight: 2,
    explanation: 'Quality data availability accelerates model development'
  },

  // Automation (5 questions)
  {
    id: 21,
    dimension: 'Automation',
    category: 'Process Automation',
    question: 'What percentage of business processes have been automated with AI?',
    options: [
      'Less than 5%',
      '5% - 20%',
      '20% - 50%',
      'More than 50%'
    ],
    weight: 2,
    explanation: 'Process automation drives cost reduction and efficiency'
  },
  {
    id: 22,
    dimension: 'Automation',
    category: 'RPA & Intelligent Automation',
    question: 'Do you have RPA (Robotic Process Automation) or intelligent automation deployed?',
    options: [
      'No RPA or automation',
      'Exploring RPA pilots',
      'Deployed RPA in 2-3 processes',
      'Comprehensive intelligent automation across processes'
    ],
    weight: 2,
    explanation: 'Intelligent automation improves accuracy and reduces costs'
  },
  {
    id: 23,
    dimension: 'Automation',
    category: 'AI-Driven Decision Making',
    question: 'How extensively are AI-driven decisions integrated into operations?',
    options: [
      'Minimal AI-driven decisions',
      'Some decisions automated for lower-risk areas',
      'AI augments human decision-making in key processes',
      'AI-driven decisions across operations with human oversight'
    ],
    weight: 2,
    explanation: 'AI-driven decisions scale human expertise and improve outcomes'
  },
  {
    id: 24,
    dimension: 'Automation',
    category: 'Efficiency Gains',
    question: 'What is your average cost savings from AI automation?',
    options: [
      'No measurable cost savings yet',
      'Less than 20% cost reduction',
      '20% - 50% cost reduction',
      'More than 50% cost reduction'
    ],
    weight: 2,
    explanation: 'Quantified cost savings validate AI investment'
  },
  {
    id: 25,
    dimension: 'Automation',
    category: 'Scalability',
    question: 'Can your automation infrastructure scale to new processes easily?',
    options: [
      'Poor scalability, highly custom for each process',
      'Limited scalability, requires significant customization',
      'Good scalability with reusable components',
      'Highly scalable with platform-based automation'
    ],
    weight: 2,
    explanation: 'Scalable automation extends ROI across the organization'
  },

  // Innovation (5 questions)
  {
    id: 26,
    dimension: 'Innovation',
    category: 'Research & Development',
    question: 'What is your R&D investment in advanced AI technologies?',
    options: [
      'No dedicated AI R&D',
      'Less than 2% of budget to AI R&D',
      '2% - 5% of budget to AI R&D',
      'More than 5% of budget to AI R&D'
    ],
    weight: 2,
    explanation: 'R&D investment enables competitive differentiation'
  },
  {
    id: 27,
    dimension: 'Innovation',
    category: 'Innovation Culture',
    question: 'How strong is your organizational AI innovation culture?',
    options: [
      'Risk-averse, limited experimentation',
      'Some innovation pilots and experiments',
      'Structured innovation with dedicated teams',
      'Strong experimentation culture with learning from failures'
    ],
    weight: 2,
    explanation: 'Innovation culture accelerates new AI applications'
  },
  {
    id: 28,
    dimension: 'Innovation',
    category: 'Emerging Technologies',
    question: 'Are you exploring emerging AI technologies (GenAI, large language models)?',
    options: [
      'Not exploring emerging technologies',
      'Awareness and early exploration',
      'Pilot programs with emerging technologies',
      'Strategic deployment of cutting-edge technologies'
    ],
    weight: 2,
    explanation: 'Emerging tech adoption drives competitive advantage'
  },
  {
    id: 29,
    dimension: 'Innovation',
    category: 'Partnerships',
    question: 'How are you leveraging external partnerships for innovation?',
    options: [
      'Limited external engagement',
      'Working with 1-2 AI vendors',
      'Strategic partnerships with multiple vendors and institutions',
      'Ecosystem player with partnerships across industry'
    ],
    weight: 2,
    explanation: 'Strategic partnerships accelerate innovation velocity'
  },
  {
    id: 30,
    dimension: 'Innovation',
    category: 'Market Position',
    question: 'How is AI positioning your organization in the market?',
    options: [
      'Not yet a competitive advantage',
      'Starting to differentiate from competitors',
      'Clear competitive advantage in AI capabilities',
      'Market leader in AI-driven solutions and services'
    ],
    weight: 2,
    explanation: 'AI-driven market position enables premium pricing and growth'
  },

  // ROI (5 questions)
  {
    id: 31,
    dimension: 'ROI',
    category: 'Revenue Impact',
    question: 'What is the measurable revenue impact from AI initiatives?',
    options: [
      'No measurable revenue impact',
      'Less than 10% revenue contribution',
      '10% - 25% revenue contribution',
      'More than 25% revenue contribution'
    ],
    weight: 2,
    explanation: 'Revenue growth validates AI strategic importance'
  },
  {
    id: 32,
    dimension: 'ROI',
    category: 'Cost-Benefit Analysis',
    question: 'What is your current ROI from AI investments?',
    options: [
      'Negative or unknown ROI',
      'Breakeven to 50% ROI',
      '50% - 150% ROI',
      'More than 150% ROI'
    ],
    weight: 2,
    explanation: 'Strong ROI demonstrates effective AI implementation'
  },
  {
    id: 33,
    dimension: 'ROI',
    category: 'Payback Period',
    question: 'What is the typical payback period for AI projects?',
    options: [
      'More than 3 years',
      '2-3 years',
      '1-2 years',
      'Less than 1 year'
    ],
    weight: 2,
    explanation: 'Faster payback enables reinvestment in AI'
  },
  {
    id: 34,
    dimension: 'ROI',
    category: 'Competitive Advantage',
    question: 'What is the competitive advantage achieved through AI?',
    options: [
      'Limited competitive advantage',
      'Incremental advantage in efficiency',
      'Significant advantage in specific areas',
      'Substantial market advantage across products/services'
    ],
    weight: 2,
    explanation: 'Competitive advantage drives sustainable business value'
  },
  {
    id: 35,
    dimension: 'ROI',
    category: 'Long-term Value',
    question: 'Are you building long-term sustainable value with AI?',
    options: [
      'Short-term focused, limited long-term strategy',
      'Some long-term planning',
      'Structured long-term AI value strategy',
      'Strong long-term AI roadmap with clear value milestones'
    ],
    weight: 2,
    explanation: 'Long-term strategy ensures sustained competitive advantage'
  },

  // Risk (5 questions)
  {
    id: 36,
    dimension: 'Risk',
    category: 'Security & Safety',
    question: 'How do you mitigate security and safety risks in AI systems?',
    options: [
      'Limited risk mitigation',
      'Basic security measures',
      'Comprehensive security with regular testing',
      'Advanced risk management with continuous monitoring'
    ],
    weight: 2,
    explanation: 'Security prevents breaches and data theft'
  },
  {
    id: 37,
    dimension: 'Risk',
    category: 'Model Robustness',
    question: 'How robust are your AI models against adversarial attacks?',
    options: [
      'Not tested for robustness',
      'Basic testing in controlled environments',
      'Adversarial testing in production scenarios',
      'Comprehensive robustness testing with continuous monitoring'
    ],
    weight: 2,
    explanation: 'Model robustness ensures reliable performance'
  },
  {
    id: 38,
    dimension: 'Risk',
    category: 'Incident Management',
    question: 'Do you have incident response plans for AI system failures?',
    options: [
      'No formal incident response',
      'Ad-hoc incident response',
      'Documented incident response procedures',
      'Comprehensive incident management with regular drills'
    ],
    weight: 2,
    explanation: 'Incident response minimizes impact of AI failures'
  },
  {
    id: 39,
    dimension: 'Risk',
    category: 'Model Drift',
    question: 'How do you monitor and manage model drift?',
    options: [
      'No model drift monitoring',
      'Manual monitoring',
      'Automated alerts for significant drift',
      'Continuous monitoring with automated retraining'
    ],
    weight: 2,
    explanation: 'Drift management maintains model accuracy over time'
  },
  {
    id: 40,
    dimension: 'Risk',
    category: 'Liability & Insurance',
    question: 'Do you have adequate liability coverage for AI-related risks?',
    options: [
      'No specific AI liability coverage',
      'Exploring coverage options',
      'Standard coverage with AI considerations',
      'Comprehensive AI liability insurance and risk management'
    ],
    weight: 2,
    explanation: 'Liability coverage protects against financial exposure'
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
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    // Authenticated - proceed to results
    downloadResults()
  }

  const downloadResults = () => {
    const score = calculateScore()
    const dims = JSON.stringify([
      { dimension: 'Capability', score: calculateDimensionScore('Capability'), category: 'Infrastructure' },
      { dimension: 'Governance', score: calculateDimensionScore('Governance'), category: 'Risk Management' },
      { dimension: 'Workforce', score: calculateDimensionScore('Workforce'), category: 'Skills' },
      { dimension: 'Data', score: calculateDimensionScore('Data'), category: 'Foundation' },
      { dimension: 'Automation', score: calculateDimensionScore('Automation'), category: 'Operations' },
      { dimension: 'Innovation', score: calculateDimensionScore('Innovation'), category: 'Growth' },
      { dimension: 'ROI', score: calculateDimensionScore('ROI'), category: 'Value' },
      { dimension: 'Risk', score: calculateDimensionScore('Risk'), category: 'Safety' },
    ])
    router.push(`/assessment-results?s=${score}&d=${encodeURIComponent(dims)}`)
  }

  const calculateScore = () => {
    if (Object.keys(answers).length === 0) return 0
    const totalScore = Object.entries(answers).reduce((sum, [_, optionIndex]) => {
      return sum + (optionIndex + 1) * 25
    }, 0)
    return Math.round(totalScore / Object.keys(answers).length)
  }

  const calculateDimensionScore = (dimension: string) => {
    const dimensionQuestions = PROFESSIONAL_QUESTIONS.filter((q) => q.dimension === dimension)
    if (dimensionQuestions.length === 0) return 0
    const total = dimensionQuestions.reduce((sum, q) => {
      const answerIndex = answers[q.id]
      return answerIndex !== undefined ? sum + (answerIndex + 1) * 25 : sum
    }, 0)
    return Math.round(total / dimensionQuestions.length)
  }

  const currentQ = PROFESSIONAL_QUESTIONS[currentQuestion]
  const progress = ((currentQuestion + 1) / PROFESSIONAL_QUESTIONS.length) * 100

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-card">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/assessments"
            className="text-gold hover:text-gold/80 transition-colors flex items-center gap-2 mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Assessments
          </Link>
          
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Professional AI Assessment
              </h1>
              <p className="text-foreground/70 max-w-2xl">
                Comprehensive 40-question assessment across all 8 AI Genome dimensions. 
                Takes approximately 45 minutes.
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gold">{Math.round(progress)}%</div>
              <div className="text-sm text-foreground/60">Complete</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-background/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-gold to-purple transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {!completed ? (
          // Assessment Content
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
            {/* Dimension badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-gold/10 border border-gold/20">
              <div className="w-2 h-2 bg-gold rounded-full" />
              <span className="text-sm font-semibold text-gold">{currentQ.dimension}</span>
            </div>

            {/* Question */}
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 leading-tight">
              {currentQ.question}
            </h2>

            {currentQ.explanation && (
              <p className="text-foreground/60 mb-8 italic border-l-2 border-gold/30 pl-4">
                💡 {currentQ.explanation}
              </p>
            )}

            {/* Options */}
            <div className="space-y-3 mb-12">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all group ${
                    answers[currentQ.id] === index
                      ? 'border-gold bg-gold/10'
                      : 'border-border hover:border-gold/50 hover:bg-card/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      answers[currentQ.id] === index
                        ? 'bg-gold border-gold'
                        : 'border-border group-hover:border-gold'
                    }`}>
                      {answers[currentQ.id] === index && (
                        <div className="w-2 h-2 bg-background rounded-full" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{option}</div>
                      <div className="text-sm text-foreground/50 mt-1">
                        Score: {(index + 1) * 25}/100
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex gap-4 justify-between">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2 px-6 py-3 text-foreground/60 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gold transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <div className="text-center text-foreground/60 text-sm">
                Question {currentQuestion + 1} of {PROFESSIONAL_QUESTIONS.length}
              </div>

              <button
                onClick={() => {
                  if (answers[currentQ.id] !== undefined) {
                    if (currentQuestion < PROFESSIONAL_QUESTIONS.length - 1) {
                      setCurrentQuestion(currentQuestion + 1)
                    } else {
                      setCompleted(true)
                    }
                  }
                }}
                disabled={answers[currentQ.id] === undefined}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-amber-500 text-background font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-gold/25 transition-all"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          // Completion Screen
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center">
            <div className="mb-8">
              <Sparkles className="w-16 h-16 text-gold mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Assessment Complete!
              </h2>
              <p className="text-foreground/70 text-lg mb-8">
                Your preliminary AI Readiness Score
              </p>
              <div className="inline-block mb-8">
                <div className="text-6xl font-bold text-gold mb-2">
                  {calculateScore()}
                </div>
                <div className="text-foreground/60">out of 100</div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-foreground mb-4">Next Steps:</h3>
              <ul className="space-y-2 text-foreground/70">
                <li>✓ Get your complete AI Genome profile</li>
                <li>✓ Receive personalized recommendations</li>
                <li>✓ See your certification pathway</li>
                <li>✓ Download your official assessment report</li>
                <li>✓ Get expert consultation</li>
              </ul>
            </div>

            {!showLoginPrompt ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleDownloadResults}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-gold to-amber-500 text-background rounded-lg font-semibold hover:shadow-lg hover:shadow-gold/25 transition-all"
                >
                  <Download className="w-5 h-5" />
                  View Full Profile
                </button>
                <a
                  href={WHATSAPP_URL('Hi TwB! I just completed the professional assessment and want to discuss my results.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-gold text-gold rounded-lg font-semibold hover:bg-gold/10 transition-all"
                >
                  <Share2 className="w-5 h-5" />
                  Talk to Expert
                </a>
              </div>
            ) : (
              <div className="bg-gold/10 border border-gold/20 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <Lock className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <h4 className="font-semibold text-foreground mb-2">Sign in to Save Your Results</h4>
                    <p className="text-foreground/70 mb-4">
                      Create an account to access your complete profile, download your certificate, and track your progress.
                    </p>
                    <div className="flex gap-3">
                      <Link
                        href="/auth/sign-up"
                        className="px-4 py-2 bg-gold text-background rounded-lg font-semibold hover:bg-gold/90 transition-all"
                      >
                        Create Account
                      </Link>
                      <Link
                        href="/auth/login"
                        className="px-4 py-2 border border-gold text-gold rounded-lg font-semibold hover:bg-gold/10 transition-all"
                      >
                        Sign In
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
