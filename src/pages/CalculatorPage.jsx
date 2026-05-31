import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useStore from '../store/useStore'
import { COUNTRIES } from '../utils/countries'
import { useRates } from '../hooks/useRates'

export default function CalculatorPage() {
  const navigate = useNavigate()
  function handleLogout() {
  localStorage.removeItem('🔥 Inversiones Multipower-auth')

  navigate('/login')
}
const { setCalcResult } = useStore()
  const { rates, bcvRate } = useRates()

  const [selected, setSelected] = useState(COUNTRIES[0])
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] =
  useState('transferencia')
  
  const rate = useMemo(() => {
  if (!selected || !rates) return 0

  const baseRate = Number(
    rates[selected.rateKey] || 0
  )

  if (paymentMethod === 'pagomovil') {
    return baseRate - 0.0003
  }

  return baseRate
}, [selected, rates, paymentMethod])

  const totalBs = useMemo(() => {
    return Number(amount || 0) * rate
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
            <h1 className="text-lg md:text-4xl font-black text-yellow-400">
              Multipower
            </h1>

            <p className="text-gray-400 text-lg">
              Recargas • Remesas • Inversiones
            </p>
          </div>

          <div
  className="
    bg-gradient-to-br
    from-[#161616]
    to-[#0d0d0d]
    border
    border-yellow-500/30
    rounded-3xl
    px-6
    py-4
    shadow-2xl
    shadow-yellow-500/10
    relative
    overflow-hidden
  "
>
  <div className="
    absolute
    top-0
    right-0
    w-24
    h-24
    bg-yellow-500/10
    blur-3xl
  " />

  <div className="relative z-10">

    <div className="
      text-yellow-400
      font-black
      text-xl md:text-4xl
      tracking-tight
    ">
      Bs. {bcvRate?.toFixed(2)}
    </div>

    <div className="
      flex
      items-center
      gap-2
      mt-1
    ">
      <span className="text-green-400 text-sm">
        ●
      </span>

      <span className="
        text-gray-300
        text-sm
        uppercase
        tracking-wider
      ">
        Banco Central de Venezuela
      </span>
    </div>
  </div>
</div>
<button
  onClick={handleLogout}
  className="
    ml-4
    bg-[#111]
    border
    border-red-500/20
    hover:border-red-500/50
    text-red-400
    hover:text-red-300
    rounded-2xl
    px-5
    py-4
    transition-all
    duration-300
    text-lg
    font-semibold
  "
>
  ↩ Salir
</button>
        </div>

        {/* COUNTRIES */}
        <div className="mb-10">
          <h2 className="text-gray-400 uppercase tracking-wide [4px] text-sm mb-5">
            Selecciona el país de origen
          </h2>

          <div className="mb-8">
  <label className="block text-gray-400 text-sm mb-3 tracking-wider">
    🌎 PAÍS DE ORIGEN
  </label>

  <select
    value={selected?.name || ''}
    onChange={(e) => {
      const country = COUNTRIES.find(
        (c) => c.name === e.target.value
      )

      setSelected(country)
    }}
    className="
      w-full
      bg-[#111]
      border
      border-[#222]
      rounded-2xl
      p-5
      text-2xl
      font-bold
      text-white
      outline-none
      focus:border-yellow-500
      transition-all
      duration-300
      shadow-lg
    "
  >
    <option value="">
      Selecciona un país
    </option>

    {COUNTRIES.map((country) => (
      <option
        key={country.name}
        value={country.name}
      >
        {country.flag} {country.name}
      </option>
    ))}
  </select>
</div>
</div>
{/* AMOUNT */}
<div className="mb-8">

  <label className="block text-gray-400 text-sm mb-3 tracking-wider">
    💰 MONTO A ENVIAR
  </label>

  <div
    className="
      flex
      items-center
      bg-[#111]
      border
      border-[#222]
      rounded-2xl
      overflow-hidden
      shadow-lg
    "
  >

    <div
      className="
        px-5
        py-4
        bg-[#181818]
        border-r
        border-[#222]
        text-yellow-400
        text-2xl
        font-black
      "
    >
      {selected.currency}
    </div>

    <input
      type="number"
      value={amount}
      onChange={(e) =>
        setAmount(e.target.value)
      }
      className="
        w-full
        bg-transparent
        px-5
        py-4
        text-3xl
        md:text-5xl
        font-light
        outline-none
        text-white
      "
    />
  </div>
</div>

{/* PAYMENT METHOD */}
<div className="mb-8">

  <label className="block text-gray-400 text-sm mb-3 tracking-wider">
    🏦 MÉTODO DE PAGO EN VENEZUELA
  </label>

  <select
    value={paymentMethod}
    onChange={(e) =>
      setPaymentMethod(e.target.value)
    }
    className="
      w-full
      bg-[#111]
      border
      border-[#222]
      rounded-2xl
      p-4
      text-lg
      text-white
      outline-none
      focus:border-yellow-500
    "
  >
    <option value="transferencia">
      Transferencia bancaria
    </option>

    <option value="pagomovil">
      Pago móvil
    </option>
  </select>
</div>
{/* RESULT */}
<div
  className="
    bg-[#111]
    border
    border-yellow-500/10
    rounded-2xl
    p-5
    md:p-8
    mb-8
    shadow-[0_0_30px_rgba(255,180,0,0.06)]
  "
>

  <div className="flex justify-between items-center gap-4 border-b border-[#222] pb-4 mb-4">
    <span className="text-gray-400 text-lg md:text-4xl">
      Tasa Multipower
    </span>

    <span className="text-white text-lg md:text-4xl font-bold">
      1 {selected.currency} = Bs. {rate.toFixed(4)}
    </span>
  </div>

  <div className="flex justify-between items-center gap-4 border-b border-[#222] pb-4 mb-4">
    <span className="text-gray-400 text-lg md:text-3xl">
      Total en Bolívares
    </span>

    <span className="text-yellow-400 text-2xl md:text-5xl font-black">
      Bs. {totalBs.toLocaleString('es-VE', {
        minimumFractionDigits: 2,
      })}
    </span>
  </div>

  <div className="flex flex-col md:flex-row
md:justify-between
md:items-center
gap-2">
    <span className="text-gray-400 text-lg md:text-3xl">
      Equivalente USD (BCV)
    </span>

    <span className="text-orange-400 text-lg md:text-3xl font-black">
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
  className="
    w-full
    mt-8
    bg-gradient-to-r
    from-orange-500
    to-yellow-400
    hover:from-orange-400
    hover:to-yellow-300
    text-black
    font-black
    text-3xl
    py-6
    rounded-3xl
    shadow-2xl
    shadow-orange-500/20
    transition-all
    duration-300
    hover:scale-[1.01]
    active:scale-[0.98]
  "
>
  📋 Completar solicitud
</button>
      </div>
    </div>
  )
}