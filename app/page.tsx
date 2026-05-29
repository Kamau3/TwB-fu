import { Navbar } from "@/components/sections/navbar"
import { Hero } from "@/components/sections/hero"
import { Clients } from "@/components/sections/clients"
import { Services } from "@/components/sections/services"
import { WhyUs } from "@/components/sections/why-us"
import { Pricing } from "@/components/sections/pricing"
import { Testimonials } from "@/components/sections/testimonials"
import { FAQ } from "@/components/sections/faq"
import { CTA } from "@/components/sections/cta"
import { Footer } from "@/components/sections/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Clients />
      <Services />
      <WhyUs />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
