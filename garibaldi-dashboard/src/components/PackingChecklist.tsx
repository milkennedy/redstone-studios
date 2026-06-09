import { useMemo, useState } from 'react'
import type { GearCategory, GearItem, GearStatus } from '../types'
import { Section } from './ui/Section'
import { Glyph } from './ui/Glyph'

interface Props {
  gear: GearItem[]
  onSetStatus: (id: string, status: GearStatus) => void
}

const CATEGORY_ORDER: { id: GearCategory; label: string }[] = [
  { id: 'sleep', label: 'Sleep System' },
  { id: 'shelter', label: 'Shelter' },
  { id: 'clothing', label: 'Clothing' },
  { id: 'food', label: 'Food' },
  { id: 'water', label: 'Water' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'safety', label: 'Safety' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'van', label: 'Van Overnight Gear' },
  { id: 'peak-day', label: 'Peak Day Kit' },
]

const STATUS_CYCLE: GearStatus[] = ['need-to-buy', 'packed', 'optional']

const STATUS_META: Record<GearStatus, { label: string; cls: string; mark: string }> = {
  packed: { label: 'Packed', cls: 'text-go border-go bg-go/10', mark: '✓' },
  'need-to-buy': { label: 'Need to buy', cls: 'text-warn border-warn bg-warn/10', mark: '•' },
  optional: { label: 'Optional', cls: 'text-lo border-line bg-panel2', mark: '–' },
}

export function PackingChecklist({ gear, onSetStatus }: Props) {
  const [hidePacked, setHidePacked] = useState(false)

  const stats = useMemo(() => {
    const total = gear.length
    const packed = gear.filter((g) => g.status === 'packed').length
    const criticalOpen = gear.filter((g) => g.critical && g.status !== 'packed').length
    const toBuy = gear.filter((g) => g.status === 'need-to-buy').length
    return { total, packed, criticalOpen, toBuy }
  }, [gear])

  const grouped = useMemo(
    () =>
      CATEGORY_ORDER.map((cat) => ({
        ...cat,
        items: gear
          .filter((g) => g.category === cat.id)
          .filter((g) => !(hidePacked && g.status === 'packed')),
      })).filter((c) => c.items.length > 0),
    [gear, hidePacked],
  )

  const pct = Math.round((stats.packed / stats.total) * 100)

  return (
    <Section
      index="04"
      title="Packing List"
      status={
        <span className="label tnum">
          {stats.packed}/{stats.total} packed
        </span>
      }
    >
      <div className="panel p-4">
        {/* Progress + critical warning */}
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <span className="label">Readiness</span>
            <span className="font-mono text-sm font-bold text-hi tnum">{pct}%</span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-panel2">
            <div className="h-full bg-go transition-all" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            {stats.criticalOpen > 0 ? (
              <span className="flex items-center gap-1 font-medium text-stop">
                <Glyph name="alert" size={13} />
                {stats.criticalOpen} critical item{stats.criticalOpen > 1 ? 's' : ''} not packed
              </span>
            ) : (
              <span className="flex items-center gap-1 font-medium text-go">
                <Glyph name="check" size={13} />
                All critical gear packed
              </span>
            )}
            <span className="text-lo">{stats.toBuy} to buy</span>
            <button
              onClick={() => setHidePacked((v) => !v)}
              className="ml-auto rounded border border-line px-2 py-0.5 text-lo"
            >
              {hidePacked ? 'Show packed' : 'Hide packed'}
            </button>
          </div>
        </div>

        {/* Groups */}
        <div className="space-y-4">
          {grouped.map((cat) => (
            <div key={cat.id}>
              <div className="mb-1.5 flex items-center gap-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-mid">
                  {cat.label}
                </h3>
                <span className="h-px flex-1 bg-line" />
                <span className="font-mono text-[11px] text-lo tnum">
                  {cat.items.filter((i) => i.status === 'packed').length}/{cat.items.length}
                </span>
              </div>
              <ul className="space-y-1">
                {cat.items.map((item) => {
                  const meta = STATUS_META[item.status]
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => onSetStatus(item.id, nextStatus(item.status))}
                        className="flex w-full items-center gap-2.5 rounded-md px-1 py-1.5 text-left active:bg-panel2"
                      >
                        <span
                          className={`grid h-5 w-5 shrink-0 place-items-center rounded border font-mono text-xs ${meta.cls}`}
                        >
                          {meta.mark}
                        </span>
                        <span
                          className={`text-sm ${
                            item.status === 'packed'
                              ? 'text-lo line-through'
                              : 'text-hi'
                          }`}
                        >
                          {item.name}
                          {item.critical && item.status !== 'packed' && (
                            <span className="ml-1.5 align-middle font-mono text-[9px] font-bold uppercase tracking-wider text-stop">
                              crit
                            </span>
                          )}
                        </span>
                        <span className={`ml-auto shrink-0 text-[11px] ${meta.cls.split(' ')[0]}`}>
                          {meta.label}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-lo">Tap an item to cycle status.</p>
      </div>
    </Section>
  )
}

function nextStatus(s: GearStatus): GearStatus {
  const i = STATUS_CYCLE.indexOf(s)
  return STATUS_CYCLE[(i + 1) % STATUS_CYCLE.length]
}
