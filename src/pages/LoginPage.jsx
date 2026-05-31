// src/pages/LoginPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginWithEmail, registerWithEmail } from '../services/authService'

const ERROR_MESSAGES = {
  'auth/invalid-email': 'Correo inválido',
  'auth/wrong-password': 'Contraseña incorrecta',
  'auth/user-not-found': 'Usuario no encontrado',
  'auth/email-already-in-use': 'Este correo ya está registrado',
  'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
  'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde.',
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState('login') // 'login' | 'register'

  async function handleSubmit() {
    if (!email || !password) {
      setError('Ingresa tu correo y contraseña')
      return
    }
    setLoading(true)
    setError('')
    try {
      if (mode === 'login') {
        await loginWithEmail(email, password)
      } else {
        await registerWithEmail(email, password)
      }
      navigate('/')
    } catch (err) {
      setError(ERROR_MESSAGES[err.code] || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Glow background */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-48 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,107,26,0.12) 0%, transparent 70%)',
        }}
      />

      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center font-syne font-black text-4xl text-black mb-6"
        style={{ background: 'linear-gradient(135deg, #FF6B1A, #F5C842)' }}
      >
        M
      </div>

      <h1 className="font-syne font-black text-3xl text-white text-center mb-2">Multipower</h1>
      <p className="text-sm text-[#888] text-center mb-10">
        Tu plataforma de remesas internacionales
      </p>

      <div className="w-full max-w-sm">
        <div className="mb-4">
          <label className="label-sm">Correo electrónico</label>
          <input
            type="email"
            className="input-field"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            autoComplete="email"
          />
        </div>

        <div className="mb-2">
          <label className="label-sm">Contraseña</label>
          <input
            type="password"
            className="input-field"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          />
        </div>

        {error && <p className="text-red-500 text-xs mt-1 mb-3">{error}</p>}

        <button
          className="btn-fire mt-6"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? '...' : mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
        </button>

        <button
          className="btn-ghost mt-3"
          onClick={() => {
            setMode(mode === 'login' ? 'register' : 'login')
            setError('')
          }}
        >
          {mode === 'login' ? '¿No tienes cuenta? Regístrate' : 'Ya tengo cuenta'}
        </button>
      </div>
    </div>
  )
}
