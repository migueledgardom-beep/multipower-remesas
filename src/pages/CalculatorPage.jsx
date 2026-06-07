/**
 * CalculatorPage.jsx — Inversiones Multipower
 * Rediseño premium con CountrySelector custom.
 * LÓGICA 100% INTACTA.
 */

import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useStore from '../store/useStore'
import { COUNTRIES } from '../utils/countries'
import { useRates } from '../hooks/useRates'
import CountrySelector from '../components/CountrySelector'

export default function CalculatorPage() {
  const navigate = useNavigate()
  const params = new URLSearchParams(window.location.search)
const ref = params.get('ref') || 'multipower'
const agentName = ref.replace('01', '').toUpperCase()

  const { setCalcResult } = useStore()
  const { rates, bcvRate } = useRates()

  const [originCountry, setOriginCountry] = useState(COUNTRIES[0])
  const [destinationCountry, setDestinationCountry] = useState(COUNTRIES[1])
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('transferencia')

  function handleLogout() {
    localStorage.removeItem('🔥 Inversiones Multipower-auth')
    navigate('/login')
  }

  // ── Países habilitados desde Google Sheets ──────────────────────────────
  const enabledCountries = useMemo(() => {
    if (!rates || Object.keys(rates).length === 0) return COUNTRIES
    return COUNTRIES.filter((country) => {
      const normalizedName = country.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s/g, '')
        .toUpperCase()
      const key = `${normalizedName}_ENABLED`
      const value = String(rates?.[key] || '').replace(',', '').trim().toLowerCase()
      return value === 'true'
    })
  }, [rates])

  // ── Validación ruta inválida ────────────────────────────────────────────
  const isSameCountry = originCountry?.currency === destinationCountry?.currency

  // ── Tasa de cambio dinámica ─────────────────────────────────────────────
  const rate = useMemo(() => {
    if (!originCountry || !destinationCountry || !rates) return 0

    // MISMO PAÍS
    if (originCountry.currency === destinationCountry.currency) return 0

    const rateKey = `${originCountry.currency}_${destinationCountry.currency}_RATE`
    const baseRate = Number(rates?.[rateKey] || 0)

    if (!baseRate) return 0

    // DESCUENTO PAGO MÓVIL
    if (paymentMethod === 'pagomovil' && destinationCountry.currency === 'BS') {
      return baseRate - 0.0003
    }

    return baseRate
  }, [originCountry, destinationCountry, rates, paymentMethod])

  // ── Totales ─────────────────────────────────────────────────────────────
  const totalBs = useMemo(() => Number(amount || 0) * rate, [amount, rate])
  const usdEquivalent = useMemo(() => {
    if (!bcvRate) return 0
    return totalBs / bcvRate
  }, [totalBs, bcvRate])

  const canContinue = !isSameCountry && !!amount && Number(amount) > 0

  return (
    <div
      className="min-h-screen text-gray-900"
      style={{
        background: 'linear-gradient(160deg, #fffdf5 0%, #fff8e1 40%, #fafafa 100%)',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Blob decorativo */}
      <div
        className="pointer-events-none fixed top-0 right-0 w-[420px] h-[420px] opacity-30"
        style={{
          background: 'radial-gradient(circle, #fbbf24 0%, transparent 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-lg mx-auto px-4 pt-6 pb-28">

        {/* ── TOPBAR ─────────────────────────────────────────────────────── */}
        <header className="flex items-center justify-between mb-8">

          {/* Logo + agente */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-md"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #fcd34d)' }}
            >
              🔥
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[3px] uppercase text-amber-500">
                Inversiones
              </p>
              <h1
                className="text-[17px] font-black leading-none text-gray-900"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Multipower
              </h1>
              {agentName && (
                <div
                  className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-sm font-bold"
                >
                  👨‍💼 Atendido por {agentName}
                </div>
              )}
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-50 transition-all duration-200 border border-gray-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>

        </header>

        {/* ── HERO LABEL ─────────────────────────────────────────────────── */}
        <div className="mb-6">
          <h2
            className="text-[28px] font-black text-gray-900 leading-tight"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            ¿Cuánto quieres<span className="text-amber-500"> enviar?</span>
          </h2>
          <p className="text-[13px] text-gray-400 mt-1">
            Tasas en tiempo real • Sin comisiones ocultas
          </p>
        </div>

        {/* ── SELECTOR DE PAÍSES CUSTOM ──────────────────────────────────── */}
        <div
          className="rounded-3xl p-5 mb-4 shadow-sm border"
          style={{ background: '#fff', borderColor: '#f3f4f6', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
        >
          <p className="text-[10px] font-bold tracking-[3px] text-gray-400 uppercase mb-4">
            Ruta de envío
          </p>

          <div className="grid grid-cols-[1fr_40px_1fr] items-end gap-2">
            {/* Origen */}
            <CountrySelector
              label="Origen"
              value={originCountry}
              onChange={setOriginCountry}
              countries={enabledCountries}
            />

            {/* Flecha */}
            <div className="flex justify-center pb-1">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #fcd34d)', boxShadow: '0 4px 12px rgba(245,158,11,0.3)' }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </div>

            {/* Destino */}
            <CountrySelector
              label="Destino"
              value={destinationCountry}
              onChange={setDestinationCountry}
              countries={enabledCountries}
            />
          </div>

          {/* Alerta ruta inválida */}
          {isSameCountry && (
            <div
              className="mt-4 rounded-2xl px-4 py-3 flex items-center gap-2.5"
              style={{ background: '#fef2f2', border: '1px solid #fecaca' }}
            >
              <span className="text-red-400 text-lg">⚠️</span>
              <p className="text-[13px] font-semibold text-red-500">Esta ruta no está disponible</p>
            </div>
          )}
        </div>

        {/* ── INPUT MONTO ────────────────────────────────────────────────── */}
        <div
          className="rounded-3xl p-5 mb-4 border"
          style={{ background: '#fff', borderColor: '#f3f4f6', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
        >
          <p className="text-[10px] font-bold tracking-[3px] text-gray-400 uppercase mb-4">
            Monto a enviar
          </p>
          <div
            className="flex items-center rounded-2xl overflow-hidden border transition-all duration-200"
            style={{ borderColor: '#e5e7eb', background: '#fafafa' }}
          >
            <div
              className="flex-shrink-0 px-4 py-4 flex items-center gap-2 border-r"
              style={{ background: 'linear-gradient(135deg, #fff8e1, #fef3c7)', borderColor: '#e5e7eb' }}
            >
              <span className="text-xl">{originCountry?.flag}</span>
              <span className="text-[13px] font-black text-amber-600 tracking-wide">
                {originCountry?.currency}
              </span>
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="flex-1 bg-transparent px-5 py-4 text-[36px] font-black outline-none text-gray-900 w-full"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>
          {!isSameCountry && rate > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <span
                className="text-[11px] font-semibold px-3 py-1 rounded-full"
                style={{ background: '#fef3c7', color: '#92400e' }}
              >
                Tasa Multipower: 1 {originCountry?.currency} = {destinationCountry?.currency} {rate.toFixed(4)}
              </span>
            </div>
          )}
        </div>

        {/* ── MÉTODO DE PAGO ─────────────────────────────────────────────── */}
        <div
          className="rounded-3xl p-5 mb-4 border"
          style={{ background: '#fff', borderColor: '#f3f4f6', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
        >
          <p className="text-[10px] font-bold tracking-[3px] text-gray-400 uppercase mb-4">
            Método de pago en Venezuela
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'transferencia', label: 'Transferencia', icon: '🏦' },
              { value: 'pagomovil', label: 'Pago móvil', icon: '📱' },
            ].map((method) => (
              <button
                key={method.value}
                onClick={() => setPaymentMethod(method.value)}
                className="flex items-center gap-3 rounded-2xl px-4 py-3.5 border transition-all duration-200 text-left"
                style={{
                  background: paymentMethod === method.value ? 'linear-gradient(135deg, #fef3c7, #fde68a)' : '#fafafa',
                  borderColor: paymentMethod === method.value ? '#f59e0b' : '#e5e7eb',
                  boxShadow: paymentMethod === method.value ? '0 4px 16px rgba(245,158,11,0.2)' : 'none',
                }}
              >
                <span className="text-xl">{method.icon}</span>
                <span
                  className="text-[13px] font-bold"
                  style={{ color: paymentMethod === method.value ? '#92400e' : '#6b7280' }}
                >
                  {method.label}
                </span>
                {paymentMethod === method.value && (
                  <span
                    className="ml-auto w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: '#f59e0b' }}
                  >
                    <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                      <polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── RESULTADO ──────────────────────────────────────────────────── */}
        {!isSameCountry && Number(amount) > 0 && rate > 0 && (
          <div
            className="rounded-3xl p-6 mb-6 border relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #111 100%)',
              borderColor: 'rgba(251,191,36,0.2)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
            }}
          >
            <div
              className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />

            <p className="text-[10px] font-bold tracking-[3px] text-amber-300 uppercase mb-5 relative z-10">
              Resumen de envío
            </p>

            <div className="relative z-10 mb-5">
              <p className="text-[12px] text-gray-300 mb-1">Total que recibe</p>
              <p
                className="text-[42px] font-black text-[#ffd166] leading-none"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {totalBs.toLocaleString('es-VE', { minimumFractionDigits: 2 })}
                <span className="text-[20px] ml-2 text-[#ffb703]">
                  {destinationCountry?.currency}
                </span>
              </p>
            </div>

            <div className="border-t border-white/10 mb-4 relative z-10" />

            <div className="space-y-3 relative z-10">
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-gray-300">Monto enviado</span>
                <span className="text-[13px] font-bold text-white">
                  {Number(amount).toLocaleString('es-VE')} {originCountry?.currency}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[12px] text-gray-300">Tasa aplicada</span>
                <span
                  className="text-[12px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }}
                >
                  × {rate.toFixed(4)}
                </span>
              </div>

              {destinationCountry?.currency === 'BS' && usdEquivalent > 0 && (
                <div className="flex justify-between items-center pt-1 border-t border-white/10">
                  <span className="text-[12px] text-gray-300">Equiv. USD (BCV)</span>
                  <span className="text-[14px] font-black text-emerald-400">
                    ${usdEquivalent.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── BOTÓN CTA ──────────────────────────────────────────────────── */}
        <button
          disabled={!canContinue}
          onClick={() => {
            setCalcResult({
  flag: destinationCountry.flag,
  country: destinationCountry.name,

  originCurrency:
    originCountry.currency,

  destinationCurrency:
    destinationCountry.currency,

  amount,
  rate,
  totalBs,

  ref,
  paymentMethod,
})
            navigate('/formulario')
          }}
          className="w-full rounded-3xl py-5 text-[17px] font-black transition-all duration-300"
          style={{
            background: canContinue
              ? 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)'
              : '#e5e7eb',
            color: canContinue ? '#1a0a00' : '#9ca3af',
            boxShadow: canContinue
              ? '0 8px 32px rgba(245,158,11,0.4), 0 2px 8px rgba(245,158,11,0.2)'
              : 'none',
            fontFamily: "'DM Sans', sans-serif",
            cursor: canContinue ? 'pointer' : 'not-allowed',
          }}
          onMouseEnter={(e) => { if (canContinue) e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
        >
          {canContinue ? '📋 Completar solicitud →' : 'Ingresa un monto para continuar'}
        </button>

        <p className="text-center text-[11px] text-gray-300 mt-6">
          Tasas actualizadas en tiempo real • Operación segura
        </p>

      </div>
    </div>
  )
}
