// src/pages/SuccessPage.jsx
import { useNavigate, useLocation } from 'react-router-dom'
import useStore from '../store/useStore'

export default function SuccessPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { reset } = useStore()

  const message = location.state?.message ?? ''

  function handleNew() {
    reset()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-12 max-w-lg mx-auto">
      {/* Success icon */}
      <div className="w-20 h-20 rounded-full border-2 border-green-500 bg-[rgba(34,197,94,0.08)] flex items-center justify-center text-4xl mb-6">
        ✓
      </div>

      <h2 className="font-syne font-black text-2xl text-white text-center mb-2">
        ¡Solicitud enviada!
      </h2>
      <p className="text-sm text-[#888] text-center mb-8 leading-relaxed">
        Tu mensaje fue enviado a WhatsApp.<br />
        Adjunta el capture directamente en el chat.
      </p>

      {/* Preview of message */}
      {message && (
        <div className="w-full card-dark rounded-2xl p-4 mb-8 text-sm text-[#ccc] leading-7 whitespace-pre-line font-mono text-xs">
          {message}
        </div>
      )}

      <button className="btn-fire w-full max-w-sm" onClick={handleNew}>
        Nueva solicitud
      </button>
    </div>
  )
}
