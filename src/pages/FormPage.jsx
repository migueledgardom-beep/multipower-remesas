/**
 * FormPage.jsx — Inversiones Multipower
 * Rediseño visual premium consistente con CalculatorPage.
 * LÓGICA 100% INTACTA.
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useStore from '../store/useStore'
import { BANKS_BY_COUNTRY } from '../utils/countries'
import { buildWhatsAppMessage, openWhatsApp } from '../utils/whatsapp'
import { saveOperation } from '../services/operationsService'

/* ─── Sub-componente: Input field premium ─────────────────────────────── */
function PremiumInput({ label, icon, placeholder, value, onChange, type = 'text' }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      {label && (
        <p className="text-[10px] font-bold tracking-[3px] text-gray-400 uppercase mb-2">
          {icon} {label}
        </p>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full rounded-2xl px-4 py-4 text-[15px] font-semibold outline-none border transition-all duration-200 text-gray-800 placeholder-gray-300"
        style={{
          background: focused ? '#fff' : '#fafafa',
          borderColor: focused ? '#f59e0b' : '#e5e7eb',
          boxShadow: focused ? '0 0 0 3px rgba(245,158,11,0.12)' : 'none',
          fontFamily: "'Outfit', sans-serif",
        }}
      />
    </div>
  )
}

/* ─── Sub-componente: Select premium ─────────────────────────────────── */
function PremiumSelect({ label, icon, value, onChange, options, placeholder }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      {label && (
        <p className="text-[10px] font-bold tracking-[3px] text-gray-400 uppercase mb-2">
          {icon} {label}
        </p>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full appearance-none rounded-2xl px-4 py-4 text-[15px] font-semibold outline-none border transition-all duration-200 cursor-pointer"
          style={{
            background: focused ? '#fff' : '#fafafa',
            borderColor: focused ? '#f59e0b' : '#e5e7eb',
            boxShadow: focused ? '0 0 0 3px rgba(245,158,11,0.12)' : 'none',
            fontFamily: "'Outfit', sans-serif",
            color: value ? '#1f2937' : '#9ca3af',
            paddingRight: '40px',
          }}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </div>
  )
}

/* ─── Componente principal ────────────────────────────────────────────── */
export default function FormPage() {
  const navigate = useNavigate()
  const { calcResult } = useStore()

  useEffect(() => {
    if (!calcResult) navigate('/')
  }, [calcResult, navigate])

  useEffect(() => {}, [calcResult, navigate])

  const [form, setForm] = useState({
    bank: '',
    account: '',
    name: '',
    cedula: '',
    phone: '',
  })

  const flag     = calcResult?.flag     || ''
  const country  = calcResult?.country  || ''
  const currency = calcResult?.currency || ''
  const amount   = calcResult?.amount   || 0
  const totalBs  = calcResult?.totalBs  || 0
  const rate     = calcResult?.rate     || 0
  const availableBanks =
  BANKS_BY_COUNTRY[country] || ['Otro']
  const countryConfig = {
  Venezuela: {
    accountLabel: 'Número de cuenta',
    accountPlaceholder: '0000-0000-00-0000000000',
    phoneLabel: 'Teléfono',
    phonePlaceholder: '0412xxxxxxx',
    documentLabel: 'Cédula',
  },

  Chile: {
    accountLabel: 'Cuenta bancaria',
    accountPlaceholder: 'Ej: 12345678',
    phoneLabel: 'Teléfono',
    phonePlaceholder: '+56 9 1234 5678',
    documentLabel: 'RUT',
  },

  Colombia: {
    accountLabel: 'Cuenta / Nequi',
    accountPlaceholder: 'Número de cuenta o Nequi',
    phoneLabel: 'Teléfono',
    phonePlaceholder: '+57 3001234567',
    documentLabel: 'Cédula',
  },

  Perú: {
    accountLabel: 'Cuenta bancaria',
    accountPlaceholder: 'Número de cuenta',
    phoneLabel: 'Teléfono',
    phonePlaceholder: '+51 999999999',
    documentLabel: 'DNI',
  },

  México: {
    accountLabel: 'CLABE',
    accountPlaceholder: '18 dígitos',
    phoneLabel: 'Teléfono',
    phonePlaceholder: '+52 55 1234 5678',
    documentLabel: 'CURP / INE',
  },

  Argentina: {
    accountLabel: 'CBU / Alias',
    accountPlaceholder: 'CBU o Alias',
    phoneLabel: 'Teléfono',
    phonePlaceholder: '+54 11 1234 5678',
    documentLabel: 'DNI',
  },

  Brasil: {
    accountLabel: 'PIX',
    accountPlaceholder: 'Clave PIX',
    phoneLabel: 'Teléfono',
    phonePlaceholder: '+55 11 99999 9999',
    documentLabel: 'CPF',
  },

  España: {
    accountLabel: 'IBAN',
    accountPlaceholder: 'ES00 0000 0000 0000',
    phoneLabel: 'Teléfono',
    phonePlaceholder: '+34 600 000 000',
    documentLabel: 'DNI/NIE',
  },
}

const formConfig =
  countryConfig[country] ||
  countryConfig.Venezuela

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit() {

  const message = buildWhatsAppMessage({
    amount,
    currency:
      calcResult?.originCurrency,

    totalBs,

    destinationCurrency:
      calcResult?.destinationCurrency,

    formData: form,
  })

  const ref =
    calcResult?.ref || 'multipower'

  await saveOperation({
    ref,

    agent:
      ref
        .replace('01', '')
        .toUpperCase(),

    origin:
      calcResult?.originCountry || '',

    destination:
      country,

    amount,

    originCurrency:
      calcResult?.originCurrency,

    totalReceived:
      totalBs,

    destinationCurrency:
      calcResult?.destinationCurrency,

    paymentMethod:
      calcResult?.paymentMethod,

    bank:
      form.bank,

    name:
      form.name,

    phone:
      form.phone,
  })

  openWhatsApp(message, ref)

  navigate('/exito')
}

  const isComplete =
    form.bank && form.account && form.name && form.cedula && form.phone

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
        style={{ background: 'radial-gradient(circle, #fbbf24 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }}
      />

      <div className="relative z-10 max-w-lg mx-auto px-4 pt-6 pb-28">

        {/* ── TOPBAR ─────────────────────────────────────────────────────── */}
        <header className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="w-9 h-9 rounded-xl flex items-center justify-center border border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-white transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base shadow-sm"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #fcd34d)' }}>
              🔥
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[3px] uppercase text-amber-500 leading-none">Inversiones</p>
              <h1 className="text-[15px] font-black leading-none text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Multipower
              </h1>
            </div>
          </div>

          {/* Step indicator */}
          <div className="ml-auto flex items-center gap-2">
            <div className="flex gap-1.5 items-center">
              <div className="w-6 h-1.5 rounded-full" style={{ background: '#fde68a' }} />
              <div className="w-6 h-1.5 rounded-full" style={{ background: '#f59e0b' }} />
              <div className="w-6 h-1.5 rounded-full" style={{ background: '#e5e7eb' }} />
            </div>
            <span className="text-[11px] text-gray-400 font-semibold">2 / 3</span>
          </div>
        </header>

        {/* ── HERO ──────────────────────────────────────────────────────── */}
<div className="mb-6">
  <div className="flex items-center gap-3 mb-2">
    <span className="text-3xl">{flag}</span>

    <h2
      className="text-[26px] font-black text-[#ffd166] leading-tight"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {country}
    </h2>
  </div>

  <p className="text-[13px] font-black text-[#ffd166]">
    Completa los datos del beneficiario
  </p>
</div>
:::


        {/* ── RESUMEN DE OPERACIÓN ───────────────────────────────────────── */}
        <div className="rounded-3xl p-4 mb-5 flex items-center justify-between border"
          style={{
            background: 'linear-gradient(135deg, #1a1a1a, #111)',
            borderColor: 'rgba(251,191,36,0.2)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          }}>
          <div>
            <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">Enviando</p>
            <p className="text-[18px] font-black text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {Number(amount).toLocaleString('es-VE')} <span className="text-amber-500">{currency}</span>
            </p>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(251,191,36,0.5)" strokeWidth="2" strokeLinecap="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
          <div className="text-right">
            <p className="text-[10px] font-semibold tracking-widest text-[#ffb703] uppercase">Recibe</p>
            <p className="text-[18px] font-black text-[#ffb703]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {Number(totalBs).toLocaleString('es-VE', { minimumFractionDigits: 2 })} <span className="text-[13px]">{calcResult?.currency}</span>
            </p>
          </div>
        </div>

        {/* ── DATOS BANCARIOS ────────────────────────────────────────────── */}
        <div className="rounded-3xl p-5 mb-4 border"
          style={{ background: '#fff', borderColor: '#f3f4f6', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <p className="text-[10px] font-bold tracking-[3px] text-gray-400 uppercase mb-5">Datos bancarios</p>
          <div className="space-y-4">
            <PremiumSelect
              label="Banco"
              icon="🏦"
              placeholder="Selecciona el banco"
              value={form.bank}
              onChange={(v) => updateField('bank', v)}
              options={availableBanks}
            />
            <PremiumInput
              label={formConfig.accountLabel}
              icon="💳"
              placeholder={formConfig.accountPlaceholder}
              value={form.account}
              onChange={(v) => updateField('account', v)}
            />
          </div>
        </div>

        {/* ── DATOS DEL BENEFICIARIO ─────────────────────────────────────── */}
        <div className="rounded-3xl p-5 mb-6 border"
          style={{ background: '#fff', borderColor: '#f3f4f6', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <p className="text-[10px] font-bold tracking-[3px] text-gray-400 uppercase mb-5">Datos del beneficiario</p>
          <div className="space-y-4">
            <PremiumInput
              label="Nombre y apellido"
              icon="👤"
              placeholder="Ej: María González"
              value={form.name}
              onChange={(v) => updateField('name', v)}
            />
            <PremiumInput
              label={formConfig.documentLabel}
              icon="🪪"
              placeholder="V-12345678"
              value={form.cedula}
              onChange={(v) => updateField('cedula', v)}
            />
            <PremiumInput
              label={formConfig.phoneLabel}
              icon="📱"
              placeholder={formConfig.phonePlaceholder}
              value={form.phone}
              onChange={(v) => updateField('phone', v)}
              type="tel"
            />
          </div>
        </div>

        {/* ── BOTÓN ENVIAR ───────────────────────────────────────────────── */}
        <button
          onClick={handleSubmit}
          disabled={!isComplete}
          className="w-full rounded-3xl py-5 text-[17px] font-black transition-all duration-300"
          style={{
            background: isComplete
              ? 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)'
              : '#e5e7eb',
            color: isComplete ? '#1a0a00' : '#9ca3af',
            boxShadow: isComplete
              ? '0 8px 32px rgba(245,158,11,0.4), 0 2px 8px rgba(245,158,11,0.2)'
              : 'none',
            fontFamily: "'DM Sans', sans-serif",
            cursor: isComplete ? 'pointer' : 'not-allowed',
          }}
          onMouseEnter={(e) => { if (isComplete) e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
        >
          🚀 Enviar solicitud por WhatsApp →
        </button>

        {/* Disclaimer */}
        <div className="mt-5 flex items-start gap-2.5 rounded-2xl px-4 py-3"
          style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <span className="text-emerald-500 text-sm flex-shrink-0 mt-0.5">🔒</span>
          <p className="text-[11px] text-emerald-700 leading-relaxed">
            Tu solicitud se enviará directamente a un asesor de Multipower por WhatsApp. Proceso seguro y confidencial.
          </p>
        </div>

      </div>
    </div>
  )
}
