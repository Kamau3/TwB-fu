import { Navbar } from "@/components/sections/navbar"
import { Hero } from "@/components/sections/hero"
import { Footer } from "@/components/sections/footer"
import Link from "next/link"
import { ChevronRight, Radar, Book, Zap, Award, TrendingUp } from "lucide-react"

function FeaturesSection() {
  const features = [
    {
      icon: Radar,
      title: "AI Genome Assessment",
      description: "Measure your organization across 8 critical dimensions of AI maturity.",
      link: "/assessments",
      linkText: "Start Assessment"
    },
    {
      icon: Award,
      title: "Certification Program",
      description: "Get recognized with 5 levels of industry certification from Foundational to Excellence.",
      link: "/certification",
      linkText: "View Levels"
    },
    {
      icon: Book,
      title: "Industry Playbooks",
      description: "Implementation-ready playbooks with templates and workflows for your industry.",
      link: "/playbooks",
      linkText: "Explore Playbooks"
    },
    {
      icon: Zap,
      title: "Solutions Registry",
      description: "Curated AI solutions and tools aligned with TwB certification standards.",
      link: "/solutions",
      linkText: "Browse Solutions"
    },
    {
      icon: TrendingUp,
      title: "Benchmarks & Insights",
      description: "Compare your progress against industry leaders and global benchmarks.",
      link: "/benchmarks",
      linkText: "View Benchmarks"
    },
    {
      icon: Award,
      title: "Academy Courses",
      description: "Certification-aligned learning with hands-on courses and certifications.",
      link: "/academy",
      linkText: "Start Learning"
    }
  ]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            The Complete AI Excellence Platform
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            From assessment to certification to continuous improvement, we provide everything you need to achieve and maintain AI excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-purple/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                
                <div className="relative bg-card border border-border rounded-2xl p-8 hover:border-gold/50 transition-all h-full flex flex-col">
                  <Icon className="w-8 h-8 text-gold mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-foreground/70 flex-1 mb-6">{feature.description}</p>
                  <Link
                    href={feature.link}
                    className="text-gold font-semibold flex items-center gap-2 hover:gap-3 transition-all group/link"
                  >
                    {feature.linkText}
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function GlobalReachSection() {
  return (
    <section className="py-20 px-4 bg-card/50 border-y border-border">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-foreground mb-8">Global AI Standards. Local Expertise.</h2>
        <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-12">
          Tech with Brands sets the global benchmark for AI excellence while understanding the unique needs of organizations across industries and regions.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-4xl font-bold text-gold mb-3">150+</div>
            <p className="text-foreground/70">Organizations assessed and certified</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-gold mb-3">8</div>
            <p className="text-foreground/70">Dimensions of AI maturity measured</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-gold mb-3">5</div>
            <p className="text-foreground/70">Certification levels to achieve</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <GlobalReachSection />
      <Footer />
    </main>
  )
}
