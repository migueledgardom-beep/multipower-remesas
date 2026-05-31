// src/hooks/useRates.js
import { useEffect } from 'react'
import { getRates, getBcvRate } from '../services/sheetsService'
import useStore from '../store/useStore'

export function useRates() {
  const { rates, bcvRate, ratesLoading, ratesSource, setRates, setBcvRate, setRatesLoading } =
    useStore()

  useEffect(() => {
    let cancelled = false

    async function load() {
      setRatesLoading(true)
      try {
        const sheetRates = await getRates()
        if (!cancelled) {
          setRates(sheetRates)
          const { rate, source } = await getBcvRate(sheetRates.BCV_BACKUP)
          if (!cancelled) setBcvRate(rate, source)
        }
      } finally {
        if (!cancelled) setRatesLoading(false)
      }
    }

    load()
    // Refresh every 5 minutes
    const interval = setInterval(load, 5 * 60 * 1000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  return { rates, bcvRate, ratesLoading, ratesSource }
}
