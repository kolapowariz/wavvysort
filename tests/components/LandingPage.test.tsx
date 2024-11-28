import { it, expect, describe } from 'vitest'
import { cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import LandingPage from '@/components/LandingPage'
import React from 'react'
import '@testing-library/jest-dom/vitest'

beforeEach(() => {
  cleanup()
})

describe('LandingPage', () => {

  
  it('should render the wavvysort name', () => {
    render(<LandingPage />)

    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(/wavvysort/i)
  });

  it('should render the landing page', async () => {
    render(<LandingPage />)

    await waitForElementToBeRemoved(() => screen.getByText(/wavvysort/i))

    screen.debug()

    // expect(screen.getByRole('link', {name: /home/i})).toBeInTheDocument()
    const dashboardButton = screen.getByRole('button', { name: /dashboard/i});
    expect(dashboardButton).toBeInTheDocument()
    const logInButton = screen.getByRole('button', { name: /log in/i});
    expect(logInButton).toBeInTheDocument()
    const signUpButton = screen.getByRole('button', { name: /sign up/i});
    expect(signUpButton).toBeInTheDocument()
  })
})