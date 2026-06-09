import type { ReactNode } from 'react'

interface SectionProps {
  /** Two-digit instrument index, e.g. "01". */
  index: string
  title: string
  /** Optional right-aligned status chip. */
  status?: ReactNode
  children: ReactNode
}

/**
 * Standard panel header used by every dashboard section, giving the app its
 * consistent "instrument readout" rhythm: index · title · status.
 */
export function Section({ index, title, status, children }: SectionProps) {
  return (
    <section className="scroll-mt-4">
      <header className="mb-3 flex items-center gap-3">
        <span className="label tnum text-lo">{index}</span>
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-hi">
          {title}
        </h2>
        <span className="ml-auto">{status}</span>
      </header>
      {children}
    </section>
  )
}
