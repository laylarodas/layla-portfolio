import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Tag from './Tag'

describe('Tag', () => {
  it('renders children correctly', () => {
    render(<Tag>React</Tag>)
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('applies default variant styles', () => {
    render(<Tag>Default</Tag>)
    const tag = screen.getByText('Default')
    expect(tag).toHaveClass('bg-light-100')
  })

  it('applies primary variant styles', () => {
    render(<Tag variant="primary">Primary</Tag>)
    const tag = screen.getByText('Primary')
    expect(tag).toHaveClass('bg-accent-50')
  })

  it('applies success variant styles', () => {
    render(<Tag variant="success">Success</Tag>)
    const tag = screen.getByText('Success')
    expect(tag).toHaveClass('bg-emerald-50')
  })

  it('applies warning variant styles', () => {
    render(<Tag variant="warning">Warning</Tag>)
    const tag = screen.getByText('Warning')
    expect(tag).toHaveClass('bg-amber-50')
  })

  it('applies custom className', () => {
    render(<Tag className="custom-tag">Custom</Tag>)
    const tag = screen.getByText('Custom')
    expect(tag).toHaveClass('custom-tag')
  })

  it('has correct base styles', () => {
    render(<Tag>Styled</Tag>)
    const tag = screen.getByText('Styled')
    expect(tag).toHaveClass('inline-flex', 'items-center', 'rounded', 'border')
  })
})
