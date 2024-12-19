import LandingPage from '@/components/LandingPage';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import React from 'react';

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

    const dashboardButtons = screen.getAllByRole('button', { name: /dashboard/i });
    dashboardButtons.forEach((btn) => expect(btn).toBeInTheDocument())

    const logInButtons = screen.getAllByRole('button', { name: /log in/i });
    logInButtons.forEach((btn) => expect(btn).toBeInTheDocument())

    const signUpButton = screen.getByRole('button', { name: /sign up/i });
    expect(signUpButton).toBeInTheDocument()

    const createButton = screen.getByRole('button', { name: /create/i })
    expect(createButton).toBeInTheDocument()

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()

    expect(screen.getByRole('link', { name: /our services/i })).toBeInTheDocument()

    expect(screen.getByRole('link', { name: /directory/i })).toBeInTheDocument()
  })

  it('should take the user to dashboard page when the dashboard button is clicked', async () => {
    render(<LandingPage />)

    await waitForElementToBeRemoved(() => screen.getByText(/wavvysort/i))
    const dashboardButton = screen.getAllByRole('button', { name: /dashboard/i})
    expect(dashboardButton[0]).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(dashboardButton[0])
  })
})