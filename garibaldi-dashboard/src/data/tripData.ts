/**
 * MOCK TRIP DATA — single source for the dashboard.
 *
 * To plan a different trip, edit the values here. The most common edits:
 *   • Trip dates ............. `trip.startDate` / `trip.endDate`
 *   • Weather ................ `mockForecasts` (or wire a live provider —
 *                              see src/lib/weatherProvider.ts)
 *   • Packing ................ `gear`
 *   • Risk tuning defaults ... `defaultRiskInputs`
 */

import type {
  GearItem,
  ReadinessTask,
  RiskInputs,
  SafetyNote,
  Trip,
  WeatherForecast,
} from '../types'

/* ------------------------------------------------------------------ */
/* Trip                                                                */
/* ------------------------------------------------------------------ */

export const trip: Trip = {
  name: 'Garibaldi Lake — Panorama Ridge',
  region: 'Garibaldi Provincial Park, BC',
  startDate: '2026-06-26', // ← departure date (drive + van night)
  endDate: '2026-06-29', //   ← hike-out date
  nights: { van: 1, tent: 2 },
  partySize: 2,

  zones: [
    {
      id: 'parking',
      name: 'Rubble Creek Parking Lot',
      elevationM: 610,
      note: 'Trailhead · van overnight',
    },
    {
      id: 'campground',
      name: 'Garibaldi Lake Campground',
      elevationM: 1490,
      note: 'Tent base · 2 nights',
    },
    {
      id: 'alpine',
      name: 'Panorama Ridge / Peak Zone',
      elevationM: 2100,
      note: 'Exposed alpine · day objective',
    },
  ],

  segments: [
    {
      id: 'seg-0',
      stage: 'Stage 0',
      from: 'Home',
      to: 'Rubble Creek Lot',
      distanceKm: 0,
      elevationGainM: 0,
      description: 'Drive to trailhead, sleep in van at the parking lot.',
      overnight: 'van',
    },
    {
      id: 'seg-1',
      stage: 'Stage 1',
      from: 'Rubble Creek Lot',
      to: 'Garibaldi Lake Camp',
      distanceKm: 9.0,
      elevationGainM: 880,
      description: 'Hike in via the switchbacks, pitch tent at the lake.',
      overnight: 'tent',
    },
    {
      id: 'seg-2',
      stage: 'Stage 2',
      from: 'Garibaldi Lake Camp',
      to: 'Panorama Ridge & back',
      distanceKm: 15.0,
      elevationGainM: 770,
      description: 'Day push to the ridge/peak zone, return to the tent.',
      overnight: 'tent',
    },
    {
      id: 'seg-3',
      stage: 'Stage 3',
      from: 'Garibaldi Lake Camp',
      to: 'Rubble Creek Lot',
      distanceKm: 9.0,
      elevationGainM: 0,
      description: 'Pack out and hike down to the van.',
      overnight: null,
    },
  ],

  // Round-trip totals across all on-foot segments.
  totals: { distanceKm: 33.0, elevationGainM: 1650 },

  permit: {
    required: true,
    authority: 'BC Parks — Discover Camping',
    note: 'Backcountry camping reservation required for Garibaldi Lake. Book the exact nights; bring the confirmation offline. Day-use pass NOT required for overnight permit holders.',
    reservationNumber: 'GL-XXXXXXXX',
  },

  emergency: [
    {
      id: 'ec-911',
      name: 'Emergency Services',
      role: 'Police / Fire / Ambulance',
      phone: '911',
      note: 'Cell coverage is spotty above the lake — call from high points.',
    },
    {
      id: 'ec-sar',
      name: 'BC Search & Rescue',
      role: 'Backcountry rescue (via 911)',
      phone: '911',
      note: 'Ask for RCMP, then request Squamish SAR. Give UTM/lat-long.',
    },
    {
      id: 'ec-parks',
      name: 'BC Parks Ranger',
      role: 'Garibaldi Park',
      phone: '+1-604-986-9371',
      note: 'Non-emergency park / trail conditions.',
    },
    {
      id: 'ec-ice',
      name: 'Trip Contact (off-trail)',
      role: 'Holds the trip plan',
      phone: '+1-604-000-0000',
      note: 'Will call SAR if party is not out by the agreed time.',
    },
  ],
}

