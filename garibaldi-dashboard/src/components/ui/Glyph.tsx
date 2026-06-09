/**
 * Hand-drawn line glyphs — deliberately NOT a generic icon set.
 * Each is a single-stroke mark that reads at a glance in bright light.
 */

type GlyphName =
  | 'peak'
  | 'tent'
  | 'van'
  | 'up'
  | 'down'
  | 'wind'
  | 'drop'
  | 'snow'
  | 'sun'
  | 'moon'
  | 'cloud'
  | 'thermo'
  | 'check'
  | 'alert'
  | 'route'

interface GlyphProps {
  name: GlyphName
  className?: string
  size?: number
}

const PATHS: Record<GlyphName, JSX.Element> = {
  peak: (
    <path d="M2 19 L9 6 L13 13 L16 9 L22 19 Z" />
  ),
  tent: (
    <>
      <path d="M12 4 L21 20 H3 Z" />
      <path d="M12 9 L12 20" />
    </>
  ),
  van: (
    <>
      <path d="M3 16 V8 H15 L20 12 V16" />
      <circle cx="7" cy="17" r="1.6" />
      <circle cx="17" cy="17" r="1.6" />
    </>
  ),
  up: <path d="M12 19 V5 M6 11 L12 5 L18 11" />,
  down: <path d="M12 5 V19 M6 13 L12 19 L18 13" />,
  wind: <path d="M3 9 H14 a2.5 2.5 0 1 0 -2.5 -2.5 M3 14 H18 a2.5 2.5 0 1 1 -2.5 2.5" />,
  drop: <path d="M12 4 C12 4 5 12 5 15.5 A7 7 0 0 0 19 15.5 C19 12 12 4 12 4 Z" />,
  snow: (
    <path d="M12 3 V21 M4 7 L20 17 M20 7 L4 17 M12 6 L9 9 M12 6 L15 9 M12 18 L9 15 M12 18 L15 15" />
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2 V4 M12 20 V22 M2 12 H4 M20 12 H22 M5 5 L6.5 6.5 M17.5 17.5 L19 19 M19 5 L17.5 6.5 M6.5 17.5 L5 19" />
    </>
  ),
  moon: <path d="M20 14 A8 8 0 1 1 10 4 A6.2 6.2 0 0 0 20 14 Z" />,
  cloud: (
    <path d="M7 18 H17 a4 4 0 0 0 0.5 -7.95 A6 6 0 0 0 6 9.5 A3.5 3.5 0 0 0 7 18 Z" />
  ),
  thermo: (
    <>
      <path d="M12 3 a2 2 0 0 1 2 2 V13.2 a4 4 0 1 1 -4 0 V5 a2 2 0 0 1 2 -2 Z" />
      <path d="M12 9 V15" />
    </>
  ),
  check: <path d="M4 12 L9 17 L20 6" />,
  alert: (
    <>
      <path d="M12 3 L22 20 H2 Z" />
      <path d="M12 9 V14 M12 17 V17.5" />
    </>
  ),
  route: (
    <path d="M6 20 a3 3 0 0 0 3 -3 V8 a3 3 0 0 1 6 0 V16" />
  ),
}

export function Glyph({ name, className = '', size = 18 }: GlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  )
}
