"use client"

const clients = [
  "Safaricom", "Kenya Airways", "Equity Bank", "KCB Group", "Britam"
]

export function Clients() {
  return (
    <section className="py-12 px-4 border-y border-border bg-card/50">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Trusted by leading Kenyan organizations
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {clients.map((client, index) => (
            <div 
              key={index}
              className="text-xl font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
