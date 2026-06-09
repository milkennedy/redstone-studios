/**
 * Weather provider abstraction.
 *
 * The dashboard never talks to a weather API directly — it asks a
 * `WeatherProvider` for `WeatherForecast[]` keyed by elevation zone. Today the
 * only implementation is `mockProvider`. To go live, implement this interface
 * against Open-Meteo / WeatherAPI / Environment Canada / Mountain-Forecast and
 * map the response into `WeatherForecast`. Nothing else in the app changes.
 *
 *   --- HOW TO ADD A LIVE SOURCE -------------------------------------------
 *   1. Write a function returning Promise<WeatherForecast[]> (one per zone).
 *   2. Map the API fields onto the WeatherForecast shape (units in types/index).
 *   3. Set ACTIVE_PROVIDER below to your new provider.
 *   A scaffolded Open-Meteo example is included and commented out.
 *   ------------------------------------------------------------------------
 */

import type { ElevationZone, WeatherForecast } from '../types'
import { mockForecasts, trip } from '../data/tripData'

export interface WeatherProvider {
  /** Stable id used for labelling provenance in the UI. */
  id: string
  /** Returns one forecast per elevation zone. */
  getForecasts(zones: ElevationZone[]): Promise<WeatherForecast[]>
}

/* ---- Mock provider (default) ------------------------------------------- */

export const mockProvider: WeatherProvider = {
  id: 'mock',
  async getForecasts() {
    // Simulate async so swapping in a real fetch needs no call-site changes.
    return Promise.resolve(mockForecasts)
  },
}

/* ---- Open-Meteo scaffold (free, no key) — uncomment to use ------------- */
/*
import type { ZoneId } from '../types'

// Approximate coordinates for each zone. Refine to taste.
const ZONE_COORDS: Record<ZoneId, { lat: number; lon: number }> = {
  parking:    { lat: 49.9569, lon: -123.1199 }, // Rubble Creek lot
  campground: { lat: 49.9550, lon: -123.0290 }, // Garibaldi Lake
  alpine:     { lat: 49.9620, lon: -122.9930 }, // Panorama Ridge
}

export const openMeteoProvider: WeatherProvider = {
  id: 'open-meteo',
  async getForecasts(zones) {
    const out = await Promise.all(
      zones.map(async (z) => {
        const { lat, lon } = ZONE_COORDS[z.id]
        const url =
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
          `&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,` +
          `precipitation_sum,precipitation_probability_max,snowfall_sum,` +
          `wind_speed_10m_max,wind_gusts_10m_max,uv_index_max,sunrise,sunset,` +
          `cloud_cover_max,freezing_level_height_max` +
          `&timezone=America%2FVancouver&start_date=${trip.startDate}&end_date=${trip.endDate}`
        const res = await fetch(url)
        const json = await res.json()
        const d = json.daily
        const i = 0 // map the relevant trip day to a daily index
        const f: WeatherForecast = {
          zoneId: z.id,
          location: z.name,
          elevationM: z.elevationM,
          date: d.time[i],
          highC: d.temperature_2m_max[i],
          lowC: d.temperature_2m_min[i],
          feelsLikeC: d.apparent_temperature_max[i],
          windKmh: d.wind_speed_10m_max[i],
          gustKmh: d.wind_gusts_10m_max[i],
          rainProbPct: d.precipitation_probability_max[i],
          snowProbPct: d.snowfall_sum[i] > 0 ? d.precipitation_probability_max[i] : 0,
          precipMm: d.precipitation_sum[i],
          freezingLevelM: d.freezing_level_height_max[i],
          cloudCoverPct: d.cloud_cover_max[i],
          uvIndex: d.uv_index_max[i],
          sunrise: (d.sunrise[i] as string).slice(11, 16),
          sunset: (d.sunset[i] as string).slice(11, 16),
          updatedAt: new Date().toISOString(),
          source: 'open-meteo',
        }
        return f
      }),
    )
    return out
  },
}
*/

/* ---- Active provider --------------------------------------------------- */

/** Swap this to `openMeteoProvider` (or your own) to go live. */
export const ACTIVE_PROVIDER: WeatherProvider = mockProvider

/** Convenience used by the app shell. */
export function loadForecasts(): Promise<WeatherForecast[]> {
  return ACTIVE_PROVIDER.getForecasts(trip.zones)
}
