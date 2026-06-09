/**
 * RISK ENGINE
 * ============================================================================
 * Produces a 0–100 risk score (HIGHER = MORE RISK) plus six plain-English
 * sub-factors, from the weather forecasts and the party's tunable inputs.
 *
 * Pipeline:
 *   1. Each of six factors is scored 0–100 from the relevant weather + inputs.
 *   2. Factors are combined as a WEIGHTED AVERAGE → base score.
 *   3. Two multipliers nudge the base:
 *        • group preparedness  (better prepared → lower risk)
 *        • trip effort         (bigger days     → amplify risk)
 *   4. The final score maps to a band:
 *        0–24  green   (low / GO)
 *        25–49 yellow  (moderate / GO with care)
 *        50–74 orange  (elevated / reassess)
 *        75–100 red    (no-go / reassess)
 *
 * Every constant below is intentionally simple and legible — this is a
 * decision aid, not a forecast model. Tune freely.
 * ============================================================================
 */

import type {
  RiskAssessment,
  RiskBand,
  RiskFactor,
  RiskInputs,
  Trip,
  WeatherForecast,
  ZoneId,
} from '../types'

/* ---- small math helpers ------------------------------------------------ */

const clamp = (n: number, min = 0, max = 100) => Math.min(max, Math.max(min, n))

/** Linear map of `v` from [a,b] onto [0,100], clamped. */
function scale(v: number, a: number, b: number): number {
  if (a === b) return 0
  return clamp(((v - a) / (b - a)) * 100)
}

export function bandFor(score: number): RiskBand {
  if (score < 25) return 'green'
  if (score < 50) return 'yellow'
  if (score < 75) return 'orange'
  return 'red'
}

function byZone(forecasts: WeatherForecast[], zone: ZoneId): WeatherForecast {
  const f = forecasts.find((x) => x.zoneId === zone)
  // Fall back to the first forecast so the engine never throws on bad data.
  return f ?? forecasts[0]
}

/* ---- the six factors --------------------------------------------------- */

function coldSleepFactor(f: WeatherForecast[], inp: RiskInputs): RiskFactor {
  const camp = byZone(f, 'campground')
  // Shortfall = how many °C colder the night is than the bag's rating.
  const shortfall = inp.sleepingBagRatingC - camp.lowC
  // −3 °C of margin → 0 risk; 10 °C past the rating → 100 risk.
  const score = clamp(scale(shortfall, -3, 10))
  const explanation =
    shortfall <= -1
      ? `Camp low ${camp.lowC}°C is within your ${inp.sleepingBagRatingC}°C bag — comfortable sleep.`
      : `Camp low ${camp.lowC}°C is ${Math.round(shortfall)}°C past your ${inp.sleepingBagRatingC}°C bag. Add layers / dry sleep clothes.`
  return mk('cold-sleep', 'Cold sleep risk', score, 1.2, explanation)
}

function wetGearFactor(f: WeatherForecast[]): RiskFactor {
  const rain = Math.max(...f.map((x) => x.rainProbPct))
  const precip = Math.max(...f.map((x) => x.precipMm))
  // 0.6 weight on chance of rain, 0.4 on how much (0–10 mm → 0–100).
  const score = clamp(0.6 * rain + 0.4 * scale(precip, 0, 10))
  const explanation =
    score < 25
      ? `Low precip chance (${rain}%, ${precip.toFixed(1)} mm). Gear likely stays dry.`
      : `Up to ${rain}% rain and ${precip.toFixed(1)} mm expected — protect insulation, pack dry bags.`
  return mk('wet-gear', 'Wet gear risk', score, 1.0, explanation)
}

function snowTravelFactor(f: WeatherForecast[], inp: RiskInputs, trip: Trip): RiskFactor {
  const alpine = byZone(f, 'alpine')
  const alpineElevM = trip.zones.find((z) => z.id === 'alpine')?.elevationM ?? alpine.elevationM
  // New snow chance up high.
  const newSnow = alpine.snowProbPct
  // Existing trail snow underfoot.
  const existing = inp.trailSnow === 'continuous' ? 60 : inp.trailSnow === 'patchy' ? 30 : 0
  // Freezing level below the objective means snow/ice lingers and refreezes.
  const belowBy = alpineElevM - alpine.freezingLevelM
  const freezing = scale(belowBy, -200, 600) // 200 m above → 0; 600 m below → 100
  let score = clamp(0.4 * newSnow + 0.35 * existing + 0.25 * freezing)
  // Traction meaningfully reduces snow-travel hazard.
  if (inp.hasTraction) score *= 0.75
  score = clamp(score)
  const explanation =
    score < 25
      ? `Little snow expected on route; freezing level ~${alpine.freezingLevelM} m.`
      : `Snow on route (${inp.trailSnow}, ${newSnow}% new) with freezing level ~${alpine.freezingLevelM} m.${inp.hasTraction ? ' Traction packed.' : ' No traction — high caution.'}`
  return mk('snow-travel', 'Snow travel risk', score, 1.3, explanation)
}

