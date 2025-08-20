import React from 'react'
import usePageMeta from '../lib/usePageMeta'
import { Member } from '../types/member'
import { listMembers } from '../services/members.effect'
import { useEffectIO } from '../hooks/useEffectIO'

export default function MembersList() {
  const state = useEffectIO<Member[]>(() => listMembers(), [])
  usePageMeta({ title: 'Members — JPI', description: 'Browse members of the JPI community.', ogTitle: 'Members — JPI', ogDescription: 'Browse members of the JPI community.' })

  return (
  <section className="section">
      <div className="container">
        <h1 className="title">Members</h1>
        {state.status === 'error' && <div className="notification is-danger">{String(state.error)}</div>}
        {state.status === 'loading' && <div>Loading...</div>}
        {state.status === 'success' && (
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>First</th>
                <th>Last</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {state.data.map((m) => (
                <tr key={m.id}>
                  <td>{m.firstName}</td>
                  <td>{m.lastName}</td>
                  <td>{m.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}
