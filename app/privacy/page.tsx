import Link from "next/link"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"

export const metadata = {
  title: "Privacy Policy | Tech with Brands AI",
  description: "Privacy policy for Tech with Brands AI Academy and services.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-6">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
            <p>We respect your privacy and are committed to protecting your personal data.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">1. Information We Collect</h2>
            <p>We collect information you provide when creating an account, including your name and email address.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">2. How We Use Your Data</h2>
            <p>We use your data to provide and improve our services, process payments, and communicate with you.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">3. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">4. Contact</h2>
            <p>For privacy-related inquiries, contact us at hello@techwithbrands.co.ke.</p>
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
