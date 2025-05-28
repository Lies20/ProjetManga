import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { UserProvider, useUser } from '../UserContext'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const TestComponent = () => {
  const { user, updateUser, logOut } = useUser()
  
  return (
    <div>
      <div data-testid="user-info">
        {user ? user.pseudo : 'Pas connecté'}
      </div>
      <button onClick={() => updateUser({ pseudo: 'TestUser', userId: 1 })}>
        Connecter
      </button>
      <button onClick={logOut}>
        Déconnecter
      </button>
    </div>
  )
}

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <UserProvider>
      {children}
    </UserProvider>
  </BrowserRouter>
)

describe('UserContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('initialise avec un utilisateur vide', () => {
    render(<TestComponent />, { wrapper: TestWrapper })
    
    expect(screen.getByTestId('user-info')).toHaveTextContent('Pas connecté')
  })

  test('met à jour l\'utilisateur correctement', () => {
    render(<TestComponent />, { wrapper: TestWrapper })
    
    const connectButton = screen.getByText('Connecter')
    fireEvent.click(connectButton)
    
    expect(screen.getByTestId('user-info')).toHaveTextContent('TestUser')
  })

  test('déconnecte l\'utilisateur et navigue vers la home', () => {
    render(<TestComponent />, { wrapper: TestWrapper })
    
    const connectButton = screen.getByText('Connecter')
    fireEvent.click(connectButton)
    expect(screen.getByTestId('user-info')).toHaveTextContent('TestUser')
    
    const logoutButton = screen.getByText('Déconnecter')
    fireEvent.click(logoutButton)
    
    expect(screen.getByTestId('user-info')).toHaveTextContent('Pas connecté')
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})