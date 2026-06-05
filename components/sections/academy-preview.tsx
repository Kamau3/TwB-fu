"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Play, FileText, Award, ArrowRight } from "lucide-react"

const features = [
  {
    icon: Play,
    title: "Video Tutorials",
    description: "Step-by-step video guides on AI tools"
  },
  {
    icon: FileText,
    title: "Downloadable Resources",
    description: "Templates, checklists, and guides"
  },
  {
    icon: BookOpen,
    title: "Learning Tracks",
    description: "Structured paths for different roles"
  },
  {
    icon: Award,
    title: "Certificates",
    description: "Proof of your AI proficiency"
  }
]

export function AcademyPreview() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-purple/5 to-background" />
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[500px] h-[500px] bg-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content - Visual */}
          <div className="relative order-2 lg:order-1">
            {/* Main card */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple/20 to-gold/20 rounded-3xl blur-2xl opacity-60" />
              <div className="relative bg-card rounded-3xl border border-border p-8 overflow-hidden">
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-gold/20 to-transparent" />

                {/* Content */}
                <div className="relative space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-purple/20">
                      <BookOpen className="h-8 w-8 text-purple-light" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">AI Academy</h3>
                      <p className="text-sm text-muted-foreground">Self-paced learning</p>
                    </div>
                  </div>

                  {/* Feature list */}
                  <div className="grid grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div key={index} className="group cursor-pointer flex items-start gap-3 p-3 rounded-xl bg-background/50 border border-border hover:border-gold/50 hover:bg-background/80 transition-all duration-300 transform hover:scale-105">
                        <feature.icon className="h-5 w-5 text-gold flex-shrink-0 mt-0.5 group-hover:scale-125 group-hover:text-amber-300 transition-all duration-300" />
                        <div>
                          <p className="text-sm font-medium text-foreground group-hover:text-gold transition-colors duration-300">{feature.title}</p>
                          <p className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Progress bar mockup */}
                  <div className="p-4 rounded-xl bg-background/50 border border-border">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-foreground font-medium">Your Progress</span>
                      <span className="text-muted-foreground">Get Started</span>
                    </div>
                    <div className="h-2 bg-border rounded-full overflow-hidden">
                      <div className="h-full w-0 bg-gradient-to-r from-gold to-purple-light rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 p-3 rounded-xl bg-card border border-border shadow-xl">
              <Play className="h-6 w-6 text-gold" />
            </div>
            <div className="absolute -bottom-4 -right-4 p-3 rounded-xl bg-card border border-border shadow-xl">
              <Award className="h-6 w-6 text-purple-light" />
            </div>
          </div>

          {/* Right content - Text */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 border border-purple/20 text-purple-light mb-6">
              <span className="text-sm font-medium">AI Academy</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Learn AI at Your Own Pace
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {"Our online academy gives you 24/7 access to video tutorials, downloadable resources, and structured learning paths. Perfect for individuals and teams who want to build AI skills gradually."}
            </p>

            {/* Benefits list */}
            <ul className="space-y-4 mb-8">
              {[
                "Learn on your schedule, at your pace",
                "Practical exercises with real AI tools",
                "Downloadable templates and guides"
              ].map((benefit, idx) => (
                <li key={idx} className="group cursor-pointer flex items-center gap-3 p-3 rounded-lg hover:bg-green-500/5 transition-all duration-300 transform hover:translate-x-1">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/40 transition-colors duration-300">
                    <div className="w-2 h-2 rounded-full bg-green-500 group-hover:scale-125 transition-transform duration-300" />
                  </div>
                  <span className="text-foreground group-hover:text-green-400 transition-colors duration-300 font-medium">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-purple hover:bg-purple-light text-white font-semibold"
                asChild
              >
                <Link href="/academy">
                  Explore Academy
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-border"
                asChild
              >
                <Link href="/auth/sign-up">
                  Create Free Account
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
