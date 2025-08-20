import React, { useState } from 'react'
import { RegisterRequest } from '../types/auth'
import { api } from '../services/apiClient'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const nav = useNavigate()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      const req: RegisterRequest = { username, email, password }
      await api('/auth/register', { method: 'POST', data: req })
      nav('/login')
    } catch (err: any) {
      setError(err?.response?.data?.message || String(err))
    }
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Register</h1>
        <form onSubmit={submit} style={{ maxWidth: 400 }}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          {error && <div className="notification is-danger">{error}</div>}
          <div className="field">
            <div className="control">
              <button className="button is-primary" type="submit">Register</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
