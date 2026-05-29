"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, MessageCircle } from "lucide-react"
import { LOGOS, WHATSAPP_URL } from "@/lib/constants"

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/academy", label: "Academy" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  
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
          
          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button 
              className="bg-gold hover:bg-gold-light text-primary-foreground font-medium"
              asChild
            >
              <a 
                href={WHATSAPP_URL("Hi! I'm interested in AI training.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Let&apos;s Talk
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
                <Button 
                  className="bg-gold hover:bg-gold-light text-primary-foreground font-medium mt-4"
                  asChild
                >
                  <a 
                    href={WHATSAPP_URL("Hi! I'm interested in AI training.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Let&apos;s Talk
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
