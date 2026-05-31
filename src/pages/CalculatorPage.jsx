// src/pages/CalculatorPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useRates } from '../hooks/useRates'
import { COUNTRIES } from '../utils/countries'
import useStore from '../store/useStore'
import { logout } from '../services/authService'

export default function CalculatorPage() {
  const navigate = useNavigate()
  const { rates, bcvRate, ratesLoading } = useRates()
  const { setCalcResult } = useStore()

  const [selected, setSelected] = useState(null)
  const [amount, setAmount] = useState('')
  const [result, setResult] = useState(null)

  // Recalculate when amount or country changes
  useEffect(() => {
    if (!selected || !amount || !rates) {
      setResult(null)
      return
    }
    const num = parseFloat(amount)
    if (isNaN(num) || num <= 0) {
      setResult(null)
      return
    }
    const rate = rates[selected.rateKey] ?? 0
    const totalBs = num * rate
    const totalUsd = totalBs / bcvRate
    setResult({ totalBs, totalUsd, rate, amount: num })
  }, [amount, selected, rates, bcvRate])

  function handleContinue() {
    if (!result || !selected) return
    setCalcResult({
      country: selected.name,
      flag: selected.flag,
      currency: selected.currency,
      rate: result.rate,
      amount: result.amount,
      totalBs: result.totalBs,
      totalUsd: result.totalUsd,
    })
    navigate('/formulario')
  }

  return (
    <div className="min-h-screen bg-black flex flex-col max-w-lg mx-auto">
      <Header />

      {/* Logout */}
      <div className="flex justify-end px-5 pt-2">
        <button
          className="text-[11px] text-[#555] hover:text-[#888] transition-colors"
          onClick={() => logout()}
        >
          Cerrar sesión
        </button>
      </div>

      <div className="flex-1 px-5 py-4 flex flex-col gap-5">
        {/* Country selector */}
        <div>
          <p className="label-sm mb-3">Selecciona el país de origen</p>
          <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
            {COUNTRIES.map((country) => (
              <button
                key={country.name}
                onClick={() => {
                  setSelected(country)
                  setAmount('')
                }}
                className={`
                  card-dark p-3 flex items-center gap-2.5 text-left transition-all duration-150
                  ${selected?.name === country.name
                    ? 'border-gold bg-[rgba(245,200,66,0.06)]'
                    : 'hover:border-[#444]'
                  }
                `}
              >
                <span className="text-2xl">{country.flag}</span>
                <div>
                  <div className="text-[13px] font-medium text-white">{country.name}</div>
                  <div className="text-[11px] text-[#666]">{country.currency}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Amount input */}
        {selected && (
          <div>
            <p className="label-sm mb-2">¿Cuánto envías?</p>
            <div className="card-dark rounded-2xl p-4 flex items-center gap-3">
              <div className="bg-[rgba(245,200,66,0.1)] border border-[rgba(245,200,66,0.2)] rounded-lg px-3 py-2 font-syne font-bold text-base text-gold min-w-[56px] text-center">
                {selected.currency}
              </div>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 bg-transparent border-none text-4xl font-light text-white placeholder-[#2a2a2a]"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="card-dark rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-center border-b border-[#2a2a2a] pb-3">
              <span className="text-sm text-[#888]">Tasa Multipower</span>
              <span className="font-syne font-semibold text-sm text-white">
                1 {selected.currency} = Bs. {result.rate}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-[#2a2a2a] pb-3">
              <span className="text-sm text-[#888]">Total en Bolívares</span>
              <span className="font-syne font-bold text-2xl text-gold">
                Bs. {result.totalBs.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#888]">Equivalente USD (BCV)</span>
              <span className="font-syne font-bold text-lg text-fire">
                $ {result.totalUsd.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {ratesLoading && (
          <p className="text-xs text-center text-[#555]">Actualizando tasas...</p>
        )}

        {/* CTA */}
        {result && (
         <button
  className="
    w-full
    bg-gradient-to-r
    from-orange-500
    to-yellow-400
    hover:from-orange-400
    hover:to-yellow-300
    text-black
    font-bold
    py-4
    rounded-2xl
    shadow-lg
    shadow-orange-500/20
    transition-all
    duration-300
    hover:scale-[1.02]
    active:scale-[0.98]
  "
>
  <span>📋</span>
  Completar solicitud
</button>
        )}
      </div>
    </div>
  )
}
