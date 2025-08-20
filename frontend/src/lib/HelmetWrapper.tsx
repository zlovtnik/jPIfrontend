import React from 'react'

// Safe wrapper: only use react-helmet-async Helmet on the client (window exists).
// In Node (tests/SSR) the fallback is a no-op component so tests won't require a provider.
let HelmetComp: React.FC<any> = ({ children }) => <>{children}</>

if (typeof window !== 'undefined') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const rh = require('react-helmet-async')
    if (rh && rh.Helmet) HelmetComp = rh.Helmet
  } catch (e) {
    // swallow; keep no-op
  }
}

export default HelmetComp