/* ------------------------------------------------------------------ */
/* Weather — MOCK                                                      */
/* ------------------------------------------------------------------ */
/* Replace this array (or src/lib/weatherProvider.ts) with live data.   */

const NOW = '2026-06-09T07:40:00-07:00'

export const mockForecasts: WeatherForecast[] = [
  {
    zoneId: 'parking',
    location: 'Rubble Creek Lot',
    elevationM: 610,
    date: '2026-06-26',
    highC: 21,
    lowC: 9,
    feelsLikeC: 20,
    windKmh: 8,
    gustKmh: 18,
    rainProbPct: 20,
    snowProbPct: 0,
    precipMm: 0.4,
    freezingLevelM: 3200,
    cloudCoverPct: 35,
    uvIndex: 6,
    sunrise: '05:08',
    sunset: '21:18',
    updatedAt: NOW,
    source: 'mock',
  },
  {
    zoneId: 'campground',
    location: 'Garibaldi Lake Camp',
    elevationM: 1490,
    date: '2026-06-27',
    highC: 14,
    lowC: 1,
    feelsLikeC: -2,
    windKmh: 16,
    gustKmh: 34,
    rainProbPct: 45,
    snowProbPct: 15,
    precipMm: 3.2,
    freezingLevelM: 1900,
    cloudCoverPct: 70,
    uvIndex: 5,
    sunrise: '05:06',
    sunset: '21:20',
    updatedAt: NOW,
    source: 'mock',
  },
  {
    zoneId: 'alpine',
    location: 'Panorama Ridge',
    elevationM: 2100,
    date: '2026-06-28',
    highC: 8,
    lowC: -4,
    feelsLikeC: -11,
    windKmh: 32,
    gustKmh: 58,
    rainProbPct: 40,
    snowProbPct: 45,
    precipMm: 5.0,
    freezingLevelM: 1850,
    cloudCoverPct: 80,
    uvIndex: 7,
    sunrise: '05:05',
    sunset: '21:22',
    updatedAt: NOW,
    source: 'mock',
  },
]

/* ------------------------------------------------------------------ */
/* Risk inputs — defaults (user-tunable, persisted)                    */
/* ------------------------------------------------------------------ */

export const defaultRiskInputs: RiskInputs = {
  sleepingBagRatingC: 0, // "0°C or better" bag from the kit list
  trailSnow: 'patchy', // early-season Garibaldi commonly holds snow up high
  hasTraction: true, // microspikes packed
  groupPreparedness: 75, // experienced but not bombproof
  waterCapacityL: 3,
}

/* ------------------------------------------------------------------ */
/* Packing list                                                        */
/* ------------------------------------------------------------------ */

