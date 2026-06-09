import { useEffect, useMemo, useState } from 'react'
import type { GearStatus, RiskInputs, WeatherForecast } from './types'
import {
  defaultRiskInputs,
  gear as gearData,
  mockForecasts,
  readinessTasks as readinessData,
  safetyNotes,
  trip,
} from './data/tripData'
import { computeRisk } from './lib/risk'
import { loadForecasts } from './lib/weatherProvider'
import { useLocalStorage } from './lib/useLocalStorage'
import { bandBg, bandLabel, bandText, daysUntil } from './components/ui/format'

import { RouteOverview } from './components/RouteOverview'
import { WeatherHUD } from './components/WeatherHUD'
import { RiskScorePanel } from './components/RiskScorePanel'
import { PackingChecklist } from './components/PackingChecklist'
import { ReadinessTimeline } from './components/ReadinessTimeline'
import { SafetyNotes } from './components/SafetyNotes'
import { EmergencyPanel } from './components/EmergencyPanel'

const NAV = [
  { id: 'overview', label: 'Trip' },
  { id: 'weather', label: 'Weather' },
  { id: 'risk', label: 'Risk' },
  { id: 'packing', label: 'Pack' },
  { id: 'readiness', label: 'Ready' },
  { id: 'safety', label: 'Safety' },
  { id: 'emergency', label: 'SOS' },
]

export default function App() {
  /* --- persisted state -------------------------------------------------- */
  // Gear statuses persisted as id → status overrides so data edits stay safe.
  const [statusOverrides, setStatusOverrides] = useLocalStorage<Record<string, GearStatus>>(
    'garibaldi.gear.v1',
    {},
  )
  const [taskDone, setTaskDone] = useLocalStorage<Record<string, boolean>>(
    'garibaldi.tasks.v1',
    {},
  )
  const [riskInputs, setRiskInputs] = useLocalStorage<RiskInputs>(
    'garibaldi.risk.v1',
    defaultRiskInputs,
  )

  /* --- weather (async via provider; mock by default) -------------------- */
  const [forecasts, setForecasts] = useState<WeatherForecast[]>(mockForecasts)
  useEffect(() => {
    let alive = true
    loadForecasts()
      .then((f) => alive && f.length && setForecasts(f))
      .catch(() => {
        /* keep mock fallback offline */
      })
    return () => {
      alive = false
    }
  }, [])

  /* --- derived ---------------------------------------------------------- */
  const gear = useMemo(
    () => gearData.map((g) => ({ ...g, status: statusOverrides[g.id] ?? g.status })),
    [statusOverrides],
  )
  const tasks = useMemo(
    () => readinessData.map((t) => ({ ...t, done: taskDone[t.id] ?? t.done })),
    [taskDone],
  )
  const assessment = useMemo(
    () => computeRisk(forecasts, riskInputs, trip),
    [forecasts, riskInputs],
  )

  const out = daysUntil(trip.startDate)

  return (
    <div className="mx-auto min-h-full max-w-app">
      {/* ---- Mission-control header --------------------------------------- */}
      <header className="sticky top-0 z-20 border-b border-line bg-base/95 backdrop-blur">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-lo">
                Garibaldi · Trip HUD
              </span>
            </div>
            <div className="truncate text-base font-bold leading-tight text-hi">
              {trip.name}
            </div>
          </div>
          {/* Countdown + go/no-go pill */}
          <div className="ml-auto flex shrink-0 items-center gap-2.5">
            <div className="text-right">
              <div className="font-mono text-lg font-bold leading-none text-hi tnum">
                {out > 0 ? `T-${out}` : out === 0 ? 'GO DAY' : `+${-out}`}
              </div>
              <div className="label">{out > 0 ? 'days out' : out === 0 ? 'depart' : 'days in'}</div>
            </div>
            <div
              className={`flex flex-col items-center rounded-lg border px-2.5 py-1 ${bandText[assessment.band]}`}
              style={{ borderColor: 'currentColor' }}
            >
              <span className="font-mono text-base font-bold leading-none tnum">
                {assessment.score}
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider">
                {bandLabel[assessment.band]}
              </span>
            </div>
          </div>
        </div>

        {/* Anchor nav */}
        <nav className="no-scrollbar flex gap-1 overflow-x-auto px-3 pb-2">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="shrink-0 rounded-full border border-line px-3 py-1 text-xs font-medium text-mid active:bg-panel2"
            >
              {n.label}
            </a>
          ))}
        </nav>
        {/* thin risk band strip under header */}
        <div className={`h-0.5 w-full ${bandBg[assessment.band]}`} />
      </header>

      {/* ---- Sections ----------------------------------------------------- */}
      <main className="space-y-8 px-4 py-5">
        <div id="overview">
          <RouteOverview trip={trip} />
        </div>
        <div id="weather">
          <WeatherHUD forecasts={forecasts} />
        </div>
        <div id="risk">
          <RiskScorePanel assessment={assessment} inputs={riskInputs} onChange={setRiskInputs} />
        </div>
        <div id="packing">
          <PackingChecklist
            gear={gear}
            onSetStatus={(id, status) =>
              setStatusOverrides((prev) => ({ ...prev, [id]: status }))
            }
          />
        </div>
        <div id="readiness">
          <ReadinessTimeline
            tasks={tasks}
            startDate={trip.startDate}
            onToggle={(id) =>
              setTaskDone((prev) => ({ ...prev, [id]: !(prev[id] ?? false) }))
            }
          />
        </div>
        <div id="safety">
          <SafetyNotes notes={safetyNotes} />
        </div>
        <div id="emergency">
          <EmergencyPanel contacts={trip.emergency} />
        </div>

        <footer className="pb-8 pt-2 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-lo">
            Decision aid only · verify live forecasts before you go
          </p>
          <p className="mt-1 text-[10px] text-lo">
            Mountains don't care about your plans. Set a turnaround time.
          </p>
        </footer>
      </main>
    </div>
  )
}
