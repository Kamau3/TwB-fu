import { MessageCircle, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-gold to-purple flex items-center justify-center text-primary-foreground font-bold text-sm">
                TB
              </div>
              <span className="font-semibold text-foreground">Tech with Brands AI</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Practical AI training and automation solutions for Kenyan businesses. 
              Train your team, grow revenue, stay competitive.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://wa.me/254700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-gold/20 text-muted-foreground hover:text-gold transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </a>
              <a 
                href="mailto:hello@techwithbrands.ai"
                className="p-2 rounded-lg bg-secondary hover:bg-gold/20 text-muted-foreground hover:text-gold transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-gold transition-colors">Corporate Training</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">Team Workshops</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">AI Readiness Audits</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">Automation Services</a></li>
              <li><a href="#pricing" className="hover:text-gold transition-colors">AI Academy</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold" />
                +254 700 000 000
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold" />
                hello@techwithbrands.ai
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                Nairobi, Kenya
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Tech with Brands AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
