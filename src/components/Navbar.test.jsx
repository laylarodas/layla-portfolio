import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from '../context/LanguageContext'
import Navbar from './Navbar'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn()
  disconnect = vi.fn()
  unobserve = vi.fn()
}
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
})

const renderNavbar = () => {
  return render(
    <BrowserRouter>
      <LanguageProvider>
        <Navbar />
      </LanguageProvider>
    </BrowserRouter>
  )
}

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('renders the logo', () => {
    renderNavbar()
    expect(screen.getByText('LR')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    renderNavbar()
    // Using getAllByText because links appear in both desktop and mobile menus
    expect(screen.getAllByText('Projects').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Skills').length).toBeGreaterThan(0)
    expect(screen.getAllByText('About').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0)
  })

  it('renders CV link', () => {
    renderNavbar()
    const cvLinks = screen.getAllByText('CV')
    expect(cvLinks.length).toBeGreaterThan(0)
  })

  it('renders mobile menu button', () => {
    renderNavbar()
    expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument()
  })

  it('toggles mobile menu when button is clicked', async () => {
    const user = userEvent.setup()
    renderNavbar()
    
    const menuButton = screen.getByLabelText('Toggle menu')
    
    // Menu should be closed initially (max-h-0)
    const mobileMenu = document.querySelector('.md\\:hidden.overflow-hidden')
    expect(mobileMenu).toHaveClass('max-h-0')
    
    // Click to open
    await user.click(menuButton)
    expect(mobileMenu).toHaveClass('max-h-96')
    
    // Click to close
    await user.click(menuButton)
    expect(mobileMenu).toHaveClass('max-h-0')
  })

  it('closes mobile menu when a nav link is clicked', async () => {
    const user = userEvent.setup()
    renderNavbar()
    
    // Open menu
    const menuButton = screen.getByLabelText('Toggle menu')
    await user.click(menuButton)
    
    // Click a link in mobile menu
    const mobileLinks = screen.getAllByText('Projects')
    const mobileLink = mobileLinks.find(link => 
      link.closest('.md\\:hidden')
    )
    
    if (mobileLink) {
      await user.click(mobileLink)
      const mobileMenu = document.querySelector('.md\\:hidden.overflow-hidden')
      expect(mobileMenu).toHaveClass('max-h-0')
    }
  })

  it('renders language switcher', () => {
    renderNavbar()
    expect(screen.getAllByText('ES').length).toBeGreaterThan(0)
    expect(screen.getAllByText('EN').length).toBeGreaterThan(0)
  })

  it('has correct href for logo', () => {
    renderNavbar()
    const logoLink = screen.getByText('LR').closest('a')
    expect(logoLink).toHaveAttribute('href', '#hero')
  })

  it('has correct href for navigation links', () => {
    renderNavbar()
    const projectsLinks = screen.getAllByText('Projects')
    projectsLinks.forEach(link => {
      const anchor = link.closest('a')
      if (anchor) {
        expect(anchor).toHaveAttribute('href', '#projects')
      }
    })
  })
})
