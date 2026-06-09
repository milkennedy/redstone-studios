import type { EmergencyContact } from '../types'
import { Section } from './ui/Section'
import { Glyph } from './ui/Glyph'

interface Props {
  contacts: EmergencyContact[]
}

export function EmergencyPanel({ contacts }: Props) {
  return (
    <Section
      index="07"
      title="Emergency Contacts"
      status={<span className="label text-stop">tap to call</span>}
    >
      <div className="panel divide-y divide-line overflow-hidden border-stop/30">
        {contacts.map((c) => {
          const isSOS = c.phone === '911'
          return (
            <a
              key={c.id}
              href={`tel:${c.phone.replace(/[^+\d]/g, '')}`}
              className="flex items-center gap-3 p-3.5 active:bg-panel2"
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border ${
                  isSOS ? 'border-stop text-stop' : 'border-line2 text-mid'
                }`}
              >
                <Glyph name={isSOS ? 'alert' : 'route'} size={18} />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-hi">{c.name}</span>
                  {isSOS && (
                    <span className="rounded bg-stop/15 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-stop">
                      SOS
                    </span>
                  )}
                </div>
                <div className="text-xs text-lo">{c.role}</div>
                {c.note && <div className="mt-0.5 text-[11px] leading-snug text-lo">{c.note}</div>}
              </div>
              <span
                className={`ml-auto shrink-0 font-mono text-sm font-bold tnum ${
                  isSOS ? 'text-stop' : 'text-ice'
                }`}
              >
                {c.phone}
              </span>
            </a>
          )
        })}
      </div>
    </Section>
  )
}
