// Company Identity
export const COMPANY = {
  name: 'Tech with Brands (TwB)',
  tagline: 'The Global Benchmark for AI Excellence',
  mission: 'Measure. Certify. Elevate.',
}

// Centralized contact information
export const CONTACT = {
  whatsapp: "254791472688",
  phone: "+254 791 472 688",
  email: "hello@techwithbrands.co.ke",
  location: "Nairobi, Kenya"
}

export const PHONE_NUMBER = CONTACT.phone

export const WHATSAPP_URL = (message: string) => 
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`

// Logo URLs
export const LOGOS = {
  horizontal: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-horizontal_b32a499e-Wtp0h8gwolyEX5NdyUjpXYOcDYdNgh.png",
  standard: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-standard_47d40bb8-6NJYG5qo3bpU4a7BuqIbbg2yTJBGVj.png",
  minimal: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-minimal_9e6fa51e-UaMf38Ojdi15BYKPAH4926MB2FocKR.png"
}

// Navigation
export const NAVIGATION = [
  { label: 'Assessments', href: '/assessments' },
  { label: 'Certification', href: '/certification' },
  { label: 'Academy', href: '/academy' },
  { label: 'Playbooks', href: '/playbooks' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Benchmarks', href: '/benchmarks' },
  { label: 'About', href: '/about' },
]

// AI Genome Dimensions - 8 pillars
export const AI_GENOME_DIMENSIONS = [
  { id: 'capability', name: 'Capability', description: 'AI system readiness and technical infrastructure' },
  { id: 'governance', name: 'Governance', description: 'Policies, compliance, and ethical frameworks' },
  { id: 'workforce', name: 'Workforce', description: 'Skills, training, and organizational readiness' },
  { id: 'data', name: 'Data', description: 'Quality, management, and accessibility' },
  { id: 'automation', name: 'Automation', description: 'Process optimization and efficiency gains' },
  { id: 'innovation', name: 'Innovation', description: 'Competitive advantage and market differentiation' },
  { id: 'roi', name: 'ROI', description: 'Financial impact and value realization' },
  { id: 'risk', name: 'Risk', description: 'Security, liability, and mitigation' },
]

// Certification Levels 1-5
export const CERTIFICATION_LEVELS = [
  { level: 1, name: 'Foundational', description: 'Basic understanding of AI principles and readiness' },
  { level: 2, name: 'Operational', description: 'Actively implementing AI in business operations' },
  { level: 3, name: 'Strategic', description: 'Strategic integration across the organization' },
  { level: 4, name: 'Advanced', description: 'Advanced governance and optimization practices' },
  { level: 5, name: 'Excellence', description: 'Achieves global benchmark standard excellence' },
]

// Assessment Types
export const ASSESSMENT_TYPES = [
  { type: 'free', name: 'Quick Assessment', duration: '10 mins', questions: 25, price: 'Free' },
  { type: 'professional', name: 'Professional Assessment', duration: '45 mins', questions: 80, price: 'KES 2,500' },
  { type: 'enterprise', name: 'Enterprise Assessment', duration: '2 hours', questions: 150, price: 'Contact us' },
]

// Solutions Categories
export const SOLUTIONS_CATEGORIES = [
  'Enterprise AI Platforms',
  'Data & Analytics',
  'Automation & RPA',
  'Governance & Compliance',
  'Industry-Specific Solutions',
  'Workforce Development',
]

// Industries we serve
export const INDUSTRIES = [
  'Financial Services',
  'Healthcare',
  'Retail & E-commerce',
  'Manufacturing',
  'Telecommunications',
  'Government',
  'Education',
  'Logistics & Transport',
]
