import { Navbar } from "@/components/sections/navbar"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { WhyUs } from "@/components/sections/why-us"
import { AcademyPreview } from "@/components/sections/academy-preview"
import { CTA } from "@/components/sections/cta"
import { Footer } from "@/components/sections/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <AcademyPreview />
      <CTA />
      <Footer />
    </main>
  )
}
