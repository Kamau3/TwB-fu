import { Target, Users2, Lightbulb, HeartHandshake } from "lucide-react"

const reasons = [
  {
    icon: Target,
    title: "Results-Focused",
    description: "We measure success by your business outcomes—increased productivity, reduced costs, happier teams."
  },
  {
    icon: Users2,
    title: "Kenya-First Approach",
    description: "Training and solutions built for the Kenyan market. We understand local business challenges."
  },
  {
    icon: Lightbulb,
    title: "Practical, Not Theoretical",
    description: "Every session includes hands-on exercises with tools your team will actually use."
  },
  {
    icon: HeartHandshake,
    title: "Ongoing Partnership",
    description: "We stay with you after training ends. Questions, updates, support—we're here."
  }
]

export function WhyUs() {
  return (
    <section className="relative py-24 px-4 bg-card/50">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold mb-6">
              <span className="text-sm font-medium">Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Your Partner in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-purple-light">
                AI Transformation
              </span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {"We're not just trainers—we're your execution partners. We help you understand AI, implement it, and see real results in your business."}
            </p>
          </div>

          {/* Right content - Feature grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <div 
                key={index}
                className="group p-6 rounded-2xl bg-background border border-border hover:border-gold/30 transition-all duration-300"
              >
                <div className="inline-flex p-3 rounded-xl bg-gold/10 mb-4 group-hover:bg-gold/20 transition-colors">
                  <reason.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
