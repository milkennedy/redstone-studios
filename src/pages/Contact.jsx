import { useState } from 'react'
import { Clock, Mail, MapPin } from 'lucide-react'
import { Eyebrow, Reveal } from '../components/ui.jsx'

const CAL = 'https://calendly.com/milkennedy/15min'
const TO_EMAIL = 'mike.kennedy@greenanalytics.ca'
const FORM_ENDPOINT = 'https://formspree.io/f/xaqkrjwj'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const data = new FormData(e.target)
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) { setStatus('sent'); e.target.reset() }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <main>
      <section className="border-b border-stone bg-[radial-gradient(ellipse_70%_80%_at_50%_10%,rgba(181,103,60,0.13),transparent_70%),#181614] px-8 pb-16 pt-44">
        <div className="mx-auto max-w-content">
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mb-5 font-display text-[clamp(2.6rem,6vw,4.4rem)]">Let's Talk Transformation</h1>
            <p className="max-w-[620px] text-[1.12rem] text-cream2">Redstone Studios works with a select number of organizations at any given time. If you are an executive leader serious about AI transformation — not experimentation — we want to hear from you.</p>
          </Reveal>
        </div>
      </section>

      <section className="px-8 py-28">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-12 md:grid-cols-2">
          {/* Booking */}
          <Reveal>
            <div className="rounded-xl border border-copper/40 bg-gradient-to-b from-[#4a3528] to-[#2a201a] p-12">
              <span className="eyebrow mb-5">Fastest Way</span>
              <h2 className="mb-4 font-display text-[2.1rem]">Book an AI Transformation Call</h2>
              <p className="mb-8 text-[1.02rem]">A focused 15-minute conversation to understand your organization's situation and whether Redstone is the right fit. No pitch deck, no pressure.</p>
              <a href={CAL} target="_blank" rel="noopener noreferrer" className="group inline-flex w-full items-center justify-center gap-2 rounded bg-copper px-7 py-4 text-[1.02rem] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-copperLt">
                Open the Booking Calendar <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <div className="mt-8 space-y-4 border-t border-stone pt-8 text-[0.95rem]">
                {[
                  [Clock, <><span className="font-medium text-cream2">15 minutes</span> — direct with the founder, Mike Kennedy, PhD.</>],
                  [Mail, <><span className="font-medium text-cream2">Prefer email?</span> Use the form and we'll respond within two business days.</>],
                  [MapPin, <><span className="font-medium text-cream2">Based in Canada</span> — serving organizations nationwide.</>],
                ].map(([Icon, txt], i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Icon size={18} className="mt-0.5 shrink-0 text-copperLt" strokeWidth={1.6} />
                    <div>{txt}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="rounded-xl border border-stone bg-ink3 p-12">
              <h2 className="mb-2 font-display text-[2.1rem]">Discuss Your Requirements</h2>
              <p className="mb-8 text-[0.98rem]">Tell us a little about your organization and what you're trying to solve.</p>

              {status === 'sent' ? (
                <div className="rounded-md border border-copper/40 bg-copper/10 px-6 py-8 text-center">
                  <p className="font-display text-[1.4rem] text-cream">Message sent.</p>
                  <p className="mt-2 text-[0.95rem]">We'll be in touch within two business days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Field label="Name" name="name" placeholder="Your full name" required />
                  <Field label="Work Email" name="email" type="email" placeholder="you@organization.com" required />
                  <Field label="Organization" name="organization" placeholder="Organization name" />
                  <div>
                    <label className="mb-2 block text-[0.82rem] uppercase tracking-[0.06em] text-muted2">Interested In</label>
                    <select name="interest" className="w-full rounded border border-stone bg-ink px-4 py-3 font-body text-[0.98rem] font-light text-cream outline-none transition-colors focus:border-copper">
                      {['AI Discovery Sprint', 'AI Productivity Accelerator', 'AI Transformation Program', 'Enterprise AI Studio', 'Fractional Chief AI Officer', 'Not sure yet'].map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-[0.82rem] uppercase tracking-[0.06em] text-muted2">What are you trying to solve?</label>
                    <textarea name="message" rows={4} placeholder="A few sentences about your situation, team, and goals." className="w-full resize-y rounded border border-stone bg-ink px-4 py-3 font-body text-[0.98rem] font-light text-cream outline-none transition-colors focus:border-copper" />
                  </div>
                  <button type="submit" disabled={status === 'sending'} className="group inline-flex w-full items-center justify-center gap-2 rounded bg-copper px-7 py-4 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-copperLt disabled:opacity-60">
                    {status === 'sending' ? 'Sending…' : <>Send Message <span className="transition-transform group-hover:translate-x-1">→</span></>}
                  </button>
                  {status === 'error' && <p className="text-center text-[0.85rem] text-red-300">Something went wrong. Please try the booking link instead, or email us at <a href={`mailto:${TO_EMAIL}`} className="underline">{TO_EMAIL}</a>.</p>}
                  <p className="text-center text-[0.82rem] text-muted2">Or skip the form and <a href={CAL} target="_blank" rel="noopener noreferrer" className="text-copperLt underline">book a call directly</a>.</p>
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
      <label className="mb-2 block text-[0.82rem] uppercase tracking-[0.06em] text-muted2">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full rounded border border-stone bg-ink px-4 py-3 font-body text-[0.98rem] font-light text-cream outline-none transition-colors focus:border-copper"
      />
    </div>
  )
}
