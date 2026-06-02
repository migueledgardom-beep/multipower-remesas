import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useStore from '../store/useStore'
import { BANKS } from '../utils/countries'
import {
  buildWhatsAppMessage,
  openWhatsApp,
} from '../utils/whatsapp'

export default function FormPage() {
  const navigate = useNavigate()
  const { calcResult } = useStore()
useEffect(() => {
  if (!calcResult) {
    navigate('/')
  }
}, [calcResult, navigate])
  useEffect(() => {
   
  }, [calcResult, navigate])

  const [form, setForm] = useState({
    bank: '',
    account: '',
    name: '',
    cedula: '',
    phone: '',
  })

  const flag = calcResult?.flag || ''
  const country = calcResult?.country || ''
  const currency = calcResult?.currency || ''
  const amount = calcResult?.amount || 0
  const totalBs = calcResult?.totalBs || 0
  const rate = calcResult?.rate || 0

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  function handleSubmit() {
    const message = buildWhatsAppMessage({
      country,
      amount,
      currency,
      rate,
      totalBs,
      formData: form,
    })

    const params = new URLSearchParams(
  window.location.search
)

const ref =
  params.get('ref') || 'multipower'

openWhatsApp(message, ref)

    navigate('/exito')
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      <div className="max-w-2xl mx-auto">

        <button
          onClick={() => navigate('/')}
          className="text-gray-400 mb-8 hover:text-white transition"
        >
          ← Volver
        </button>

        <div className="mb-10">
          <h1 className="text-5xl font-black text-yellow-400 mb-3">
            {flag} {country}
          </h1>

          <p className="text-gray-400 text-xl">
            Completa los datos bancarios
          </p>
        </div>

        <div className="space-y-5">

          <select
            value={form.bank}
            onChange={(e) => updateField('bank', e.target.value)}
            className="w-full bg-[#111] border border-[#222] rounded-2xl p-5 text-2xl outline-none"
          >
            <option value="">Selecciona banco</option>

            {BANKS.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Número de cuenta"
            value={form.account}
            onChange={(e) => updateField('account', e.target.value)}
            className="w-full bg-[#111] border border-[#222] rounded-2xl p-5 text-2xl outline-none"
          />

          <input
            type="text"
            placeholder="Nombre y apellido"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full bg-[#111] border border-[#222] rounded-2xl p-5 text-2xl outline-none"
          />

          <input
            type="text"
            placeholder="Cédula"
            value={form.cedula}
            onChange={(e) => updateField('cedula', e.target.value)}
            className="w-full bg-[#111] border border-[#222] rounded-2xl p-5 text-2xl outline-none"
          />

          <input
            type="text"
            placeholder="Teléfono"
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full bg-[#111] border border-[#222] rounded-2xl p-5 text-2xl outline-none"
          />

          <button
            onClick={handleSubmit}
            className="
              w-full
              bg-gradient-to-r
              from-orange-500
              to-yellow-400
              text-black
              font-black
              text-2xl
              py-5
              rounded-3xl
            "
          >
            🚀 Enviar solicitud
          </button>
        </div>
      </div>
    </div>
  )
}