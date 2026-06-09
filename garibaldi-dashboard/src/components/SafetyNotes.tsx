import type { SafetyNote } from '../types'
import { Section } from './ui/Section'
import { Glyph } from './ui/Glyph'

interface Props {
  notes: SafetyNote[]
}

export function SafetyNotes({ notes }: Props) {
  return (
    <Section
      index="06"
      title="Survival / Safety Notes"
      status={<span className="label">{notes.length} cards</span>}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {notes.map((note) => (
          <article key={note.id} className="panel p-3.5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-hi">
              <Glyph name="alert" size={14} className="text-caution" />
              {note.title}
            </h3>
            <ul className="mt-2 space-y-1.5">
              {note.points.map((p, i) => (
                <li key={i} className="flex gap-2 text-xs leading-snug text-mid">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-lo" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
