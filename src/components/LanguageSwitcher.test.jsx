import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageProvider } from '../context/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

const renderWithProvider = (component) => {
  return render(
    <LanguageProvider>
      {component}
    </LanguageProvider>
  )
}

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('renders ES and EN options', () => {
    renderWithProvider(<LanguageSwitcher />)
    expect(screen.getByText('ES')).toBeInTheDocument()
    expect(screen.getByText('EN')).toBeInTheDocument()
  })

  it('has accessible button', () => {
    renderWithProvider(<LanguageSwitcher />)
    expect(screen.getByRole('button', { name: /toggle language/i })).toBeInTheDocument()
  })

  it('toggles language when clicked', async () => {
    const user = userEvent.setup()
    renderWithProvider(<LanguageSwitcher />)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    // After click, localStorage should be updated
    expect(localStorageMock.setItem).toHaveBeenCalled()
  })

  it('shows separator between languages', () => {
    renderWithProvider(<LanguageSwitcher />)
    expect(screen.getByText('/')).toBeInTheDocument()
  })
})
