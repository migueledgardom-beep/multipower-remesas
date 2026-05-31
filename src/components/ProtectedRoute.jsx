// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import useStore from '../store/useStore'

export default function ProtectedRoute({ children }) {
  const user = useStore((s) => s.user)

  // null = loading, undefined = not signed in
  if (user === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#555] text-sm">Cargando...</div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