export const gear: GearItem[] = [
  // Sleep system
  { id: 'g-bag', name: '0°C (or better) sleeping bag', category: 'sleep', critical: true, status: 'packed' },
  { id: 'g-pad', name: 'Insulated sleeping pad (R≥3)', category: 'sleep', critical: true, status: 'packed' },
  { id: 'g-sleepclothes', name: 'Dry sleep clothes', category: 'sleep', critical: true, status: 'need-to-buy' },
  { id: 'g-pillow', name: 'Camp pillow', category: 'sleep', critical: false, status: 'optional' },

  // Shelter
  { id: 'g-tent', name: 'Tent (3-season)', category: 'shelter', critical: true, status: 'packed' },
  { id: 'g-footprint', name: 'Tent footprint / groundsheet', category: 'shelter', critical: false, status: 'optional' },
  { id: 'g-stakes', name: 'Extra stakes + guylines', category: 'shelter', critical: false, status: 'packed' },

  // Clothing
  { id: 'g-shell', name: 'Rain shell (jacket)', category: 'clothing', critical: true, status: 'packed' },
  { id: 'g-puffy', name: 'Puffy insulated jacket', category: 'clothing', critical: true, status: 'packed' },
  { id: 'g-base', name: 'Merino base layers (top + bottom)', category: 'clothing', critical: true, status: 'packed' },
  { id: 'g-toque', name: 'Toque + gloves', category: 'clothing', critical: true, status: 'packed' },
  { id: 'g-rainpants', name: 'Rain pants', category: 'clothing', critical: false, status: 'optional' },
  { id: 'g-socks', name: 'Extra socks (2+ pairs)', category: 'clothing', critical: true, status: 'need-to-buy' },

  // Food
  { id: 'g-meals', name: 'Meals x3 days + buffer day', category: 'food', critical: true, status: 'need-to-buy' },
  { id: 'g-stove', name: 'Stove + fuel', category: 'food', critical: true, status: 'packed' },
  { id: 'g-snacks', name: 'Trail snacks / electrolytes', category: 'food', critical: false, status: 'need-to-buy' },
  { id: 'g-bearcache', name: 'Food cache / hang or locker use', category: 'food', critical: true, status: 'packed' },

  // Water
  { id: 'g-filter', name: 'Water filter / purifier', category: 'water', critical: true, status: 'packed' },
  { id: 'g-capacity', name: '2–3 L water capacity per person', category: 'water', critical: true, status: 'packed' },

  // Navigation
  { id: 'g-papermap', name: 'Paper / offline map', category: 'navigation', critical: true, status: 'need-to-buy' },
  { id: 'g-gps', name: 'GPS / offline route loaded', category: 'navigation', critical: true, status: 'packed' },
  { id: 'g-compass', name: 'Compass', category: 'navigation', critical: false, status: 'packed' },

  // Safety
  { id: 'g-firstaid', name: 'First aid kit', category: 'safety', critical: true, status: 'packed' },
  { id: 'g-blanket', name: 'Emergency blanket / bivy', category: 'safety', critical: true, status: 'packed' },
  { id: 'g-bearspray', name: 'Bear spray', category: 'safety', critical: true, status: 'packed' },
  { id: 'g-whistle', name: 'Whistle', category: 'safety', critical: false, status: 'packed' },
  { id: 'g-spikes', name: 'Microspikes (if snow persists)', category: 'safety', critical: false, status: 'packed' },
  { id: 'g-poles', name: 'Trekking poles', category: 'safety', critical: false, status: 'packed' },

  // Electronics
  { id: 'g-headlamp', name: 'Headlamp (+ spare batteries)', category: 'electronics', critical: true, status: 'packed' },
  { id: 'g-inreach', name: 'InReach / satellite communicator', category: 'electronics', critical: false, status: 'optional' },
  { id: 'g-battery', name: 'Battery bank', category: 'electronics', critical: false, status: 'packed' },
  { id: 'g-phone', name: 'Phone (airplane mode, maps offline)', category: 'electronics', critical: true, status: 'packed' },

  // Van overnight gear
  { id: 'g-vanbed', name: 'Van bedding / blankets', category: 'van', critical: false, status: 'packed' },
  { id: 'g-vanwater', name: 'Van water jug (top-up at trailhead)', category: 'van', critical: false, status: 'packed' },
  { id: 'g-vancurtain', name: 'Window covers / curtains', category: 'van', critical: false, status: 'optional' },
  { id: 'g-keys', name: 'Spare key / hide-a-key plan', category: 'van', critical: false, status: 'need-to-buy' },

  // Peak day kit
  { id: 'g-daypack', name: 'Summit daypack', category: 'peak-day', critical: false, status: 'packed' },
  { id: 'g-sunscreen', name: 'Sunscreen', category: 'peak-day', critical: true, status: 'packed' },
  { id: 'g-sunnies', name: 'Sunglasses (glacier-rated)', category: 'peak-day', critical: true, status: 'packed' },
  { id: 'g-summitfood', name: 'Summit snacks + 2 L water', category: 'peak-day', critical: true, status: 'need-to-buy' },
]

/* ------------------------------------------------------------------ */
/* Countdown readiness                                                 */
/* ------------------------------------------------------------------ */

