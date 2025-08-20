import React from 'react'
import { createRoot } from 'react-dom/client'
import 'bulma/css/bulma.min.css'
import './styles.css'
import Router from './routes'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
