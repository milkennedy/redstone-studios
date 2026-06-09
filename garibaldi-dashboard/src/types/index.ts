/**
 * Garibaldi Trip Dashboard — core data model.
 *
 * These types are the single source of truth for the whole app. Mock data in
 * `src/data/tripData.ts` conforms to them, and any live weather provider added
 * later (Open-Meteo, WeatherAPI, Environment Canada, Mountain-Forecast) must
 * map its response into `WeatherForecast` so the rest of the app is untouched.
 */

/* ------------------------------------------------------------------ */
/* Trip + route                                                        */
/* ------------------------------------------------------------------ */

/** A named elevation zone the trip passes through. */
export type ZoneId = 'parking' | 'campground' | 'alpine'

export interface ElevationZone {
  id: ZoneId
  name: string
  /** Metres above sea level. */
  elevationM: number
  /** Short note shown under the zone name. */
  note: string
}

export interface RouteSegment {
  id: string
  /** e.g. "Stage 1" */
  stage: string
  from: string
  to: string
  /** One-way distance for this segment, kilometres. */
  distanceKm: number
  /** Net elevation gain for this segment, metres. */
  elevationGainM: number
  /** What happens at the end of this segment. */
  description: string
  /** Where you sleep at the end of this segment, if anywhere. */
  overnight?: 'van' | 'tent' | null
}

export interface EmergencyContact {
  id: string
  name: string
  role: string
  /** Tel: link-friendly number, e.g. "911" or "+1-604-...". */
  phone: string
  note?: string
}

export interface Trip {
  name: string
  region: string
  /** ISO date (YYYY-MM-DD) the party departs. */
  startDate: string
  /** ISO date (YYYY-MM-DD) the party hikes out. */
  endDate: string
  nights: { van: number; tent: number }
  partySize: number
  zones: ElevationZone[]
  segments: RouteSegment[]
  totals: { distanceKm: number; elevationGainM: number }
  permit: PermitInfo
  emergency: EmergencyContact[]
}

export interface PermitInfo {
  required: boolean
  authority: string
  /** Free-text reminder, e.g. reservation window + confirmation #. */
  note: string
  reservationNumber?: string
}

/* ------------------------------------------------------------------ */
/* Weather                                                             */
/* ------------------------------------------------------------------ */

/** Identifies the weather source so the UI can label provenance. */
export type WeatherSource =
  | 'mock'
  | 'open-meteo'
  | 'weatherapi'
  | 'environment-canada'
  | 'mountain-forecast'

export interface WeatherForecast {
  /** Which elevation zone this forecast describes. */
  zoneId: ZoneId
  /** Display label, e.g. "Garibaldi Lake Campground". */
  location: string
  elevationM: number
  /** ISO date this forecast applies to (the relevant trip day). */
  date: string

  /** Temperatures in °C. */
  highC: number
  lowC: number
  feelsLikeC: number

  /** Wind in km/h. */
  windKmh: number
  gustKmh: number

  /** Probabilities as 0–100 percentages. */
  rainProbPct: number
  snowProbPct: number

  /** Total expected liquid-equivalent precipitation, mm. */
  precipMm: number

  /** Freezing level (0 °C isotherm) in metres ASL. */
  freezingLevelM: number

  /** Cloud cover, 0–100 percent. */
  cloudCoverPct: number

  /** UV index, 0–11+. */
  uvIndex: number

  /** Local HH:MM 24h. */
  sunrise: string
  sunset: string

  /** ISO timestamp this forecast was fetched/generated. */
  updatedAt: string
  source: WeatherSource
}

/* ------------------------------------------------------------------ */
/* Risk engine                                                         */
/* ------------------------------------------------------------------ */

export type RiskBand = 'green' | 'yellow' | 'orange' | 'red'

export type RiskFactorId =
  | 'cold-sleep'
  | 'wet-gear'
  | 'snow-travel'
  | 'wind-chill'
  | 'navigation'
  | 'dehydration'

export interface RiskFactor {
  id: RiskFactorId
  /** Plain-English label, e.g. "Cold sleep risk". */
  label: string
  /** 0–100 sub-score for this factor (higher = more risk). */
  score: number
  band: RiskBand
  /** Relative weight in the overall score. */
  weight: number
  /** One-line explanation of *why* this score, in plain English. */
  explanation: string
}

export interface RiskAssessment {
  /** Aggregate 0–100 (higher = more risk). */
  score: number
  band: RiskBand
  /** Headline call to action for the band. */
  verdict: string
  factors: RiskFactor[]
}

/**
 * Non-weather inputs to the risk engine the user can tune. Persisted to
 * localStorage so the assessment reflects the party's actual readiness.
 */
export interface RiskInputs {
  /** Lowest comfort rating of the party's sleeping bags, °C. */
  sleepingBagRatingC: number
  /** Observed/forecast trail snow above the campground. */
  trailSnow: 'none' | 'patchy' | 'continuous'
  /** Does the party have microspikes / traction available? */
  hasTraction: boolean
  /** Self-assessed group preparedness, 0–100 (higher = better). */
  groupPreparedness: number
  /** Total water-carry capacity per person, litres. */
  waterCapacityL: number
}

/* ------------------------------------------------------------------ */
/* Packing                                                             */
/* ------------------------------------------------------------------ */

export type GearCategory =
  | 'sleep'
  | 'shelter'
  | 'clothing'
  | 'food'
  | 'water'
  | 'navigation'
  | 'safety'
  | 'electronics'
  | 'van'
  | 'peak-day'

export type GearStatus = 'packed' | 'need-to-buy' | 'optional'

export interface GearItem {
  id: string
  name: string
  category: GearCategory
  /** Critical items gate the readiness/risk view if not handled. */
  critical: boolean
  status: GearStatus
  note?: string
}

/* ------------------------------------------------------------------ */
/* Countdown readiness                                                 */
/* ------------------------------------------------------------------ */

export type ReadinessWindow = '7d' | '3d' | '24h' | 'departure'

export interface ReadinessTask {
  id: string
  window: ReadinessWindow
  label: string
  done: boolean
}

/* ------------------------------------------------------------------ */
/* Safety notes                                                        */
/* ------------------------------------------------------------------ */

export interface SafetyNote {
  id: string
  title: string
  /** Tight, scannable bullet points. */
  points: string[]
}
