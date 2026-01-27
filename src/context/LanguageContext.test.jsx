import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { LanguageProvider, useTranslation } from './LanguageContext'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Mock navigator.language
Object.defineProperty(navigator, 'language', {
  value: 'en-US',
  configurable: true,
})

describe('LanguageContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('provides default language as English', () => {
    const { result } = renderHook(() => useTranslation(), {
      wrapper: LanguageProvider,
    })

    expect(result.current.language).toBe('en')
  })

  it('toggles language from English to Spanish', () => {
    const { result } = renderHook(() => useTranslation(), {
      wrapper: LanguageProvider,
    })

    act(() => {
      result.current.toggleLanguage()
    })

    expect(result.current.language).toBe('es')
  })

  it('toggles language back from Spanish to English', () => {
    const { result } = renderHook(() => useTranslation(), {
      wrapper: LanguageProvider,
    })

    act(() => {
      result.current.toggleLanguage() // en -> es
      result.current.toggleLanguage() // es -> en
    })

    expect(result.current.language).toBe('en')
  })

  it('translates keys correctly in English', () => {
    const { result } = renderHook(() => useTranslation(), {
      wrapper: LanguageProvider,
    })

    const title = result.current.t('hero.role')
    expect(title).toBe('Backend Developer')
  })

  it('translates keys correctly in Spanish', () => {
    const { result } = renderHook(() => useTranslation(), {
      wrapper: LanguageProvider,
    })

    act(() => {
      result.current.toggleLanguage() // Switch to Spanish
    })

    const title = result.current.t('about.title')
    expect(title).toBe('Sobre Mí')
  })

  it('returns key if translation not found', () => {
    const { result } = renderHook(() => useTranslation(), {
      wrapper: LanguageProvider,
    })

    const notFound = result.current.t('nonexistent.key')
    expect(notFound).toBe('nonexistent.key')
  })

  it('saves language preference to localStorage', () => {
    const { result } = renderHook(() => useTranslation(), {
      wrapper: LanguageProvider,
    })

    act(() => {
      result.current.toggleLanguage()
    })

    expect(localStorageMock.setItem).toHaveBeenCalledWith('language', 'es')
  })

  it('throws error when used outside provider', () => {
    expect(() => {
      renderHook(() => useTranslation())
    }).toThrow('useTranslation must be used within a LanguageProvider')
  })
})
