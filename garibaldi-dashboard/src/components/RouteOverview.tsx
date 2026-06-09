import type { Trip } from '../types'
import { Section } from './ui/Section'
import { Glyph } from './ui/Glyph'
import { formatDateRange } from './ui/format'

interface Props {
  trip: Trip
}

const overnightGlyph = { van: 'van', tent: 'tent', null: 'route' } as const

export function RouteOverview({ trip }: Props) {
  return (
    <Section
      index="01"
      title="Trip Overview"
      status={<span className="label">{trip.region}</span>}
    >
      <div className="panel p-4">
        {/* Dates + headline numbers */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-xl font-bold leading-tight text-hi">{trip.name}</div>
            <div className="mt-1 font-mono text-sm text-mid tnum">
              {formatDateRange(trip.startDate, trip.endDate)}
            </div>
          </div>
          <div className="flex gap-4 text-right">
            <Stat label="Party" value={`${trip.partySize}`} />
            <Stat label="Van" value={`${trip.nights.van}n`} />
            <Stat label="Tent" value={`${trip.nights.tent}n`} />
          </div>
        </div>

        {/* Totals */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Tile
            glyph="route"
            label="Total distance"
            value={`${trip.totals.distanceKm.toFixed(0)} km`}
            sub="round trip · placeholder"
          />
          <Tile
            glyph="up"
            label="Total elevation gain"
            value={`${trip.totals.elevationGainM.toLocaleString()} m`}
            sub="cumulative · placeholder"
          />
        </div>

        {/* Elevation zones */}
        <div className="mt-4">
          <div className="label mb-2">Elevation zones</div>
          <div className="space-y-px overflow-hidden rounded-lg border border-line">
            {trip.zones.map((z) => (
              <div
                key={z.id}
                className="flex items-center gap-3 bg-panel2 px-3 py-2.5"
              >
                <Glyph
                  name={z.id === 'alpine' ? 'peak' : z.id === 'campground' ? 'tent' : 'van'}
                  size={16}
                  className="text-lo"
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-hi">{z.name}</div>
                  <div className="text-xs text-lo">{z.note}</div>
                </div>
                <div className="ml-auto font-mono text-sm font-semibold text-ice tnum">
                  {z.elevationM.toLocaleString()} m
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Route stages */}
        <div className="mt-4">
          <div className="label mb-2">Route stages</div>
          <ol className="relative space-y-3 border-l border-line2 pl-4">
            {trip.segments.map((s) => (
              <li key={s.id} className="relative">
                <span className="absolute -left-[1.30rem] top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full border border-line2 bg-panel text-mid">
                  <Glyph
                    name={overnightGlyph[(s.overnight ?? 'null') as keyof typeof overnightGlyph]}
                    size={9}
                  />
                </span>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-semibold text-hi">
                    {s.from} → {s.to}
                  </span>
                  {s.distanceKm > 0 && (
                    <span className="shrink-0 font-mono text-xs text-mid tnum">
                      {s.distanceKm} km · +{s.elevationGainM} m
                    </span>
                  )}
                </div>
                <div className="text-xs text-lo">{s.description}</div>
              </li>
            ))}
          </ol>
        </div>

        {/* Permit reminder */}
        <div className="mt-4 rounded-lg border border-caution/40 bg-caution/5 p-3">
          <div className="flex items-center gap-2">
            <Glyph name="alert" size={15} className="text-caution" />
            <span className="text-xs font-semibold uppercase tracking-wider text-caution">
              Permit / reservation
            </span>
          </div>
          <p className="mt-1.5 text-sm text-mid">{trip.permit.note}</p>
          <p className="mt-1 font-mono text-xs text-lo">
            {trip.permit.authority}
            {trip.permit.reservationNumber ? ` · #${trip.permit.reservationNumber}` : ''}
          </p>
        </div>
      </div>
    </Section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-lg font-bold leading-none text-hi tnum">{value}</div>
      <div className="label mt-1">{label}</div>
    </div>
  )
}

function Tile({
  glyph,
  label,
  value,
  sub,
}: {
  glyph: Parameters<typeof Glyph>[0]['name']
  label: string
  value: string
  sub: string
}) {
  return (
    <div className="rounded-lg border border-line bg-panel2 p-3">
      <div className="flex items-center gap-1.5 text-lo">
        <Glyph name={glyph} size={14} />
        <span className="label">{label}</span>
      </div>
      <div className="mt-1 font-mono text-lg font-bold text-hi tnum">{value}</div>
      <div className="text-[11px] text-lo">{sub}</div>
    </div>
  )
}
