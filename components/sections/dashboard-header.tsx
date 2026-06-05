import Link from "next/link"
import Image from "next/image"
import type { ReactNode } from "react"

interface DashboardHeaderProps {
  title: string
  left?: ReactNode
  right?: ReactNode
}

export function DashboardHeader({ title, left, right }: DashboardHeaderProps) {
  return (
    <header className="border-b border-border bg-card/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {left}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-minimal_9e6fa51e-UaMf38Ojdi15BYKPAH4926MB2FocKR.png"
              alt="Tech with Brands"
              width={40}
              height={40}
            />
            <span className="font-semibold text-foreground">{title}</span>
          </Link>
        </div>
        {right && <div className="flex items-center gap-4">{right}</div>}
      </div>
    </header>
  )
}
