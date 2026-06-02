// src/App.jsx

import { useRates } from './hooks/useRates'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import CalculatorPage from './pages/CalculatorPage'
import FormPage from './pages/FormPage'
import SuccessPage from './pages/SuccessPage'

export default function App() {
  useRates()

  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<CalculatorPage />}
        />

        {/* FORMULARIO */}
        <Route
          path="/formulario"
          element={<FormPage />}
        />

        {/* ÉXITO */}
        <Route
          path="/exito"
          element={<SuccessPage />}
        />

        {/* REDIRECT */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  )
}