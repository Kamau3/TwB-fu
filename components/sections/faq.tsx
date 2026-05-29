"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How long does it take to see results from AI training?",
    answer: "Most teams see immediate improvements in their first week. Our training focuses on practical skills—your staff will start using AI tools productively from day one. Full productivity gains (40%+ improvement) typically happen within 30-90 days as habits form."
  },
  {
    question: "Do we need technical staff to benefit from your training?",
    answer: "Not at all. Our training is designed for non-technical professionals—marketing teams, HR, finance, customer service, operations. If your team can use email and spreadsheets, they can learn to use AI tools effectively."
  },
  {
    question: "What's included in an AI Readiness Audit?",
    answer: "We analyze your current workflows, identify time-wasting processes, and create a prioritized roadmap showing exactly where AI can save you money. You'll get ROI projections, tool recommendations, and a step-by-step implementation plan—all in clear, jargon-free language."
  },
  {
    question: "Can you train our team at our office?",
    answer: "Yes! We offer on-site training for Corporate plan subscribers. We come to your Nairobi office (or arrange virtual sessions for teams outside Nairobi) with all materials and hands-on exercises tailored to your industry."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept M-Pesa, bank transfers, and card payments. For Corporate and Business plans, we offer flexible payment terms including monthly installments. All prices are in KES with no hidden fees."
  },
  {
    question: "Is there ongoing support after training?",
    answer: "Every plan includes WhatsApp support. Business and Corporate plans include priority support, regular check-ins, and access to our community of trained professionals. We're here to help your team succeed long after the training ends."
  }
]

export function FAQ() {
  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold mb-4">
            <span className="text-sm font-medium">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Common Questions
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Everything you need to know about our AI training and services.
          </p>
        </div>
        
        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-gold/50"
            >
              <AccordionTrigger className="text-left text-foreground hover:text-gold hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
