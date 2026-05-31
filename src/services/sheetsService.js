// src/services/sheetsService.js
// Lee tasas desde Google Sheets en modo público (sin autenticación)
// La hoja debe estar publicada como CSV: Archivo > Compartir > Publicar en la web

const SHEET_CSV_URL = import.meta.env.VITE_SHEETS_CSV_URL
// Formato: https://docs.google.com/spreadsheets/d/SHEET_ID/gviz/tq?tqx=out:csv&sheet=CONFIG

// Tasas de respaldo en caso de fallo de Google Sheets
const FALLBACK_RATES = {
  BCV_BACKUP: 92.14,
  CLP_RATE: 0.115,
  PEN_RATE: 1.22,
  COP_RATE: 0.026,
  USD_RATE: 1.0,
  BRL_RATE: 18.5,
  EUR_RATE: 102.0,
  MXN_RATE: 5.8,
  ARS_RATE: 0.062,
}

/**
 * Parsea el CSV de Google Sheets con formato KEY | VALUE
 */
function parseCsv(csv) {
  const lines = csv.trim().split('\n').slice(1) // omitir header
  const result = {}
  for (const line of lines) {
    const parts = line.split(',')
const key = parts[0]?.replace(/"/g, '').trim()
const value = parts.slice(1).join(',').replace(/"/g, '').trim()
    if (key && value) {
      result[key] = parseFloat(value.replace(',', '.'))
    }
  }
  return result
}

let cachedRates = null
let cacheTime = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 minutos

/**
 * Obtiene tasas desde Google Sheets.
 * Usa caché de 5 minutos y fallback si falla la red.
 */
export async function getRates() {
  const now = Date.now()
  if (cachedRates && now - cacheTime < CACHE_TTL) {
    return cachedRates
  }

  try {
    if (!SHEET_CSV_URL) throw new Error('VITE_SHEETS_CSV_URL no configurado')

    const response = await fetch(SHEET_CSV_URL, { cache: 'no-store' })
    if (!response.ok) throw new Error('Error al cargar Google Sheets')

    const csv = await response.text()
    console.log(csv)

    const rates = parseCsv(csv)

    cachedRates = { ...FALLBACK_RATES, ...rates, _source: 'sheets' }
    cacheTime = now
    return cachedRates
  } catch (err) {
    console.warn('Google Sheets no disponible, usando tasas de respaldo:', err.message)
    return { ...FALLBACK_RATES, _source: 'fallback' }
  }
}

/**
 * Obtiene la tasa BCV desde exchangerate-api o usa respaldo de Sheets
 */
export async function getBcvRate(fallbackFromSheets) {
  try {
    // API pública gratuita para tasa USD/VES
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      cache: 'no-store',
    })
    const data = await res.json()
    if (data?.rates?.VES) {
      return { rate: data.rates.VES, source: 'api' }
    }
    throw new Error('Rate VES no disponible')
  } catch {
    return {
      rate: fallbackFromSheets || 92.14,
      source: 'fallback',
    }
  }
}
