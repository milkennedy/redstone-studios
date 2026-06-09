import type { RiskBand } from '../../types'

/** Tailwind text-color class for a risk band. */
export const bandText: Record<RiskBand, string> = {
  green: 'text-go',
  yellow: 'text-caution',
  orange: 'text-warn',
  red: 'text-stop',
}

/** Tailwind bg-color class for a risk band. */
export const bandBg: Record<RiskBand, string> = {
  green: 'bg-go',
  yellow: 'bg-caution',
  orange: 'bg-warn',
  red: 'bg-stop',
}

/** Tailwind border-color class for a risk band. */
export const bandBorder: Record<RiskBand, string> = {
  green: 'border-go',
  yellow: 'border-caution',
  orange: 'border-warn',
  red: 'border-stop',
}

export const bandLabel: Record<RiskBand, string> = {
  green: 'LOW',
  yellow: 'MODERATE',
  orange: 'ELEVATED',
  red: 'NO-GO',
}

/** "Jun 26 → Jun 29, 2026" */
export function formatDateRange(startISO: string, endISO: string): string {
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  const s = new Date(startISO + 'T12:00:00')
  const e = new Date(endISO + 'T12:00:00')
  const year = e.getFullYear()
  return `${s.toLocaleDateString('en-CA', opts)} → ${e.toLocaleDateString('en-CA', opts)}, ${year}`
}

/** Whole days from `today` until the ISO date (negative if past). */
export function daysUntil(targetISO: string, now = new Date()): number {
  const target = new Date(targetISO + 'T00:00:00')
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.round((target.getTime() - start.getTime()) / 86_400_000)
}

/** "07:40" from an ISO timestamp, local-ish. */
export function formatClock(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit', hour12: false })
}

export function relativeUpdated(iso: string, now = new Date()): string {
  const mins = Math.round((now.getTime() - new Date(iso).getTime()) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs} h ago`
  return `${Math.round(hrs / 24)} d ago`
}
