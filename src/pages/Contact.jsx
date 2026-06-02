import { useState } from 'react'
import { Clock, Mail, MapPin } from 'lucide-react'
import { Kicker, Reveal, RevealHeading, CAL } from '../components/ui.jsx'

const FORM_ENDPOINT = 'https://formspree.io/f/xrednkrv'

export default function Contact() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!FORM_ENDPOINT) { setStatus('noconfig'); return }
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: new FormData(e.target), headers: { Accept: 'application/json' } })
      if (res.ok) { setStatus('sent'); e.target.reset() } else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <main>
      <section className="relative overflow-hidden px-6 pb-12 pt-28 md:px-10 md:pb-16 md:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_10%,rgba(181,103,60,0.13),transparent_65%)]" />
        <div className="relative mx-auto max-w-content">
          <Reveal><Kicker className="mb-8">Contact</Kicker></Reveal>
          <RevealHeading as="h1" text="Let's talk transformation" className="t-h1 font-display text-cream" />
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-prose text-[1.12rem] leading-relaxed text-cream2">I work with a select number of organizations at any given time. If you're an executive leader serious about AI transformation — not experimentation — I want to hear from you.</p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-32 md:px-10">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-px overflow-hidden rounded-sm border border-stone bg-stone lg:grid-cols-2">
          {/* Booking */}
          <Reveal>
            <div className="h-full bg-gradient-to-br from-[#3a281d] to-ink3 p-10 md:p-14">
              <Kicker className="mb-6">Fastest Way</Kicker>
              <h2 className="t-h3 mb-4 font-display text-cream">Book an AI Transformation Call</h2>
              <p className="mb-8 max-w-md text-[1.02rem] leading-relaxed text-muted">A focused 15-minute conversation to understand your situation and whether I'm the right fit. No pitch deck, no pressure.</p>
              <a href={CAL} target="_blank" rel="noopener noreferrer" className="group inline-flex w-full items-center justify-center gap-2.5 rounded-sm bg-copper px-7 py-4 text-[1rem] font-medium text-white transition-all duration-300 ease-smooth hover:bg-copperLt sm:w-auto">
                Open the Booking Calendar <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <div className="mt-10 space-y-5 border-t border-stone/60 pt-8">
                {[[Clock, <><span className="text-cream2">15 minutes</span> — direct with Mike Kennedy, PhD.</>], [Mail, <><span className="text-cream2">Prefer email?</span> Use the form and I'll respond within two business days.</>], [MapPin, <><span className="text-cream2">Based in Canada</span> — serving organizations nationwide.</>]].map(([Icon, txt], i) => (
                  <div key={i} className="flex items-start gap-3.5 text-[0.95rem] text-muted">
                    <Icon size={18} className="mt-0.5 shrink-0 text-copperLt" strokeWidth={1.6} />
                    <div>{txt}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="h-full bg-ink3 p-10 md:p-14">
              <h2 className="t-h3 mb-2 font-display text-cream">Discuss Your Requirements</h2>
              <p className="mb-8 text-[0.97rem] text-muted">Tell me a little about your organization and what you're trying to solve.</p>
              {status === 'sent' ? (
                <div className="rounded-sm border border-copper/40 bg-copper/10 px-6 py-12 text-center">
                  <p className="font-display text-[1.5rem] text-cream">Message sent.</p>
                  <p className="mt-2 text-[0.95rem] text-muted">I'll be in touch within two business days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Field label="Name" name="name" placeholder="Your full name" required />
                  <Field label="Work Email" name="email" type="email" placeholder="you@organization.com" required />
                  <Field label="Organization" name="organization" placeholder="Organization name" />
                  <div>
                    <label className="mb-2 block text-[0.72rem] uppercase tracking-[0.16em] text-muted2">Interested In</label>
                    <select name="interest" className="w-full rounded-sm border border-stone bg-ink px-4 py-3 font-body text-[0.97rem] font-light text-cream outline-none transition-colors focus:border-copper">
                      {['AI Discovery Sprint', 'AI Productivity Accelerator', 'AI Transformation Program', 'Enterprise AI Studio', 'Fractional Chief AI Officer', 'Not sure yet'].map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-[0.72rem] uppercase tracking-[0.16em] text-muted2">What are you trying to solve?</label>
                    <textarea name="message" rows={4} placeholder="A few sentences about your situation, team, and goals." className="w-full resize-y rounded-sm border border-stone bg-ink px-4 py-3 font-body text-[0.97rem] font-light text-cream outline-none transition-colors focus:border-copper" />
                  </div>
                  <button type="submit" disabled={status === 'sending'} className="group inline-flex w-full items-center justify-center gap-2.5 rounded-sm bg-copper px-7 py-4 font-medium text-white transition-all duration-300 ease-smooth hover:bg-copperLt disabled:opacity-60">
                    {status === 'sending' ? 'Sending…' : <>Send Message <span className="transition-transform group-hover:translate-x-1">→</span></>}
                  </button>
                  {status === 'noconfig' && <p className="text-center text-[0.85rem] text-copperLt">Form endpoint not configured yet. Add your Formspree URL in <code>Contact.jsx</code>, or <a href={CAL} target="_blank" rel="noopener noreferrer" className="underline">book a call directly</a>.</p>}
                  {status === 'error' && <p className="text-center text-[0.85rem] text-red-300">Something went wrong. Please try the booking link instead.</p>}
                  <p className="text-center text-[0.8rem] text-muted2">Or skip the form and <a href={CAL} target="_blank" rel="noopener noreferrer" className="text-copperLt underline">book a call directly</a>.</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

function Field({ label, name, type = 'text', placeholder, required }) {
  return (
    <div>
      <label className="mb-2 block text-[0.72rem] uppercase tracking-[0.16em] text-muted2">{label}</label>
      <input type={type} name={name} placeholder={placeholder} required={required} className="w-full rounded-sm border border-stone bg-ink px-4 py-3 font-body text-[0.97rem] font-light text-cream outline-none transition-colors focus:border-copper" />
    </div>
  )
}
