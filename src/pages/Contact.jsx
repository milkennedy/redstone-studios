import { useState } from 'react'
import { Clock, Mail, MapPin } from 'lucide-react'
import { Eyebrow, Reveal, CAL } from '../components/ui.jsx'

const FORM_ENDPOINT = 'https://formspree.io/f/xrednkrv'

const interests = ['Discovery sprint', 'Build engagement', 'Embedded / fractional AI lead', 'A specific project', 'Not sure yet']

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
      <header className="border-b border-line">
        <div className="mx-auto max-w-content px-6 pb-16 pt-36 md:px-10 md:pb-20 md:pt-44">
          <Reveal><Eyebrow className="mb-6">Work with us</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h1 className="t-hero max-w-4xl text-balance text-ink">Let's build something that matters.</h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="t-lead mt-7 max-w-prose text-muted">
              We take on a small number of engagements at a time. If you're a leader solving a real problem and serious about applied AI — not experimentation — we want to hear from you.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-2">
          {/* Booking */}
          <Reveal>
            <div className="h-full bg-ink p-9 text-paper md:p-12">
              <Eyebrow className="mb-6" tone="paper">Fastest way</Eyebrow>
              <h2 className="t-h3 mb-4 text-paper">Book an introductory call</h2>
              <p className="mb-8 max-w-md text-[1.02rem] leading-relaxed text-paperMut">A focused 15-minute conversation to understand your situation and whether we're the right fit. No pitch deck, no pressure.</p>
              <a href={CAL} target="_blank" rel="noopener noreferrer" className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-forest px-7 py-4 text-[1rem] font-medium text-paper transition-colors duration-300 ease-smooth hover:bg-forestLt sm:w-auto">
                Open the booking calendar <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <div className="mt-10 space-y-5 border-t border-lineDk pt-8">
                {[[Clock, <><span className="text-paper">15 minutes</span> — direct with Mike Kennedy, PhD.</>], [Mail, <><span className="text-paper">Prefer email?</span> Use the form and we'll respond within two business days.</>], [MapPin, <><span className="text-paper">Based in Canada</span> — serving organizations nationwide.</>]].map(([Icon, txt], i) => (
                  <div key={i} className="flex items-start gap-3.5 text-[0.95rem] text-paperMut">
                    <Icon size={18} className="mt-0.5 shrink-0 text-forestLt" strokeWidth={1.6} />
                    <div>{txt}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.08}>
            <div className="h-full bg-paper p-9 md:p-12">
              <h2 className="t-h3 mb-2 text-ink">Tell us about your problem</h2>
              <p className="mb-8 text-[0.97rem] text-muted">A few sentences about your organization and what you're trying to solve.</p>
              {status === 'sent' ? (
                <div className="rounded-md border border-forest/30 bg-forest/5 px-6 py-12 text-center">
                  <p className="t-h3 text-ink">Message sent.</p>
                  <p className="mt-2 text-[0.95rem] text-muted">We'll be in touch within two business days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Field label="Name" name="name" placeholder="Your full name" required />
                  <Field label="Work email" name="email" type="email" placeholder="you@organization.com" required />
                  <Field label="Organization" name="organization" placeholder="Organization name" />
                  <div>
                    <label className="label mb-2 block text-muted2">Interested in</label>
                    <select name="interest" className="w-full rounded-md border border-line bg-paper2 px-4 py-3 text-[0.97rem] text-ink outline-none transition-colors focus:border-forest">
                      {interests.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label mb-2 block text-muted2">What are you trying to solve?</label>
                    <textarea name="message" rows={4} placeholder="A few sentences about your situation, team and goals." className="w-full resize-y rounded-md border border-line bg-paper2 px-4 py-3 text-[0.97rem] text-ink outline-none transition-colors focus:border-forest" />
                  </div>
                  <button type="submit" disabled={status === 'sending'} className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-forest px-7 py-4 font-medium text-paper transition-colors duration-300 ease-smooth hover:bg-forestDk disabled:opacity-60">
                    {status === 'sending' ? 'Sending…' : <>Send message <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></>}
                  </button>
                  {status === 'error' && <p className="text-center text-[0.85rem] text-copper">Something went wrong. Please try the booking link instead.</p>}
                  <p className="text-center text-[0.8rem] text-muted2">Or skip the form and <a href={CAL} target="_blank" rel="noopener noreferrer" className="text-forest underline">book a call directly</a>.</p>
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
      <label className="label mb-2 block text-muted2">{label}</label>
      <input type={type} name={name} placeholder={placeholder} required={required} className="w-full rounded-md border border-line bg-paper2 px-4 py-3 text-[0.97rem] text-ink outline-none transition-colors focus:border-forest" />
    </div>
  )
}
