import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import Connection from '../connection'
import { UserProvider } from '../../../contexte/UserContext'
import axios from 'axios'

// Mock axios
vi.mock('axios')

// Mock du useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Wrapper pour les providers
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <UserProvider>
      {children}
    </UserProvider>
  </BrowserRouter>
)

describe('Connection Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('affiche le formulaire de connexion', () => {
    render(<Connection />, { wrapper: TestWrapper })
    
    expect(screen.getByText('Se connecter')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Votre adresse mail')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Votre mot de passe')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Connexion' })).toBeInTheDocument()
  })
})