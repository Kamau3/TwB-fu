import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Tech with Brands AI | AI Training & Business Automation Kenya',
  description: 'Practical AI training, team workshops, AI readiness audits and business automation for Kenyan organizations. Train your team, grow revenue, improve productivity.',
  generator: 'v0.app',
  icons: {
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-minimal_9e6fa51e-UaMf38Ojdi15BYKPAH4926MB2FocKR.png',
    apple: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-minimal_9e6fa51e-UaMf38Ojdi15BYKPAH4926MB2FocKR.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
