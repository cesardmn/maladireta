import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App.jsx'
import { LoggerProvider } from './providers/Logger/Provider.jsx'
import { FilesProvider } from './providers/Files/Provider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoggerProvider>
      <FilesProvider>
        <App />
      </FilesProvider>
    </LoggerProvider>
  </StrictMode>
)
