import type { ReactNode } from "react"

interface CTASectionProps {
  heading: string
  description: string
  children: ReactNode
}

export function CTASection({ heading, description, children }: CTASectionProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-gold/10 via-card to-purple/10 border border-border rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{heading}</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{description}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
