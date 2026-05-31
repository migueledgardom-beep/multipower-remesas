// src/components/Header.jsx
import useStore from '../store/useStore'

export default function Header() {
  const { bcvRate, ratesSource } = useStore()

  return (
    <header className="flex items-center justify-between px-5 py-4 border-b border-[#2a2a2a]">
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center font-syne font-black text-lg text-black"
          style={{ background: 'linear-gradient(135deg, #FF6B1A, #F5C842)' }}
        >
          M
        </div>
        <div>
          <div className="font-syne font-bold text-[17px] text-white">Multipower</div>
          <div className="text-[10px] text-[#666]">Remesas Internacionales</div>
        </div>
      </div>

      <div className="bg-[#1a1500] border border-[#3a2e00] rounded-xl px-3 py-1.5 text-right">
        <div className="font-syne font-bold text-sm text-gold">
          Bs. {bcvRate?.toFixed(2) ?? '—'}
        </div>
        <div className="text-[10px] text-[#888]">
          Tasa BCV {ratesSource === 'api' ? '🟢' : '🟡'}
        </div>
      </div>
    </header>
  )
}
