import type { ReactNode } from "react"

interface PageHeroProps {
  label?: string
  title: string
  highlight?: string
  description: string
  children?: ReactNode
}

export function PageHero({ label, title, highlight, description, children }: PageHeroProps) {
  return (
    <section className="pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {label && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold mb-6">
            <span className="text-sm font-medium">{label}</span>
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
          {title}{highlight && <span className="text-gold"> {highlight}</span>}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          {description}
        </p>
        {children}
      </div>
    </section>
  )
}
