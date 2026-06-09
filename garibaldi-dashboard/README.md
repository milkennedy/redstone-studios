# Garibaldi Trip HUD

A mobile-first **alpine mission-control dashboard** for a 2-night Garibaldi
hiking trip (Rubble Creek → Garibaldi Lake → Panorama Ridge). It's a
high-signal *heads-up display* built to help a party make **GO / NO-GO**
decisions as the trip date approaches.

Built with **Vite + React + TypeScript + Tailwind CSS**. Works offline once
loaded, persists your packing / readiness / risk inputs in `localStorage`, and
is structured so the mock weather can be swapped for a live API with a one-line
change.

---

## Sections

| # | Panel | What it does |
|---|-------|--------------|
| 01 | **RouteOverview** | Dates, route stages, three elevation zones, distance/gain, permit reminder |
| 02 | **WeatherHUD** | A swipeable card per zone — high/low/feels-like, wind/gust, rain & snow prob, precip, freezing level, cloud, UV, sunrise/sunset, last-updated |
| 03 | **RiskScorePanel** | 0–100 risk score + band (green/yellow/orange/red), six plain-English factors, tunable party inputs |
| 04 | **PackingChecklist** | Dynamic checklist grouped into 10 categories with `Packed / Need to buy / Optional` status and `Critical` flags |
| 05 | **ReadinessTimeline** | Countdown checklist at T-7d / T-3d / T-24h / morning-of |
| 06 | **SafetyNotes** | Concise survival/safety cards (turnaround, hypothermia, bear protocol, …) |
| 07 | **EmergencyPanel** | Tap-to-call emergency contacts |

---

## Run locally

```bash
cd garibaldi-dashboard
npm install
npm run dev        # start the dev server (Vite prints the local URL)
```

Other scripts:

```bash
npm run build      # type-check (tsc) + production build to dist/
npm run preview    # serve the production build
npm run typecheck  # tsc --noEmit only
```

> Open the dev URL on your phone (same Wi-Fi, use the Network URL Vite prints)
> for the real mobile experience. The layout is tuned for a single-hand,
> outdoor-readable screen.

---

## Where to update things

Everything trip-specific lives in **`src/data/tripData.ts`**.

### Trip dates
```ts
export const trip: Trip = {
  startDate: '2026-06-26', // ← departure (drive + van night)
  endDate:   '2026-06-29', // ← hike-out day
  ...
}
```
The header countdown (`T-…`), the active readiness window, and date labels all
derive from these two fields automatically.

### Weather source
By default the app uses **mock data** (`mockForecasts` in `tripData.ts`).
To edit the mock numbers, change that array.

To connect a **live source**, open **`src/lib/weatherProvider.ts`**:

1. A ready-to-use **Open-Meteo** provider is scaffolded and commented out
   (free, no API key). Uncomment it.
2. Set the active provider:
   ```ts
   export const ACTIVE_PROVIDER: WeatherProvider = openMeteoProvider
   ```
3. That's it — `App.tsx` calls `loadForecasts()` on mount and falls back to the
   mock data if the fetch fails (so it still works offline).

To use **WeatherAPI / Environment Canada / Mountain-Forecast** instead, write a
function returning `Promise<WeatherForecast[]>` (one per zone) that maps the
API's fields onto the `WeatherForecast` shape in `src/types/index.ts`, then
point `ACTIVE_PROVIDER` at it. No UI changes required — the whole app reads the
typed `WeatherForecast`, not any provider's raw response.

### Packing / readiness / safety / contacts
Edit `gear`, `readinessTasks`, `safetyNotes`, and `trip.emergency` in
`tripData.ts`. User changes to checklist/readiness/risk inputs are saved to
`localStorage` and merged over the data by `id`, so editing the data file is
safe and won't wipe a user's progress.

---

## How the risk score is calculated

All logic lives in **`src/lib/risk.ts`** (`computeRisk`). The score is **0–100,
where higher = more risk**.

