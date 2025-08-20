import React from 'react'

// Safe HelmetProvider: in browser, try to use react-helmet-async's provider.
// In test/SSR environments, fall back to a no-op that simply renders children.
const Noop: React.FC<any> = ({ children }) => <>{children}</>

let HelmetProviderComp: React.FC<any> = Noop

if (typeof window !== 'undefined') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const rh = require('react-helmet-async')
    if (rh && rh.HelmetProvider) HelmetProviderComp = rh.HelmetProvider
  } catch (e) {
    // ignore and keep noop
  }
}

export default HelmetProviderComp
