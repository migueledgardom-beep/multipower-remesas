import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  loginWithEmail,
  registerWithEmail,
  resetPassword,
} from '../services/authService'

const ERROR_MESSAGES = {
  'auth/invalid-email': 'Correo inválido',
  'auth/wrong-password': 'Contraseña incorrecta',
  'auth/user-not-found': 'Usuario no encontrado',
  'auth/email-already-in-use':
    'Este correo ya está registrado',
  'auth/weak-password':
    'La contraseña debe tener al menos 6 caracteres',
  'auth/too-many-requests':
    'Demasiados intentos. Intenta más tarde.',
}

export default function LoginPage() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] =
    useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  const [loadingReset, setLoadingReset] =
    useState(false)

  const [error, setError] = useState('')

  const [mode, setMode] = useState('login')

  async function handleSubmit() {
    if (!email || !password) {
      setError(
        'Ingresa tu correo y contraseña'
      )
      return
    }

    setLoading(true)
    setError('')

    try {
      if (mode === 'login') {
        await loginWithEmail(
          email,
          password
        )
      } else {
        await registerWithEmail(
          email,
          password
        )
      }

      navigate('/')
    } catch (err) {
      setError(
        ERROR_MESSAGES[err.code] ||
          'Error al iniciar sesión'
      )
    } finally {
      setLoading(false)
    }
  }

  async function handleResetPassword() {
    if (!email) {
      alert('Ingresa tu correo')
      return
    }

    try {
      setLoadingReset(true)

      await resetPassword(email)

      alert(
        'Te enviamos un correo para recuperar tu contraseña'
      )
    } catch (error) {
      alert('Error enviando correo')
    } finally {
      setLoadingReset(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-12">

      <div className="w-full max-w-md bg-[#111] border border-[#222] rounded-3xl p-8 shadow-2xl">

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">

  <span className="text-3xl">
    🔥
  </span>

  <h1 className="text-4xl md:text-5xl font-black text-yellow-400">
    Inversiones Multipower
  </h1>

</div>

          <p className="text-gray-400">
            Recargas • Remesas • Inversiones
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl p-4 mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-5">

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Correo
            </label>

            <input
              type="email"
              className="
                w-full
                bg-black
                border
                border-[#222]
                rounded-2xl
                p-5
                text-white
                outline-none
                focus:border-yellow-500
              "
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Contraseña
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                className="
                  w-full
                  bg-black
                  border
                  border-[#222]
                  rounded-2xl
                  p-5
                  pr-14
                  text-white
                  outline-none
                  focus:border-yellow-500
                "
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                onKeyDown={(e) =>
                  e.key === 'Enter' &&
                  handleSubmit()
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  hover:text-yellow-400
                  transition
                "
              >
                {showPassword
                  ? '🙈'
                  : '👁'}
              </button>

            </div>
          </div>

          <button
            type="button"
            onClick={handleResetPassword}
            className="
              w-full
              text-center
              text-yellow-400
              hover:text-yellow-300
              transition
              text-sm
            "
          >
            {loadingReset
              ? 'Enviando...'
              : '¿Olvidaste tu contraseña?'}
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
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
              transition-all
              duration-300
              hover:scale-[1.02]
            "
          >
            {loading
              ? 'Cargando...'
              : mode === 'login'
              ? 'Ingresar'
              : 'Crear cuenta'}
          </button>

          <button
            onClick={() =>
              setMode(
                mode === 'login'
                  ? 'register'
                  : 'login'
              )
            }
            className="
              w-full
              text-gray-400
              hover:text-white
              transition
              text-sm
            "
          >
            {mode === 'login'
              ? '¿No tienes cuenta? Regístrate'
              : '¿Ya tienes cuenta? Inicia sesión'}
          </button>

        </div>
      </div>
    </div>
  )
}