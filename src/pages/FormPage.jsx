// src/pages/FormPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { buildWhatsAppMessage, openWhatsApp } from '../utils/whatsapp'
import { BANKS } from '../utils/countries'
import useStore from '../store/useStore'

export default function FormPage() {
  const navigate = useNavigate()
  const { calcResult } = useStore()

  const [form, setForm] = useState({
    bank: '',
    account: '',
    name: '',
    cedula: '',
    phone: '',
  })
  const [fileName, setFileName] = useState(null)
  const [error, setError] = useState('')

  // Redirect if no calc result
  if (!calcResult) {
    navigate('/')
    return null
  }

  const { country, flag, currency, amount, rate, totalBs } = calcResult

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleFile(e) {
    if (e.target.files?.[0]) {
      setFileName(e.target.files[0].name)
    }
  }

  function validate() {
    const { bank, account, name, cedula, phone } = form
    if (!bank || !account || !name || !cedula || !phone) {
      setError('Por favor completa todos los campos obligatorios')
      return false
    }
    setError('')
    return true
  }

  function handleSend() {
    if (!validate()) return
    const message = buildWhatsAppMessage({
      country,
      amount,
      currency,
      rate,
      totalBs,
      formData: form,
    })
    openWhatsApp(message)
    navigate('/exito', { state: { message } })
  }

  return (
    <div className="min-h-screen bg-black flex flex-col max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2a2a]">
        <button
          className="text-sm text-[#666] hover:text-gold transition-colors flex items-center gap-1"
          onClick={() => navigate('/')}
        >
          ← Volver
        </button>
        <span className="font-syne font-bold text-base text-white">Datos del envío</span>
        <div className="w-16" />
      </div>

      <div className="flex-1 px-5 py-4 flex flex-col gap-4 overflow-y-auto pb-32">
        {/* Summary */}
        <div className="bg-[rgba(245,200,66,0.05)] border border-[rgba(245,200,66,0.15)] rounded-2xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#888]">País origen</span>
            <span className="text-white font-medium">{flag} {country}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#888]">Monto enviado</span>
            <span className="text-white font-medium">{amount.toLocaleString()} {currency}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#888]">Tasa Multipower</span>
            <span className="text-white font-medium">1 {currency} = Bs. {rate}</span>
          </div>
          <div className="flex justify-between text-sm pt-1 border-t border-[rgba(245,200,66,0.15)]">
            <span className="text-gold font-medium">Total Bolívares</span>
            <span className="text-gold font-bold text-base">
              Bs. {totalBs.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Bank */}
        <div>
          <label className="label-sm">Banco receptor *</label>
          <select
            className="input-field"
            value={form.bank}
            onChange={(e) => updateField('bank', e.target.value)}
          >
            <option value="">Seleccionar banco</option>
            {BANKS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Account */}
        <div>
          <label className="label-sm">Número de cuenta *</label>
          <input
            type="text"
            className="input-field"
            placeholder="0102-XXXX-XX-XXXXXXXXXX"
            value={form.account}
            onChange={(e) => updateField('account', e.target.value)}
            maxLength={30}
          />
        </div>

        {/* Name */}
        <div>
          <label className="label-sm">Nombre del beneficiario *</label>
          <input
            type="text"
            className="input-field"
            placeholder="Nombre completo"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
          />
        </div>

        {/* Cedula */}
        <div>
          <label className="label-sm">Cédula *</label>
          <input
            type="text"
            className="input-field"
            placeholder="V-12345678"
            value={form.cedula}
            onChange={(e) => updateField('cedula', e.target.value)}
            maxLength={12}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="label-sm">Teléfono del beneficiario *</label>
          <input
            type="tel"
            className="input-field"
            placeholder="+58 412 0000000"
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            maxLength={16}
          />
        </div>

        {/* File upload */}
        <div>
          <label className="label-sm">Capture de transferencia</label>
          <label
            className={`block border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors ${
              fileName
                ? 'border-green-600 text-green-500'
                : 'border-[#2a2a2a] text-[#666] hover:border-[#444]'
            }`}
          >
            <div className="text-2xl mb-2">{fileName ? '✓' : '📎'}</div>
            <div className="text-sm font-medium">{fileName ?? 'Toca para adjuntar capture'}</div>
            <div className="text-xs mt-1 opacity-60">JPG, PNG o PDF</div>
            <input
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleFile}
            />
          </label>
          <p className="text-xs text-[#555] mt-1.5">
            La imagen se adjuntará manualmente en WhatsApp
          </p>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-black border-t border-[#2a2a2a] px-5 py-4">
        <button className="btn-green w-full" onClick={handleSend}>
          <span className="text-xl">💬</span>
          Enviar por WhatsApp
        </button>
      </div>
    </div>
  )
}
