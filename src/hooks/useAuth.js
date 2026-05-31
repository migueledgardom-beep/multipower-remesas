// src/hooks/useAuth.js
import { useEffect } from 'react'
import { onAuthChange } from '../services/authService'
import useStore from '../store/useStore'

export function useAuth() {
  const { user, setUser } = useStore()

  useEffect(() => {
    const unsub = onAuthChange((firebaseUser) => {
      setUser(firebaseUser)
    })
    return () => unsub()
  }, [setUser])

  return { user }
}
