import { Metadata } from "next"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react"
import { CONTACT, WHATSAPP_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Contact Us | Tech with Brands AI",
  description: "Get in touch with Tech with Brands. We're here to help with your AI training and automation needs.",
}

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Quick responses during business hours",
    value: CONTACT.phone,
    href: WHATSAPP_URL("Hi! I'd like to get in touch."),
    cta: "Message Us"
  },
  {
    icon: Phone,
    title: "Phone",
    description: "Call us directly",
    value: CONTACT.phone,
    href: `tel:${CONTACT.phone.replace(/\s/g, '')}`,
    cta: "Call Now"
  },
  {
    icon: Mail,
    title: "Email",
    description: "For detailed inquiries",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    cta: "Send Email"
  }
]

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold mb-6">
            <span className="text-sm font-medium">Contact Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Let&apos;s{" "}
            <span className="text-gold">Talk</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Have questions about our services? Want to discuss AI training for your team? 
            We&apos;re here to help.
          </p>
        </div>
      </section>
      
      {/* Contact Methods */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="bg-card border-border text-center">
                <CardHeader>
                  <div className="mx-auto p-3 rounded-lg bg-gold/10 text-gold w-fit mb-2">
                    <method.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg text-foreground">{method.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {method.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-foreground mb-4">{method.value}</p>
                  <Button 
                    className="w-full bg-gold hover:bg-gold-light text-primary-foreground"
                    asChild
                  >
                    <a 
                      href={method.href}
                      target={method.title === "WhatsApp" ? "_blank" : undefined}
                      rel={method.title === "WhatsApp" ? "noopener noreferrer" : undefined}
                    >
                      {method.cta}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Additional Info */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent via-card/50 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Location */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gold/10 text-gold shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Location</h3>
                    <p className="text-muted-foreground">
                      {CONTACT.location}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      We serve clients across Kenya and offer both on-site and virtual training options.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Hours */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gold/10 text-gold shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      WhatsApp messages are typically answered within a few hours during business hours.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Preferred Contact */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-gradient-to-br from-gold/10 via-card to-purple/10 border-border">
            <CardContent className="p-8 md:p-12 text-center">
              <MessageCircle className="h-12 w-12 text-gold mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                WhatsApp is the Fastest Way to Reach Us
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                For quick questions, booking inquiries, or just to say hello—WhatsApp is your best bet. 
                We usually respond within an hour during business hours.
              </p>
              <Button 
                size="lg"
                className="bg-gold hover:bg-gold-light text-primary-foreground shadow-lg shadow-gold/20"
                asChild
              >
                <a 
                  href={WHATSAPP_URL("Hi! I'd like to get in touch.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start a Conversation
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
