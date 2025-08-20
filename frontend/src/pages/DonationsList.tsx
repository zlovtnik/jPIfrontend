import React from 'react'
import { Donation } from '../types/donation'
import { listDonations } from '../services/donations.effect'
import { useEffectIO } from '../hooks/useEffectIO'

export default function DonationsList() {
  const state = useEffectIO<Donation[]>(() => listDonations(), [])

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Donations</h1>
        {state.status === 'error' && <div className="notification is-danger">{String(state.error)}</div>}
        {state.status === 'loading' && <div>Loading...</div>}
        {state.status === 'success' && (
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Type</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {state.data.map((d) => (
                <tr key={d.id}>
                  <td>{d.amount}</td>
                  <td>{d.donationType}</td>
                  <td>{d.donationDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}
