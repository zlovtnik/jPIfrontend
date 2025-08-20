import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Register from './pages/Register'
import MembersList from './pages/MembersList'
import DonationsList from './pages/DonationsList'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { EffectProvider } from './contexts/EffectContext'

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth()
  if (!token) return <Navigate to="/login" replace />
  return children
}

export default function Router() {
  return (
    <AuthProvider>
      <EffectProvider>
        <BrowserRouter>
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <App />
              </PrivateRoute>
            }
          />
          <Route
            path="/members"
            element={
              <PrivateRoute>
                <MembersList />
              </PrivateRoute>
            }
          />
          <Route
            path="/donations"
            element={
              <PrivateRoute>
                <DonationsList />
              </PrivateRoute>
            }
          />
          </Routes>
        </BrowserRouter>
      </EffectProvider>
    </AuthProvider>
  )
}
