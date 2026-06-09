import { useMemo } from 'react'
import type { ReadinessTask, ReadinessWindow } from '../types'
import { Section } from './ui/Section'
import { daysUntil } from './ui/format'

interface Props {
  tasks: ReadinessTask[]
  /** ISO departure date, used to flag which window is active now. */
  startDate: string
  onToggle: (id: string) => void
}

const WINDOWS: { id: ReadinessWindow; label: string; offset: string; daysBefore: number }[] = [
  { id: '7d', label: '7 Days Out', offset: 'T-7', daysBefore: 7 },
  { id: '3d', label: '3 Days Out', offset: 'T-3', daysBefore: 3 },
  { id: '24h', label: '24 Hours Out', offset: 'T-1', daysBefore: 1 },
  { id: 'departure', label: 'Morning Of', offset: 'T-0', daysBefore: 0 },
]

export function ReadinessTimeline({ tasks, startDate, onToggle }: Props) {
  const out = daysUntil(startDate)

  const done = tasks.filter((t) => t.done).length

  // Which window is the current focus (closest upcoming, or active).
  const activeWindow = useMemo<ReadinessWindow>(() => {
    if (out <= 0) return 'departure'
    if (out <= 1) return '24h'
    if (out <= 3) return '3d'
    return '7d'
  }, [out])

  return (
    <Section
      index="05"
      title="Countdown Readiness"
      status={
        <span className="label tnum">
          {out > 0 ? `T-${out}d` : out === 0 ? 'DEPART TODAY' : 'IN PROGRESS'} · {done}/{tasks.length}
        </span>
      }
    >
      <div className="space-y-3">
        {WINDOWS.map((w) => {
          const items = tasks.filter((t) => t.window === w.id)
          const wDone = items.filter((t) => t.done).length
          const isActive = w.id === activeWindow
          return (
            <div
              key={w.id}
              className={`panel p-4 ${isActive ? 'border-ice/60 ring-1 ring-ice/30' : ''}`}
            >
              <div className="mb-2.5 flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-ice tnum">{w.offset}</span>
                <h3 className="text-sm font-semibold text-hi">{w.label}</h3>
                {isActive && (
                  <span className="rounded bg-ice/15 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-ice">
                    now
                  </span>
                )}
                <span className="ml-auto font-mono text-[11px] text-lo tnum">
                  {wDone}/{items.length}
                </span>
              </div>
              <ul className="space-y-1">
                {items.map((t) => (
                  <li key={t.id}>
                    <button
                      onClick={() => onToggle(t.id)}
                      className="flex w-full items-center gap-2.5 rounded-md px-1 py-1.5 text-left active:bg-panel2"
                    >
                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded border font-mono text-xs ${
                          t.done
                            ? 'border-go bg-go/10 text-go'
                            : 'border-line text-transparent'
                        }`}
                      >
                        ✓
                      </span>
                      <span className={`text-sm ${t.done ? 'text-lo line-through' : 'text-hi'}`}>
                        {t.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