export const readinessTasks: ReadinessTask[] = [
  // 7 days out
  { id: 'r-7-1', window: '7d', label: 'Check long-range forecast', done: false },
  { id: 'r-7-2', window: '7d', label: 'Confirm BC Parks reservation', done: false },
  { id: 'r-7-3', window: '7d', label: 'Inspect gear (tent, bag, stove, filter)', done: false },

  // 3 days out
  { id: 'r-3-1', window: '3d', label: 'Check mountain forecast (peak zone)', done: false },
  { id: 'r-3-2', window: '3d', label: 'Pack & portion food', done: false },
  { id: 'r-3-3', window: '3d', label: 'Charge all electronics + battery bank', done: false },

  // 24 hours out
  { id: 'r-24-1', window: '24h', label: 'Final GO / NO-GO call', done: false },
  { id: 'r-24-2', window: '24h', label: 'Download offline maps + route', done: false },
  { id: 'r-24-3', window: '24h', label: 'Share trip plan with off-trail contact', done: false },

  // Morning of departure
  { id: 'r-dep-1', window: 'departure', label: 'Refresh weather', done: false },
  { id: 'r-dep-2', window: 'departure', label: 'Fuel the van', done: false },
  { id: 'r-dep-3', window: 'departure', label: 'Fill water', done: false },
  { id: 'r-dep-4', window: 'departure', label: 'Permits in hand (offline)', done: false },
  { id: 'r-dep-5', window: 'departure', label: 'Route check + turnaround time set', done: false },
]

/* ------------------------------------------------------------------ */
/* Survival / safety notes                                             */
/* ------------------------------------------------------------------ */

export const safetyNotes: SafetyNote[] = [
  {
    id: 's-turnaround',
    title: 'Turnaround Time',
    points: [
      'Set a hard turnaround time before leaving camp.',
      'Default: turn around by 13:00 regardless of summit distance.',
      'The summit is optional. Getting back to the tent is not.',
    ],
  },
  {
    id: 's-layering',
    title: 'Layering Strategy',
    points: [
      'Base (merino) → mid (fleece) → shell. Puffy for stops only.',
      'Start cool — you warm up within 10 minutes of moving.',
      'Shed before you sweat; add before you chill.',
    ],
  },
  {
    id: 's-hypo',
    title: 'Hypothermia Signs',
    points: [
      'Watch for the "umbles": stumbles, mumbles, fumbles, grumbles.',
      'Shivering that stops + confusion = serious. Act now.',
      'Get dry, add layers, hot fluids, shelter, share body heat.',
    ],
  },
  {
    id: 's-dehydration',
    title: 'Dehydration Signs',
    points: [
      'Dark urine, headache, cramps, dizziness.',
      'Sip steadily — aim ~0.5 L/hr in effort. Add electrolytes.',
      'Cold weather masks thirst — drink on schedule, not by feel.',
    ],
  },
  {
    id: 's-bear',
    title: 'Bear / Wildlife Protocol',
    points: [
      'Travel in a group, make noise on blind corners.',
      'Bear spray accessible (hip belt), not buried in the pack.',
      'Store all food/scented items in lockers or a proper hang.',
    ],
  },
  {
    id: 's-snow',
    title: 'Snowfield Crossing Caution',
    points: [
      'Early-season snow lingers above the lake — assess runout.',
      'Microspikes + poles on firm/icy slopes; avoid steep runout.',
      'No traction or whiteout? Turn back. Snow hides the trail.',
    ],
  },
  {
    id: 's-weather',
    title: 'Alpine Weather Warning',
    points: [
      'Weather flips fast at 2000 m+. Watch for building cumulus.',
      'Descend off ridges/exposed ground before lightning arrives.',
      'Wind + wet = wind chill far below the air temperature.',
    ],
  },
  {
    id: 's-emergency',
    title: 'Emergency Plan',
    points: [
      'In emergency: STOP, shelter, then signal (911 / InReach SOS).',
      'Give location as lat-long or UTM + nearest landmark.',
      'Conserve phone battery — airplane mode between check-ins.',
    ],
  },
  {
    id: 's-tripplan',
    title: 'Leave-Trip-Plan Checklist',
    points: [
      'Route, dates, vehicle + plate, party names left with contact.',
      'Agreed "panic time" to call SAR if you are not out.',
      'Confirm with contact once safely back at the van.',
    ],
  },
]
