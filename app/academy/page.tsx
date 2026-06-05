import { Metadata } from "next"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { PageHero } from "@/components/sections/page-hero"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Video, Users, Award, BookOpen, Zap, MessageCircle, ArrowRight } from "lucide-react"
import { WHATSAPP_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "AI Academy | Tech with Brands AI",
  description: "Learn practical AI skills through our academy. Live workshops, recorded lessons, community access, and certifications for Kenyan professionals.",
}

const features = [
  {
    icon: Video,
    title: "Live Weekly Sessions",
    description: "Join interactive workshops every week where you learn new AI tools and techniques with hands-on practice."
  },
  {
    icon: BookOpen,
    title: "On-Demand Library",
    description: "Access our full library of recorded sessions, tutorials, and templates whenever you need them."
  },
  {
    icon: Users,
    title: "Community Access",
    description: "Connect with other AI practitioners, share your wins, ask questions, and learn from peers."
  },
  {
    icon: Award,
    title: "Certifications",
    description: "Earn certificates that demonstrate your AI proficiency—great for career growth and LinkedIn profiles."
  },
  {
    icon: Zap,
    title: "Practical Projects",
    description: "Apply what you learn with real-world projects. Build your portfolio while developing new skills."
  },
  {
    icon: GraduationCap,
    title: "Expert Guidance",
    description: "Get your questions answered by experienced AI practitioners who understand business applications."
  }
]

const tracks = [
  {
    title: "AI Foundations",
    description: "Start here if you're new to AI. Learn the basics of ChatGPT, Claude, and other AI tools.",
    modules: ["Introduction to AI Tools", "Prompt Engineering Basics", "AI for Daily Productivity", "Ethics & Best Practices"]
  },
  {
    title: "AI for Business",
    description: "Apply AI to business challenges. Marketing, sales, customer service, and operations.",
    modules: ["AI-Powered Marketing", "Sales Automation", "Customer Service Bots", "Data Analysis with AI"]
  },
  {
    title: "Advanced AI Applications",
    description: "Go deeper with custom solutions, integrations, and automation workflows.",
    modules: ["Custom GPTs & Agents", "Workflow Automation", "API Integrations", "Building AI Products"]
  }
]

export default function AcademyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <PageHero
        label="AI Academy"
        title="Master AI Skills That"
        highlight="Move Your Career Forward"
        description="Join our AI Academy and learn practical skills you can apply immediately. Live workshops, on-demand content, community support, and certifications—all in one place."
      >
        <Button 
          size="lg"
          className="bg-gold hover:bg-gold-light text-primary-foreground shadow-lg shadow-gold/20"
          asChild
        >
          <a 
            href={WHATSAPP_URL("Hi! I'm interested in joining the AI Academy.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Join the Academy
          </a>
        </Button>
      </PageHero>
      
      {/* Features */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent via-card/50 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            Everything You Need to{" "}
            <span className="text-gold">Learn and Grow</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader>
                  <div className="p-2 rounded-lg bg-gold/10 text-gold w-fit mb-2">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Learning Tracks */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Structured Learning{" "}
              <span className="text-gold">Paths</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow our curated tracks or explore topics that interest you. Either way, you&apos;ll build skills progressively.
            </p>
          </div>
          
          <div className="space-y-6">
            {tracks.map((track, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">{track.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {track.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {track.modules.map((module, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 rounded-full bg-secondary text-sm text-muted-foreground"
                      >
                        {module}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-gradient-to-br from-gold/10 via-card to-purple/10 border-border">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Start Your AI Journey?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Whether you&apos;re just getting started or looking to level up, the Academy has something for you. 
                Let&apos;s talk about how to get you enrolled.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg"
                  className="bg-gold hover:bg-gold-light text-primary-foreground"
                  asChild
                >
                  <a 
                    href={WHATSAPP_URL("Hi! I'd like to join the AI Academy.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Enroll Now
                  </a>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-secondary"
                  asChild
                >
                  <a href="/pricing">
                    View Pricing
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
