import { useState, useEffect, useCallback } from 'react'

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
]

export function useKonamiCode() {
  const [activated, setActivated] = useState(false)
  const [inputSequence, setInputSequence] = useState([])

  const resetActivation = useCallback(() => {
    setActivated(false)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.code

      setInputSequence((prev) => {
        const newSequence = [...prev, key].slice(-KONAMI_CODE.length)

        // Check if sequence matches
        if (newSequence.length === KONAMI_CODE.length) {
          const isMatch = newSequence.every(
            (k, i) => k === KONAMI_CODE[i]
          )
          if (isMatch) {
            setActivated(true)
            return []
          }
        }

        return newSequence
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return { activated, resetActivation }
}
