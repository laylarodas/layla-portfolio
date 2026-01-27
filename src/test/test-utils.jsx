import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LanguageProvider } from '../context/LanguageContext'

// Custom render function that wraps components with necessary providers
function customRender(ui, options = {}) {
  const { initialLanguage = 'en', ...renderOptions } = options

  function AllProviders({ children }) {
    return (
      <HelmetProvider>
        <BrowserRouter>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </BrowserRouter>
      </HelmetProvider>
    )
  }

  return render(ui, { wrapper: AllProviders, ...renderOptions })
}

// Re-export everything from testing-library
export * from '@testing-library/react'
export { userEvent } from '@testing-library/user-event'

// Override render method
export { customRender as render }
