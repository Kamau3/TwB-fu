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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link key={feature.title} href={feature.link}>
                <div className="group relative cursor-pointer h-full">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold/30 to-purple/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Card */}
                  <div className="relative bg-card border border-border rounded-2xl p-8 h-full flex flex-col hover:border-gold transition-all duration-300 group-hover:shadow-lg group-hover:shadow-gold/20 transform group-hover:scale-[1.02] group-hover:-translate-y-1">
                    {/* Icon with background */}
                    <div className="inline-flex w-fit p-3 rounded-xl bg-gold/10 mb-4 group-hover:bg-gold/20 group-hover:text-gold transition-all duration-300">
                      <Icon className="w-6 h-6 text-gold group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-gold transition-colors duration-300">{feature.title}</h3>
                    <p className="text-foreground/70 flex-1 mb-6 group-hover:text-foreground/80 transition-colors duration-300">{feature.description}</p>
                    
                    {/* Link with arrow animation */}
                    <div className="text-gold font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                      <span>{feature.linkText}</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function GlobalReachSection() {
  const stats = [
    { value: '150+', label: 'Organizations assessed and certified', icon: '🏢' },
    { value: '8', label: 'Dimensions of AI maturity measured', icon: '📊' },
    { value: '5', label: 'Certification levels to achieve', icon: '🏆' }
  ]

  return (
    <section className="py-20 px-4 bg-card/50 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Global AI Standards. Local Expertise.</h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Tech with Brands sets the global benchmark for AI excellence while understanding the unique needs of organizations across industries and regions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative cursor-pointer"
            >
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-purple/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Card */}
              <div className="relative bg-background border border-border rounded-2xl p-8 text-center h-full transform transition-all duration-300 group-hover:scale-105 group-hover:border-gold group-hover:shadow-lg group-hover:shadow-gold/10">
                {/* Icon */}
                <div className="text-5xl mb-4 transform transition-transform duration-300 group-hover:scale-125">
                  {stat.icon}
                </div>
                
                {/* Value */}
                <div className="text-5xl font-bold text-gold mb-3 group-hover:text-amber-300 transition-colors duration-300">
                  {stat.value}
                </div>
                
                {/* Label */}
                <p className="text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
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
