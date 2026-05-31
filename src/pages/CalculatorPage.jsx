import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useStore from '../store/useStore'
import { COUNTRIES } from '../utils/countries'
import { useRates } from '../hooks/useRates'

export default function CalculatorPage() {
  const navigate = useNavigate()
const { setCalcResult } = useStore()
  const { rates, bcvRate } = useRates()

  const [selected, setSelected] = useState(COUNTRIES[0])
  const [amount, setAmount] = useState(10000)

  const rate = useMemo(() => {
    if (!selected || !rates) return 0

    return Number(rates[selected.rateKey] || 0)
  }, [selected, rates])

  const totalBs = useMemo(() => {
    return amount * rate
  }, [amount, rate])

  const usdEquivalent = useMemo(() => {
    if (!bcvRate) return 0

    return totalBs / bcvRate
  }, [totalBs, bcvRate])

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      <div className="max-w-2xl mx-auto">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-black text-yellow-400">
              Multipower
            </h1>

            <p className="text-gray-400 text-lg">
              Remesas Internacionales
            </p>
          </div>

          <div className="bg-[#111] border border-yellow-500/20 rounded-2xl px-5 py-3">
            <div className="text-yellow-400 font-bold text-2xl">
              Bs. {bcvRate?.toFixed(2)}
            </div>

            <div className="text-gray-400 text-sm">
              Tasa BCV
            </div>
          </div>
        </div>

        {/* COUNTRIES */}
        <div className="mb-10">
          <h2 className="text-gray-400 uppercase tracking-[4px] text-sm mb-5">
            Selecciona el país de origen
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {COUNTRIES.map((country) => (
              <button
                key={country.name}
                onClick={() => setSelected(country)}
                className={
                  selected?.name === country.name
                    ? 'border border-yellow-500 bg-[#15120a] rounded-2xl p-5 text-left transition-all duration-200'
                    : 'border border-[#222] bg-[#111] rounded-2xl p-5 text-left transition-all duration-200'
                }
              >
                <div className="text-5xl font-black text-white mb-2">
                  {country.currency}
                </div>

                <div className="text-3xl font-bold text-white">
                  {country.name}
                </div>

                <div className="text-lg text-gray-400">
                  {country.currency}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* AMOUNT */}
        <div className="mb-10">
          <h2 className="text-gray-400 uppercase tracking-[4px] text-sm mb-5">
            ¿Cuánto envías?
          </h2>

          <div className="bg-[#111] border border-[#222] rounded-3xl p-5">
            <div className="flex items-center overflow-hidden rounded-2xl border border-yellow-500/20">
              
              <div className="bg-yellow-500/10 px-6 py-5 text-5xl font-black text-yellow-400">
                {selected?.currency || '---'}
              </div>

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-transparent px-6 py-5 text-6xl text-white outline-none"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* RESULT */}
        <div className="bg-[#111] border border-[#222] rounded-3xl p-8 mb-8">
          
          <div className="flex justify-between items-center border-b border-[#222] pb-5 mb-5">
            <span className="text-gray-400 text-2xl">
              Tasa Multipower
            </span>

            <span className="text-white text-2xl font-bold">
              1 {selected.currency} = Bs. {rate.toFixed(3)}
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-[#222] pb-5 mb-5">
            <span className="text-gray-400 text-3xl">
              Total en Bolívares
            </span>

            <span className="text-yellow-400 text-6xl font-black">
              Bs. {totalBs.toLocaleString('es-VE', {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-2xl">
              Equivalente USD (BCV)
            </span>

            <span className="text-orange-400 text-5xl font-black">
              ${usdEquivalent.toFixed(2)}
            </span>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => {
  setCalcResult({
    flag: selected.flag,
    country: selected.name,
    currency: selected.currency,
    amount,
    rate,
    totalBs,
  })

  navigate('/formulario')
}}
        >
          📋 Completar solicitud
        </button>
      </div>
    </div>
  )
}