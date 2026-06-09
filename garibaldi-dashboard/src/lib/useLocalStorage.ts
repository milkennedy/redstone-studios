import { useCallback, useEffect, useState } from 'react'

/**
 * Persisted React state backed by localStorage.
 *
 * Falls back gracefully to in-memory state when storage is unavailable
 * (private mode, quota, SSR) so the app keeps working offline either way.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const readInitial = useCallback((): T => {
    if (typeof window === 'undefined') return initialValue
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initialValue
    } catch {
      return initialValue
    }
  }, [key, initialValue])

  const [value, setValue] = useState<T>(readInitial)

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* ignore write failures — state still lives in memory */
    }
  }, [key, value])

  return [value, setValue]
}
