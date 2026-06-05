import Link from "next/link"
import Image from "next/image"
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react"
import { LOGOS, CONTACT, WHATSAPP_URL } from "@/lib/constants"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image 
                src={LOGOS.horizontal} 
                alt="Tech with Brands" 
                width={180} 
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Your AI execution partner. We help Kenyan businesses train teams, 
              automate operations, and grow faster with practical AI solutions.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href={WHATSAPP_URL("Hi! I'd like to learn more about your services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-gold/20 text-muted-foreground hover:text-gold transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </a>
              <a 
                href={`mailto:${CONTACT.email}`}
                className="p-2 rounded-lg bg-secondary hover:bg-gold/20 text-muted-foreground hover:text-gold transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/services" className="hover:text-gold transition-colors">Services</Link></li>
              <li><Link href="/academy" className="hover:text-gold transition-colors">AI Academy</Link></li>
              <li><Link href="/assessments" className="hover:text-gold transition-colors">Assessments</Link></li>
              <li><Link href="/certification" className="hover:text-gold transition-colors">Certification</Link></li>
              <li><Link href="/pricing" className="hover:text-gold transition-colors">Pricing</Link></li>
              <li><Link href="/solutions" className="hover:text-gold transition-colors">Solutions</Link></li>
              <li><Link href="/playbooks" className="hover:text-gold transition-colors">Playbooks</Link></li>
              <li><Link href="/benchmarks" className="hover:text-gold transition-colors">Benchmarks</Link></li>
              <li><Link href="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold" />
                <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="hover:text-gold transition-colors">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-gold transition-colors">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                {CONTACT.location}
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} Tech with Brands. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