### 1. Six factors (each scored 0–100)

| Factor | Driven by |
|--------|-----------|
| **Cold sleep risk** | Campground overnight low vs. your sleeping-bag rating |
| **Wet gear risk** | Max rain probability + expected precipitation (mm) |
| **Snow travel risk** | New-snow chance up high, existing trail snow, freezing level vs. objective — reduced if microspikes are packed |
| **Exposure / wind chill risk** | Alpine feels-like temperature + gust speed |
| **Navigation risk** | Alpine cloud cover + snow-obscured trail |
| **Dehydration / heat risk** | Peak daytime high + UV index + water carry capacity |

Each factor carries its own one-line, plain-English explanation in the UI.

### 2. Weighted average

Factors are combined as a weighted average (snow-travel and the cold/wind
factors are weighted highest, dehydration lowest):

```
cold-sleep 1.2 · wet-gear 1.0 · snow-travel 1.3
wind-chill 1.2 · navigation 1.0 · dehydration 0.6
```

### 3. Two multipliers

- **Group preparedness** (0–100, user-tunable): 100 → ×0.9, 50 → ×1.0, 0 → ×1.2.
- **Trip effort**: the biggest single on-foot day (distance + gain) amplifies
  every risk, up to ×1.5.

```
finalScore = clamp( weightedAverage × prepMultiplier × effortMultiplier , 0, 100 )
```

### 4. Bands

| Score | Band | Verdict |
|-------|------|---------|
| 0–24  | 🟢 Green  | GO — low risk |
| 25–49 | 🟡 Yellow | GO with care — moderate |
| 50–74 | 🟠 Orange | Reassess — elevated |
| 75–100| 🔴 Red    | NO-GO — reassess / postpone |

The **"Tune party inputs"** panel under the score lets you adjust sleeping-bag
rating, group preparedness, water capacity, trail-snow condition, and traction —
the score and verdict recompute live and persist to `localStorage`.

---

## Data model

Typed in **`src/types/index.ts`** — the single source of truth:

`Trip`, `RouteSegment`, `ElevationZone`, `EmergencyContact`, `PermitInfo`,
`WeatherForecast`, `RiskFactor` / `RiskAssessment` / `RiskInputs`,
`GearItem`, `ReadinessTask`, `SafetyNote`.

---

## Project structure

```
garibaldi-dashboard/
├─ index.html
├─ src/
│  ├─ App.tsx                  # shell: header, countdown, nav, state wiring
│  ├─ main.tsx
│  ├─ index.css                # Tailwind + base layer
│  ├─ types/index.ts           # the data model
│  ├─ data/tripData.ts         # ALL mock data (edit me)
│  ├─ lib/
│  │  ├─ risk.ts               # risk engine
│  │  ├─ weatherProvider.ts    # provider abstraction (mock → live)
│  │  └─ useLocalStorage.ts    # persistence hook
│  └─ components/
│     ├─ RouteOverview.tsx
│     ├─ WeatherHUD.tsx
│     ├─ RiskScorePanel.tsx
│     ├─ PackingChecklist.tsx
│     ├─ ReadinessTimeline.tsx
│     ├─ SafetyNotes.tsx
│     ├─ EmergencyPanel.tsx
│     └─ ui/                    # Section, Glyph (custom line symbols), format helpers
└─ tailwind.config.js
```

---

## Design notes

- **Mobile-first**, large typography, high contrast, dark "instrument" theme for
  outdoor readability.
- **No generic icon set** — symbols are hand-drawn single-stroke line glyphs
  (`components/ui/Glyph.tsx`); numbers use tabular monospace to read like gauges.
- **Offline-friendly**: after first load the app runs from cache and mock data;
  a failed live-weather fetch silently falls back to the mock forecasts.

> ⚠️ This is a **decision aid**, not a forecast. Always verify live mountain
> conditions and set a turnaround time before you go.
