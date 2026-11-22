import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Layout } from './components/Layout'
import { Auth } from './components/Auth'
import { ProfileSetup } from './components/ProfileSetup'
import { Dashboard } from './pages/Dashboard'
import { BMICalculator } from './pages/BMICalculator'
import { DietPlan } from './pages/DietPlan'
import { Exercises } from './pages/Exercises'
import { HealthTips } from './pages/HealthTips'

const AppContent: React.FC = () => {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Auth />
  }

  if (!profile) {
    return <ProfileSetup />
  }

  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bmi" element={<BMICalculator />} />
        <Route path="/diet" element={<DietPlan />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/tips" element={<HealthTips />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App