function windChillFactor(f: WeatherForecast[]): RiskFactor {
  const alpine = byZone(f, 'alpine')
  // Feels-like: +5 °C → 0 risk, −15 °C → 100 risk.
  const feels = scale(alpine.feelsLikeC, 5, -15)
  // Gusts: 15 km/h → 0, 70 km/h → 100.
  const gust = scale(alpine.gustKmh, 15, 70)
  const score = clamp(0.55 * feels + 0.45 * gust)
  const explanation =
    score < 25
      ? `Manageable exposure: feels ${alpine.feelsLikeC}°C, gusts ${alpine.gustKmh} km/h.`
      : `Exposed ridge bites: feels ${alpine.feelsLikeC}°C with ${alpine.gustKmh} km/h gusts. Shell + insulation up high.`
  return mk('wind-chill', 'Exposure / wind chill risk', score, 1.2, explanation)
}

function navigationFactor(f: WeatherForecast[], inp: RiskInputs): RiskFactor {
  const alpine = byZone(f, 'alpine')
  const cloud = alpine.cloudCoverPct
  const snowObscures = inp.trailSnow === 'continuous' ? 55 : inp.trailSnow === 'patchy' ? 25 : 0
  const score = clamp(0.55 * cloud + 0.45 * snowObscures)
  const explanation =
    score < 25
      ? `Good visibility likely (${cloud}% cloud); trail easy to follow.`
      : `${cloud}% cloud${snowObscures ? ' + snow-covered trail' : ''} can hide the route. Carry GPS + paper map, watch for whiteout.`
  return mk('navigation', 'Navigation risk', score, 1.0, explanation)
}

function dehydrationFactor(f: WeatherForecast[], inp: RiskInputs): RiskFactor {
  const high = Math.max(...f.map((x) => x.highC))
  const uv = Math.max(...f.map((x) => x.uvIndex))
  const heat = scale(high, 15, 32) // warm-day load above 15 °C
  const sun = scale(uv, 3, 11) // UV exposure load
  const water = inp.waterCapacityL < 2 ? 40 : 0 // under-carrying water
  const score = clamp(0.5 * heat + 0.3 * sun + 0.2 * water)
  const explanation =
    score < 25
      ? `Low heat load (high ${high}°C, UV ${uv}). Still drink on schedule.`
      : `Warm/sunny effort (high ${high}°C, UV ${uv}). Carry ${inp.waterCapacityL} L, add electrolytes.`
  return mk('dehydration', 'Dehydration / heat risk', score, 0.6, explanation)
}

function mk(
  id: RiskFactor['id'],
  label: string,
  score: number,
  weight: number,
  explanation: string,
): RiskFactor {
  const rounded = Math.round(score)
  return { id, label, score: rounded, band: bandFor(rounded), weight, explanation }
}

/* ---- verdict copy per band -------------------------------------------- */

const VERDICT: Record<RiskBand, string> = {
  green: 'GO — conditions look low-risk. Standard precautions apply.',
  yellow: 'GO WITH CARE — moderate risk. Tighten plans and watch the forecast.',
  orange: 'REASSESS — elevated risk. Consider a lower objective or new date.',
  red: 'NO-GO — high risk. Reassess or postpone the trip.',
}

/* ---- public entry point ------------------------------------------------ */

export function computeRisk(
  forecasts: WeatherForecast[],
  inputs: RiskInputs,
  trip: Trip,
): RiskAssessment {
  const factors: RiskFactor[] = [
    coldSleepFactor(forecasts, inputs),
    wetGearFactor(forecasts),
    snowTravelFactor(forecasts, inputs, trip),
    windChillFactor(forecasts),
    navigationFactor(forecasts, inputs),
    dehydrationFactor(forecasts, inputs),
  ]

  // 1–2. Weighted average of the factor sub-scores.
  const totalWeight = factors.reduce((s, x) => s + x.weight, 0)
  const base = factors.reduce((s, x) => s + x.score * x.weight, 0) / totalWeight

  // 3a. Group preparedness: 100 → ×0.9, 50 → ×1.0, 0 → ×1.2.
  const prepMult = clamp(1 + (50 - inputs.groupPreparedness) / 250, 0, 2)

  // 3b. Trip effort: longer/steeper days amplify every risk. Normalise the
  //     biggest single on-foot day against a stout 18 km / 1000 m benchmark.
  const peakDay = trip.segments.reduce(
    (m, s) => Math.max(m, s.distanceKm + s.elevationGainM / 100),
    0,
  )
  const effortMult = clamp(1 + scale(peakDay, 8, 30) / 100 / 2, 0, 2) // up to ×1.5

  // 4. Final score + band.
  const score = Math.round(clamp(base * prepMult * effortMult))
  const band = bandFor(score)

  return { score, band, verdict: VERDICT[band], factors }
}
