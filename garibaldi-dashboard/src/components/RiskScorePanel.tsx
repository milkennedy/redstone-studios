import type { RiskAssessment, RiskInputs } from '../types'
import { Section } from './ui/Section'
import { Glyph } from './ui/Glyph'
import { bandBg, bandBorder, bandLabel, bandText } from './ui/format'

interface Props {
  assessment: RiskAssessment
  inputs: RiskInputs
  onChange: (next: RiskInputs) => void
}

export function RiskScorePanel({ assessment, inputs, onChange }: Props) {
  const { score, band, verdict, factors } = assessment

  return (
    <Section
      index="03"
      title="Risk Engine"
      status={<span className={`label ${bandText[band]}`}>{bandLabel[band]}</span>}
    >
      <div className={`panel overflow-hidden border-2 ${bandBorder[band]}`}>
        {/* Gauge */}
        <div className="flex items-center gap-4 p-4">
          <div
            className={`grid h-20 w-20 shrink-0 place-items-center rounded-full border-4 ${bandBorder[band]}`}
          >
            <div className="text-center">
              <div className={`font-mono text-2xl font-bold leading-none tnum ${bandText[band]}`}>
                {score}
              </div>
              <div className="label mt-0.5">/100</div>
            </div>
          </div>
          <div className="min-w-0">
            <div className={`text-sm font-bold uppercase tracking-wider ${bandText[band]}`}>
              {bandLabel[band]} risk
            </div>
            <p className="mt-1 text-sm leading-snug text-mid">{verdict}</p>
          </div>
        </div>

        {/* Band scale */}
        <div className="flex h-1.5 w-full">
          {(['green', 'yellow', 'orange', 'red'] as const).map((b) => (
            <div
              key={b}
              className={`flex-1 ${bandBg[b]} ${b === band ? 'opacity-100' : 'opacity-25'}`}
            />
          ))}
        </div>

        {/* Factors */}
        <ul className="divide-y divide-line">
          {factors.map((fac) => (
            <li key={fac.id} className="px-4 py-3">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 shrink-0 rounded-full ${bandBg[fac.band]}`} />
                <span className="text-sm font-semibold text-hi">{fac.label}</span>
                <span className={`ml-auto font-mono text-sm font-bold tnum ${bandText[fac.band]}`}>
                  {fac.score}
                </span>
              </div>
              {/* sub-score bar */}
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-panel2">
                <div
                  className={`h-full ${bandBg[fac.band]}`}
                  style={{ width: `${fac.score}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs leading-snug text-lo">{fac.explanation}</p>
            </li>
          ))}
        </ul>

        {/* Tunable inputs */}
        <details className="border-t border-line bg-panel2/50">
          <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold text-mid">
            <Glyph name="route" size={14} className="text-lo" />
            Tune party inputs
            <span className="ml-auto text-lo">▾</span>
          </summary>
          <div className="space-y-4 px-4 pb-4">
            <Range
              label="Sleeping bag rating"
              value={inputs.sleepingBagRatingC}
              min={-15}
              max={10}
              step={1}
              format={(v) => `${v}°C`}
              onChange={(v) => onChange({ ...inputs, sleepingBagRatingC: v })}
            />
            <Range
              label="Group preparedness"
              value={inputs.groupPreparedness}
              min={0}
              max={100}
              step={5}
              format={(v) => `${v}%`}
              onChange={(v) => onChange({ ...inputs, groupPreparedness: v })}
            />
            <Range
              label="Water capacity / person"
              value={inputs.waterCapacityL}
              min={0.5}
              max={5}
              step={0.5}
              format={(v) => `${v} L`}
              onChange={(v) => onChange({ ...inputs, waterCapacityL: v })}
            />
            <div>
              <div className="label mb-1.5">Trail snow above camp</div>
              <div className="flex gap-1.5">
                {(['none', 'patchy', 'continuous'] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => onChange({ ...inputs, trailSnow: opt })}
                    className={`flex-1 rounded-md border px-2 py-1.5 text-xs font-medium capitalize transition ${
                      inputs.trailSnow === opt
                        ? 'border-ice bg-ice/10 text-ice'
                        : 'border-line bg-panel text-lo'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <label className="flex items-center justify-between gap-3">
              <span className="text-sm text-mid">Traction (microspikes) available</span>
              <button
                onClick={() => onChange({ ...inputs, hasTraction: !inputs.hasTraction })}
                className={`relative h-6 w-11 rounded-full border transition ${
                  inputs.hasTraction ? 'border-go bg-go/20' : 'border-line bg-panel'
                }`}
                aria-pressed={inputs.hasTraction}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full transition-all ${
                    inputs.hasTraction ? 'left-[1.45rem] bg-go' : 'left-0.5 bg-lo'
                  }`}
                />
              </button>
            </label>
          </div>
        </details>
      </div>
    </Section>
  )
}

function Range({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  format: (v: number) => string
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="label">{label}</span>
        <span className="font-mono text-sm font-semibold text-hi tnum">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-ice"
      />
    </div>
  )
}
