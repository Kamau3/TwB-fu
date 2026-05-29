"use client"

import { MessageCircle, Calendar, Rocket, TrendingUp } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Start a Conversation",
    description: "Reach out via WhatsApp or schedule a call. We'll listen to your challenges and goals.",
    color: "gold"
  },
  {
    number: "02",
    icon: Calendar,
    title: "Get a Custom Plan",
    description: "We'll create a tailored approach—whether it's training, workshops, or automation.",
    color: "purple"
  },
  {
    number: "03",
    icon: Rocket,
    title: "Execute Together",
    description: "We work alongside your team to implement solutions and build AI capabilities.",
    color: "gold"
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "See Real Results",
    description: "Watch your team become more productive and your processes more efficient.",
    color: "purple"
  }
]

export function HowItWorks() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6">
            <span className="text-sm font-medium text-foreground">The Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How We{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-purple-light">
              Work Together
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A simple, straightforward process designed to get you results as quickly as possible.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step card */}
                <div className="relative bg-card border border-border rounded-2xl p-6 hover:border-gold/30 transition-all duration-300 h-full">
                  {/* Step number */}
                  <div className={`absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.color === 'gold' 
                      ? 'bg-gold text-primary-foreground' 
                      : 'bg-purple text-white'
                  }`}>
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl mb-4 ${
                    step.color === 'gold' ? 'bg-gold/10' : 'bg-purple/10'
                  }`}>
                    <step.icon className={`h-8 w-8 ${
                      step.color === 'gold' ? 'text-gold' : 'text-purple-light'
                    }`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>

                {/* Arrow for desktop - between cards */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 text-border z-10">
                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-auto">
                      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
