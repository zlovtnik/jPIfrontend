import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { EffectProvider } from '../src/contexts/EffectContext'
import { AuthProvider } from '../src/contexts/AuthContext'
import MembersList from '../src/pages/MembersList'

function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <EffectProvider>{children}</EffectProvider>
    </AuthProvider>
  )
}

describe('useEffectIO integration', () => {
  it('renders members list from effect', async () => {
    render(
      <AppWrapper>
        <MembersList />
      </AppWrapper>
    )

    expect(await screen.findByText('Alice')).toBeTruthy()
    expect(await screen.findByText('Bob')).toBeTruthy()
  })
})
