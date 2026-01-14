import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext'
import './index.css'

// Easter egg hint for curious devs
console.log(
  '%c🎮 Psst... Do you know the Konami Code?',
  'background: linear-gradient(90deg, #9d7bb0, #6366f1); color: white; padding: 8px 16px; border-radius: 4px; font-size: 14px; font-weight: bold;'
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
