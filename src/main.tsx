import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppHookContainer } from './AppHookContainer.tsx'
import { Toaster } from './components/ui/sonner.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppHookContainer />
    <Toaster/>
  </StrictMode>,
)
