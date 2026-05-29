"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, MessageCircle, User, LogOut } from "lucide-react"
import { LOGOS, WHATSAPP_URL } from "@/lib/constants"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/academy", label: "Academy" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src={LOGOS.horizontal} 
              alt="Tech with Brands" 
              width={180} 
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Desktop CTA / Auth */}
          <div className="hidden md:flex items-center gap-3">
            {!loading && (
              <>
                {user ? (
                  <>
                    <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
                      <Link href="/dashboard">
                        <User className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                    </Button>
                    <form action="/auth/signout" method="post">
                      <Button variant="ghost" type="submit" className="text-muted-foreground hover:text-foreground">
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </form>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
                      <Link href="/auth/login">Sign In</Link>
                    </Button>
                    <Button 
                      className="bg-gold hover:bg-gold-light text-primary-foreground font-medium"
                      asChild
                    >
                      <Link href="/auth/sign-up">Get Started</Link>
                    </Button>
                  </>
                )}
              </>
            )}
            <Button 
              variant="outline"
              className="border-gold text-gold hover:bg-gold hover:text-primary-foreground"
              asChild
            >
              <a 
                href={WHATSAPP_URL("Hi! I'm interested in AI training.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </a>
            </Button>
          </div>
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-border w-[280px]">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-foreground hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="border-t border-border pt-6 space-y-4">
                  {!loading && (
                    <>
                      {user ? (
                        <>
                          <Link 
                            href="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 text-foreground hover:text-gold"
                          >
                            <User className="h-5 w-5" />
                            Dashboard
                          </Link>
                          <form action="/auth/signout" method="post">
                            <button
                              type="submit"
                              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                            >
                              <LogOut className="h-5 w-5" />
                              Sign Out
                            </button>
                          </form>
                        </>
                      ) : (
                        <>
                          <Link 
                            href="/auth/login"
                            onClick={() => setIsOpen(false)}
                            className="text-lg text-foreground hover:text-gold"
                          >
                            Sign In
                          </Link>
                          <Button 
                            className="w-full bg-gold hover:bg-gold-light text-primary-foreground font-medium"
                            asChild
                          >
                            <Link href="/auth/sign-up" onClick={() => setIsOpen(false)}>
                              Get Started
                            </Link>
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </div>

                <Button 
                  variant="outline"
                  className="border-gold text-gold hover:bg-gold hover:text-primary-foreground mt-4"
                  asChild
                >
                  <a 
                    href={WHATSAPP_URL("Hi! I'm interested in AI training.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
