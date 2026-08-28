import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'
import './app/index.css'

import { SessionProvider } from './context/SessionProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SessionProvider something=''>
      <App />
    </SessionProvider>
  </StrictMode>,
)
