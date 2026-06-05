import type { ReactNode, ElementType } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface HoverGlowCardProps {
  icon?: ElementType
  title: string
  description: string
  children?: ReactNode
  className?: string
}

export function HoverGlowCard({ icon: Icon, title, description, children, className = "" }: HoverGlowCardProps) {
  return (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-purple/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
      <div className={`relative bg-card border border-border rounded-2xl p-8 hover:border-gold/50 transition-all ${className}`}>
        {Icon && (
          <div className="p-3 rounded-lg bg-gold/10 text-gold w-fit mb-4">
            <Icon className="h-6 w-6" />
          </div>
        )}
        <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
        {children}
      </div>
    </div>
  )
}
