import type { WeatherForecast } from '../types'
import { Section } from './ui/Section'
import { Glyph } from './ui/Glyph'
import { relativeUpdated } from './ui/format'

interface Props {
  forecasts: WeatherForecast[]
}

export function WeatherHUD({ forecasts }: Props) {
  const updated = forecasts[0]?.updatedAt
  const source = forecasts[0]?.source ?? 'mock'

  return (
    <Section
      index="02"
      title="Weather HUD"
      status={
        <span className="label">
          src: {source}
          {updated ? ` · ${relativeUpdated(updated)}` : ''}
        </span>
      }
    >
      {/* Horizontal rail of zone cards — swipe on mobile */}
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1">
        {forecasts.map((f) => (
          <WeatherCard key={f.zoneId} f={f} />
        ))}
      </div>
      <p className="mt-2 px-0.5 text-[11px] text-lo">
        Swipe cards · each zone forecasts its relevant trip day.
      </p>
    </Section>
  )
}

function WeatherCard({ f }: { f: WeatherForecast }) {
  const day = new Date(f.date + 'T12:00:00').toLocaleDateString('en-CA', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
  // Highlight a freezing level that sits at/below this zone — snow/ice signal.
  const freezingBelow = f.freezingLevelM <= f.elevationM + 100

  return (
    <article className="panel w-[16.5rem] shrink-0 snap-start p-3.5">
      <header className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-bold leading-tight text-hi">{f.location}</h3>
          <div className="font-mono text-[11px] text-lo tnum">
            {f.elevationM.toLocaleString()} m · {day}
          </div>
        </div>
      </header>

      {/* Big temps */}
      <div className="mt-3 flex items-end gap-4">
        <div>
          <div className="flex items-center gap-1 text-lo">
            <Glyph name="up" size={12} />
            <span className="label">High</span>
          </div>
          <div className="font-mono text-3xl font-bold leading-none text-hi tnum">
            {Math.round(f.highC)}°
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 text-lo">
            <Glyph name="down" size={12} />
            <span className="label">Low</span>
          </div>
          <div className="font-mono text-3xl font-bold leading-none text-ice tnum">
            {Math.round(f.lowC)}°
          </div>
        </div>
        <div className="ml-auto text-right">
          <div className="label">Feels</div>
          <div className="font-mono text-xl font-bold leading-none text-mid tnum">
            {Math.round(f.feelsLikeC)}°
          </div>
        </div>
      </div>

      {/* Metric grid */}
      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-line pt-3">
        <Metric glyph="wind" label="Wind / gust" value={`${f.windKmh} / ${f.gustKmh}`} unit="km/h" />
        <Metric glyph="drop" label="Rain prob" value={`${f.rainProbPct}`} unit="%" />
        <Metric glyph="snow" label="Snow prob" value={`${f.snowProbPct}`} unit="%" />
        <Metric glyph="drop" label="Precip" value={f.precipMm.toFixed(1)} unit="mm" />
        <Metric
          glyph="thermo"
          label="Freezing lvl"
          value={`${f.freezingLevelM.toLocaleString()}`}
          unit="m"
          alert={freezingBelow}
        />
        <Metric glyph="cloud" label="Cloud" value={`${f.cloudCoverPct}`} unit="%" />
        <Metric glyph="sun" label="UV index" value={`${f.uvIndex}`} unit="" />
        <Metric glyph="moon" label="Sun" value={`${f.sunrise}–${f.sunset}`} unit="" small />
      </dl>

      <footer className="mt-3 border-t border-line pt-2 font-mono text-[10px] text-lo tnum">
        updated {relativeUpdated(f.updatedAt)} · {f.source}
      </footer>
    </article>
  )
}

function Metric({
  glyph,
  label,
  value,
  unit,
  alert,
  small,
}: {
  glyph: Parameters<typeof Glyph>[0]['name']
  label: string
  value: string
  unit: string
  alert?: boolean
  small?: boolean
}) {
  return (
    <div>
      <dt className="flex items-center gap-1 text-lo">
        <Glyph name={glyph} size={11} />
        <span className="label">{label}</span>
      </dt>
      <dd
        className={`mt-0.5 font-mono font-semibold tnum ${small ? 'text-xs' : 'text-sm'} ${
          alert ? 'text-ice' : 'text-hi'
        }`}
      >
        {value}
        {unit && <span className="ml-0.5 text-[10px] font-normal text-lo">{unit}</span>}
      </dd>
    </div>
  )
}
