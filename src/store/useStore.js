// src/store/useStore.js
import { create } from 'zustand'

const useStore = create((set) => ({
  // Auth
  user: undefined,
  setUser: (user) => set({ user }),

  // Rates from Google Sheets
  rates: null,
  bcvRate: 92.14,
  ratesLoading: false,
  ratesSource: 'fallback',
  setRates: (rates) => set({ rates }),
  setBcvRate: (bcvRate, source) => set({ bcvRate, ratesSource: source }),
  setRatesLoading: (ratesLoading) => set({ ratesLoading }),

  // Calculation result
  calcResult: null,
  setCalcResult: (calcResult) => set({ calcResult }),

  // Reset
  reset: () => set({ calcResult: null }),
}))

export default useStore
