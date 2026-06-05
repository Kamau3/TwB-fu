import Link from "next/link"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"

export const metadata = {
  title: "Terms of Service | Tech with Brands AI",
  description: "Terms of service for Tech with Brands AI Academy and services.",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-6">Terms of Service</h1>
          <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
            <p>These terms govern your use of Tech with Brands AI services and Academy platform.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">1. Acceptance of Terms</h2>
            <p>By accessing or using our services, you agree to be bound by these terms.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">2. Services</h2>
            <p>We provide AI training, workshops, audits, and automation implementation services as described on our website.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">3. Payments</h2>
            <p>Subscription fees are billed monthly. Refunds are available within 14 days of purchase.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">4. Contact</h2>
            <p>For questions about these terms, reach out via WhatsApp or email at hello@techwithbrands.co.ke.</p>
          </div>
          <div className="mt-8">
            <Link href="/" className="text-primary hover:underline">Back to home</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
