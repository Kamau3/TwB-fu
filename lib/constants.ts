// Centralized contact information
export const CONTACT = {
  whatsapp: "254791472688",
  phone: "+254 791 472 688",
  email: "hello@techwithbrands.co.ke",
  location: "Nairobi, Kenya"
}

export const PHONE_NUMBER = CONTACT.phone

export const WHATSAPP_URL = (message: string) => 
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`

// Logo URLs
export const LOGOS = {
  horizontal: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-horizontal_b32a499e-Wtp0h8gwolyEX5NdyUjpXYOcDYdNgh.png",
  standard: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-standard_47d40bb8-6NJYG5qo3bpU4a7BuqIbbg2yTJBGVj.png",
  minimal: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-minimal_9e6fa51e-UaMf38Ojdi15BYKPAH4926MB2FocKR.png"
}
