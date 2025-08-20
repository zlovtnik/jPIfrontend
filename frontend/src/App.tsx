import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { hello } from './functional/hello'
import { useEffectIO } from './hooks/useEffectIO'

export default function App() {
  const [msg, setMsg] = useState<string>('')

  const state = useEffectIO(() => hello, [])

  if (state.status === 'success' && state.data) {
    // set local msg only for display; hook returns data directly
    if (msg !== String(state.data)) setMsg(String(state.data))
  }

  return (
    <>
      <Navbar />
      <section className="section">
        <div className="container">
          <h1 className="title">Dashboard</h1>
          <p className="subtitle">Welcome to the JPI admin dashboard.</p>
          <div className="box">
            <strong>Functional test:</strong>
            <div>{msg || (state.status === 'loading' ? 'running effect...' : '')}</div>
          </div>
        </div>
      </section>
    </>
  )
}
