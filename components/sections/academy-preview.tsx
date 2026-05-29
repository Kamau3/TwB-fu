"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Video, Award, Users, ArrowRight } from "lucide-react"

const features = [
  {
    icon: Video,
    title: "Live & Recorded Sessions",
    description: "Join weekly live workshops or learn at your own pace with our recorded library."
  },
  {
    icon: Users,
    title: "Community Access",
    description: "Connect with other AI practitioners, share wins, and get answers to your questions."
  },
  {
    icon: Award,
    title: "Certifications",
    description: "Earn recognized certificates that demonstrate your AI proficiency to employers."
  }
]

export function AcademyPreview() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 border border-purple/20 text-purple-light mb-4">
              <GraduationCap className="h-4 w-4" />
              <span className="text-sm font-medium">AI Academy</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Learn AI Skills That{" "}
              <span className="text-gold">Actually Matter</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed">
              Our AI Academy gives you and your team access to practical training, 
              live workshops, and a community of like-minded professionals—all designed 
              to help you apply AI in your daily work.
            </p>
            
            <Button 
              size="lg"
              className="bg-gold hover:bg-gold-light text-primary-foreground"
              asChild
            >
              <Link href="/academy">
                Explore the Academy
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {/* Right Content - Feature Cards */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gold/10 text-gold">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
                  </div>
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
      </div>
    </section>
  )
}
