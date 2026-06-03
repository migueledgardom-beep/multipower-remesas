/**
 * CountrySelector.jsx — Selector premium de países estilo Wise/Binance
 * Lógica intacta: usa originCountry, destinationCountry, enabledCountries, setters
 */

import { useState, useRef, useEffect } from 'react'

export default function CountrySelector({ value, onChange, countries, label }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef(null)

  // Cierre al hacer click afuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.currency.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="relative" ref={ref}>
      {label && (
        <p className="text-[10px] font-bold tracking-[3px] text-gray-400 uppercase mb-2">
          {label}
        </p>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => { setOpen((o) => !o); setSearch('') }}
        className="w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 border transition-all duration-200 text-left"
        style={{
          background: open ? '#fff' : '#fafafa',
          borderColor: open ? '#f59e0b' : '#e5e7eb',
          boxShadow: open ? '0 0 0 3px rgba(245,158,11,0.12)' : 'none',
        }}
      >
        <span className="text-2xl flex-shrink-0">{value?.flag}</span>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-bold text-gray-800 truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {value?.name}
          </p>
        </div>
        <span
          className="text-[11px] font-black tracking-wide px-2 py-0.5 rounded-lg flex-shrink-0"
          style={{ background: '#fef3c7', color: '#92400e' }}
        >
          {value?.currency}
        </span>
        <svg
          className="flex-shrink-0 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {/* Dropdown flotante */}
      {open && (
        <div
          className="absolute left-0 right-0 mt-2 rounded-2xl border overflow-hidden z-50"
          style={{
            background: '#fff',
            borderColor: '#f3f4f6',
            boxShadow: '0 16px 48px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)',
          }}
        >
          {/* Search */}
          <div className="p-3 border-b" style={{ borderColor: '#f3f4f6' }}>
            <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ background: '#f9fafb' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                autoFocus
                type="text"
                placeholder="Buscar país..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-[13px] outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Lista con scroll */}
          <div className="overflow-y-auto" style={{ maxHeight: '220px' }}>
            {filtered.length === 0 ? (
              <div className="px-4 py-6 text-center text-[12px] text-gray-400">
                No se encontraron países
              </div>
            ) : (
              filtered.map((country) => {
                const isSelected = country.name === value?.name
                return (
                  <button
                    key={country.name}
                    type="button"
                    onClick={() => { onChange(country); setOpen(false); setSearch('') }}
                    className="w-full flex items-center gap-3 px-4 py-3 transition-all duration-150 text-left"
                    style={{
                      background: isSelected ? '#fef3c7' : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.background = '#fafafa'
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <span className="text-xl flex-shrink-0">{country.flag}</span>
                    <span
                      className="flex-1 text-[13px] font-semibold text-gray-800 truncate"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {country.name}
                    </span>
                    <span
                      className="text-[11px] font-black px-2 py-0.5 rounded-lg flex-shrink-0"
                      style={{
                        background: isSelected ? '#fde68a' : '#f3f4f6',
                        color: isSelected ? '#92400e' : '#6b7280',
                      }}
                    >
                      {country.currency}
                    </span>
                    {isSelected && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
