// src/App.jsx
import { useRates } from './hooks/useRates'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import CalculatorPage from './pages/CalculatorPage'
import FormPage from './pages/FormPage'
import SuccessPage from './pages/SuccessPage'

export default function App() {
  useRates()
  useAuth() // Listen for Firebase auth state

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/form" element={<FormPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <CalculatorPage />
            </ProtectedRoute>
          }
        />
        <Route
  path="/formulario"
  element={<FormPage />}
/>

<Route
  path="/exito"
  element={<SuccessPage />}
/>

<Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
